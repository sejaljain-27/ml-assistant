from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
import shutil
import os
import uuid
import json

from backend.modules.pipeline import analyze_dataset

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
REPORT_DIR = os.path.join(BASE_DIR, "reports")
GRAPH_DIR = os.path.join(BASE_DIR, "graphs")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(REPORT_DIR, exist_ok=True)
os.makedirs(GRAPH_DIR, exist_ok=True)

app = FastAPI(
    title="ML Assistant API",
    version="1.0.0",
    description="API for automatic machine learning dataset analysis"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to ML Assistant API"
    }


@app.get("/health")
def health():
    return {
        "status": "running",
        "message": "ML Assistant API is healthy"
    }
    
@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    target_column: str = Form(...)
):
    try:
        # Generate unique IDs
        analysis_id = str(uuid.uuid4())

        # Save uploaded CSV
        file_path = os.path.join(
            UPLOAD_DIR,
            f"{analysis_id}_{file.filename}"
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run ML pipeline
        result = analyze_dataset(file_path, target_column)
        
        if "graphs" in result:
            result["graphs"] = {
                key: f"/graphs/{os.path.basename(path)}"
                for key, path in result["graphs"].items()
            }

        for key, value in result.items():
            try:
                jsonable_encoder(value)
                print(f"✅ {key} is serializable")
            except Exception as e:
                print(f"❌ {key} is NOT serializable")
                print(e)
        # Save report
        report_path = os.path.join(
            REPORT_DIR,
            f"{analysis_id}.json"
        )

        with open(report_path, "w") as f:
            json.dump(result, f, indent=4, default=str)

        return {
            "status": "success",
            "analysis_id": analysis_id,
            "analysis": result,
            "download_report": f"/download_report/{analysis_id}"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
        
@app.get("/download_report/{analysis_id}")
def download_report(analysis_id: str):

    report_path = os.path.join(
        REPORT_DIR,
        f"{analysis_id}.json"
    )

    if not os.path.exists(report_path):
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return FileResponse(
        path=report_path,
        media_type="application/json",
        filename=f"{analysis_id}.json"
    )
    
@app.get("/graphs/{filename}")
def get_graph(filename: str):

    graph_path = os.path.join(GRAPH_DIR, filename)

    if not os.path.exists(graph_path):
        raise HTTPException(
            status_code=404,
            detail="Graph not found"
        )

    return FileResponse(
        path=graph_path,
        media_type="image/png"
    )