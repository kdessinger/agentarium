#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '../..');
const galleryPath = path.join(projectRoot, 'docs/art/concept-art-gallery.html');
const gallery = fs.readFileSync(galleryPath, 'utf8');
const imageTags = [...gallery.matchAll(/<img\s+src="([^"]+)"\s+alt="([^"]+)">/g)];
const anchorTags = [...gallery.matchAll(/<a\s+href="([^"]+)"><img\s+src="([^"]+)"/g)];

assert.ok(imageTags.length > 0, 'Gallery must contain image cards.');
assert.equal(anchorTags.length, imageTags.length, 'Every gallery image must have a matching click-through link.');
assert.doesNotMatch(gallery, /(?:src|href)="\.\.\/\.\.\/assets\/concept-art\//, 'Gallery must not use relative static asset URLs.');

for (const [index, match] of imageTags.entries()) {
  const [, source, alt] = match;
  assert.match(source, /^\/assets\/concept-art\/.+\.png$/, `${alt} must use the public concept-art asset route.`);
  const absoluteAssetPath = path.join(projectRoot, 'assets/concept-art', source.replace('/assets/concept-art/', ''));
  assert.ok(fs.existsSync(absoluteAssetPath), `${alt} must reference an existing asset: ${absoluteAssetPath}`);
  assert.equal(anchorTags[index][1], source, `${alt} thumbnail and click-through URLs must match.`);
}

console.log(`CONCEPT_ART_GALLERY_OK cards=${imageTags.length}`);
