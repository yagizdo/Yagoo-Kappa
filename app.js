const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const moment = require("moment");
var fs = require("fs");
const dotenv = require('dotenv').config();

var bot = new Discord.Client();
bot.commands = new Discord.Collection();

const Token = process.env.TOKEN;
const settings = require("./settings.json")
const Prefix = settings.prefix;

var data;
var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}


/* =================== Read Commands =================== */

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log("Yüklenen komutlar : ");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log((`${file} hazır.`));
    bot.commands.set(command.name, command);
}
/* =================== Read Commands =================== */

// Bot login and login message
bot.on('ready', () => {
    console.log('Bot şuan bağlandı Mr.Stark..');
    bot.user.setGame("Hi Mr.Stark... ");
});

bot.on("message", async message => {

    /* ===========  Bot Log Save ============ */
    moment.locale('tr');
    var Tarih = moment().format('LLLL');
    data = (Tarih + " " + message.member.user.tag + " Kullanıcıdan " + message.channel.name + " Kanalında : " + message.content + "  Mesajı \n \n \n");
    console.log(Tarih + " " + message.member.user.tag + " Kullanıcıdan " + message.channel.name + " Kanalında :  " + message.content + "  Mesajı \n");

    // Data Write
    fs.appendFile("./logs/log.txt", data.toString(), (err) => {
        if (err) console.log(err);
        console.log("Başarıyla Yazıldı");
    });
    /* ===========  Bot Log Save ============ */


    /* ===========  Prefix and Command Handler ============ */
    if (!message.content.startsWith(Prefix) || message.author.bot) return;

    const args = message.content.slice(Prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    /* TODO: Do convert this sound player */
    switch (command) {
        case "play":
            if (!args[0]) {
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
            server.queue.push(args[0]);
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
                message.channel.sendMessage("Müzik Çalınıyor.");
            });
            break;

        case "stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.sendMessage("Kendinize iyi bakın..");
            break;

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
    }

    /* Auto Handle  */
    if (!bot.commands.has(command)) return;
    try {
        bot.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Böyle bir komut mevcut değil');
    }

    /* ===========  Prefix and Command Handler ============ */

});


bot.login(Token);