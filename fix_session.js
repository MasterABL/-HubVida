import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'src/components/FaculdadeV2.jsx',
  'src/components/faculdade/MarkdownEditor.jsx',
  'src/components/faculdade/Tabs/ReviewsTab.jsx',
  'src/components/faculdade/Tabs/ProgressTab.jsx',
  'src/components/faculdade/Tabs/PomodoroTab.jsx',
  'src/components/faculdade/Tabs/FreeNotesTab.jsx'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/session\.id/g, 'session.user.id');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${file}`);
  } else {
    console.log(`Not found ${file}`);
  }
});
