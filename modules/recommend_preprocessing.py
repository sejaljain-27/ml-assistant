def recommend_preprocessing(
    missing_percentage,
    categorical_columns,
    is_imbalanced,
    highly_correlated,
    has_outliers,
    high_cardinality,
    duplicate_rows,
    skewed_features,
    feature_scale_difference,
    low_variance_features,
    high_dimensionality,
    small_dataset
):

    recommendations = []

    # Missing Values
    if missing_percentage > 50:
        recommendations.append({
            "severity": "High",
            "recommendation": "Drop Highly Missing Columns",
            "reason": f"{missing_percentage:.2f}% missing values detected.",
            "action": "Remove columns with excessive missing data."
        })

    elif missing_percentage > 20:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Advanced Missing Value Imputation",
            "reason": f"{missing_percentage:.2f}% missing values detected.",
            "action": "Use KNN Imputer or Iterative Imputer."
        })

    elif missing_percentage > 0:
        recommendations.append({
            "severity": "Low",
            "recommendation": "Mean/Median Imputation",
            "reason": f"{missing_percentage:.2f}% missing values detected.",
            "action": "Fill missing values before training."
        })

    # Categorical Features
    if categorical_columns > 0:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "One-Hot Encoding",
            "reason": f"{categorical_columns} categorical columns found.",
            "action": "Convert categorical variables into numerical format."
        })

    # High Cardinality
    if high_cardinality:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Target Encoding",
            "reason": "High-cardinality categorical features detected.",
            "action": "Avoid excessive one-hot encoded dimensions."
        })

    # Class Imbalance
    if is_imbalanced:
        recommendations.append({
            "severity": "High",
            "recommendation": "Apply SMOTE",
            "reason": "Class imbalance detected.",
            "action": "Generate synthetic minority samples."
        })

        recommendations.append({
            "severity": "Medium",
            "recommendation": "Use Class Weights",
            "reason": "Alternative approach to imbalance handling.",
            "action": "Assign higher weight to minority class."
        })

    # Correlation
    if highly_correlated:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Remove Correlated Features",
            "reason": "Multicollinearity detected.",
            "action": "Drop one feature from highly correlated pairs."
        })

    # Outliers
    if has_outliers:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Handle Outliers",
            "reason": "Extreme values detected.",
            "action": "Use IQR method or Winsorization."
        })

    # Duplicate Rows
    if duplicate_rows > 0:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Remove Duplicate Records",
            "reason": f"{duplicate_rows} duplicate rows detected.",
            "action": "Drop duplicates before model training."
        })

    # Skewed Features
    if skewed_features:
        recommendations.append({
            "severity": "Low",
            "recommendation": "Apply Log Transformation",
            "reason": "Skewed numerical features found.",
            "action": "Reduce skewness before training."
        })

    # Feature Scaling
    if feature_scale_difference:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Apply StandardScaler",
            "reason": "Large feature scale differences detected.",
            "action": "Normalize feature ranges."
        })

    # Low Variance Features
    if low_variance_features:
        recommendations.append({
            "severity": "Low",
            "recommendation": "Remove Low Variance Features",
            "reason": "Features provide little information.",
            "action": "Remove near-constant columns."
        })

    # High Dimensionality
    if high_dimensionality:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Apply PCA",
            "reason": "Large number of features detected.",
            "action": "Reduce dimensionality."
        })

    # Small Dataset
    if small_dataset:
        recommendations.append({
            "severity": "Medium",
            "recommendation": "Use Simpler Models",
            "reason": "Small dataset size detected.",
            "action": "Prefer Logistic Regression or Random Forest."
        })

    return recommendations