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
          let code = args.join(" ");
        let ev = require('util').inspect(eval(code));
        if (ev.length > 1950) {
            ev = ev.substr(0, 1950);
        }
        let token = bot.token.replace(/\./g, "\.")
        let re = new RegExp(token, 'g') 
        ev = ev.replace(re, "[REDACTED]");
        msg.channel.send("**Input:**```js\n"+code+"```**Output:**```js\n"+ev+"```")
        } catch(err) {
		let code = args.join(" ");
            msg.channel.send("**Input:**```js\n"+code+"```**Output:**```js\n"+err+"```")
        }
        }
    //end
});
fs.writeFile("./applications.json", JSON.stringify(applications), (err) => {
    if (err) console.error(err)
  });
bot.login(Config.token);
log.custom("SUCCESS", "Bot logged in!")
