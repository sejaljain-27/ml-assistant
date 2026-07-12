// Mirrors `GET /api/preprocessing/recommendations`
export const preprocessing = {
  steps: [
    {
      id: 'impute-age',
      title: 'Impute missing Age values',
      description: 'Fill missing values using median age grouped by Pclass and Sex.',
      priority: 'High',
      column: 'Age',
    },
    {
      id: 'drop-cabin',
      title: 'Handle Cabin sparsity',
      description: 'Cabin is 77.1% missing — drop it or engineer a "HasCabin" boolean flag.',
      priority: 'High',
      column: 'Cabin',
    },
    {
      id: 'impute-embarked',
      title: 'Impute missing Embarked values',
      description: 'Fill the 2 missing rows with the most frequent port of embarkation.',
      priority: 'Low',
      column: 'Embarked',
    },
    {
      id: 'encode-categorical',
      title: 'Encode categorical features',
      description: 'One-hot encode Sex and Embarked before feeding models.',
      priority: 'Medium',
      column: 'Sex, Embarked',
    },
    {
      id: 'scale-numeric',
      title: 'Scale numeric features',
      description: 'Standardize Age and Fare — both are on very different scales.',
      priority: 'Medium',
      column: 'Age, Fare',
    },
  ],
  outliers: [
    { column: 'Fare', count: 116, method: 'IQR' },
    { column: 'Age', count: 11, method: 'IQR' },
  ],
}
