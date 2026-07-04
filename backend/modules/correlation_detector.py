import pandas as pd
def detect_correlation(df, threshold=0.90):
    """
    Detect highly correlated numerical features.
    Parameters
    ----------
    df : pandas.DataFrame
        Input dataset
    threshold : float
        Correlation threshold (default = 0.90)
    Returns
    -------
    dict
    """
    numeric_df = df.select_dtypes(include=["number"])
    # If less than 2 numeric columns
    if numeric_df.shape[1] < 2:
        return {
            "highly_correlated": False,
            "num_pairs": 0,
            "pairs": [],
            "columns_to_remove": [],
            "reason": "Not enough numerical columns."
        }
    corr_matrix = numeric_df.corr().abs()

    correlated_pairs = []
    columns_to_remove = set()

    columns = corr_matrix.columns

    for i in range(len(columns)):

        for j in range(i + 1, len(columns)):

            corr_value = corr_matrix.iloc[i, j]

            if corr_value >= threshold:

                feature1 = columns[i]
                feature2 = columns[j]

                correlated_pairs.append({

                    "feature_1": feature1,

                    "feature_2": feature2,

                    "correlation": round(corr_value, 3)

                })

                # Recommend removing one feature
                columns_to_remove.add(feature2)

    return {

        "highly_correlated": len(correlated_pairs) > 0,

        "num_pairs": len(correlated_pairs),

        "pairs": correlated_pairs,

        "columns_to_remove": list(columns_to_remove),

        "reason": (
            f"{len(correlated_pairs)} highly correlated feature pair(s) detected."
            if correlated_pairs
            else "No highly correlated features found."
        )

    }