const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true, autoReconnect: true });
const JSON = require('circular-json');
const log = require("better-umi-log");
const Config = require("./Config.js");
const fs = require("fs");
let applications = JSON.parse(fs.readFileSync("./applications.json", "utf8"));
bot.on("message", msg => {
    if (msg.author.id == bot.user.id || msg.author.bot) return;
  if (!msg.content.startsWith(prefixes[msg.guild.id])) {
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
});
fs.writeFile("./applications.json", JSON.stringify(applications), (err) => {
    if (err) console.error(err)
  });
bot.login(Config.token);
