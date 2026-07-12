export default function DataTable({ columns, rows, renderCell }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-surface-border">
      <table className="w-full min-w-max text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-panel/60">
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              className="border-b border-surface-border/60 last:border-0 hover:bg-surface-panel/40"
            >
              {columns.map((col) => (
                <td key={col.key} className="whitespace-nowrap px-4 py-3 text-slate-300">
                  {renderCell ? renderCell(row, col) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
