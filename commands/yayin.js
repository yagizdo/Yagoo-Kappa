const Discord = require("discord.js");

module.exports = {
    name: 'yayin',
    description: 'Yayın bilgi komutu',
    execute(message, args) {
        var embed = new Discord.RichEmbed()
            .addField("Yayın Başlığı", "Başlık", true)
            .addField("Oyun Adı", "Oyun", true)
            .addField("Kanal Linki", "Link", true)
            .setColor("#6441a5")
            .setFooter("Footer messssssaaaageeeee")
            .setThumbnail(message.author.avatarURL)
        message.channel.sendEmbed(embed);
    },
};