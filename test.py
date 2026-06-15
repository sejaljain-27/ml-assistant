# from modules.metric_recommender import recommend_metric

# print(recommend_metric("Regression"))
# print(recommend_metric("Classification"))
# print(recommend_metric("Classification", True))
# import pandas as pd
# from modules.imbalance_detector import detect_imbalance
# df = pd.read_csv("Titanic-Dataset (1).csv")
# result = detect_imbalance(df, "Survived")
# print(result)
import pandas as pd
from modules.imbalance_detector import detect_imbalance
from modules.metric_recommender import recommend_metric
df = pd.read_csv("Titanic-Dataset (1).csv")
imbalance_result = detect_imbalance(df, "Survived")
metric_result = recommend_metric(
    "Classification",
    imbalance_result["imbalanced"]
)
print("Imbalance Result:")
print(imbalance_result)
print("\nMetric Recommendation:")
print(metric_result)