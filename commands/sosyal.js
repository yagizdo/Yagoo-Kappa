const Discord = require("discord.js");

module.exports = {
    name: 'sosyal',
    description: 'Sosyal medya bilgi komutu!',
    execute(message, args) {
        var sosyal = new Discord.RichEmbed()
            .setTitle("Sosyal Medya Adreslerim")
            .setColor("#0EA0D0")
            .setFooter("Takıldığınız ya da merak ettiğiniz ekstra birşeyi Yagoo veya modaretörleri etiketleyerek sorabilirsiniz..")
            .addField("İnstagram", "https://instagram.com/yagizdo", true)
            .addField("Twitter", "https://twitter.com/yagizdoo", true)
            .addField("Medium", "https://medium.com/@dokumaciyagiz")
            .addField("Youtube", "https://youtube.com/yilmazyagizdokumaci")
            .addField("Twitch", "https://twitch.tv/yagoo")
        message.channel.sendEmbed(sosyal);
    },
};