require('dotenv').config();

console.log('Starting server...')
const tmi = require('tmi.js');
const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    channels: ["#mariofabre", '#speedyy'],
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    }
});

client.connect();
client.on('message', async (channel, context, message) => {
    const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase()
    if ( !isNotBot ) return

    let f = (str) => {
        str = str.replace(/[áàãâä]/g, 'a')
        str = str.replace(/[éèêë]/g, 'e')
        return str
    }

    console.log(context.username + ': ' + message);

    if (f(message.toLocaleLowerCase().trim()).startsWith('que mario?')) {
        client.say(channel, `/timeout ${context.username} 1`)
        client.say(channel, `${context.username} essa piada é proibida aqui!`)
    }
});
