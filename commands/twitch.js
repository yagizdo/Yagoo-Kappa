const Discord = require("discord.js");

module.exports = {
    name: 'twitch',
    description: 'Twitch bilgi komutu',
    execute(message, args) {
        message.channel.sendMessage("Twitch adresimi takip edersen yayın açıldığında bildirim alabilirsin :) https://twitch.tv/yagoo");
    },
};