// Simple Node.js backend for To-Do API (no DB, in-memory only)
const http = require('http');
const url = require('url');

let todos = [
  { id: 1, text: 'Sample Task 1' },
  { id: 2, text: 'Sample Task 2' }
];
let nextId = 3;

const sendJSON = (res, data, status = 200) => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/api/todos') {
    if (req.method === 'GET') {
      sendJSON(res, todos);
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const { text } = JSON.parse(body);
          if (!text || !text.trim()) return sendJSON(res, { error: 'Text required' }, 400);
          const todo = { id: nextId++, text };
          todos.push(todo);
          sendJSON(res, todo, 201);
        } catch {
          sendJSON(res, { error: 'Invalid JSON' }, 400);
        }
      });
    } else if (req.method === 'OPTIONS') {
      sendJSON(res, {}, 204);
    } else {
      sendJSON(res, { error: 'Method not allowed' }, 405);
    }
  } else if (parsedUrl.pathname.startsWith('/api/todos/')) {
    const id = parseInt(parsedUrl.pathname.split('/').pop());
    if (req.method === 'DELETE') {
      const idx = todos.findIndex(t => t.id === id);
      if (idx === -1) return sendJSON(res, { error: 'Not found' }, 404);
      todos.splice(idx, 1);
      sendJSON(res, { success: true });
    } else if (req.method === 'OPTIONS') {
      sendJSON(res, {}, 204);
    } else {
      sendJSON(res, { error: 'Method not allowed' }, 405);
    }
  } else {
    sendJSON(res, { error: 'Not found' }, 404);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`To-Do API server running at http://localhost:${PORT}/api/todos`);
});
