const botconfig = require("./botconfig.json");
const tokenfile = require("./tokenfile.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} online lett ${bot.guilds.size} szerveren!`);
    bot.user.setActivity("tutorial", {type: "LISTENING"});
});

bot.on("guildMemberAdd", function(member) {

    let ch = member.guild.channels.find(`name`, `welcome`);
    let r = member.guild.roles.find(`name`, `tag`);

    ch.send(`Üdvözlünk a szerveren **${member}**`);
    member.addRole(r.id);

});

bot.on("message", async message => {
    if(message.author.bot) return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let blacklist = ["szó1", "szó2", "szó3", "szó4"];
    //                 0       1        2
    
    for(let i = 0; i < blacklist.length; i++) {
        if(messageArray.includes(blacklist[i], 0)) {
            message.delete();
            message.reply("Ez a szó tiltott!").then(r =>r.delete(5000));
            return;
        }
    }


    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setFooter("Teszt - Bot", bot.user.avatarURL)
    .setTimestamp();

    // ###### PARANCSOK ######

    if(cmd == `${prefix}gamble`) {
        let sum = Math.floor(Math.random() * 6) + 1;

        embed.setColor("PURPLE");
        embed.addField("Szerencsejáték", `A mostani kidobott számod: ${sum}`);
        embed.addBlankField();

        if(sum == 1) embed.addField("Mostani szerencse:", "Nagyon balszerencsés voltál.");
        else if(sum < 3) embed.addField("Mostani szerencse:", "Balszerencsés voltál.");
        else if(sum < 5) embed.addField("Mostani szerencse:", "Átlagos.");
        else if(sum == 5) embed.addField("Mostani szerencse:", "Szerencsés voltál.");
        else embed.addField("Mostani szerencse:", "Nagyon szerencsés voltál.");

        message.channel.send(embed);
    }

});

bot.login(tokenfile.token);