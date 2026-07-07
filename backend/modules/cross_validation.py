import numpy as np

from sklearn.model_selection import cross_val_score


def cross_validate_model(tuned_result, pipeline_result, task_type):
    """
    Perform k-fold cross validation on the tuned model.

    Parameters
    ----------
    tuned_result : dict
        Output from tune_best_model()

    pipeline_result : dict
        Output from prepare_pipeline()

    task_type : str or dict
        Classification / Regression

    Returns
    -------
    dict
    """

    if isinstance(task_type, dict):
        task_type = task_type["task_type"]

    task_type = task_type.strip().lower()

    model = tuned_result["best_estimator"]

    X_train = pipeline_result["X_train"]
    y_train = pipeline_result["y_train"]

    preprocessor = pipeline_result["preprocessor"]

    X_train_processed = preprocessor.fit_transform(X_train)

    if task_type == "classification":
        scoring = "accuracy"
    else:
        scoring = "r2"

    # Choose CV folds safely
    cv = min(5, len(y_train))

    scores = cross_val_score(
        estimator=model,
        X=X_train_processed,
        y=y_train,
        cv=cv,
        scoring=scoring,
        n_jobs=-1
    )

    return {

        "cv_folds": cv,

        "scores": scores.tolist(),

        "mean_score": round(np.mean(scores), 4),

        "std_score": round(np.std(scores), 4),

        "best_cv_score": tuned_result["best_cv_score"]

    }