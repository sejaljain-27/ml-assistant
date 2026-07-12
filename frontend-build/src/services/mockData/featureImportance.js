// Mirrors `GET /api/features/importance`
export const featureImportance = {
  topFeatures: [
    { rank: 1, name: 'Sex', score: 0.1572 },
    { rank: 2, name: 'Fare', score: 0.1384 },
    { rank: 3, name: 'Pclass', score: 0.0861 },
    { rank: 4, name: 'Age', score: 0.0653 },
    { rank: 5, name: 'Embarked', score: 0.0456 },
  ],
  mutualInformation: [
    { name: 'Sex', score: 0.1572 },
    { name: 'Fare', score: 0.1384 },
    { name: 'Pclass', score: 0.0861 },
    { name: 'Age', score: 0.0653 },
    { name: 'Embarked', score: 0.0456 },
    { name: 'SibSp', score: 0.0213 },
    { name: 'Parch', score: 0.0185 },
    { name: 'Ticket Group', score: 0.0102 },
  ],
  insight: 'Sex is the most important feature for predicting the target variable.',
  correlations: {
    features: ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare'],
    matrix: [
      [1.0, -0.369, 0.083, 0.018, -0.549],
      [-0.369, 1.0, -0.308, -0.189, 0.096],
      [0.083, -0.308, 1.0, 0.414, 0.159],
      [0.018, -0.189, 0.414, 1.0, 0.216],
      [-0.549, 0.096, 0.159, 0.216, 1.0],
    ],
  },
}
