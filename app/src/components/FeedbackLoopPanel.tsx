import { useState } from 'react'
import type { FeedbackLoopState } from '../lib/feedbackLoop'

type Props = { loop: FeedbackLoopState }

export function FeedbackLoopPanel({ loop }: Props) {
  const [expanded, setExpanded] = useState(false)
  const currentStage = loop.stages.find((stage) => stage.id === loop.currentStageId)!

  return <aside className={`feedback-loop-panel ${expanded ? 'expanded' : 'collapsed'}`} aria-label="Closed-loop business feedback system">
    <button
      className="feedback-loop-toggle"
      type="button"
      aria-expanded={expanded}
      aria-label={expanded ? 'Close closed-loop Forge details' : 'Open closed-loop Forge details'}
      onClick={() => setExpanded((value) => !value)}
    >
      <span className="loop-toggle-icon" aria-hidden="true">↺</span>
      <span className="loop-toggle-copy"><strong>Forge loop</strong><small>{currentStage.label} · {currentStage.status.replaceAll('_', ' ')}</small></span>
      <span className="loop-toggle-action">{expanded ? 'Close' : 'View loop'}</span>
    </button>

    {expanded && <div className="feedback-loop-details">
      <header>
        <div>
          <span className="eyebrow">Closed-loop Forge</span>
          <h2>Evidence must return upstream</h2>
        </div>
        <span className={`learning-status ${loop.learning.status}`}>{loop.learning.status.replaceAll('_', ' ')}</span>
      </header>
      <ol className="feedback-loop-stages">
        {loop.stages.map((stage, index) => <li key={stage.id} className={`${stage.status} ${stage.id === loop.currentStageId ? 'current' : ''}`}>
          <span className="loop-order">{index + 1}</span>
          <div><strong>{stage.label}</strong><small>{stage.roomLabel}</small></div>
          <em>{stage.status.replaceAll('_', ' ')}</em>
          <p>{stage.detail}</p>
        </li>)}
      </ol>
      <footer>
        <span className="loop-return" aria-hidden="true">↺</span>
        <p><strong>Learning return:</strong> {loop.learning.detail}</p>
      </footer>
    </div>}
  </aside>
}
