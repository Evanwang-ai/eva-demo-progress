import assert from 'node:assert/strict';
import test from 'node:test';

import { buildAnchorRecord, isVisiblePin, normalizeStatus } from '../review/comments-domain.mjs';

const rows = [
  { id: '1', status: 'open', page_path: '#/messages' },
  { id: '2', status: 'doing', page_path: '#/messages' },
  { id: '6', status: 'approved', page_path: '#/messages' },
  { id: '3', status: 'open', page_path: '#/contacts' },
];

test('page marker mode shows all, approved-only, or no comments', () => {
  assert.equal(isVisiblePin(rows[0], '#/messages', 'all'), true);
  assert.equal(isVisiblePin(rows[3], '#/messages', 'all'), false);
  assert.equal(isVisiblePin(rows[2], '#/messages', 'approved'), true);
  assert.equal(isVisiblePin(rows[0], '#/messages', 'approved'), false);
  assert.equal(isVisiblePin(rows[2], '#/messages', 'off'), false);
});

test('unknown persisted statuses fall back to open', () => {
  assert.equal(normalizeStatus('doing'), 'doing');
  assert.equal(normalizeStatus('approved'), 'approved');
  assert.equal(normalizeStatus('unexpected'), 'open');
});

test('anchor records preserve machine-readable context for a future AI handoff', () => {
  assert.deepEqual(buildAnchorRecord({
    page: '#/messages',
    selector: '[data-message-id="m1"]',
    anchorId: 'message-one',
    quote: '旧版文案',
    tag: 'button',
    role: 'button',
    label: '提交',
    placeholder: '',
    inputType: 'button',
    heading: '项目设置',
    rx: 1.2,
    ry: -1,
  }), {
    version: 1,
    page: '#/messages',
    selector: '[data-message-id="m1"]',
    anchorId: 'message-one',
    quote: '旧版文案',
    target: { tag: 'button', role: 'button', label: '提交', placeholder: '', inputType: 'button', heading: '项目设置' },
    point: { rx: 1, ry: 0 },
  });
});
