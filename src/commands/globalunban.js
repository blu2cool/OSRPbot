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
      .setName("globalunban")
      .setDescription("Remove the Global Ban for the specified user across all associated servers")
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .setDMPermission(false)
      .addUserOption(option =>
        option.setName('user')
        .setDescription('The user to global UnBan')
        .setRequired(true)),
  
  
  
  
    run: async (client, interaction) => {
        var Target = interaction.options.getUser('user')

        client.guilds.cache.forEach(async (guild) => {
        guild.members.unban(Target)
          .catch(() => console.log(`Could not UnBan user in ${guild.name}`))
        })
  

          let UnBanSuccess = new EmbedBuilder()
            .setAuthor({
              name: `${client.user.username} | Old South Roleplay `,
              iconURL: 'https://cdn.discordapp.com/attachments/656247601972248595/1271447894024650793/filled-logo.png'
            })
            .setDescription(`**Global Un-Banned :**  ${Target.username}#${Target.discriminator} \n **Discord ID :** ${Target.id}\n**Discord :** <@${Target.id}> \n\n *Un-Banned From ${client.guilds.cache.size} guilds*`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${Target.id}/${Target.avatar}.webp`)
            .setColor(0x65a4d8)
            .setImage('https://media.discordapp.net/attachments/656247601972248595/1271582516335214645/main_logo_optimized.png')
            .setFooter({
              text: 'Developed by Blu Development',
              iconURL: 'https://cdn.discordapp.com/attachments/656247601972248595/1271447894024650793/filled-logo.png'
            });
          let button = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              //.setCustomId('')
              .setLabel('Appeal Discord')
              .setEmoji('1083979315328335944')
              .setURL('https://discord.gg/oldsouthrp')
              .setStyle('Link'),
            );
  
            interaction.reply({
                embeds: [UnBanSuccess],
                components: [button],
                ephemeral: false
              })
  }};
