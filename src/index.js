const dotenv = require("dotenv");
const { boot } = require("./bot/bot");
dotenv.config();

boot(process.env.BOT_TOKEN);
