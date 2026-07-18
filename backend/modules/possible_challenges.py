def detect_challenges(df,target_column,task_type):
    if isinstance(task_type, dict):
        task_type = task_type["task_type"]
    else:
        task_type = task_type  
    challenges = []

    # Missing Values
    missing_percent = (
        df.isnull().sum().sum()
        / (df.shape[0] * df.shape[1])
    ) * 100 if (df.shape[0] * df.shape[1]) > 0 else 0.0

    if missing_percent > 10:
        challenges.append({
            "type": "High Missing Values",
            "severity": "High" if missing_percent > 30 else "Medium",
            "description": f"Your dataset has {missing_percent:.2f}% missing cells. Models might fail without proper imputation."
        })

    # Small Dataset
    if len(df) < 1000:
        challenges.append({
            "type": "Small Dataset Size",
            "severity": "Medium",
            "description": f"The dataset has only {len(df)} rows. Neural networks or complex models might overfit."
        })

    # High Dimensionality
    if df.shape[1] > df.shape[0]:
        challenges.append({
            "type": "High Dimensionality",
            "severity": "Medium",
            "description": f"Number of features ({df.shape[1]}) is larger than rows ({df.shape[0]}). Consider feature reduction."
        })

    # Constant Columns
    constant_columns = [
        col
        for col in df.columns
        if df[col].nunique() == 1
    ]

    if constant_columns:
        challenges.append({
            "type": "Constant Columns",
            "severity": "Low",
            "description": f"Columns {constant_columns} have only 1 unique value. They provide no predictive power."
        })

    # Classification Only
    if task_type == "Classification":

        target_dist = (
            df[target_column]
            .value_counts(normalize=True)
        )

        if not target_dist.empty and target_dist.min() < 0.1:
            challenges.append({
                "type": "Class Imbalance",
                "severity": "High",
                "description": f"The minority class represents only {round(target_dist.min() * 100, 2)}% of samples. Standard accuracy will be misleading."
            })

    return {
        "challenges": challenges
    }