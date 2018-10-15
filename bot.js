const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true, autoReconnect: true });
const JSON = require('circular-json');
const log = require("better-umi-log");
const Config = require("./Config.js");
const fs = require("fs");
//bot.user.setPresence({ game: { name: 'for applications. | Prefix: d;' , type: 'WATCHING'} })
let applications = JSON.parse(fs.readFileSync("./applications.json", "utf8"));
bot.on("message", msg => {
    if (msg.author.id == bot.user.id || msg.author.bot) return;
  if (!msg.content.startsWith(Config.prefix)) {
      return;
    }
  let channel = msg.channel;
    let content = msg.content;
    let text = content.toLowerCase();
    let args = content.split(" ");
    let argsLower = text.split(" ");
    let command = text.substring(Config.prefix.length, argsLower[0].length);
  if (command == "ping") {
      let startTime = Date.now();
        return channel.send("Pinging...").then(pingMsg => {
          pingMsg.edit(`:ping_pong: Took \`${Math.round(Date.now() - startTime)}ms\`.`);
        });
  }
    if (command == "help") {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Help")
        embed.addField("help", "Opens up the help menu!")
        embed.addField("ping", "Pings our servers!")
        embed.addField("apply", "Apply for employee!")
        embed.setColor(Math.floor(Math.random()*16777216))
      return channel.send(embed)
  }
    if (command == "eval") {
		
          try {
			let toEval = args.splice(1,args.length-1)
			if (toEval.includes(("bot.token" || "Config.token"))) return msg.channel.send("Nice try with our tokens there :wink:")
            if (args[1] == undefined) return channel.send("No code.")
			let com = eval(toEval);
			if (typeof com !== "string") com = require("util").inspect(com, false, 1);
			com = com.replace(bot.token, "Censored");
          channel.send({
              embed: {
                color: 0xFFFFFF,
                title: "Evaluate Javascript Complete!",
                description: "Evaluation complete!",
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                thumbnail: {
                  url: bot.user.avatarURL
                },
                fields: [{
                  name: "**Input**",
                  value: "```js\n" + toEval + "```"
                }, {
                  name: "**Output**",
                  value: "```js\n" + com + "```"
                }]
              }
            })
          } catch (e) {
            channel.send({
              embed: {
                color: 0xFF0000,
                title: "Code Error!",
                description: "There was a error in your code!",
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                thumbnail: {
                  url: bot.user.avatarURL
                },
                fields: [{
                  name: "**Error**",
                  value: "```js\n" + e + "```"
                }]
              }
            })
          }
        }
    //end
});
fs.writeFile("./applications.json", JSON.stringify(applications), (err) => {
    if (err) console.error(err)
  });
bot.login(Config.token);
log.custom("SUCCESS", "Bot logged in!")
