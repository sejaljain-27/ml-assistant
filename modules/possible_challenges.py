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
    ) * 100

    if missing_percent > 10:
        challenges.append(
            "High missing values detected."
        )

    # Small Dataset
    if len(df) < 1000:
        challenges.append(
            "Small dataset may lead to overfitting."
        )

    # High Dimensionality
    if df.shape[1] > df.shape[0]:
        challenges.append(
            "High dimensionality detected."
        )

    # Constant Columns
    constant_columns = [
        col
        for col in df.columns
        if df[col].nunique() == 1
    ]

    if constant_columns:
        challenges.append(
            "Constant features detected."
        )

    # Classification Only
    if task_type == "Classification":

        target_dist = (
            df[target_column]
            .value_counts(normalize=True)
        )

        if target_dist.min() < 0.1:
            challenges.append(
                "Class imbalance detected."
            )

    return {
        "challenges": challenges
    }