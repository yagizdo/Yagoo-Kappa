const Discord = require("discord.js");

module.exports = {
    name: 'temizle',
    description: 'Mesajları temizleme komutu',
    execute(message, args) {
        if (isNaN(args[0])) return message.channel.send("Lütfen silinecek mesaj sayısını giriniz.");
        else {
            message.channel.bulkDelete(args[0])
                .then(messages = message.channel.sendMessage("**Başarı ile silindi. Silinen mesaj sayısı : \'${messages.size}/${args[0]}\' messages**").then(msg => msg.delete({ timeout: 10000 })))

            .catch(error => message.channel.sendMessage("**ERROR** ${error.message}"));
        }
    },
};