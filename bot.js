const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: '222.mangoohost.live',
  port: 25565,                
  username: 'hiii',            
  auth: 'offline' 
});

bot.once('spawn', () => {
  console.log('Success! The bot hiii has joined 222.mangoohost.live!');
});

bot.on('chat', (username, message) => {
  if (!username || !message) return;
  if (username === bot.username) return;

  if (message.toLowerCase() === 'hello') {
    bot.chat(`Hello ${username}! I am hiii.`);
  }
});

bot.on('error', (err) => {
  console.log('Connection Error:', err.message || err);
});

bot.on('kicked', (reason) => {
  console.log('Kicked from server. Reason:', JSON.stringify(reason));
});
