from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

try:
    from xgboost import XGBClassifier, XGBRegressor
    XGBOOST_AVAILABLE = True
except ImportError:
    XGBOOST_AVAILABLE = False


def train_models(pipeline_result, task_type):

    # Accept either dictionary or string
    if isinstance(task_type, dict):
        task_type = task_type.get("task_type", "")

    task_type = str(task_type).strip().lower()

    X_train = pipeline_result["X_train"]
    X_test = pipeline_result["X_test"]
    y_train = pipeline_result["y_train"]
    y_test = pipeline_result["y_test"]
    preprocessor = pipeline_result["preprocessor"]

    # Preprocess
    X_train = preprocessor.fit_transform(X_train)
    X_test = preprocessor.transform(X_test)

    trained_models = {}

    # ------------------------
    # Classification Models
    # ------------------------

    if task_type == "classification":

        models = {
            "Logistic Regression":
                LogisticRegression(max_iter=1000),

            "Decision Tree":
                DecisionTreeClassifier(random_state=42),

            "Random Forest":
                RandomForestClassifier(random_state=42)
        }

        if XGBOOST_AVAILABLE:
            models["XGBoost"] = XGBClassifier(
                eval_metric="mlogloss",
                random_state=42
            )

    # ------------------------
    # Regression Models
    # ------------------------

    elif task_type == "regression":

        models = {
            "Linear Regression":
                LinearRegression(),

            "Decision Tree Regressor":
                DecisionTreeRegressor(random_state=42),

            "Random Forest Regressor":
                RandomForestRegressor(random_state=42)
        }

        if XGBOOST_AVAILABLE:
            models["XGBoost Regressor"] = XGBRegressor(
                random_state=42
            )

    else:
        raise ValueError(f"Unknown task type: {task_type}")

    # Train every model

    for name, model in models.items():
        model.fit(X_train, y_train)
        trained_models[name] = model

    return {
        "trained_models": trained_models,
        "X_test": X_test,
        "y_test": y_test
    }