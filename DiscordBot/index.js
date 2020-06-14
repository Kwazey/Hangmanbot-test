const Discord = require('discord.js');
const Bot = new Discord.Client();

const token = 'NzIxNDMzNjYzNTMwODYwNjA1.XuUdoQ.4CDMQWndRy526YtMBi01a8L-OIA';

const PREFIX = '!';

Bot.once('ready', () =>{
    console.log('This bot is online');
})

Bot.on('message', msg => {

    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            msg.reply('pong!');
            msg.channel.send('pong!');
            break;
    }

})



Bot.on('message', msg => {
    if (msg.content === "HELLO") {
        msg.reply('HELLO FRIEND!');
    }
})

Bot.on('message', msg => {
    if (msg.content === "Tell me a true FAX") {
        msg.reply('Markus Holmberg is one HAWT boi and has the bigges Benis in the entire world');
    }
})

Bot.login(token);
