import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { resolvePublicAsset } from '../lib/presentation'
import type { AgentDefinition, CommissioningDraft, InstallationMode } from '../lib/commissioning'

const ORCHESTRATOR_PERSONALITIES = [
  'Professional',
  'Empathetic / Friendly',
  'Direct / Blunt',
  'Witty / Funny',
  'Technical / Scientific',
  'Bold',
] as const

export type OrchestratorPersonality = typeof ORCHESTRATOR_PERSONALITIES[number]
export type OrchestratorWorkingStyle = 'Supervised' | 'Trusted' | 'Custom'

type Provider = {
  id: string
  name: string
  mark: string
  method: 'OAuth connector' | 'API key connector' | 'Local runtime'
  note: string
  tone: string
}

const PROVIDERS: Provider[] = [
  { id: 'openai', name: 'OpenAI', mark: '◎', method: 'OAuth connector', note: 'ChatGPT sign-in or API key', tone: '#74d8b0' },
  { id: 'anthropic', name: 'Anthropic', mark: 'A', method: 'API key connector', note: 'Claude models', tone: '#d9a77c' },
  { id: 'openrouter', name: 'OpenRouter', mark: '↗', method: 'API key connector', note: 'Multi-provider model catalog', tone: '#c9d5ea' },
  { id: 'gemini', name: 'Google Gemini', mark: '✦', method: 'API key connector', note: 'Google AI models', tone: '#7fb5ff' },
  { id: 'xai', name: 'xAI', mark: 'X', method: 'API key connector', note: 'Grok models', tone: '#eef4f6' },
  { id: 'kimi', name: 'Kimi', mark: 'K', method: 'OAuth connector', note: 'Account sign-in', tone: '#9daeff' },
  { id: 'groq', name: 'Groq', mark: 'G', method: 'API key connector', note: 'Fast hosted inference', tone: '#f28a5b' },
  { id: 'mistral', name: 'Mistral', mark: 'M', method: 'API key connector', note: 'Hosted Mistral models', tone: '#ff9f43' },
  { id: 'deepseek', name: 'DeepSeek', mark: 'D', method: 'API key connector', note: 'Hosted DeepSeek models', tone: '#7698ff' },
  { id: 'ollama', name: 'Ollama', mark: '◒', method: 'Local runtime', note: 'Free · runs on your machine', tone: '#f4f6f7' },
  { id: 'lmstudio', name: 'LM Studio', mark: 'LM', method: 'Local runtime', note: 'Local OpenAI-compatible server', tone: '#b799ff' },
  { id: 'custom', name: 'Custom endpoint', mark: '{ }', method: 'API key connector', note: 'OpenAI-compatible endpoint', tone: '#67dce8' },
]

const APPEARANCES = [
  { id: 'ultron', label: 'Navigator', src: '/concept-art/agents/portraits/ultron.png' },
  { id: 'security', label: 'Sentinel', src: '/concept-art/agents/portraits/security.png' },
  { id: 'developer', label: 'Architect', src: '/concept-art/agents/portraits/developer.png' },
  { id: 'nova', label: 'Analyst', src: '/concept-art/agents/portraits/nova.png' },
  { id: 'governor', label: 'Diplomat', src: '/concept-art/agents/portraits/governor.png' },
  { id: 'cipher', label: 'Signal', src: '/concept-art/agents/portraits/cipher.png' },
  { id: 'pixel', label: 'Artisan', src: '/concept-art/agents/portraits/pixel.png' },
  { id: 'vibes', label: 'Maestro', src: '/concept-art/agents/portraits/vibes.png' },
]

const APPEARANCES_PER_PAGE = 4

const ATMOSPHERES = [
  { id: 'cyan', label: 'Cyan', color: '#55d9e8' },
  { id: 'emerald', label: 'Emerald', color: '#74d39c' },
  { id: 'amber', label: 'Amber', color: '#f3b35a' },
  { id: 'violet', label: 'Violet', color: '#aa8cff' },
  { id: 'crimson', label: 'Crimson', color: '#ff7777' },
  { id: 'mono', label: 'Monochrome', color: '#e8f2f4' },
]

const PERSONALITY_LINES: Record<OrchestratorPersonality, string> = {
  Professional: 'Objective received. I’ll coordinate the work and keep every decision inspectable.',
  'Empathetic / Friendly': 'We’ll build this together. I’ll keep the crew moving without taking control away from you.',
  'Direct / Blunt': 'Give me the objective. I’ll route the work and escalate what matters.',
  'Witty / Funny': 'You bring the mission. I’ll bring the crew—and keep the chaos on a short leash.',
  'Technical / Scientific': 'I’ll decompose the objective, test assumptions, and preserve evidence through every handoff.',
  Bold: 'Point me at the mission. I’ll create momentum while respecting every hard boundary.',
}

type Props = {
  draft: CommissioningDraft
  activeWorldName: string | undefined
  onCancel: (() => void) | undefined
  onAgents: (agents: AgentDefinition[]) => void
  onMode: (mode: InstallationMode) => void
  onContinue: () => void
  onRestore: (file: File) => Promise<void>
}

export function OrchestratorSetup({ draft, activeWorldName, onCancel, onAgents, onMode, onContinue, onRestore }: Props) {
  const [tab, setTab] = useState<'orchestrator' | 'intelligence'>('orchestrator')
  const [provider, setProvider] = useState<Provider | null>(null)
  const [atmosphere, setAtmosphere] = useState('cyan')
  const [scanlines, setScanlines] = useState(true)
  const [effects, setEffects] = useState(true)
  const [appearancePage, setAppearancePage] = useState(() => Math.floor(APPEARANCES.findIndex((item) => item.id === (draft.agents.find((agent) => agent.id === 'ultron') ?? draft.agents[0])?.avatarId) / APPEARANCES_PER_PAGE) || 0)
  const [restoreError, setRestoreError] = useState('')
  const restoreRef = useRef<HTMLInputElement>(null)
  const orchestrator = draft.agents.find((agent) => agent.id === 'ultron') ?? draft.agents[0]
  const personality = (orchestrator.personality as OrchestratorPersonality | undefined) ?? 'Professional'
  const workingStyle = (orchestrator.workingStyle as OrchestratorWorkingStyle | undefined) ?? 'Supervised'
  const appearanceId = orchestrator.avatarId ?? 'ultron'
  const appearance = APPEARANCES.find((item) => item.id === appearanceId) ?? APPEARANCES[0]
  const appearancePageCount = Math.ceil(APPEARANCES.length / APPEARANCES_PER_PAGE)
  const visibleAppearances = APPEARANCES.slice(appearancePage * APPEARANCES_PER_PAGE, (appearancePage + 1) * APPEARANCES_PER_PAGE)
  const accent = ATMOSPHERES.find((item) => item.id === atmosphere)?.color ?? ATMOSPHERES[0].color

  const updateOrchestrator = (patch: Partial<AgentDefinition>) => {
    onAgents(draft.agents.map((agent) => agent.id === orchestrator.id ? { ...agent, ...patch } : agent))
  }

  const styleAutonomy = (style: OrchestratorWorkingStyle): AgentDefinition['autonomy'] => {
    if (style === 'Trusted') return 'trusted'
    return 'supervised'
  }

  const providerStatus = useMemo(() => provider ? `${provider.method} · setup required` : 'No provider selected', [provider])

  return <main className={`orchestrator-setup atmosphere-${atmosphere} ${scanlines ? 'has-scanlines' : ''} ${effects ? 'has-effects' : ''}`} style={{ '--setup-accent': accent } as CSSProperties}>
    <header className="setup-header">
      <div className="setup-brand"><span>A</span><div><strong>AGENTARIUM</strong><small>INITIAL COMMISSIONING</small></div></div>
      <div className="setup-journey" aria-label="Setup journey"><b>01 <span>Create your Orchestrator</span></b><span>02 <em>Bring the system online</em></span><span>03 <em>Launch your first mission</em></span></div>
      <fieldset className="atmosphere-picker" aria-label="Interface atmosphere"><legend>Atmosphere</legend>{ATMOSPHERES.map((item) => <button key={item.id} type="button" aria-label={item.label} aria-pressed={atmosphere === item.id} style={{ '--swatch': item.color } as CSSProperties} onClick={() => setAtmosphere(item.id)} />)}</fieldset>
    </header>

    <section className="setup-title-row">
      <div><span className="eyebrow">Your first agent</span><h1>Create Your Orchestrator</h1><p>One agent coordinates your world. Build the rest of your crew from here.</p></div>
      <div className="setup-quick-actions"><label><input aria-label="CRT scanlines" type="checkbox" checked={scanlines} onChange={(event) => setScanlines(event.target.checked)} /> CRT</label><label><input aria-label="Ambient effects" type="checkbox" checked={effects} onChange={(event) => setEffects(event.target.checked)} /> Effects</label></div>
    </section>

    {activeWorldName && <div className="setup-active-world"><span><strong>Recommissioning draft</strong> Active: {activeWorldName} · Draft: {draft.worldName}. The active world remains untouched until final approval.</span>{onCancel && <button type="button" onClick={onCancel}>Return to active world</button>}</div>}

    <div className="setup-tabs" role="tablist" aria-label="Orchestrator setup sections">
      <button type="button" role="tab" aria-selected={tab === 'orchestrator'} onClick={() => setTab('orchestrator')}>01 Your Orchestrator</button>
      <button type="button" role="tab" aria-selected={tab === 'intelligence'} onClick={() => setTab('intelligence')}>02 Connect Intelligence</button>
    </div>

    <section className="setup-workspace">
      <aside className="orchestrator-preview">
        <span className="eyebrow">Orchestrator · The Bridge</span>
        <div className="orchestrator-portrait"><img src={resolvePublicAsset(appearance.src)} alt={`${appearance.label} Orchestrator appearance`} /></div>
        <h2>{orchestrator.name || 'Ultron'}</h2>
        <p>{personality} · {workingStyle}</p>
        <blockquote>“{PERSONALITY_LINES[personality]}”</blockquote>
        <div className="appearance-heading"><strong>Appearance</strong><span>{APPEARANCES.length} included · {appearancePage + 1} / {appearancePageCount}</span></div>
        <div className="appearance-carousel" role="group" aria-label="Orchestrator appearance selector">
          <button type="button" className="appearance-page-control" aria-label="Previous appearance page" disabled={appearancePage === 0} onClick={() => setAppearancePage((page) => Math.max(0, page - 1))}>←</button>
          <div className="appearance-grid">{visibleAppearances.map((item) => <button type="button" key={item.id} aria-label={`${item.label} appearance`} aria-pressed={appearanceId === item.id} onClick={() => updateOrchestrator({ avatarId: item.id })}><img src={resolvePublicAsset(item.src)} alt="" /><span>{item.label}</span></button>)}</div>
          <button type="button" className="appearance-page-control" aria-label="Next appearance page" disabled={appearancePage >= appearancePageCount - 1} onClick={() => setAppearancePage((page) => Math.min(appearancePageCount - 1, page + 1))}>→</button>
        </div>
      </aside>

      <div className="setup-panel">
        {tab === 'orchestrator' && <div className="orchestrator-form">
          <label className="orchestrator-name"><span>Name <small>Optional</small></span><input value={orchestrator.name} maxLength={24} placeholder="Ultron" onChange={(event) => updateOrchestrator({ name: event.target.value })} /><em>{orchestrator.name.length} / 24</em></label>

          <section><header><h3>Personality</h3><p>How your Orchestrator talks to you. You can change this later.</p></header><div className="personality-grid">{ORCHESTRATOR_PERSONALITIES.map((item) => <button type="button" key={item} aria-pressed={personality === item} onClick={() => updateOrchestrator({ personality: item })}>{item}</button>)}</div></section>

          <section><header><h3>Working style</h3><p>Choose when your Orchestrator should stop and ask.</p></header><div className="working-style-grid">
            <button type="button" aria-pressed={workingStyle === 'Supervised'} onClick={() => updateOrchestrator({ workingStyle: 'Supervised', autonomy: styleAutonomy('Supervised') })}><strong>Supervised <span>Recommended</span></strong><small>Plans and drafts freely. Asks before tools change anything or communicate externally.</small></button>
            <button type="button" aria-pressed={workingStyle === 'Trusted'} onClick={() => updateOrchestrator({ workingStyle: 'Trusted', autonomy: styleAutonomy('Trusted') })}><strong>Trusted</strong><small>Handles routine work in approved spaces. Still asks before publishing, spending, deletion, or external changes.</small></button>
            <button type="button" aria-pressed={workingStyle === 'Custom'} onClick={() => updateOrchestrator({ workingStyle: 'Custom', autonomy: styleAutonomy('Custom') })}><strong>Custom</strong><small>Keep supervised defaults now, then review exact permissions before activation.</small></button>
          </div></section>

          <div className="authority-summary"><span className="eyebrow">Safe starting authority</span><p>May organize plans and coordinate active specialists. Must ask before external actions, publishing, spending, credential use, or deletion.</p></div>
        </div>}

        {tab === 'intelligence' && !provider && <div className="provider-catalog"><header><span className="eyebrow">Replaceable adapter boundary</span><h2>Choose an intelligence provider</h2><p>Select a hosted account, API provider, or local runtime. Connections are configured inside this panel without leaving setup.</p></header><div className="provider-grid">{PROVIDERS.map((item) => <button type="button" key={item.id} aria-label={`${item.name} — ${item.note}`} onClick={() => setProvider(item)}><i style={{ '--provider-tone': item.tone } as CSSProperties}>{item.mark}</i><span><strong>{item.name}</strong><small>{item.note}</small></span><em>›</em></button>)}</div><p className="provider-honesty">No provider is connected by default. Agentarium will never mark a connection ready until credentials or a local endpoint have been validated.</p></div>}

        {tab === 'intelligence' && provider && <div className="provider-detail"><button type="button" className="provider-back" onClick={() => setProvider(null)}>← <span>All providers</span></button><header><i style={{ '--provider-tone': provider.tone } as CSSProperties}>{provider.mark}</i><div><span className="eyebrow">{provider.method}</span><h2>{provider.name}</h2><p>{provider.note}</p></div></header><div className="connection-state"><span>Not connected</span><strong>{providerStatus}</strong><p>This browser prototype does not store provider secrets or perform OAuth. A dedicated secure connector must be installed before this provider can be validated.</p><button type="button" disabled>{provider.method === 'OAuth connector' ? `Sign in with ${provider.name}` : provider.method === 'Local runtime' ? 'Detect local runtime' : 'Enter API key securely'}</button></div><section className="connection-facts"><h3>What the real connector must verify</h3><ul><li>The provider identity and exact destination</li><li>Credential or local endpoint validity</li><li>Models actually available to this account</li><li>Cost, privacy, and data-retention terms</li></ul></section></div>}
      </div>
    </section>

    <footer className="setup-footer">
      <div className="restore-actions"><button type="button" onClick={() => restoreRef.current?.click()}>↥ Restore Agentarium</button><input ref={restoreRef} hidden type="file" accept="application/json" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { await onRestore(file); setRestoreError('') } catch (error) { setRestoreError(error instanceof Error ? error.message : 'This backup could not be restored') } }} />{restoreError && <span role="alert">{restoreError}</span>}</div>
      <div className="mode-shortcut"><span>{draft.installationMode === 'demo' ? 'Demo selected · synthetic and isolated' : 'Standard · clean workspace'}</span><button type="button" onClick={() => onMode(draft.installationMode === 'demo' ? 'standard' : 'demo')}>{draft.installationMode === 'demo' ? 'Use Standard Setup' : 'Explore Demo World'}</button></div>
      <div className="setup-next">{tab === 'orchestrator' ? <button type="button" onClick={() => setTab('intelligence')}>Continue to Intelligence →</button> : <button type="button" onClick={onContinue}>Continue without connection →</button>}</div>
    </footer>
  </main>
}
