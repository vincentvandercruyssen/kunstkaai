const fs = require('fs');
const path = '/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/5xm/Futureproof/verbeteren-futureproof.md';
let content = fs.readFileSync(path, 'utf8');

const grades = {
  Anas: { c: 4, s: 2, t: 2.5, u: 3, v: 2.5, r: 4 },
  Angel: { c: 4, s: 2, t: 4, u: 2, v: 3, r: 3 },
  Belal: { c: 4, s: 1, t: 4, u: 3, v: 2.5, r: 3 },
  David: { c: 3, s: 2, t: 4, u: 4, v: 2, r: 1.5 },
  Eduard: { c: 3, s: 2, t: 2.5, u: 2.5, v: 4, r: 3 },
  Esli: { c: 2, s: 2, t: 4, u: 4, v: 3, r: 3 },
  Espen: { c: 3, s: 1, t: 3, u: 4, v: 4, r: 2 },
  Giovanni: { c: 4, s: 2, t: 2.5, u: 3, v: 2.5, r: 3 },
  Jena: { c: 3, s: 2, t: 2.5, u: 4, v: 2.5, r: 4 },
  Jordan: { c: 4, s: 2, t: 4, u: 3, v: 2, r: 3 },
  Kjell: { c: 3, s: 1, t: 3.5, u: 2.5, v: 4, r: 3 },
  Leon: { c: 2, s: 2, t: 4, u: 4, v: 3, r: 2 },
  Lex: { c: 4, s: 2, t: 2, u: 2.5, v: 2, r: 4 },
  Michael: { c: 3, s: 2, t: 4, u: 4, v: 2, r: 3 },
  Misha: { c: 3, s: 1, t: 3, u: 4, v: 3, r: 2 },
  Romaissa: { c: 3, s: 2, t: 2.5, u: 3.5, v: 4, r: 3 },
  Sep: { c: 2.5, s: 2, t: 4, u: 3, v: 2.5, r: 3 },
  Sonmul: { c: 4, s: 2, t: 3, u: 2, v: 3, r: 4 }
};

for (const [name, g] of Object.entries(grades)) {
  const total22 = g.c + g.s + g.t + g.u + g.v + g.r;
  const total50 = Math.round((total22 / 22) * 50);

  const blockRegex = new RegExp(`(## ${name}\\n\\n- Voorbereiding en concept: )/4(\\n- Structuur: )/2(\\n- Technische werking: )/4(\\n- UX en interactiviteit: )/4(\\n- Vormgeving en integratie: )/4(\\n- Verantwoording: )/4\\n\\n\\*\\*Totaal:\\*\\* /22 \\(/50\\)`, 'g');

  content = content.replace(blockRegex, `$1${g.c}/4$2${g.s}/2$3${g.t}/4$4${g.u}/4$5${g.v}/4$6${g.r}/4\n\n**Totaal:** ${total22}/22 (${total50}/50)`);
}

fs.writeFileSync(path, content);
console.log('Done');
