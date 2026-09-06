import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../review/comments.js', import.meta.url), 'utf8');

test('review comments use an independent hidden launcher instead of Eva feedback UI', () => {
  assert.match(source, /data-review-launcher/);
  assert.doesNotMatch(source, /label === ['"]反馈问题['"]/);
  assert.match(source, /<aside[^>]*class="eva-review-panel"[^>]*hidden[^>]*aria-label="原型批注"/);
  assert.match(source, /role="radiogroup"[^>]*aria-label="页面批注显示"/);
  assert.match(source, /全部查看[\s\S]*仅已确认[\s\S]*关闭批注/);
  assert.match(source, /class="eva-review-picker-shield"/);
  assert.match(source, /document\.elementFromPoint\(x, y\)/);
  assert.doesNotMatch(source, /stopImmediatePropagation/);
});
