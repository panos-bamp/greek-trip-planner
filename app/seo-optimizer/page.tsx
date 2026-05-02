'use client'

import { useState } from 'react'
import SEOOptimizer from './SEOOptimizer'
import SEOBatchOptimizer from './SEOBatchOptimizer'

export default function Page() {
  const [mode, setMode] = useState<'single' | 'batch'>('single')

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', gap: '8px', padding: '10px 16px', borderBottom: '0.5px solid #E6DAD1', background: '#FAF6F3' }}>
        <button
          onClick={() => setMode('single')}
          style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid #E6DAD1', cursor: 'pointer', fontSize: '13px', fontWeight: mode === 'single' ? '600' : '400', background: mode === 'single' ? '#180204' : 'white', color: mode === 'single' ? 'white' : '#180204' }}
        >
          Single article
        </button>
        <button
          onClick={() => setMode('batch')}
          style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid #E6DAD1', cursor: 'pointer', fontSize: '13px', fontWeight: mode === 'batch' ? '600' : '400', background: mode === 'batch' ? '#180204' : 'white', color: mode === 'batch' ? 'white' : '#180204' }}
        >
          Batch mode
        </button>
      </div>
      {mode === 'single' ? <SEOOptimizer /> : <SEOBatchOptimizer />}
    </div>
  )
}
