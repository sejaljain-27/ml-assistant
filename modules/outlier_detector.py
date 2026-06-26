import pandas as pd


def detect_outliers(df):
    """
    Detect outliers in numerical columns using the IQR method.

    Parameters
    ----------
    df : pandas.DataFrame

    Returns
    -------
    dict
    """

    numeric_df = df.select_dtypes(include=["number"])

    if numeric_df.empty:
        return {
            "has_outliers": False,
            "columns": [],
            "details": [],
            "total_outliers": 0,
            "reason": "No numerical columns found."
        }

    outlier_columns = []
    outlier_details = []
    total_outliers = 0

    for column in numeric_df.columns:

        Q1 = numeric_df[column].quantile(0.25)
        Q3 = numeric_df[column].quantile(0.75)

        IQR = Q3 - Q1

        lower_bound = Q1 - (1.5 * IQR)
        upper_bound = Q3 + (1.5 * IQR)

        outlier_mask = (
            (numeric_df[column] < lower_bound) |
            (numeric_df[column] > upper_bound)
        )

        count = outlier_mask.sum()

        if count > 0:

            percentage = round((count / len(df)) * 100, 2)

            outlier_columns.append(column)

            outlier_details.append({

                "column": column,

                "count": int(count),

                "percentage": percentage,

                "lower_bound": round(lower_bound, 2),

                "upper_bound": round(upper_bound, 2)

            })

            total_outliers += int(count)

    return {

        "has_outliers": total_outliers > 0,

        "total_outliers": total_outliers,

        "columns": outlier_columns,

        "details": outlier_details,

        "reason": (
            f"{total_outliers} outliers detected."
            if total_outliers > 0
            else "No outliers detected."
        )

    }