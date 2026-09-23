const mineflayer = require('mineflayer');
const http = require('http');


const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft Bot is online!\n');
});

server.listen(PORT, () => {
  console.log(`Render health check web server running on port ${PORT}`);
});

let bot;

function startBot() {
  console.log('Connecting to masterforge.playserver.pro...');
  
  
  bot = mineflayer.createBot({
    host: 'masterforge.playserver.pro',
    port: 25565,
    username: 'RenderBot', 
    version: '26.1.2',
    auth: 'offline'
  });

  bot.on('login', () => {
    console.log(`[Success] ${bot.username} logged into the server.`);
  });

  bot.on('spawn', () => {
    console.log(`${bot.username} spawned in the game.`);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    
    if (message === '!ping') {
      bot.chat(`Pong! I am running perfectly.`);
    }
  });

  
  bot.on('disconnect', (packet) => {
    console.log(`Disconnected: ${packet.reason}`);
  });

  bot.on('end', () => {
    console.log('Connection closed. Retrying connection in 10 seconds...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.error(`Bot Error: ${err.message}`);
  });
}


startBot();

