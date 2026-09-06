import crypto from 'node:crypto';
import { createPatchedRuntime } from './build-runtime.mjs';

const { source: generatedSource, patchOrder } = createPatchedRuntime();

const result = {
  patchOrder,
  bytes: Buffer.byteLength(generatedSource),
  sha256: crypto.createHash('sha256').update(generatedSource).digest('hex'),
};

if (process.argv.includes('--json')) console.log(JSON.stringify(result));
else console.log(`EVA runtime patch hash: ${result.sha256} (${result.bytes} bytes; ${result.patchOrder.join(' -> ')})`);
