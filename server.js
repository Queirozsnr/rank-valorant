// server.js
const cors_proxy = require('cors-anywhere');

const PORT = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [], // Permitir todas as origens
}).listen(PORT, () => {
  console.log(`CORS Anywhere proxy rodando na porta ${PORT}`);
});
