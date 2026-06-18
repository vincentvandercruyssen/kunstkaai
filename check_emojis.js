const fs = require('fs');
const path = require('path');

const baseDir = '/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/5xm/Futureproof';
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu;

function findEmojis(dir, studentName, results) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findEmojis(fullPath, studentName, results);
    } else if (file.endsWith('.js') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (emojiRegex.test(content)) {
        results.add(studentName);
      }
    }
  }
}

const students = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
const studentsWithEmojis = new Set();

for (const student of students) {
  findEmojis(path.join(baseDir, student), student, studentsWithEmojis);
}

console.log(Array.from(studentsWithEmojis).join('\n'));
