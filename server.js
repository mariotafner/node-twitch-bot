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

console.log('Connected to Twitch')
client.on('message', async (channel, context, message) => {
    const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase()
    if ( !isNotBot ) return

    let f = (str) => {
        str = str.replace(/[áàãâä]/g, 'a')
        str = str.replace(/[éèêë]/g, 'e')
        return str
    }

    console.log(context.username + ': ' + message);

    let formated = f(message.toLocaleLowerCase().trim())

    let blocked_messages = ['que mario?', 'q mario?', 'q m4rio?', 'que m4rio?', 'q mari0?', 'que mari0?', 'q m4ri0?', 'que m4ri0?']
    for (blocked_messages of blocked_messages) {
        if (formated.startsWith(blocked_messages)) {
            client.say(channel, `/timeout ${context.username} 1`)
            client.say(channel, `${context.username} essa piada é proibida aqui!`)
            return
        }
    }
});
