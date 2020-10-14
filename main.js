const Discord = require("discord.js");
const bot = new Discord.Client();

// prefix for commands
const prefix = "%";

bot.on("ready", () => {
  console.log("bot is online now");
  bot.user.setActivity("To you", { type: "Listening" });
});

bot.on("message", (msg) => {
  if (msg.content == "hello") {
    msg.reply("Howdy");
  }

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  // slice will remove the first n characters
  //  in this case 1, so '%hello' => 'hello'
  const command = msg.content.slice(prefix.length).toLowerCase();

  if (command === "mute") {
    // Checks if the messenger is the member of the voice channel
    if (msg.member.voice.channel) {
      let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {
        // I added the following if statement to mute everyone but the invoker:
        // if (member != msg.member)
        member.voice.setMute(true);
      }
      msg.channel.send("Hard muting all");
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  }
  if (command === "unmute") {
    // Checks if the messenger is the member of the voice channel
    if (msg.member.voice.channel) {
      let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {
        // I added the following if statement to mute everyone but the invoker:
        // if (member != msg.member)
        member.voice.setMute(false);
      }
      msg.channel.send("Unmuting all");
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  }
});

// if you are using the bot only at your server and code is not hosted then
//  u can post the token as a string
bot.login(process.env.TOKEN);
