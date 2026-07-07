import os
import matplotlib.pyplot as plt
import numpy as np


class GraphGenerator:

    def __init__(self):

        self.output_dir = "graphs"

        os.makedirs(self.output_dir, exist_ok=True)

    # -----------------------------------
    # Missing Values Graph
    # -----------------------------------

    def missing_values_graph(self, df):

        missing = df.isnull().sum()

        missing = missing[missing > 0]

        if len(missing) == 0:
            return None

        plt.figure(figsize=(8,5))

        missing.sort_values().plot(kind="bar")

        plt.title("Missing Values")

        plt.ylabel("Count")

        plt.tight_layout()

        path = os.path.join(
            self.output_dir,
            "missing_values.png"
        )

        plt.savefig(path)

        plt.close()

        return path

    # -----------------------------------
    # Correlation Heatmap
    # -----------------------------------

    def correlation_heatmap(self, df):

        numeric = df.select_dtypes(include=np.number)

        if numeric.shape[1] < 2:
            return None

        corr = numeric.corr()

        plt.figure(figsize=(8,6))

        plt.imshow(corr)

        plt.colorbar()

        plt.xticks(
            range(len(corr.columns)),
            corr.columns,
            rotation=90
        )

        plt.yticks(
            range(len(corr.columns)),
            corr.columns
        )

        plt.title("Correlation Heatmap")

        plt.tight_layout()

        path = os.path.join(
            self.output_dir,
            "correlation_heatmap.png"
        )

        plt.savefig(path)

        plt.close()

        return path

    # -----------------------------------
    # Class Distribution
    # -----------------------------------

    def class_distribution(self, df, target):

        counts = df[target].value_counts()

        plt.figure(figsize=(6,6))

        plt.pie(
            counts,
            labels=counts.index,
            autopct="%1.1f%%"
        )

        plt.title("Class Distribution")

        path = os.path.join(
            self.output_dir,
            "class_distribution.png"
        )

        plt.savefig(path)

        plt.close()

        return path

    # -----------------------------------
    # Feature Importance
    # -----------------------------------

    def feature_importance_graph(self, feature_result):

        features = feature_result["top_features"]

        names = [
            x["feature"]
            for x in features
        ]

        scores = [
            x["importance"]
            for x in features
        ]

        plt.figure(figsize=(8,5))

        plt.barh(names, scores)

        plt.title("Feature Importance")

        plt.tight_layout()

        path = os.path.join(
            self.output_dir,
            "feature_importance.png"
        )

        plt.savefig(path)

        plt.close()

        return path

    # -----------------------------------
    # Model Comparison
    # -----------------------------------

    def model_accuracy_graph(self, comparison):

        ranking = comparison["ranking"]

        models = [
            x["Model"]
            for x in ranking
        ]

        accuracy = [
            x["Accuracy"]
            for x in ranking
        ]

        plt.figure(figsize=(8,5))

        plt.bar(models, accuracy)

        plt.ylabel("Accuracy")

        plt.title("Model Comparison")

        plt.tight_layout()

        path = os.path.join(
            self.output_dir,
            "model_comparison.png"
        )

        plt.savefig(path)

        plt.close()

        return path

    # -----------------------------------
    # Generate All Graphs
    # -----------------------------------

    def generate_all(

        self,

        df,

        target,

        feature_result,

        comparison

    ):

        return {

            "missing_values":
                self.missing_values_graph(df),

            "correlation_heatmap":
                self.correlation_heatmap(df),

            "class_distribution":
                self.class_distribution(df, target),

            "feature_importance":
                self.feature_importance_graph(feature_result),

            "model_comparison":
                self.model_accuracy_graph(comparison)

        }