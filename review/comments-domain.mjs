export const COMMENT_STATUSES = ['open', 'approved', 'doing'];

export function normalizeStatus(status) {
  return COMMENT_STATUSES.includes(status) ? status : 'open';
}

export function isVisiblePin(row, pagePath, mode = 'all') {
  if (row.page_path !== pagePath || mode === 'off') return false;
  if (mode === 'approved') return normalizeStatus(row.status) === 'approved';
  return true;
}

export function buildAnchorRecord(snapshot = {}) {
  const clamp = value => Math.max(0, Math.min(1, Number.isFinite(Number(value)) ? Number(value) : 0.5));
  return {
    version: 1,
    page: String(snapshot.page || ''),
    selector: String(snapshot.selector || ''),
    anchorId: String(snapshot.anchorId || ''),
    quote: String(snapshot.quote || ''),
    target: {
      tag: String(snapshot.tag || ''),
      role: String(snapshot.role || ''),
      label: String(snapshot.label || ''),
      placeholder: String(snapshot.placeholder || ''),
      inputType: String(snapshot.inputType || ''),
      heading: String(snapshot.heading || ''),
    },
    point: { rx: clamp(snapshot.rx), ry: clamp(snapshot.ry) },
  };
}
