// server.js — local server for the website and AI chat proxy.
// Run: node server.js

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const PORT = Number(process.env.PORT || 8000);
const ROOT = __dirname;
const TARGET = 'https://api.vibecode-claude.online';
const TARGET_HOST = 'api.vibecode-claude.online';
const API_KEY = process.env.CLAUDE_API_KEY || 'sk-ba9c399015d5e8cfd57496945ebd2a37df34a5db5c3b637a';

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function send(res, status, body, headers) {
  res.writeHead(status, headers || {});
  res.end(body);
}

function serveStatic(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const requestedPath = url.pathname === '/' ? '/imac-mini-case-studio.html' : url.pathname;
  const filePath = path.normalize(path.join(ROOT, decodeURIComponent(requestedPath)));

  if (!filePath.startsWith(ROOT)) {
    send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
  });
}

function proxyAI(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    send(res, 200, '');
    return;
  }

  if (req.method !== 'POST') {
    send(res, 405, JSON.stringify({ error: 'Method not allowed' }), {
      'Content-Type': 'application/json; charset=utf-8',
    });
    return;
  }

  const parsed = new URL(req.url, TARGET);
  const headers = Object.assign({}, req.headers, {
    host: TARGET_HOST,
    authorization: 'Bearer ' + API_KEY,
  });

  delete headers.origin;
  delete headers.referer;

  const proxyReq = https.request({
    hostname: TARGET_HOST,
    port: 443,
    path: parsed.pathname + parsed.search,
    method: req.method,
    headers: headers,
  }, function (proxyRes) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', function (err) {
    send(res, 502, JSON.stringify({ error: err.message }), {
      'Content-Type': 'application/json; charset=utf-8',
    });
  });

  req.pipe(proxyReq, { end: true });
}

const server = http.createServer(function (req, res) {
  if (req.url.startsWith('/v1/messages')) {
    proxyAI(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, function () {
  console.log('');
  console.log('  Site is running: http://localhost:' + PORT);
  console.log('  AI chat proxy:   http://localhost:' + PORT + '/v1/messages');
  console.log('  Press Ctrl+C to stop');
  console.log('');
});
