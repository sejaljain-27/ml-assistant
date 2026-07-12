import React from 'react'

export default function CorrelationHeatmap({ features, matrix }) {
  if (!features || !matrix || features.length === 0) return null

  // Helper to resolve cell background and text styling based on correlation coefficient
  const getCellStyle = (val) => {
    const absVal = Math.abs(val)
    if (val === 1) {
      return {
        bg: 'bg-primary text-primary-foreground font-semibold',
        valStr: '1.00',
      }
    }
    
    // Positive correlation (represented in coral/#D85A30 accents)
    if (val > 0) {
      return {
        bg: `bg-[#D85A30] text-white`,
        style: { backgroundColor: `rgba(216, 90, 48, ${val.toFixed(2)})` },
        valStr: val.toFixed(2),
        textClass: absVal > 0.4 ? 'text-white' : 'text-slate-200'
      }
    }
    
    // Negative correlation (represented in neutral/dark theme accents)
    return {
      bg: `bg-accent text-accent-foreground`,
      style: { backgroundColor: `rgba(42, 42, 42, ${absVal.toFixed(2)})` },
      valStr: val.toFixed(2),
      textClass: absVal > 0.4 ? 'text-white' : 'text-slate-300'
    }
  }

  return (
    <div className="w-full overflow-x-auto mt-2">
      <div className="min-w-[460px] p-2">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-20 text-[10px] uppercase font-bold text-slate-500 text-left pb-2">Feature</th>
              {features.map((feat) => (
                <th 
                  key={feat} 
                  className="text-[9px] uppercase font-bold text-slate-500 text-center pb-2 truncate"
                  title={feat}
                >
                  {feat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((rowFeat, rowIdx) => (
              <tr key={rowFeat} className="border-b-[0.5px] border-surface-border/40 last:border-0">
                <td className="text-xs font-semibold text-slate-300 py-2.5 truncate" title={rowFeat}>
                  {rowFeat}
                </td>
                {features.map((colFeat, colIdx) => {
                  const val = matrix[rowIdx][colIdx]
                  const { bg, style, valStr, textClass } = getCellStyle(val)
                  return (
                    <td 
                      key={colFeat} 
                      className="p-1"
                    >
                      <div 
                        style={style}
                        className={`h-9 w-full rounded-md flex items-center justify-center text-[10px] font-mono border-[0.5px] border-surface-border/20 ${bg} ${textClass}`}
                        title={`${rowFeat} vs ${colFeat}: ${val}`}
                      >
                        {valStr}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
