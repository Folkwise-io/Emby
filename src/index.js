const dotenv = require("dotenv");
const { run } = require("./bot/bot");
dotenv.config();

run(process.env.BOT_TOKEN);
