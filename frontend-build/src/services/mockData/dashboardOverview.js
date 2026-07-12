// Mirrors the shape expected from a future `GET /api/dataset/overview` response.
export const dashboardOverview = {
  fileName: 'Titanic-Dataset.csv',
  healthScore: 84,
  healthScoreMax: 100,
  healthLabel: 'Good Quality',
  rows: 891,
  columns: 12,
  missingValuesPct: 18.27,
  missingValuesLabel: 'High',
  duplicateRows: 0,
  duplicateRowsLabel: 'No duplicates',
  quickSummary: {
    problemType: 'Classification',
    targetColumn: 'Survived',
    uniqueClasses: 2,
    classImbalance: 'Mild',
  },
  classDistribution: [
    { name: 'Died (0)', value: 549, pct: 61.6 },
    { name: 'Survived (1)', value: 342, pct: 38.4 },
  ],
  preview: {
    columns: ['PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age', 'Fare', 'Embarked'],
    rows: [
      { PassengerId: 1, Survived: 0, Pclass: 3, Name: 'Braund, Mr. Owen Harris', Sex: 'male', Age: 22.0, Fare: 7.25, Embarked: 'S' },
      { PassengerId: 2, Survived: 1, Pclass: 1, Name: 'Cumings, Mrs. John Bradley', Sex: 'female', Age: 38.0, Fare: 71.28, Embarked: 'C' },
      { PassengerId: 3, Survived: 1, Pclass: 3, Name: 'Heikkinen, Miss. Laina', Sex: 'female', Age: 26.0, Fare: 7.92, Embarked: 'S' },
      { PassengerId: 4, Survived: 1, Pclass: 1, Name: 'Futrelle, Mrs. Jacques Heath', Sex: 'female', Age: 35.0, Fare: 53.1, Embarked: 'S' },
      { PassengerId: 5, Survived: 0, Pclass: 3, Name: 'Allen, Mr. William Henry', Sex: 'male', Age: 35.0, Fare: 8.05, Embarked: 'S' },
    ],
  },
}
