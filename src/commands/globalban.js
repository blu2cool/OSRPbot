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
const config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("globalban")
    .setDescription("Global Ban the specified user across all associated servers")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user to global ban')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('The reason for the ban')
      .setRequired(true)),




  run: async (client, interaction) => {
    global.BanCount = client.guilds.cache.size
    var Target = interaction.options.getUser('user')
    var Reason = interaction.options.getString('reason')

    await interaction.deferReply({
      ephemeral: false
    })




    const NotifyUser = new EmbedBuilder()
      .setAuthor({
        name: `${client.user.username} | Global Ban System `,
        iconURL: 'https://cdn.discordapp.com/attachments/656247601972248595/1271447894024650793/filled-logo.png'
      })
      .setDescription(`**You have been global banned** \n\nYou have been banned from all associated guilds \n\n Ban Reason: \`${Reason}\`\n Guild ban count: \`${BanCount}\`\n\n *Note we cannot ban or unban you, we are simply the developers of the bot*`)
      .setColor(0x65a4d8)
      .setImage('https://media.discordapp.net/attachments/656247601972248595/1271582516335214645/main_logo_optimized.png')
      .setFooter({
        text: 'Developed by Blu',
        iconURL: 'https://cdn.discordapp.com/attachments/656247601972248595/1271447894024650793/filled-logo.png'
      });

      let notifybutton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel('Appeal Discord')
        .setEmoji('1083979315328335944')
        .setURL('https://discord.gg/QaCSCGJkNC')
        .setStyle('Link'),
      );

      
        client.users.send(Target.id,{embeds: [NotifyUser],components: [notifybutton]})
        .catch(() => console.log('Could not DM notify user!'))



    function MainFunction() {
      client.guilds.cache.forEach(async (guild) => {


        //if user is in the guild
        try {
          var guildmember = await guild.members.fetch(Target.id);
          //console.log(`${guild.name} - ${guild.id} - ${guildmember}`)

          //if bannable
          if (guildmember.bannable === true) {
            guildmember.ban({
              reason: `${Reason} - ${interaction.user.username}#${interaction.user.discriminator} - ${interaction.user.id} `
            })
          }

          //if bannable else statement
          else {
            global.BanCount = BanCount - 1
            //console.log(`There was an error when banning: ${Target.username}#${Target.discriminator} from ${guild.name}`); 
            //move to bannable else statement 
            const BanFailed = new EmbedBuilder()
              .setAuthor({
                name: `${client.user.username} | Old South Roleplay `,
                iconURL: 'https://cdn.discordapp.com/attachments/656247601972248595/1271447894024650793/filled-logo.png'
              })
              .setDescription(`**Failed to ban** \`${Target.username}#${Target.discriminator}\` **in** \`${guild.name}\``)
              .setColor(0x65a4d8)
              .setImage('https://media.discordapp.net/attachments/656247601972248595/1271582516335214645/main_logo_optimized.png')
              .setFooter({
                text: 'Developed by Blu Development',
                iconURL: 'https://cdn.discordapp.com/attachments/656247601972248595/1271447894024650793/filled-logo.png'
              });

            function BanFailList() {
              interaction.followUp({
                embeds: [BanFailed],
                ephemeral: true
              })
            }
            setTimeout(BanFailList, 4000)
          }
        }
        //if user is in catch error
        catch (e) {
          guild.members.ban(Target, {
            reason: `${Reason} - ${interaction.user.username}#${interaction.user.discriminator} - ${interaction.user.id}`
          })
        }



      }, );


      function BanSuccessFunc() {
        //console.log(BanCount)
        let BanSuccess = new EmbedBuilder()
          .setAuthor({
            name: `${client.user.username} | Old South Roleplay `,
            iconURL: 'https://cdn.discordapp.com/attachments/656247601972248595/1271447894024650793/filled-logo.png'
          })
          .setDescription(`**Global banning :**  ${Target.username}#${Target.discriminator} \n **Discord ID :** ${Target.id}\n**Discord :** <@${Target.id}> \n\n \n\n **Ban Reason :** \`${Reason}\`\n *Banned From ${BanCount} out of ${client.guilds.cache.size} guilds*`)
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
            .setURL('https://discord.gg/QaCSCGJkNC')
            .setStyle('Link'),
          );

        //Do not remove credits!

        interaction.editReply({
          embeds: [BanSuccess],
          components: [button],
          ephemeral: false
        }), 3000
      }


      setTimeout(BanSuccessFunc, 3000, 'funky');
    }
    setTimeout(MainFunction, 2000)
  }


};
