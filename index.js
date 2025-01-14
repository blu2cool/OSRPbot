const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    ChannelManager,
    PermissionsBitField,
    guildMemberAdd
} = require("discord.js");
const client = new Client({
    intents: ['Guilds']
});

client.on("messageCreate", async message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //message array

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray(0);

})
const { QuickDB } = require(`quick.db`)
const db = new QuickDB();

const config = require("./config.json");
const {
    readdirSync
} = require("fs")

const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v10');

const path = require('path');

const MainPath = path.resolve(__dirname)

let token = config.token

client.commands = new Collection()

const rest = new REST({
    version: '10'
}).setToken(token);

//Slash command-handler
const commands = [];
readdirSync(`${MainPath}/src/commands`).forEach(async file => {
    const command = require(`./src/commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
})

console.log(`SecurityWatcher is Started and Ready to Go!`)

///////////////////////////////////////

client.on("ready", async () => {
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id), {
                body: commands
            },
        );
    } catch (error) {
        console.error(error);
    }
    //log(`${client.user.username} Is online!`);
})

//General event-handler
readdirSync('./src/events').forEach(async file => {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
})


client.login(token)