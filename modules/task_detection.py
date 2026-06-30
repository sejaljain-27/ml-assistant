import pandas as pd
from pandas.api.types import is_numeric_dtype

def detect_task_type(df, target_column):

    target = df[target_column]

    # Object/String target → Classification
    if target.dtype == "object":
        return {
            "task_type": "Classification",
            "reason": "Target column is categorical."
        }

    # Numeric target
    if is_numeric_dtype(target):

        unique = target.nunique()
        rows = len(target)

        # Binary or few classes
        if unique <= min(20, rows * 0.05):
            return {
                "task_type": "Classification",
                "reason": f"Target column has only {unique} unique values and behaves like a categorical label."
            }

    return {
        "task_type": "Regression",
        "reason": "Target behaves like a continuous numerical variable."
    }