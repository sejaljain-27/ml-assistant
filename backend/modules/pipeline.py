import pandas as pd

from .task_detection import detect_task_type
from .data_quality import calculate_data_quality
from .imbalance_detector import detect_imbalance
from .metric_recommender import recommend_metric
from .correlation_detector import detect_correlation
from .outlier_detector import detect_outliers
from .cardinality_detector import detect_cardinality
from .scaling_detector import detect_scaling
from .feature_selection import feature_selection
from .recommend_preprocessing import recommend_preprocessing
from .suggested_models import suggest_models
from .possible_challenges import detect_challenges
from .prepare_pipeline import prepare_pipeline
from .train_models import train_models
from .model_comparison import compare_models
from .dataset_health_score import calculate_health_score


def analyze_dataset(file_path, target_column):

    # ======================================
    # Load Dataset
    # ======================================

    df = pd.read_csv(file_path)

    # ======================================
    # Dataset Analysis
    # ======================================

    task = detect_task_type(df, target_column)

    quality = calculate_data_quality(df)

    imbalance = detect_imbalance(df, target_column)

    correlation = detect_correlation(df)

    outliers = detect_outliers(df)

    cardinality = detect_cardinality(df)

    scaling = detect_scaling(df)

    # ======================================
    # Dataset Health Score
    # ======================================

    duplicate_rows = int(
        (quality["duplicate_percent"] / 100) * len(df)
    )

    health_score = calculate_health_score(

        missing_percentage=quality["missing_percent"],

        duplicate_rows=duplicate_rows,

        total_rows=len(df),

        is_imbalanced=imbalance["imbalanced"],

        highly_correlated=correlation["highly_correlated"],

        has_outliers=outliers["has_outliers"],

        high_cardinality=cardinality["high_cardinality"],

        need_scaling=scaling["need_scaling"]

    )

    # ======================================
    # Feature Selection
    # ======================================

    features = feature_selection(

        df,

        target_column,

        task["task_type"]

    )

    # ======================================
    # Metric Recommendation
    # ======================================

    metric = recommend_metric(

        task["task_type"],

        imbalance["imbalanced"]

    )

    # ======================================
    # Preprocessing Recommendation
    # ======================================

    preprocessing = recommend_preprocessing(

        missing_percentage=quality["missing_percent"],

        categorical_columns=len(
            df.select_dtypes(
                include=["object", "category"]
            ).columns
        ),

        is_imbalanced=imbalance["imbalanced"],

        highly_correlated=correlation["highly_correlated"],

        has_outliers=outliers["has_outliers"],

        high_cardinality=cardinality["high_cardinality"],

        duplicate_rows=duplicate_rows,

        skewed_features=False,

        feature_scale_difference=scaling["need_scaling"],

        low_variance_features=False,

        high_dimensionality=df.shape[1] > df.shape[0],

        small_dataset=len(df) < 1000

    )

    # ======================================
    # Suggested Models
    # ======================================

    suggested = suggest_models(

        df,

        task,

        quality

    )

    # ======================================
    # Possible Challenges
    # ======================================

    challenges = detect_challenges(

        df,

        target_column,

        task

    )

    # ======================================
    # ML Pipeline
    # ======================================

    prepared = prepare_pipeline(

        df,

        target_column

    )

    trained = train_models(

        prepared,

        task

    )

    comparison = compare_models(

        trained,

        task

    )

    # ======================================
    # Final Result
    # ======================================

    result = {

        "task_detection": task,

        "health_score": health_score,

        "data_quality": quality,

        "imbalance_detection": imbalance,

        "correlation_detection": correlation,

        "outlier_detection": outliers,

        "cardinality_detection": cardinality,

        "scaling_detection": scaling,

        "feature_selection": features,

        "recommended_metric": metric,

        "recommended_preprocessing": preprocessing,

        "suggested_models": suggested,

        "possible_challenges": challenges,

        "model_comparison": comparison

    }

    return result