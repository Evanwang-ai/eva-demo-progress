const TABLE = 'eva_demo_comments';
const REPLIES_TABLE = 'eva_demo_comment_replies';
const STATUSES = new Set(['open', 'approved', 'doing']);
const KINDS = new Set(['copy', 'ui', 'rebuild', 'function']);

function createNonce() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, token => {
    const value = Math.floor(Math.random() * 16);
    return (token === 'x' ? value : (value & 0x3) | 0x8).toString(16);
  });
}

function validateComment(comment) {
  const name = String(comment.author_name || '').trim();
  const body = String(comment.body || '').trim();
  if (name.length < 2) throw new Error('姓名至少两个字');
  if (name.length > 40) throw new Error('姓名不能超过 40 个字');
  if (!body) throw new Error('请填写意见');
  if (body.length > 2000) throw new Error('意见不能超过 2000 个字');
  const kind = comment.kind || 'function';
  if (!KINDS.has(kind)) throw new Error('不支持的修改类型');
  return { ...comment, author_name: name, body, kind };
}

function validateReply(reply) {
  return validateComment({ ...reply, page_path: '#', anchor: {} });
}

export function createCommentsStore({ url, key, fetchImpl = fetch }) {
  if (!url || !key) throw new Error('Supabase Comments 配置缺失');
  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/${TABLE}`;
  const repliesEndpoint = `${url.replace(/\/$/, '')}/rest/v1/${REPLIES_TABLE}`;
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
  async function request(target, options) {
    const response = await fetchImpl(target, { ...options, headers: { ...headers, ...(options?.headers || {}) } });
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new Error(payload?.message || `Comments 请求失败（${response.status}）`);
    return payload;
  }
  return {
    async list(pagePath) {
      const query = new URLSearchParams({
        select: 'id,seq,page_path,anchor,author_name,body,kind,status,created_at,updated_at,replies:eva_demo_comment_replies(id,author_name,body,created_at)',
        page_path: `eq.${pagePath}`,
        order: 'created_at.desc',
      });
      return request(`${endpoint}?${query}`, { method: 'GET' });
    },
    async create(comment) {
      const valid = validateComment(comment);
      const rows = await request(endpoint, {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({
          client_nonce: valid.client_nonce || createNonce(),
          page_path: valid.page_path,
          anchor: valid.anchor || {},
          author_name: valid.author_name,
          body: valid.body,
          kind: valid.kind,
          status: 'open',
        }),
      });
      return rows[0];
    },
    async updateStatus(id, status) {
      if (!STATUSES.has(status)) throw new Error('不支持的批注状态');
      const query = new URLSearchParams({ id: `eq.${id}` });
      const rows = await request(`${endpoint}?${query}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ status }),
      });
      if (!rows[0]) throw new Error('批注不存在或没有更新权限');
      return rows[0];
    },
    async addReply(commentId, reply) {
      const valid = validateReply(reply);
      const rows = await request(repliesEndpoint, {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({
          comment_id: commentId,
          author_name: valid.author_name,
          body: valid.body,
        }),
      });
      return rows[0];
    },
  };
}
