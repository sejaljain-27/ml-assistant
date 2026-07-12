// Mirrors `GET /api/models/recommendations`
export const modelRecommendations = {
  problemType: 'Classification',
  suggested: [
    {
      name: 'Random Forest',
      fitScore: 92,
      reason: 'Handles mixed feature types well and is robust to the missing-value patterns in this dataset.',
      tags: ['Robust', 'Low tuning effort'],
    },
    {
      name: 'XGBoost',
      fitScore: 90,
      reason: 'Typically the strongest performer on structured/tabular classification tasks like this one.',
      tags: ['High accuracy', 'Needs tuning'],
    },
    {
      name: 'Logistic Regression',
      fitScore: 78,
      reason: 'Good interpretable baseline — useful for understanding feature-level effects on survival.',
      tags: ['Interpretable', 'Fast'],
    },
  ],
  recommendedMetric: 'F1 Score',
  metricReason: 'Class imbalance is mild but present, so F1 balances precision and recall better than raw accuracy.',
}
