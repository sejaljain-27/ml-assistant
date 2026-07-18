from datetime import datetime
import pandas as pd


def generate_report(
    dataset_name,
    task_result,
    quality_result,
    suggested_models,
    challenges,
    comparison_result,
):
    """
    Generates a complete ML analysis report.

    Parameters
    ----------
    dataset_name : str

    task_result : dict

    quality_result : dict

    suggested_models : dict

    challenges : dict

    comparison_result : dict

    Returns
    -------
    dict
    """

    report = {

        "Dataset": dataset_name,

        "Generated On": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),

        "Task Type":
            task_result["task_type"],

        "Reason":
            task_result["reason"],

        "Data Quality Score":
            quality_result["data_quality_score"],

        "Missing Values (%)":
            quality_result["missing_percent"],

        "Duplicate Rows (%)":
            quality_result["duplicate_percent"],

        "Constant Columns":
            quality_result["constant_columns"],

        "Suggested Models":
            suggested_models["recommended_models"],

        "Possible Challenges":
            challenges["challenges"],

        "Best Model":
            comparison_result["best_model"],

        "Model Comparison":
            comparison_result["comparison"],

        "Ranking":
            comparison_result["ranking"],
    }

    return report
def report_to_dataframe(report):

    summary = {

        "Dataset":
            report["Dataset"],

        "Task Type":
            report["Task Type"],

        "Data Quality":
            report["Data Quality Score"],

        "Best Model":
            report["Best Model"],

        "Suggested Models":
            ", ".join(report["Suggested Models"]),

        "Challenges":
            ", ".join([c["type"] for c in report["Possible Challenges"]])
            if report["Possible Challenges"]
            else "None",

    }

    return pd.DataFrame([summary])