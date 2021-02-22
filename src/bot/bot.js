// Required Modules
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const { getConfig } = require("../../config");

// Create a new Discord client
const client = new Discord.Client();

// set up commands
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(path.resolve(__dirname, "./commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const boot = (botToken) => {
  // get config
  const { token, prefix } = getConfig(botToken);
  // when the client is ready, run this code
  // this event will only trigger one time after logging in
  client.once("ready", () => {
    console.log("Ready!");
  });

  // All code that uses the message outside of this block must be passed the message
  client.on("message", (message) => {
    // Bail out if message does not start with the prefix or is written by the bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
      message.reply("Emby is sorry, but that command doesn't exist.");
      return;
    }

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("there was an error trying to execute that command!");
    }
  });

  // login to Discord with your app's token
  client.login(token);
};

module.exports = {
  run: boot,
};
