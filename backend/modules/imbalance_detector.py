def detect_imbalance(df, target):

    class_counts = df[target].value_counts()

    percentages = (
        class_counts / len(df)
    ) * 100

    min_percentage = percentages.min()

    if min_percentage < 30:
        return {
            "imbalanced": True,
            "percentages": percentages.to_dict(),
            "reason": "Minority class below 30%"
        }

    return {
        "imbalanced": False,
        "percentages": percentages.to_dict(),
        "reason": "Classes reasonably balanced"
    }