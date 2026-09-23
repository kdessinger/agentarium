from pathlib import Path
import json
from PIL import Image, ImageOps

source = Path('/root/.hermes/cache/images/openai_codex_gpt-image-2-medium_20260824_010258_65c9a64d.png')
out = Path('/root/Kenn/projects/agentarium/assets/concept-art/world-templates')
out.mkdir(parents=True, exist_ok=True)

ids = [
    'modern-corporate-office', 'space-station',
    'spaceship', 'cruise-ship',
    'underground-bunker', 'skyscraper',
    'resort', 'sky-ship',
    'battleship', 'custom-theme',
]

image = Image.open(source).convert('RGB')
width, height = image.size
for index, template_id in enumerate(ids):
    row, col = divmod(index, 2)
    x1 = round(col * width / 2)
    x2 = round((col + 1) * width / 2)
    y1 = round(row * height / 5)
    y2 = round((row + 1) * height / 5)
    panel = image.crop((x1 + 8, y1 + 7, x2 - 8, y2 - 7))
    contained = ImageOps.contain(panel, (640, 360), Image.Resampling.LANCZOS)
    canvas = Image.new('RGB', (640, 360), (2, 8, 18))
    canvas.paste(contained, ((640 - contained.width) // 2, (360 - contained.height) // 2))
    canvas.save(out / f'{template_id}.png', 'PNG', optimize=True)

image.save(out / 'world-template-contact-sheet.png', 'PNG', optimize=True)

manifest_path = Path('/root/Kenn/projects/agentarium/docs/art/image-prompt-manifest.json')
manifest = json.loads(manifest_path.read_text())
assets = [asset for asset in manifest['assets'] if asset.get('kind') != 'world_template_preview']
labels = [
    'Modern Corporate Office', 'Space Station', 'Spaceship', 'Cruise Ship', 'Underground Bunker',
    'Skyscraper', 'Resort', 'Sky Ship', 'Battleship', 'Custom Theme',
]
for template_id, label in zip(ids, labels, strict=True):
    assets.append({
        'id': f'world-template-preview:{template_id}',
        'kind': 'world_template_preview',
        'title': f'{label} Representative Preview',
        'target': f'assets/concept-art/world-templates/{template_id}.png',
        'aspect': 'landscape',
        'source': 'generated',
        'provider': 'openai-codex',
        'model': 'gpt-image-2-medium',
        'status': 'approved_preview',
        'disclaimer': 'Representative concept only; each commissioned rendering is custom and unique.',
    })
manifest['assets'] = assets
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Wrote {len(ids)} previews to {out} and updated {manifest_path}')
