import fs from 'fs';
import path from 'path';

export function getMarkdownContent(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return fileContents;
}