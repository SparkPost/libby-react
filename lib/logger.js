import boxen from 'boxen';
import chalk from 'chalk';

export const green = chalk.hex('#25F578');
export const gray = chalk.gray;
export const red = chalk.hex('#FF5252');

export const prettyStart = ({ port, v4, duration }) => {
  const header = green('Libby is running at');
  const local = green(`▸ Local     http://localhost:${port}/`);
  const network = green(`▸ Network   http://${v4}:${port}/`);
  const time = gray(`Started in ${(duration / 1000).toFixed(2)}s.`);
  const output = `${header}\n${local}\n${network}\n${time}`;
  console.log(boxen(output, { padding: 1, borderColor: '#25F578' }) + '\n');
};

export const prettyBuild = ({ duration, path }) => {
  const header = green(`Libby built in ${(duration / 1000).toFixed(2)}s`);
  const loc = green(`▸ ${path}`);
  const npx = gray(`npx serve ${path}`);
  const output = `${header}\n${loc}\n${npx}`;
  console.log(boxen(output, { padding: 1, borderColor: '#25F578' }) + '\n');
};

export const logError = (err) => {
  console.log(red(`Libby Error\n\n${err}`));
};
