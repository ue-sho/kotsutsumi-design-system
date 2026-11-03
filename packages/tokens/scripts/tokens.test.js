import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const definitions = new Map();
async function collect(directory) {
  for (const file of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, file.name);
    if (file.isDirectory()) await collect(path);
    else if (file.name.endsWith('.json')) {
      const flatten = (node, parts = []) => {
        if (Object.hasOwn(node, 'value')) {
          definitions.set(parts.join('.'), node.value);
        } else {
          for (const [key, value] of Object.entries(node)) {
            flatten(value, [...parts, key]);
          }
        }
      };
      flatten(JSON.parse(await readFile(path, 'utf8')));
    }
  }
}
await collect(fileURLToPath(new URL('../tokens/', import.meta.url)));

function resolve(name, seen = new Set()) {
  assert.ok(definitions.has(name), `Missing reference: ${name}`);
  assert.ok(!seen.has(name), `Circular reference: ${name}`);
  const value = definitions.get(name);
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (_, reference) =>
    resolve(reference, new Set([...seen, name])),
  );
}
function luminance(hex) {
  assert.match(hex, /^#[\da-f]{6}$/i);
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((pair) => {
      const channel = Number.parseInt(pair, 16) / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(foreground, background) {
  const a = luminance(resolve(`color.semantic.${foreground}`));
  const b = luminance(resolve(`color.semantic.${background}`));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test('every reference resolves; semantic colors reference primitives', () => {
  for (const [name, value] of definitions) {
    resolve(name);
    if (name.startsWith('color.semantic.')) {
      assert.match(value, /^\{color\.primitive\.[^}]+\}$/);
    }
  }
});
test('readable text, actions and focus on supported backgrounds', () => {
  for (const background of ['bg.base', 'bg.subtle', 'bg.accent-subtle']) {
    for (const foreground of [
      'text.primary',
      'text.secondary',
      'text.muted',
      'text.accent',
    ]) {
      assert.ok(
        contrast(foreground, background) >= 4.5,
        `${foreground} on ${background}`,
      );
    }
    for (const foreground of ['border.strong', 'border.focus']) {
      assert.ok(
        contrast(foreground, background) >= 3,
        `${foreground} on ${background}`,
      );
    }
  }
  for (const background of [
    'bg.accent',
    'bg.accent-hover',
    'bg.accent-active',
  ]) {
    assert.ok(
      contrast('text.inverse', background) >= 4.5,
      `text.inverse on ${background}`,
    );
  }
});
test('status text is readable on its matching background', () => {
  for (const status of ['success', 'warning', 'danger']) {
    assert.ok(
      contrast(`status.${status}`, `status.${status}-subtle`) >= 4.5,
      status,
    );
  }
});
