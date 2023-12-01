import fs from 'fs';

export function getInput(pathname: string) {
  const input = fs.readFileSync(pathname);
  return input.toString();
}
