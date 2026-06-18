const fs = require('fs');
const path = '/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/5xm/Futureproof/verbeteren-futureproof.md';
let content = fs.readFileSync(path, 'utf8');

const targetStudents = ['David', 'Eduard', 'Espen', 'Giovanni', 'Jordan', 'Kjell', 'Leon', 'Lex', 'Michael', 'Misha', 'Sep'];

const emojiSentence = " De keuze voor emoji's is slim voor een snelle opzet, maar let wel dat deze er op elk toestel anders uitzien (het gebruik van SVG-afbeeldingen is consistenter).";

for (const student of targetStudents) {
  // We want to insert the emoji sentence into their feedback.
  // We can insert it before the last sentence or just append it at the end of the paragraph.
  // The feedback is a single line after `**Feedback:**\n`
  
  const regex = new RegExp(`(\\n## ${student}\\n[\\s\\S]*?\\*\\*Feedback:\\*\\*\\n)(.*?)(\\n|$)`, 'g');
  
  content = content.replace(regex, (match, prefix, feedback, suffix) => {
    return `${prefix}${feedback}${emojiSentence}${suffix}`;
  });
}

fs.writeFileSync(path, content);
console.log('Added emoji comments');
