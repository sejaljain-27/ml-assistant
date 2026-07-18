def calculate_data_quality(df):

    score = 100

    # Missing Values
    total_cells = df.shape[0] * df.shape[1]
    missing_cells = df.isnull().sum().sum()

    missing_percent = (missing_cells / total_cells) * 100

    # Duplicate Rows
    duplicate_percent = (
        df.duplicated().sum()
        / len(df)
    ) * 100

    # Constant Columns
    constant_columns = [
        col
        for col in df.columns
        if df[col].nunique() == 1
    ]

    # Score deductions
    score -= missing_percent * 0.5
    score -= duplicate_percent * 0.5
    score -= len(constant_columns) * 5

    score = max(0, min(100, score))

    by_column = []
    for col in df.columns:
        col_missing = df[col].isnull().sum()
        col_pct = round((col_missing / len(df)) * 100, 2) if len(df) > 0 else 0.0
        by_column.append({
            "column": col,
            "pct": col_pct
        })

    return {
        "data_quality_score": round(score, 2),
        "missing_percent": round(missing_percent, 2),
        "duplicate_percent": round(duplicate_percent, 2),
        "constant_columns": constant_columns,
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "by_column": by_column
    }