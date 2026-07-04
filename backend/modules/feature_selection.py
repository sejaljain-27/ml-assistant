import pandas as pd
import numpy as np

from sklearn.preprocessing import LabelEncoder
from sklearn.feature_selection import (
    mutual_info_classif,
    mutual_info_regression
)


def feature_selection(
    df,
    target_column,
    problem_type="classification",
    top_k=10
):
    """
    Perform feature selection using Mutual Information.

    Parameters
    ----------
    df : pandas.DataFrame

    target_column : str

    problem_type :
        "classification" or "regression"

    top_k : int

    Returns
    -------
    dict
    """

    if target_column not in df.columns:
        raise ValueError("Target column not found.")

    data = df.copy()

    # -----------------------------
    # Separate Features and Target
    # -----------------------------

    X = data.drop(columns=[target_column])

    y = data[target_column]

    ignored_features = []

    # -----------------------------
    # Remove Identifier Columns
    # -----------------------------

    for column in X.columns:

        unique_ratio = X[column].nunique(dropna=True) / len(X)

        if unique_ratio > 0.95:

            ignored_features.append({

                "feature": column,

                "reason": "Identifier / Nearly unique column"

            })

    X = X.drop(
        columns=[i["feature"] for i in ignored_features],
        errors="ignore"
    )

    # -----------------------------
    # Remove Constant Columns
    # -----------------------------

    constant_columns = []

    for column in X.columns:

        if X[column].nunique(dropna=True) <= 1:

            constant_columns.append(column)

            ignored_features.append({

                "feature": column,

                "reason": "Constant column"

            })

    X = X.drop(
        columns=constant_columns,
        errors="ignore"
    )

    # -----------------------------
    # Fill Missing Values
    # -----------------------------

    for column in X.columns:

        if X[column].dtype == "object":

            X[column] = X[column].fillna("Missing")

        else:

            X[column] = X[column].fillna(
                X[column].median()
            )

    # -----------------------------
    # Encode Categorical Columns
    # -----------------------------

    encoders = {}

    for column in X.select_dtypes(
        include=["object", "category"]
    ).columns:

        encoder = LabelEncoder()

        X[column] = encoder.fit_transform(
            X[column].astype(str)
        )

        encoders[column] = encoder

    # Encode Target

    if y.dtype == "object":

        y = LabelEncoder().fit_transform(
            y.astype(str)
        )

    # -----------------------------
    # Mutual Information
    # -----------------------------

    if problem_type.lower() == "classification":

        scores = mutual_info_classif(

            X,

            y,

            random_state=42

        )

    else:

        scores = mutual_info_regression(

            X,

            y,

            random_state=42

        )

    feature_scores = pd.DataFrame({

        "Feature": X.columns,

        "Importance": scores

    })

    feature_scores = feature_scores.sort_values(

        by="Importance",

        ascending=False

    ).reset_index(drop=True)

    # -----------------------------
    # Ranking
    # -----------------------------

    ranked_features = []

    for rank, row in feature_scores.head(top_k).iterrows():

        ranked_features.append({

            "rank": rank + 1,

            "feature": row["Feature"],

            "importance": round(
                float(row["Importance"]),
                4
            ),

            "recommendation": "Keep"

        })

    # -----------------------------
    # Return Result
    # -----------------------------

    return {

        "top_features": ranked_features,

        "ignored_features": ignored_features,

        "most_important":

            ranked_features[0]["feature"]

            if ranked_features

            else None,

        "total_features_used": len(X.columns),

        "total_features_ignored": len(
            ignored_features
        ),

        "reason":

            f"Top {top_k} features selected using Mutual Information."

    }