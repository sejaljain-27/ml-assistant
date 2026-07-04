import pandas as pd
def detect_cardinality(df, threshold=20):
    """
    Detect high-cardinality categorical columns.

    Parameters
    ----------
    df : pandas.DataFrame

    threshold : int
        Number of unique values above which
        a column is considered high-cardinality.

    Returns
    -------
    dict
    """

    categorical_columns = df.select_dtypes(
        include=["object", "category"]
    ).columns

    details = []

    high_cardinality_columns = []

    for column in categorical_columns:

        unique_values = df[column].nunique(dropna=True)

        percentage = round(
            (unique_values / len(df)) * 100,
            2
        )

        if unique_values >= threshold:

            high_cardinality_columns.append(column)

            details.append({

                "column": column,

                "unique_values": int(unique_values),

                "percentage": float(percentage),

                "recommendation": "Target Encoding"

            })

    return {

        "high_cardinality": len(high_cardinality_columns) > 0,

        "columns": high_cardinality_columns,

        "details": details,

        "reason":
        f"{len(high_cardinality_columns)} high-cardinality column(s) detected."
        if high_cardinality_columns
        else "No high-cardinality columns found."

    }