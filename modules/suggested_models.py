def suggest_models(df, task_type, data_quality):
    if isinstance(task_type, dict):
        task_type = task_type["task_type"]
    else:
        task_type = task_type       
    rows = len(df)
    missing = data_quality["missing_percent"]
    models = []
    if task_type == "Classification":
        if rows < 10000:
            models = [
                "Logistic Regression",
                "Random Forest",
                "SVM"
            ]
        elif rows < 100000:
            models = [
                "Random Forest",
                "XGBoost",
                "CatBoost"
            ]
        else:
            models = [
                "LightGBM",
                "XGBoost",
                "CatBoost"
            ]
    else:
        if rows < 10000:
            models = [
                "Linear Regression",
                "Random Forest Regressor",
                "SVR"
            ]
        elif rows < 100000:
            models = [
                "Random Forest Regressor",
                "XGBoost Regressor",
                "Gradient Boosting Regressor"
            ]

        else:
            models = [
                "LightGBM Regressor",
                "XGBoost Regressor",
                "CatBoost Regressor"
            ]

    if missing > 5 and "CatBoost" not in str(models):
        models.append("CatBoost")

    return {
        "recommended_models": models
    }