def recommend_metric(problem_type,is_imbalanced=False):
  if problem_type=="Regression":
    return{
      "metric":["RMSE","MAE","R_2 score"],
      "reason":"continuous target variable detected."
    }
  if problem_type=="Classification":
    if is_imbalanced:
      return {
        "metrics": ["F1 Score", "Recall", "ROC-AUC"],
        "reason": "Class imbalance detected."
      }
    return {
      "metrics": ["Accuracy", "Precision", "Recall"],
      "reason": "Balanced classification problem."
        }
