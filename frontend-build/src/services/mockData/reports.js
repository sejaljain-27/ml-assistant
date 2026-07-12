// Mirrors `GET /api/reports`
export const reports = {
  generatedAt: '2026-07-11T10:30:00Z',
  available: [
    {
      id: 'pdf-report',
      title: 'Comprehensive PDF Report',
      description: 'Detailed analysis with charts and recommendations.',
      format: 'PDF',
      icon: 'file-text',
    },
    {
      id: 'csv-summary',
      title: 'CSV Summary Report',
      description: 'Tabular summary of all analysis results.',
      format: 'CSV',
      icon: 'file-spreadsheet',
    },
  ],
  preview: {
    healthScore: 84,
    missingPct: 18.27,
    topFeatures: ['Sex', 'Fare', 'Pclass', 'Age', 'Embarked'],
  },
}
