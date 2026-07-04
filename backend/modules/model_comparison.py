import time
import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)


def compare_models(train_result, task_type):
    """
    Compare trained machine learning models.

    Parameters
    ----------
    train_result : dict
        Output of train_models()

    task_type : str or dict
        Classification / Regression

    Returns
    -------
    dict
        Comparison metrics and best model.
    """

    # --------------------------
    # Handle task type
    # --------------------------

    if isinstance(task_type, dict):
        task_type = task_type["task_type"]

    task_type = task_type.strip().lower()

    trained_models = train_result["trained_models"]
    X_test = train_result["X_test"]
    y_test = train_result["y_test"]

    comparison = {}

    # ==========================
    # Classification
    # ==========================

    if task_type == "classification":

        best_accuracy = -1
        best_model = None

        for name, model in trained_models.items():

            start = time.time()

            predictions = model.predict(X_test)

            end = time.time()

            accuracy = accuracy_score(y_test, predictions)

            precision = precision_score(
                y_test,
                predictions,
                average="weighted",
                zero_division=0,
            )

            recall = recall_score(
                y_test,
                predictions,
                average="weighted",
                zero_division=0,
            )

            f1 = f1_score(
                y_test,
                predictions,
                average="weighted",
                zero_division=0,
            )

            comparison[name] = {
                "Accuracy": round(accuracy, 4),
                "Precision": round(precision, 4),
                "Recall": round(recall, 4),
                "F1 Score": round(f1, 4),
                "Prediction Time (s)": round(end - start, 5),
            }

            if accuracy > best_accuracy:
                best_accuracy = accuracy
                best_model = name

    # ==========================
    # Regression
    # ==========================

    else:

        best_r2 = float("-inf")
        best_model = None

        for name, model in trained_models.items():

            start = time.time()

            predictions = model.predict(X_test)

            end = time.time()

            mae = mean_absolute_error(
                y_test,
                predictions,
            )

            rmse = mean_squared_error(
                y_test,
                predictions,
            ) ** 0.5

            r2 = r2_score(
                y_test,
                predictions,
            )

            comparison[name] = {
                "MAE": round(mae, 4),
                "RMSE": round(rmse, 4),
                "R² Score": round(r2, 4),
                "Prediction Time (s)": round(end - start, 5),
            }

            if r2 > best_r2:
                best_r2 = r2
                best_model = name

    # --------------------------
    # Ranking
    # --------------------------

    if task_type == "classification":

        ranking = sorted(
            comparison.items(),
            key=lambda x: x[1]["Accuracy"],
            reverse=True,
        )

    else:

        ranking = sorted(
            comparison.items(),
            key=lambda x: x[1]["R² Score"],
            reverse=True,
        )

    ranking = [
        {
            "Rank": i + 1,
            "Model": model,
            **metrics,
        }
        for i, (model, metrics) in enumerate(ranking)
    ]

    return {
        "best_model": best_model,
        "comparison": comparison,
        "ranking": ranking,
    }