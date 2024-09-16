const { QuickDB } = require("quick.db");

module.exports = {
  name: 'messageCreate',
  execute: async (message) => {
    let client = message.client;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if (prefix == null) prefix = '-';
  }
};