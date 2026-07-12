// Mirrors `GET /api/models/comparison`
export const modelComparison = {
  bestModel: 'Random Forest',
  bestModelAccuracy: 86.34,
  models: [
    { model: 'Random Forest', accuracy: 0.8634, precision: 0.85, recall: 0.83, f1Score: 0.84, rocAuc: 0.91, timeSeconds: 1.23 },
    { model: 'XGBoost', accuracy: 0.8592, precision: 0.84, recall: 0.82, f1Score: 0.83, rocAuc: 0.9, timeSeconds: 1.85 },
    { model: 'Logistic Regression', accuracy: 0.8114, precision: 0.8, recall: 0.78, f1Score: 0.79, rocAuc: 0.87, timeSeconds: 0.28 },
    { model: 'SVM (RBF)', accuracy: 0.8067, precision: 0.79, recall: 0.77, f1Score: 0.78, rocAuc: 0.86, timeSeconds: 0.64 },
    { model: 'KNN', accuracy: 0.7845, precision: 0.76, recall: 0.74, f1Score: 0.75, rocAuc: 0.83, timeSeconds: 0.31 },
    { model: 'Naive Bayes', accuracy: 0.7723, precision: 0.75, recall: 0.72, f1Score: 0.73, rocAuc: 0.82, timeSeconds: 0.12 },
    { model: 'Decision Tree', accuracy: 0.7458, precision: 0.73, recall: 0.7, f1Score: 0.71, rocAuc: 0.78, timeSeconds: 0.22 },
  ],
  tuning: {
    bestParameters: {
      n_estimators: 150,
      max_depth: 10,
      min_samples_split: 5,
      criterion: 'gini',
    },
    searchSpace: {
      n_estimators: [50, 100, 150, 200],
      max_depth: [5, 10, 15, null],
      criterion: ['gini', 'entropy'],
    },
  },
  crossValidation: {
    folds: [0.865, 0.854, 0.871, 0.849, 0.878],
    mean: 0.8634,
    std: 0.0105,
  },
}
