"""
dataset_health_score.py

Calculates an overall dataset health score based on
multiple quality indicators.

Health Score Range:
90-100 : Excellent
75-89  : Good
60-74  : Fair
0-59   : Poor
"""


def calculate_health_score(
    missing_percentage,
    duplicate_rows,
    total_rows,
    is_imbalanced,
    highly_correlated,
    has_outliers,
    high_cardinality,
    need_scaling
):
    """
    Calculates dataset health score.

    Parameters
    ----------
    missing_percentage : float

    duplicate_rows : int

    total_rows : int

    is_imbalanced : bool

    highly_correlated : bool

    has_outliers : bool

    high_cardinality : bool

    need_scaling : bool

    Returns
    -------
    dict
    """

    score = 100

    deductions = []

    recommendations = []

    # -------------------------
    # Missing Values
    # -------------------------

    if missing_percentage > 50:

        score -= 25

        deductions.append("-25 : Extremely high missing values")

        recommendations.append(
            "Remove highly missing columns or use advanced imputation."
        )

    elif missing_percentage > 20:

        score -= 15

        deductions.append("-15 : Moderate missing values")

        recommendations.append(
            "Use KNN or Iterative Imputer."
        )

    elif missing_percentage > 0:

        score -= 5

        deductions.append("-5 : Small amount of missing values")

        recommendations.append(
            "Apply Mean / Median Imputation."
        )

    # -------------------------
    # Duplicate Rows
    # -------------------------

    duplicate_percentage = 0

    if total_rows > 0:
        duplicate_percentage = (
            duplicate_rows / total_rows
        ) * 100

    if duplicate_percentage > 20:

        score -= 10

        deductions.append("-10 : Too many duplicate rows")

        recommendations.append(
            "Remove duplicate records."
        )

    elif duplicate_percentage > 0:

        score -= 4

        deductions.append("-4 : Duplicate rows detected")

        recommendations.append(
            "Consider dropping duplicates."
        )

    # -------------------------
    # Class Imbalance
    # -------------------------

    if is_imbalanced:

        score -= 10

        deductions.append("-10 : Class imbalance")

        recommendations.append(
            "Apply SMOTE or Class Weights."
        )

    # -------------------------
    # Correlation
    # -------------------------

    if highly_correlated:

        score -= 8

        deductions.append("-8 : Highly correlated features")

        recommendations.append(
            "Remove correlated features."
        )

    # -------------------------
    # Outliers
    # -------------------------

    if has_outliers:

        score -= 8

        deductions.append("-8 : Outliers detected")

        recommendations.append(
            "Use IQR or Winsorization."
        )

    # -------------------------
    # High Cardinality
    # -------------------------

    if high_cardinality:

        score -= 5

        deductions.append("-5 : High-cardinality columns")

        recommendations.append(
            "Use Target Encoding."
        )

    # -------------------------
    # Scaling
    # -------------------------

    if need_scaling:

        score -= 4

        deductions.append("-4 : Feature scaling recommended")

        recommendations.append(
            "Apply StandardScaler or RobustScaler."
        )

    # -------------------------
    # Final Score
    # -------------------------

    score = max(0, min(100, score))

    if score >= 90:

        status = "Excellent"

        emoji = "🟢"

    elif score >= 75:

        status = "Good"

        emoji = "🟡"

    elif score >= 60:

        status = "Fair"

        emoji = "🟠"

    else:

        status = "Poor"

        emoji = "🔴"

    return {

        "score": score,

        "status": status,

        "emoji": emoji,

        "deductions": deductions,

        "recommendations": recommendations

    }