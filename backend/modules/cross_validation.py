import numpy as np
from sklearn.model_selection import cross_val_score


def cross_validate_model(model, pipeline_result, task_type):
    """
    Perform k-fold cross validation on the tuned model.
    """

    if isinstance(task_type, dict):
        task_type = task_type["task_type"]

    task_type = task_type.strip().lower()

    X_train = pipeline_result["X_train"]
    y_train = pipeline_result["y_train"]

    preprocessor = pipeline_result["preprocessor"]

    X_train_processed = preprocessor.fit_transform(X_train)

    scoring = "accuracy" if task_type == "classification" else "r2"

    cv = min(5, len(y_train))

    scores = cross_val_score(
        estimator=model,
        X=X_train_processed,
        y=y_train,
        cv=cv,
        scoring=scoring
    )

    return {
        "cv_folds": cv,
        "scores": scores.tolist(),
        "mean_score": float(round(np.mean(scores), 4)),
        "std_score": float(round(np.std(scores), 4))
    }