const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.write('Botti hiii pyörii täällä 24/7!');
  res.end();
}).listen(process.env.PORT || 10000, '0.0.0.0', () => {
  console.log('Web-palvelin käynnistetty Render-portissa.');
});

const mineflayer = require('mineflayer');
const pvpPlugin = require('mineflayer-pvp').plugin || require('mineflayer-pvp');

const botOptions = {
  host: '222.mangoohost.live',
  port: 25565,
  username: 'hiii',
  version: '1.21.1',
  auth: 'offline'
};

function startBot() {
  console.log('Yritetään yhdistää Minecraft-palvelimelle...');
  const bot = mineflayer.createBot(botOptions);

  if (typeof pvpPlugin === 'function') {
    bot.loadPlugin(pvpPlugin);
  }

  bot.once('spawn', () => {
    console.log('ONNISTUI! Botti hiii on nyt Mangoohostilla 24/7!');
    
    setInterval(() => {
      if (!bot.pvp || !bot.pvp.target) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 10000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hello') {
      bot.chat('Hello ' + username + '! I am hiii on Render 24/7!');
    }
  });

  bot.on('error', (err) => {
    console.log('Verkkovirhe:', err.message);
  });

  bot.on('kicked', (reason) => {
    console.log('Potkitun syy:', JSON.stringify(reason));
  });


  bot.on('end', () => {
    console.log('Yhteys katkesi palvelimeen. Yritetään uudelleen 15 sekunnin kuluttua...');
    setTimeout(startBot, 15000);
  });
}

startBot();
