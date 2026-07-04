# from modules.metric_recommender import recommend_metric

# print(recommend_metric("Regression"))
# print(recommend_metric("Classification"))
# print(recommend_metric("Classification", True))
# import pandas as pd
# from modules.imbalance_detector import detect_imbalance
# df = pd.read_csv("Titanic-Dataset (1).csv")
# result = detect_imbalance(df, "Survived")
# print(result)
# import pandas as pd
# from modules.imbalance_detector import detect_imbalance
# from modules.metric_recommender import recommend_metric
# df = pd.read_csv("Titanic-Dataset (1).csv")
# imbalance_result = detect_imbalance(df, "Survived")
# metric_result = recommend_metric(
#     "Classification",
#     imbalance_result["imbalanced"]
# )
# print("Imbalance Result:")
# print(imbalance_result)
# print("\nMetric Recommendation:")
# print(metric_result)
from backend.modules.recommend_preprocessing import recommend_preprocessing

# result = recommend_preprocessing(
#     missing_percentage=18,
#     categorical_columns=4,
#     is_imbalanced=True,
#     highly_correlated=True,
#     has_outliers=True,
#     high_cardinality=False,
#     duplicate_rows=15,
#     skewed_features=True,
#     feature_scale_difference=True
# )

# for item in result:
#     print("\nRecommendation:", item["recommendation"])
#     print("Reason:", item["reason"])
# from modules.recommend_preprocessing import recommend_preprocessing

# results = recommend_preprocessing(
#     missing_percentage=35,
#     categorical_columns=4,
#     is_imbalanced=True,
#     highly_correlated=True,
#     has_outliers=True,
#     high_cardinality=True,
#     duplicate_rows=15,
#     skewed_features=True,
#     feature_scale_difference=True,
#     low_variance_features=True,
#     high_dimensionality=True,
#     small_dataset=False
# )

# for rec in results:
#     print("=" * 50)
#     print("Severity      :", rec["severity"])
#     print("Recommendation:", rec["recommendation"])
#     print("Reason        :", rec["reason"])
#     print("Action        :", rec["action"])
# import pandas as pd

# from modules.correlation_detector import detect_correlation

# df = pd.read_csv("Titanic-Dataset (1).csv")

# result = detect_correlation(df)

# print(result)
# import pandas as pd

# df = pd.read_csv("Titanic-Dataset (1).csv")

# print(df.corr(numeric_only=True))
# import pandas as pd

# from modules.outlier_detector import detect_outliers

# df = pd.read_csv("Titanic-Dataset (1).csv")

# result = detect_outliers(df)

# print(result)
# import pandas as pd

# from modules.cardinality_detector import detect_cardinality

# df = pd.read_csv("Titanic-Dataset (1).csv")

# result = detect_cardinality(df)

# print(result)
# import pandas as pd

# from modules.scaling_detector import detect_scaling

# df = pd.read_csv("Titanic-Dataset (1).csv")

# result = detect_scaling(df)

# print(result)
# 
# import pandas as pd
# from pipeline import run_pipeline
# df = pd.read_csv("Titanic-Dataset (1).csv")
# result = run_pipeline(df, target_column="your_target", dataset_name="Your Dataset")
# from pprint import pprint
# from backend.modules.pipeline import analyze_dataset
# if __name__ == "__main__":
#     result = analyze_dataset(

#         "weight-height.csv",
#         "Weight"
#     )

#     pprint(result)
# from backend.modules.dataset_health_score import calculate_health_score

# result = calculate_health_score(

#     missing_percentage=18,

#     duplicate_rows=5,

#     total_rows=1000,

#     is_imbalanced=True,

#     highly_correlated=True,

#     has_outliers=True,

#     high_cardinality=False,

#     need_scaling=True

# )

# from pprint import pprint

# pprint(result)
from backend.modules.pipeline import analyze_dataset

result = analyze_dataset(

    "Titanic-Dataset (1).csv",

    "Survived"

)

print(result)
