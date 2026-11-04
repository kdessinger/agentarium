import { useEffect, useRef, type MouseEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'

export function AgentariumTitleScreen({ onEnter }: { onEnter: () => void }) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      if (event.key === 'Tab' || event.key === 'Shift') return
      if (event.repeat) return
      if (event.key === 'F12' || (event.key.length === 1 && event.ctrlKey)) return
      if (triggered.current) return
      triggered.current = true
      event.preventDefault()
      window.removeEventListener('keydown', handler)
      onEnter()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onEnter])

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (triggered.current) return
    triggered.current = true
    onEnter()
  }

  const handleButtonKey = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (triggered.current) return
      triggered.current = true
      onEnter()
    }
  }

  return (
    <main
      className="title-screen"
      aria-label="Agentarium title screen"
      onClick={handleClick}
    >
      <div className="title-screen__scanlines" aria-hidden="true" />
      <div className="title-screen__stars" aria-hidden="true" />
      <div className="title-screen__sun" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className="title-screen__horizon" aria-hidden="true" />
      <div className="title-screen__grid" aria-hidden="true" />

      <header className="title-screen__top-bar" aria-hidden="true">
        <span>SYS//A-17</span>
        <span className="title-screen__online"><b /> NEURAL LINK: ONLINE</span>
        <span>BUILD 2086.01</span>
      </header>

      <section className="title-screen__hero">
        <div className="title-screen__lockup">
          <h1 data-text="AGENTARIUM">AGENTARIUM</h1>
          <div className="title-screen__eyebrow">
            <span className="title-screen__eyebrow-rule" aria-hidden="true" />
            <span className="title-screen__eyebrow-copy">GAMIFIED AI AGENT COMMAND SYSTEM</span>
            <span className="title-screen__eyebrow-rule" aria-hidden="true" />
          </div>
        </div>
        <p className="title-screen__tagline">COMMAND THE UNKNOWN</p>
        <div className="title-screen__command-panel">
          <span className="title-screen__panel-corner title-screen__panel-corner--tl" aria-hidden="true" />
          <button
            ref={buttonRef}
            type="button"
            className="title-screen__begin"
            aria-label="Begin Agentarium commissioning"
            onClick={(event) => { event.stopPropagation(); handleClick(event) }}
            onKeyDown={handleButtonKey}
          >
            PRESS ANY KEY TO BEGIN
          </button>
          <span className="title-screen__panel-corner title-screen__panel-corner--tr" aria-hidden="true" />
          <span className="title-screen__panel-corner title-screen__panel-corner--bl" aria-hidden="true" />
          <span className="title-screen__panel-corner title-screen__panel-corner--br" aria-hidden="true" />
        </div>
      </section>

      <aside className="title-screen__terminal title-screen__terminal--left" aria-hidden="true">
        <div className="title-screen__terminal-head"><b>AGENT SCAN</b><span>///</span></div>
        <div className="title-screen__agent-roster">
          <div className="title-screen__pixel-agent title-screen__pixel-agent--cyan"><i className="title-screen__agent-head" /><i className="title-screen__agent-body" /></div>
          <div className="title-screen__pixel-agent title-screen__pixel-agent--pink"><i className="title-screen__agent-head" /><i className="title-screen__agent-body" /></div>
          <div className="title-screen__pixel-agent title-screen__pixel-agent--lime"><i className="title-screen__agent-head" /><i className="title-screen__agent-body" /></div>
          <div className="title-screen__pixel-agent title-screen__pixel-agent--gold"><i className="title-screen__agent-head" /><i className="title-screen__agent-body" /></div>
          <div className="title-screen__pixel-agent title-screen__pixel-agent--violet"><i className="title-screen__agent-head" /><i className="title-screen__agent-body" /></div>
        </div>
        <p>CREW MEMBERS <strong>14</strong></p>
        <div className="title-screen__bars"><i /><i /><i /><i /></div>
      </aside>

      <aside className="title-screen__terminal title-screen__terminal--right" aria-hidden="true">
        <div className="title-screen__terminal-head"><b>UPLINK</b><span>///</span></div>
        <div className="title-screen__wave"><span>▁▂▃▅▇▆▄▂&nbsp;▁▃▆▇▅▃▂</span></div>
        <p>FABLE <strong>88% USED</strong></p>
        <p>ASTRA <strong>17% USED</strong></p>
        <div className="title-screen__progress"><i /></div>
      </aside>

      <footer className="title-screen__footer" aria-hidden="true">
        <span>© 2086 AGENTARIUM INDUSTRIES</span>
        <span>INSERT CREDITS · 00</span>
      </footer>
      <div className="title-screen__boot" aria-hidden="true">SYSTEM INITIALIZED</div>
    </main>
  )
}
