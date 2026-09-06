import { readActiveSource } from './lib/read-active-source.mjs';

const source = readActiveSource();
const failures = [];

function requireText(text, message) {
  if (!source.includes(text)) failures.push(message);
}

function forbidText(text, message) {
  if (source.includes(text)) failures.push(message);
}

requireText('evaSidebarSelectionFromRoute=', 'missing the single route-to-navigation selection mapper');
requireText('activeNavId:evaActiveNavId', 'sidebar does not receive the shared React activeNavId');
requireText('isActive:rt.activeNavId===gt', 'first-level entries do not use the shared activeNavId');

forbidText('var activeSidebarNavId = \'\';', 'parallel DOM sidebar selection state still exists');
forbidText("surface.classList.toggle('bg-fill-3'", 'parallel DOM code still paints selection classes');
forbidText('isActive:!1,onClick:()=>{}}));case"projects"', 'My AI still hard-codes an inactive state');
forbidText('__evaSidebarOverlayNavId', 'overlay navigation state still competes with the route');
forbidText('eva:sidebar-select', 'custom selection events still compete with the route');

if (failures.length) {
  failures.forEach(failure => console.error(`Sidebar selection contract violation: ${failure}`));
  process.exit(1);
}

console.log('Eva sidebar selection contract verification passed.');
