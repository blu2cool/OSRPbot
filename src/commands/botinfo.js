const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  PermissionsBitField,
  PermissionFlagsBits
} = require("discord.js");
const {
  SlashCommandBuilder
} = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Credits for the developers on the Bot"),
  run: async (client, interaction) => {


    const help = new EmbedBuilder()
      .setAuthor({name: `${client.user.username} | Gulf Coast Roleplay `, iconURL: 'https://cdn.discordapp.com/attachments/1255556456711847937/1255556574152491039/Gold_Coast_PFP.png'})
      .setDescription(` ${client.user.username} Is an open source utilities system bot developed by Blu Development \n\nClick the button below to view the Gulf Coast Roleplay Discord featuring the best serious roleplay server on FiveM\n\n *Or click [here](https://discord.gg/gulfcoastrp) to view the server*`)
      .setColor(0x65a4d8)
      .setImage('https://cdn.discordapp.com/attachments/1255556456711847937/1255556559631683694/Gold_Coast_BG.png')
      .setFooter({
        text: 'Blu Development',
        iconURL: 'https://cdn.discordapp.com/attachments/1255556456711847937/1255556574152491039/Gold_Coast_PFP.png'
      });
    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        //.setCustomId('')
        .setLabel('Gulf Coast Roleplay')
        .setEmoji('1083979315328335944')
        .setURL('https://discord.gg/gulfcoastrp')
        .setStyle('Link'),
      );
    //Do not remove credits!
    interaction.reply({embeds: [help], components: [button], ephemeral: false})
  }
};
