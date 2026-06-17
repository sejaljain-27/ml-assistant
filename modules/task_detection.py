import pandas as pd
def detect_task_type(df, target_column):
    target = df[target_column]
    if target.dtype == 'object':
        return {
            "task_type": "Classification",
            "reason": "target column is categorical."
        }
    unique_values = target.nunique()
    unique_ratio = unique_values / len(target)
    if unique_values <= 20 and unique_ratio < 0.1:
        return {
            "task_type": "Classification",
            "reason": f"target column has only {unique_values} unique values and behaves like a categorical label."
        }
    return {
        "task_type": "Regression",
        "reason": f"target column has {unique_values} unique values and behaves like continuous numerical data"
    }