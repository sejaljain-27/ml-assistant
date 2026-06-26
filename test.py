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
from modules.recommend_preprocessing import recommend_preprocessing

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
import pandas as pd

from modules.feature_selection import feature_selection

df = pd.read_csv("Titanic-Dataset (1).csv")

result = feature_selection(

    df,

    target_column="Survived",

    problem_type="classification",

    top_k=5

)

from pprint import pprint

pprint(result)