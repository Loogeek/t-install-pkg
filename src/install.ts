import { execa } from 'execa';
import { detectManager } from './detect';

interface InstallPackageOptions {
  cwd?: string;
  silent?: boolean;
  dev?: boolean;
  preferOffline?: boolean;
  packageManager?: string;
  additionArgs?: [];
}

export async function installPackage(
  names: string | string[],
  options: InstallPackageOptions = {},
) {
  const agent =
    options.packageManager || (await detectManager(options.cwd)) || 'npm';
  if (!Array.isArray(names)) {
    names = [names];
  }

  const args: string[] = options.additionArgs || [];

  if (options.preferOffline) {
    args.unshift('--prefer-offline');
  }

  execa(
    agent,
    [
      agent === 'yarn' ? 'add' : 'install',
      options.dev ? '-D' : '',
      ...args,
      ...names,
    ],
    {
      stdio: options.silent ? 'ignore' : 'inherit',
      cwd: options.cwd,
    },
  );
}
