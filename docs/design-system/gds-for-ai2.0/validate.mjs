import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    fail(`${relativePath}: ${error.message}`);
    return {};
  }
}

function hasPath(object, dottedPath) {
  return dottedPath.split(".").every((segment, index, segments) => {
    object = index === 0 ? object?.[segment] : object?.[segment];
    return object !== undefined || index < segments.length - 1;
  }) && object !== undefined;
}

function walk(value, visit, currentPath = []) {
  visit(value, currentPath);
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visit, [...currentPath, String(index)]));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => walk(child, visit, [...currentPath, key]));
  }
}

function collectDtcgTokens(value, currentPath = [], result = new Set()) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  if (Object.prototype.hasOwnProperty.call(value, "$value")) {
    result.add(currentPath.join("."));
    return result;
  }
  for (const [key, child] of Object.entries(value)) {
    if (!key.startsWith("$")) collectDtcgTokens(child, [...currentPath, key], result);
  }
  return result;
}

function pngSize(relativePath) {
  const absolutePath = path.join(root, relativePath);
  const buffer = fs.readFileSync(absolutePath);
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") {
    fail(`${relativePath}: 不是有效 PNG`);
    return null;
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const tokens = readJson("tokens.json");
const dtcg = readJson("tokens.dtcg.json");
const contracts = readJson("components.json");

const dtcgTokenPaths = collectDtcgTokens(dtcg);
walk(dtcg, (value, currentPath) => {
  if (typeof value !== "string") return;
  for (const match of value.matchAll(/\{([^}]+)\}/g)) {
    if (!dtcgTokenPaths.has(match[1])) {
      fail(`tokens.dtcg.json:${currentPath.join(".")}: 无法解析别名 {${match[1]}}`);
    }
  }
});

walk(contracts, (value, currentPath) => {
  if (typeof value !== "string") return;
  for (const match of value.matchAll(/\{([^}]+)\}/g)) {
    if (!hasPath(tokens, match[1])) {
      fail(`components.json:${currentPath.join(".")}: 无法解析令牌 {${match[1]}}`);
    }
  }
});

const assetPaths = new Set();
walk(contracts, (value, currentPath) => {
  if (typeof value === "string" && currentPath.includes("assets")) assetPaths.add(value);
});
for (const relativePath of assetPaths) {
  if (!fs.existsSync(path.join(root, relativePath))) fail(`缺少组件素材：${relativePath}`);
}

const references = [
  "assets/reference/01-home.png",
  "assets/reference/02-input.png",
  "assets/reference/03-operation.png",
  "assets/reference/04-generating.png",
  "assets/reference/05-completed.png",
  "assets/reference/06-skill-picker.png"
];
for (const relativePath of references) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`缺少基准图：${relativePath}`);
    continue;
  }
  const size = pngSize(relativePath);
  if (size && (size.width !== 1200 || size.height !== 800)) {
    fail(`${relativePath}: 应为 1200x800，实际为 ${size.width}x${size.height}`);
  }
}

const invariants = [
  [tokens.meta?.version === "2.0.0", "tokens.json 版本应为 2.0.0"],
  [tokens.layout?.viewport?.width === 1200 && tokens.layout?.viewport?.height === 800, "基准视口应为 1200x800"],
  [tokens.layout?.standardShell?.sidebarWidth + tokens.layout?.standardShell?.workspaceWidth === 1200, "常规 260/940 分栏总宽应为 1200"],
  [tokens.layout?.completedShell?.conversationWidth + tokens.layout?.completedShell?.editorWidth === 1200, "完成态 390/810 分栏总宽应为 1200"],
  [tokens.layout?.standardShell?.mainColumnGlobalX === tokens.layout?.standardShell?.sidebarWidth + tokens.layout?.standardShell?.workspaceColumnInset, "主内容 x 应等于侧栏宽 + 工作区内缩"],
  [tokens.component?.composer?.homePanel?.width === 768 && tokens.component?.composer?.homePanel?.height === 118, "首页白色输入面板应为 768x118"],
  [tokens.component?.composer?.conversationPanel?.y + tokens.component?.composer?.conversationPanel?.height === 786, "生成中输入面板底部应保留 14px"],
  [tokens.color?.semantic?.action?.primary === "#1563EB", "品牌主色应为 #1563EB"],
  [contracts.pageStates && Object.keys(contracts.pageStates).length === 6, "应有六个页面状态契约"]
];
for (const [condition, message] of invariants) if (!condition) fail(message);

if (errors.length) {
  console.error("GDS for AI 2.0 验证失败：");
  errors.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`GDS for AI 2.0 验证通过：3 份 JSON、${dtcgTokenPaths.size} 个 DTCG 令牌、${assetPaths.size} 个组件素材、6 张 1200x800 基准图。`);
