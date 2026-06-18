const fs = require('fs');
const filePath = '/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/5xm/Futureproof/verbeteren-futureproof.md';
let content = fs.readFileSync(filePath, 'utf8');

const updated = content.replace(/\*\*Totaal:\*\* (\d+)\/22 \([\d,.]+\/50\)/g, (match, score) => {
    const numScore = parseInt(score, 10);
    const converted = (numScore / 22 * 50).toFixed(2).replace('.', ',');
    return `**Totaal:** ${score}/22 (${converted}/50)`;
});

fs.writeFileSync(filePath, updated);
console.log("Updated scores to 2 decimal places.");
