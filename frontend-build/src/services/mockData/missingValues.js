// Mirrors `GET /api/dataset/missing-values`
export const missingValues = {
  totalMissingPct: 18.27,
  totalCompletePct: 81.73,
  byColumn: [
    { column: 'Age', pct: 19.87 },
    { column: 'Cabin', pct: 77.1 },
    { column: 'Embarked', pct: 0.22 },
    { column: 'Fare', pct: 0.0 },
    { column: 'Name', pct: 0.0 },
    { column: 'Pclass', pct: 0.0 },
    { column: 'Sex', pct: 0.0 },
    { column: 'Ticket', pct: 0.0 },
    { column: 'PassengerId', pct: 0.0 },
  ],
  recommendation:
    "Consider imputing missing values in 'Age' with median and 'Cabin' with mode or using feature engineering.",
  challenges: [
    { type: 'Data Leakage Risk', severity: 'High', description: "Column 'PassengerId' has structural correlation with indexing, ensure it is omitted before training." },
    { type: 'High Cardinality', severity: 'Medium', description: "Column 'Cabin' has 147 unique categories. Consider frequency encoding or dropping the column." },
    { type: 'Class Imbalance', severity: 'Low', description: "Target column 'Survived' has a 60/40 class split. Standard stratification will suffice." }
  ],
}
