const Discord = require("discord.js");

module.exports = {
    name: 'yardım',
    description: 'Yardım komutu',
    execute(message, args) {
        var embed = new Discord.RichEmbed()
            .setTitle("Komut Listesi - >< işaretini koyabilirsiniz başına \n Örnek : ><Sosyal")
            .setColor("#0EA0D0")
            .setFooter("Takıldığınız ya da merak ettiğiniz ekstra birşeyi Yagoo veya modaretörleri etiketleyerek sorabilirsiniz.. \n\n Lütfen Müzik bot komutları için <596229785064177675> kanalını kullanın..")
            .addField("Twitch", "Twitch Kanalımın linkini atar.", true)
            .addField("Prime", "Twitch Prime Hakkında Bilgi Verir.", true)
            .addField("Sosyal", "Sosyal Medya Adreslerimi Listeler")
            .addField("MüzikYardım", "Müzik Komutlarını Listeler")
        message.channel.sendEmbed(embed);
    },
};