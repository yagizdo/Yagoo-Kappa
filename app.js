const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const moment = require("moment");
const Token = "{YOUT_BOT_TOKEN}";
const Prefix = "><";
var bot = new Discord.Client();
var fs = require("fs");
var data;
var servers = {};
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));

    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}


// Bot login and login message
bot.on('ready', () => {
    console.log('Bot şuan bağlandı Mr.Stark..');
    bot.user.setGame("Hi Mr.Stark... ");
});

bot.on("message", function (message) {
    // Bot log save
    moment.locale('tr');
    var Tarih = moment().format('LLLL');
    data = (Tarih + " " + message.member.user.tag + " Kullanıcıdan " + message.channel.name + " Kanalında : " + message.content + "  Mesajı \n \n \n");
    console.log(Tarih + " " + message.member.user.tag + " Kullanıcıdan " + message.channel.name + " Kanalında :  " + message.content + "  Mesajı \n");

    // Data Write
    fs.appendFile("discordLog.txt", data.toString(), (err) => {
        if (err) console.log(err);
        console.log("Başarıyla Yazıldı");
    });
    // Commands


    //if (!message.author.equals(botCommander.roles)) return;

    if (!message.content.startsWith(Prefix)) return;
    var args = message.content.substring(Prefix.length).split(" ");
    args.toLowerCase();

    switch (args[0]) {
        // Ping Command
        case "ping":
            message.channel.sendMessage("pong");
            break;

        // Help Command
        case "yardım":
            var embed = new Discord.RichEmbed()
                .setTitle("Komut Listesi - >< işaretini koyabilirsiniz başına \n Örnek : ><Sosyal")
                .setColor("#0EA0D0")
                .setFooter("Takıldığınız ya da merak ettiğiniz ekstra birşeyi Yagoo veya modaretörleri etiketleyerek sorabilirsiniz.. \n\n Lütfen Müzik bot komutları için <596229785064177675> kanalını kullanın..")
                .addField("Twitch", "Twitch Kanalımın linkini atar.", true)
                .addField("Prime", "Twitch Prime Hakkında Bilgi Verir.", true)
                .addField("Sosyal", "Sosyal Medya Adreslerimi Listeler")
                .addField("MüzikYardım", "Müzik Komutlarını Listeler")
            message.channel.sendEmbed(embed);
            break;
        // Twitch Channel Command
        case "Twitch":
            message.channel.sendMessage("Twitch adresimi takip edersen yayın açıldığında bildirim alabilirsin :) https://twitch.tv/yagoo");
            break;

        case "Sosyal":
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
            break;
        // Twitch Notification Command
        case "Yayın-Aktif":
            var embed = new Discord.RichEmbed()
                .addField("Yayın Başlığı", "Başlık", true)
                .addField("Oyun Adı", "Oyun", true)
                .addField("Kanal Linki", "Link", true)
                .setColor("#6441a5")
                .setFooter("Footer messssssaaaageeeee")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "MüzikYardım":
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

            break;

        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Lütfen komutu bir link ile kullanınız..");
                return;
            }
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Lütfen bir ses kanalına giriniz..");
                return;
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            var server = servers[message.guild.id];
            server.queue.push(args[1]);
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                play(connection, message);
                message.channel.sendMessage("Müzik Çalınıyor.");
            });
            break;
        case "stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.sendMessage("Kendinize iyi bakın..");
            break;

        // Skip Command
        case "skip":
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.sendMessage("Müzik geçildi.");
            break;

        // Pause Command
        case "pause":
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.pause();
            message.channel.sendMessage("Müzik durduruldu.");
            break;
        // Resume Command
        case "resume":
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.resume();
            message.channel.sendMessage("Müzik devam ettriliyor.");
            break;
        // Add Command
        case "add":
            var server = servers[message.guild.id];
            message.channel.sendMessage("Müzik sıraya eklendi.");
            server.queue.push(args[1]);
            break;
        case "temizle":
            if (isNaN(args[0])) return message.channel.send("Lütfen silinecek mesaj sayısını giriniz.");
            else {


                message.channel.bulkDelete(args[0])
                    .then(messages = message.channel.sendMessage("**Başarı ile silindi. Silinen mesaj sayısı : \'${messages.size}/${args[0]}\' messages**").then(msg => msg.delete({ timeout: 10000 })))

                    .catch(error => message.channel.sendMessage("**ERROR** ${error.message}"));
            }


            break;

        default:
            message.channel.sendMessage("Böyle bir komut mevcut değil..");


    }
});

bot.login(Token);