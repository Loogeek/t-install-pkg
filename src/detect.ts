import { findUp } from 'find-up';
import path from 'path';

export type PackageManager = 'pnpm' | 'yarn' | 'npm';

const LOCKS: Record<string, PackageManager> = {
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
};

export async function detectManager(cwd = process.cwd()) {
  const result = await findUp(Object.keys(LOCKS), { cwd });
  const agent = result ? LOCKS[path.basename(result)] : null;

  return agent;
}
