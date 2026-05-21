/* eslint-disable no-console */
/* Thin wrapper around the project-local `@graphql-codegen/cli` binary that:
 *   - skips when src/ has no *.graphql documents (avoids spurious errors on fresh clones)
 *   - forwards extra flags (e.g. --download) so codegen.ts can branch
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { glob } from 'glob';
import process from 'node:process';

const args = process.argv.slice(2);
const require = createRequire(import.meta.url);

const documents = await glob('src/**/*.graphql', { ignore: ['src/__generated__/**'] });

if (documents.length === 0 && !args.includes('--download')) {
  console.warn('[gql-codegen] no *.graphql documents under src/ — skipping');
  process.exit(0);
}

const codegenPackagePath = require.resolve('@graphql-codegen/cli/package.json');
const codegenBinPath = resolve(dirname(codegenPackagePath), 'cjs/bin.js');

const child = spawn(process.execPath, [codegenBinPath, '--config', 'codegen.ts', ...args], {
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(`[gql-codegen] failed to spawn: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal !== null) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
