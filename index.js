const Discord = require('discord.js');
const client = new Discord.Client();
const cfg = require('./cfg.json');

// Set your own emoji URL in cfg.json

// on ready event
client.on('ready', () => {
    console.log(`[INIT] Login successful: ${client.user.tag}`);
});

// crappy command thing
client.on('message', msg => {
    // cx.test command runs a test for the emoji, and if its not present it readds it.
    if (msg.content === 'cx.test') { // check if the message content equals "cx.test"
        if (!msg.guild.emojis.cache.find(emoji => emoji.name == "catexcited")) { // check if the emoji already exists
            msg.guild.emojis.create(cfg.url, 'catexcited') // create emoji
            .then(console.log(`[EMOJI MANAGER] > [TEST COMMAND] catexcited has been restored!`)) // log restore event to console
            .catch(console.error); // log error
        }
    }
});

// on emoji deletion event
client.on('emojiDelete', emj => {
    // if the emoji name matches our emoji restore it
    if (emj.name == 'catexcited') { // check if name matches
        emj.guild.emojis.create(cfg.url, 'catexcited') // create emoji
            .then(console.log(`[EMOJI MANAGER] catexcited has been restored!`)) // log restore event in console
            .catch(console.error); // log error
    }
});

// login with token, set your own token in cfg.json
client.login(cfg.token);