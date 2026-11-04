from __future__ import annotations

import json
import shutil
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path('/root/Kenn/projects/agentarium')
OUT = ROOT / 'assets/concept-art/agents'
PORTRAITS = OUT / 'portraits'
OUT.mkdir(parents=True, exist_ok=True)
PORTRAITS.mkdir(parents=True, exist_ok=True)

AGENTS = {
    'ultron': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000751_36697509.png'),
        'role': 'Steward', 'room': 'bridge',
        'prompt': 'Original collaborative Bridge steward; navy/cyan/amber command design.',
    },
    'nova': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000808_74a2e599.png'),
        'role': 'Market Intelligence', 'room': 'nova-room',
        'prompt': 'Curious evidence-driven research analyst; cyan/violet/silver design.',
    },
    'forge': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000802_85002cf8.png'),
        'role': 'Production', 'room': 'etsy-forge',
        'prompt': 'Reliable supervised craftsperson; dark steel, amber/orange, cyan design.',
    },
    'pixel': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000758_d5b1d29a.png'),
        'role': 'Graphic Artist', 'room': 'pixel-room',
        'prompt': 'Expressive visual creator; navy, magenta, violet, cyan design.',
    },
    'vibes': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000826_a1fe229d.png'),
        'role': 'Music Artist', 'room': 'vibes-room',
        'prompt': 'Warm rhythm-aware music specialist; purple, teal, amber design.',
    },
    'developer': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000938_cf2176c3.png'),
        'role': 'App Builder', 'room': 'developer-room',
        'prompt': 'Patient software engineer; slate, navy, blue, cyan design.',
    },
    'security': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000940_8e70db0b.png'),
        'role': 'Security Officer', 'room': 'security-room',
        'prompt': 'Calm non-aggressive protector; navy, blue shield, caution accents.',
    },
    'cipher': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000940_70738e73.png'),
        'role': 'Communications', 'room': 'communications-room',
        'prompt': 'Diplomatic signal-routing specialist; navy, green, cyan design.',
    },
    'governor': {
        'source': Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_000941_e1fe0683.png'),
        'role': 'Reviewer', 'room': 'governance-room',
        'prompt': 'Fair quality and policy reviewer; charcoal, violet, amber, cyan design.',
    },
}

BACKGROUND = (2, 8, 18, 255)

def normalize_square(source: Path, target: Path, size: int = 1024, margin: int = 36) -> None:
    image = Image.open(source).convert('RGBA')
    contained = ImageOps.contain(image, (size - 2 * margin, size - 2 * margin), Image.Resampling.NEAREST)
    canvas = Image.new('RGBA', (size, size), BACKGROUND)
    x = (size - contained.width) // 2
    y = (size - contained.height) // 2
    canvas.alpha_composite(contained, (x, y))
    canvas.convert('RGB').save(target, 'PNG', optimize=True)


def make_portrait(source: Path, target: Path, size: int = 512) -> None:
    image = Image.open(source).convert('RGB')
    # Center toward the upper body while preserving a square crop.
    portrait = ImageOps.fit(image, (size, size), Image.Resampling.NEAREST, centering=(0.5, 0.28))
    portrait.save(target, 'PNG', optimize=True)

for agent_id, spec in AGENTS.items():
    source = spec['source']
    if not source.exists():
        raise FileNotFoundError(source)
    normalize_square(source, OUT / f'{agent_id}.png')
    make_portrait(source, PORTRAITS / f'{agent_id}.png')

# Build a review contact sheet from the normalized full-body concepts.
cell = 512
label_h = 64
sheet = Image.new('RGB', (cell * 3, (cell + label_h) * 3), (2, 8, 18))
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 28)
    small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
except OSError:
    font = ImageFont.load_default()
    small = font

for index, (agent_id, spec) in enumerate(AGENTS.items()):
    row, col = divmod(index, 3)
    image = Image.open(OUT / f'{agent_id}.png').convert('RGB').resize((cell, cell), Image.Resampling.NEAREST)
    x, y = col * cell, row * (cell + label_h)
    sheet.paste(image, (x, y))
    draw.rectangle((x, y + cell, x + cell, y + cell + label_h), fill=(5, 16, 30))
    draw.text((x + 16, y + cell + 6), agent_id.upper(), fill=(235, 244, 255), font=font)
    draw.text((x + 190, y + cell + 13), str(spec['role']), fill=(90, 210, 235), font=small)

sheet.save(OUT / 'agent-roster-contact-sheet.png', 'PNG', optimize=True)

# Extend the machine-readable image prompt manifest with agent assets.
manifest_path = ROOT / 'docs/art/image-prompt-manifest.json'
manifest = json.loads(manifest_path.read_text())
assets = [asset for asset in manifest['assets'] if asset.get('kind') != 'agent_concept']
for agent_id, spec in AGENTS.items():
    assets.append({
        'id': agent_id,
        'kind': 'agent_concept',
        'title': agent_id.title(),
        'target': f'assets/concept-art/agents/{agent_id}.png',
        'portraitTarget': f'assets/concept-art/agents/portraits/{agent_id}.png',
        'aspect': 'square',
        'role': spec['role'],
        'homeRoom': spec['room'],
        'source': 'generated',
        'provider': 'openai-codex',
        'model': 'gpt-image-2-medium',
        'status': 'needs_review',
        'prompt': spec['prompt'],
        'referenceAssets': [
            'assets/concept-art/ship/ship-overview-cross-section.png',
            f"assets/concept-art/rooms/{spec['room']}.png",
        ],
    })
manifest['assets'] = assets
manifest['agentCharacterBible'] = (
    'High-detail 16-bit/SNES-inspired original synthetic collaborators; compact readable proportions; '
    'crisp hard pixels; deep navy ship materials; cyan/amber shared lighting; role-specific accent palette; '
    'full-body three-quarter pose; no text, logos, weapons, hostile posture, or franchise resemblance.'
)
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')

print(json.dumps({
    'agents': list(AGENTS),
    'fullBodyCount': len(list(OUT.glob('*.png'))) - 1,
    'portraitCount': len(list(PORTRAITS.glob('*.png'))),
    'contactSheet': str(OUT / 'agent-roster-contact-sheet.png'),
    'manifest': str(manifest_path),
}, indent=2))
