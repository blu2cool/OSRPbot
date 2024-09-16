const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleadd')
        .setDescription('Assign a role to a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to assign the role to')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to assign to the user')
                .setRequired(true)),

    async execute(interaction) {
        // Define the required role ID
        const requiredRoleId = '1180995067339616278'; // Replace with the role ID you want to require

        // Check if the user has the required role
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({
                content: 'You do not have the required role to use this command.',
                ephemeral: true
            });
        }

        const targetUser = interaction.options.getUser('target');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(targetUser.id);

        // Check if the user has permission to manage roles
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({
                content: 'You do not have permission to manage roles.',
                ephemeral: true
            });
        }

        // Check if the bot has permission to manage roles
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({
                content: 'I do not have permission to manage roles.',
                ephemeral: true
            });
        }

        // Check if the bot’s role is high enough to manage the target role
        if (role.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({
                content: 'I cannot assign this role because it is higher than my highest role.',
                ephemeral: true
            });
        }

        try {
            await member.roles.add(role);

            // Create an embedded message to confirm the role assignment
            const embed = new EmbedBuilder()
                .setTitle('Role Assigned')
                .setDescription(`${role.toString()} successfully given to ${targetUser.toString()}.`)
                .setColor(0x00FF00)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error trying to assign the role.',
                ephemeral: true
            });
        }
    }
};
