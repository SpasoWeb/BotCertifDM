

const DiscordUser = require('discord.js'),
    clientUser = new DiscordUser.Client(),
    config = require('./config');

const DiscordBot = require('discord.js'),
    BotCertif = new DiscordBot.Client();


console.log(`
  _____       _                _ _   _                 _     _____       _             _       
 |  __ \\     | |              (_) | | |               | |   |_   _|     | |           | |      
 | |__) |   _| |__   __      ___| |_| |__   ___  _   _| |_    | |  _ __ | |_ ___ _ __ | |_ ___ 
 |  ___/ | | | '_ \\  \\ \\ /\\ / / | __| '_ \\ / _ \\| | | | __|   | | | '_ \\| __/ _ \\ '_ \\| __/ __|
 | |   | |_| | |_) |  \\ V  V /| | |_| | | | (_) | |_| | |_   _| |_| | | | ||  __/ | | | |_\\__ \\
 |_|    \\__,_|_.__/    \\_/\\_/ |_|\\__|_| |_|\\___/ \\__,_|\\__| |_____|_| |_|\\__\\___|_| |_|\\__|___/
                                                                                                              
`)

clientUser.on('ready', async () => {
    console.log(clientUser.user.username)
})
BotCertif.on('ready', async () => {
    console.log(BotCertif.user.username)
})

clientUser.on('message', async (message) => {
    if(!message.content.startsWith("pub")) return;
    var memberCount = 1;
    message.guild.members.fetch().then(m => {
            m.forEach(m => {
                if(!m.user.bot){
                    SendWithBotCertif(m.id, memberCount++);
                }
            })
        }).catch(console.error);
})

async function SendWithBotCertif(id, count) {
    let SendDM = await BotCertif.users.fetch(id);
    SendDM.send(config.MessagePub).then(() => {
        console.log(`Message send to => ${SendDM.username} [${count}]`)
    }).catch(e => console.log(e.message))
}

clientUser.login(config.tokenUserGetIntent).catch(e => console.log(e.message))
BotCertif.login(config.token).catch(e => console.log(e.message))


