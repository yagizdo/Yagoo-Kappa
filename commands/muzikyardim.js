const Discord = require("discord.js");

module.exports = {
    name: 'müzikyardım',
    description: 'Müzik komutları hakkında bilgi verir.',
    execute(message, args) {
        var muzik = new Discord.RichEmbed()
            .setTitle("Müzik Komut Listesi")
            .setColor("#F4A8A7")
            .setFooter("Takıldığınız ya da merak ettiğiniz ekstra birşeyi Yagoo veya modaretörleri etiketleyerek sorabilirsiniz..\n\n Lütfen bot komutları için <#596229785064177675> kanalını kullanın..")
            .addField("```><play video_url```", "Bu komut ile Youtube üzerinden şarkı/video oyanatabilirsiniz.", true)
            .addField("```><pause```", "Bu komut ile müziği durdurursunuz.", true)
            .addField("Sosyal", "Bu komut ile müziği devam ettirirsiniz.")
            .addField("```><add video_url```", "Bu komut ile listeye şarkı eklersiniz.")
            .addField(" ```><skip```", "Bu komut ile şarkıyı geçebilirsiniz. Eğer listede şarkı yok ise direk bot kanaldan çıkış yapar.", true)
            .addField("```><stop```", "Bu komut ile direk müzik dinleme kısmını bitirebilirsiniz. Bot kanaldan çıkış yapar.")
        message.channel.sendEmbed(muzik);
    },
};