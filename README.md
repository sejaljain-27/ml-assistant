ML Assistant

ML Assistant is an automated machine learning analysis system that helps users understand a dataset before building predictive models. Instead of directly training a machine learning model, the system first analyzes the dataset, identifies potential issues, recommends preprocessing techniques, suggests suitable machine learning algorithms, trains multiple baseline models, compares their performance, and generates visualizations.
The project is designed to automate the repetitive tasks involved in the early stages of a machine learning workflow while providing interpretable recommendations for data preprocessing and model selection.

Problem Statement

Preparing a dataset for machine learning usually requires several manual steps, including checking data quality, handling missing values, detecting outliers, selecting suitable preprocessing techniques, choosing evaluation metrics, and comparing different machine learning algorithms. These tasks are repetitive and often require prior machine learning experience.
ML Assistant automates these initial stages by analyzing a dataset, identifying common data issues, recommending preprocessing methods, training multiple machine learning models, evaluating their performance, and presenting the results in a structured report.

Pipeline

The complete pipeline follows these stages:

Dataset Loading

The system loads a CSV dataset and identifies the target column provided by the user.

Task Detection

The target column is automatically analyzed to determine whether the dataset represents a Classification or Regression problem.

Data Quality Analysis

The dataset is inspected for common quality issues including:

- Missing values
- Duplicate records
- Constant columns

A Data Quality Score is calculated based on these observations.

Dataset Health Score

The Dataset Health Score summarizes the overall quality of the dataset by considering multiple factors including:

- Missing values
- Duplicate rows
- Outliers
- Highly correlated features
- High-cardinality categorical columns
- Feature scaling requirements
- Class imbalance

The final score categorizes the dataset into quality levels and provides recommendations for improvement.

Data Inspection

The system automatically performs:

- Class imbalance detection
- Correlation analysis
- Outlier detection
- High-cardinality detection
- Feature scaling analysis

Each detector provides both statistical information and recommendations.

Feature Analysis

Feature importance is calculated to identify the most influential predictors.

The system also identifies columns that are likely to contribute little to model performance, such as identifier columns and nearly unique features.

Preprocessing Recommendation

Based on the detected dataset characteristics, the system recommends preprocessing techniques including:

- Missing value imputation
- One-Hot Encoding
- Target Encoding
- Feature scaling
- Outlier handling
- Removal of highly correlated features
- Duplicate removal
- Principal Component Analysis (PCA)
- Class imbalance handling

Model Recommendation

Suitable machine learning algorithms are recommended automatically according to the detected problem type.

Classification models include:

- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost
- CatBoost

Regression models include:

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor
- XGBoost Regressor

Model Training

The dataset is automatically divided into training and testing sets.

A preprocessing pipeline is constructed before training multiple machine learning models using the processed dataset.

Model Evaluation

Classification models are evaluated using:

- Accuracy
- Precision
- Recall
- F1 Score
- Prediction Time

Regression models are evaluated using:

- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score
- Prediction Time

The best-performing model is selected based on the evaluation metrics.

Graph Generation

The system automatically generates several visualizations, including:

- Missing Values Graph
- Correlation Heatmap
- Class Distribution
- Feature Importance Graph
- Model Comparison Graph

Project Structure

backend/
│
├── modules/
│   ├── task_detection.py
│   ├── data_quality.py
│   ├── dataset_health_score.py
│   ├── imbalance_detector.py
│   ├── correlation_detector.py
│   ├── outlier_detector.py
│   ├── cardinality_detector.py
│   ├── scaling_detector.py
│   ├── feature_selection.py
│   ├── recommend_preprocessing.py
│   ├── suggested_models.py
│   ├── possible_challenges.py
│   ├── prepare_pipeline.py
│   ├── train_models.py
│   ├── model_comparison.py
│   ├── graph_generator.py
│   └── pipeline.py
│
├── test.py
├── requirements.txt
└── README.md

Running the Project

Install the required dependencies.

```bash
pip install -r requirements.txt
```

Update the dataset path and target column inside `test.py`.

Example:

```python
from backend.modules.pipeline import analyze_dataset

result = analyze_dataset(
    "Titanic-Dataset.csv",
    "Survived"
)

print(result)
```

Run the project:

```bash
python test.py
```

Output

The generated analysis includes:

- Task Detection
- Dataset Health Score
- Data Quality Report
- Class Imbalance Analysis
- Correlation Analysis
- Outlier Detection
- High Cardinality Detection
- Scaling Recommendation
- Feature Importance
- Recommended Evaluation Metrics
- Preprocessing Recommendations
- Suggested Machine Learning Models
- Possible Dataset Challenges
- Model Comparison
- Generated Graphs

Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- XGBoost

Future Work

The following improvements are planned for future development:

- FastAPI Backend
- React Dashboard
- Dataset Upload Interface
- Downloadable Analysis Reports
- Hyperparameter Optimization
- Model Explainability
- Experiment Tracking
- Model Deployment
