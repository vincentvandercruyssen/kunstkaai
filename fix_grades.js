const fs = require('fs');
const path = '/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/5xm/Futureproof/verbeteren-futureproof.md';
let content = fs.readFileSync(path, 'utf8');

const regex = /(## \w+\n\n- Voorbereiding en concept: )([\d\.]+)(\/4\n- Structuur: )([\d\.]+)(\/2\n- Technische werking: )([\d\.]+)(\/4\n- UX en interactiviteit: )([\d\.]+)(\/4\n- Vormgeving en integratie: )([\d\.]+)(\/4\n- Verantwoording: )([\d\.]+)(\/4\n\n\*\*Totaal:\*\* )[\d\.]+(\/22 \()[\d\.]+(\/50\))/g;

content = content.replace(regex, (match, p1, c, p3, s, p5, t, p7, u, p9, v, p11, r, p13, p14, p15) => {
  const g_c = Math.floor(parseFloat(c));
  const g_s = Math.floor(parseFloat(s));
  const g_t = Math.floor(parseFloat(t));
  const g_u = Math.floor(parseFloat(u));
  const g_v = Math.floor(parseFloat(v));
  const g_r = Math.floor(parseFloat(r));
  
  const total22 = g_c + g_s + g_t + g_u + g_v + g_r;
  const total50 = Math.floor((total22 / 22) * 50); // The prompt says: "rond naar beneden af", so I should probably Math.floor the total as well.

  return `${p1}${g_c}${p3}${g_s}${p5}${g_t}${p7}${g_u}${p9}${g_v}${p11}${g_r}${p13}${total22}${p14}${total50}${p15}`;
});

fs.writeFileSync(path, content);
console.log('Fixed decimals');
