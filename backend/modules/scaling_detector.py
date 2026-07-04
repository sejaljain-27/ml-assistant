import pandas as pd


def detect_scaling(df, ratio_threshold=100):
    """
    Detect whether feature scaling is recommended.

    Parameters
    ----------
    df : pandas.DataFrame

    ratio_threshold : int
        If max range / min range exceeds this,
        scaling is recommended.
    """

    numeric_df = df.select_dtypes(include=["number"])

    if numeric_df.empty:
        return {
            "need_scaling": False,
            "recommended_scaler": None,
            "details": [],
            "reason": "No numerical columns found."
        }

    feature_ranges = []

    ranges = []

    for column in numeric_df.columns:

        minimum = numeric_df[column].min()

        maximum = numeric_df[column].max()

        feature_range = maximum - minimum

        feature_ranges.append({

            "column": column,

            "min": float(minimum),

            "max": float(maximum),

            "range": float(round(feature_range,2))

        })

        if feature_range > 0:
            ranges.append(feature_range)

    if len(ranges) == 0:

        return {

            "need_scaling": False,

            "recommended_scaler": None,

            "details": feature_ranges,

            "reason": "All numerical features have constant values."

        }

    max_range = max(ranges)

    min_range = min(ranges)

    ratio = max_range / min_range

    if ratio > ratio_threshold:

        scaler = "StandardScaler"

        reason = (
            f"Feature ranges differ significantly "
            f"(ratio = {ratio:.2f})."
        )

        need_scaling = True

    else:

        scaler = None

        reason = "Feature ranges are relatively similar."

        need_scaling = False

    return {

        "need_scaling": need_scaling,

        "recommended_scaler": scaler,

        "range_ratio": round(ratio,2),

        "details": feature_ranges,

        "reason": reason

    }