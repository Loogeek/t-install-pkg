import { installPackage } from '../src';

const install = async () => {
  await installPackage('vite');
};

await install();
