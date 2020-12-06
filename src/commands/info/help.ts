import Command from '../../command';
import {Message, MessageEmbed} from 'discord.js';
import * as luxon from 'luxon';

export default class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            args: [
                {
                    id: 'commandName',
                },
            ],
            description: {
                text: 'Displays this message',
                usage: `help [commandname?]`,
            },
            category: 'info',
            cooldown: 1000 * 60,
        });
    }

    async exec(message: Message, args: any) {
        message.channel.send(`Helping...`).then((msg) => {
            if (!args.commandName) {
                const _ = new MessageEmbed()
                    .setTitle("Here's your help!")
                    .setColor(`#00FF00`)
                    .setFooter('if a argument has a ? attached to it its optional');
                this.handler.categories.each((category) => {
                    _.addField(
                        category.id,
                        `${category
                            .map(
                                (command) =>
                                    `\`${this.client.guildSettings.get(
                                        message.guild.id,
                                        'prefix',
                                        'r!',
                                    )}${command.description.usage}\` - ${
                                        command.description.text
                                    }\n\n`,
                            )
                            .join('')}`,
                        true,
                    );
                });
                message.channel.send(_);
                msg.delete();
            } else {
                const cmd = this.client.commandHandler.findCommand(args.commandName);
                if (!cmd) return msg.channel.send('cannot find that command');
                console.log(cmd.userPermissions);

                // @ts-ignore
                let userPerms: string[] = cmd.userPermissions ? cmd.userPermissions instanceof Array ? cmd.userPermissions : [cmd.userPermissions] : [];

                const userPermsString = userPerms.map((item) => {
                    return item[0].toUpperCase() + item.slice(1).toLowerCase();
                }).join(", ").replace("_", " ");

                // @ts-ignore
                let clientPerms: string[] = cmd.clientPermissions ? cmd.clientPermissions instanceof Array ? cmd.clientPermissions : [cmd.clientPermissions] : [];

                const clientPermsString = clientPerms.map((item) => {
                    return item[0].toUpperCase() + item.slice(1).toLowerCase();
                }).join(", ").replace("_", " ");

                const _ = new MessageEmbed()
                    .setTitle(`\`${cmd.aliases.join(', ')}\` - ${cmd.category}`)
                    .addField('Usage: ', `**${cmd.description.usage}**`)
                    .addField(
                        'Needed User Permissions:',
                        `${userPermsString ? userPermsString : 'none'}`,
                    )
                    .addField(
                        'Needed Bot Permissions:',
                        `${clientPermsString ? clientPermsString : 'none'}`,
                    )
                    .addField(
                        'cooldown',
                        cmd.cooldown
                            ? luxon.Duration.fromMillis(cmd.cooldown).toFormat(
                            "'hours: ' hh ' | minutes: ' mm ' | seconds: ' ss",
                            )
                            : 'none',
                    )
                    .setFooter('if a argument has a ? attached to it its optional');
                message.channel.send(_);
                msg.delete();
            }
        });
    }
}
