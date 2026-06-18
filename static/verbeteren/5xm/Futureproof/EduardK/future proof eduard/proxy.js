// proxy.js — локальный CORS-прокси для Gemini Widget
// Запуск: node proxy.js
// Остановка: Ctrl+C

const http  = require('http');
const https = require('https');

const PORT       = Number(process.env.PORT || 3002);
const TARGET     = 'https://api.vibecode-claude.online';
const TARGET_HOST = 'api.vibecode-claude.online';

const server = http.createServer(function (req, res) {
  // CORS headers — разрешаем запросы с любого локального источника
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, anthropic-version');

  // Preflight — сразу отвечаем 200
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  var parsed  = new URL(req.url, TARGET);
  var options = {
    hostname: TARGET_HOST,
    port:     443,
    path:     parsed.pathname + parsed.search,
    method:   req.method,
    headers:  Object.assign({}, req.headers, { host: TARGET_HOST }),
  };

  var proxyReq = https.request(options, function (proxyRes) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', function (err) {
    console.error('[proxy] error:', err.message);
    if (!res.headersSent) res.writeHead(502);
    res.end(JSON.stringify({ error: err.message }));
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PORT, function () {
  console.log('');
  console.log('  ✓ CORS-прокси запущен: http://localhost:' + PORT);
  console.log('  → пробрасывает запросы на ' + TARGET);
  console.log('  Ctrl+C — остановить');
  console.log('');
});
