import Command from '../../command';
import { Message, MessageEmbed } from 'discord.js';
import { formatMS } from '../../utils';

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
        message.channel.send(`Helping...`).then(async (msg) => {
            if (!args.commandName) {
                const embed = new MessageEmbed()
                  .setTitle('Here\'s your help!')
                  .setColor(`#00FF00`)
                  .setFooter('if a argument has a ? attached to it its optional');

                const prefix = await this.client.guildSettings.get(
                  message.guild.id,
                  'prefix',
                  'r!',
                );

                this.handler.categories.map((category) =>
                  embed.addField(
                    category.id,
                    `${category
                      .map(
                        (command) =>
                          `\`${prefix}${command.description.usage}\` - ${command.description.text}\n\n`,
                      )
                      .join('')}`,
                    true,
                  ),
                );

                await message.channel.send(embed);
                await msg.delete();
            } else {
                const cmd = this.client.commandHandler.findCommand(args.commandName);
                if (!cmd) return msg.channel.send('I could not find that command');

                // @ts-ignore
                let userPerms: string[] = cmd.userPermissions
                  ? cmd.userPermissions instanceof Array
                    ? cmd.userPermissions
                    : [cmd.userPermissions]
                  : [];
                const userPermsString = userPerms
                  .map((item) => {
                      return item[0].toUpperCase() + item.slice(1).toLowerCase();
                  })
                  .join(', ')
                  .replace('_', ' ');

                // @ts-ignore
                let clientPerms: string[] = cmd.clientPermissions
                  ? cmd.clientPermissions instanceof Array
                    ? cmd.clientPermissions
                    : [cmd.clientPermissions]
                  : [];
                const clientPermsString = clientPerms
                  .map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase())
                  .join(', ')
                  .replace('_', ' ');

                const embed = new MessageEmbed()
                  .setTitle(`\`${cmd.aliases[0]}\` from \`${cmd.category}\``)
                  .addField('Usage', cmd.description.usage)
                  .addField('Aliases', `\`${cmd.aliases.join('` | `')}\``)
                  .addField(
                    'Needed User Permissions',
                    userPermsString ? userPermsString : 'none',
                  )
                  .addField(
                    'Needed Bot Permissions',
                    `${clientPermsString ? clientPermsString : 'none'}`,
                  )
                  .addField('cooldown', cmd.cooldown ? formatMS(cmd.cooldown) : 'none')
                  .setFooter('if a argument has a ? attached to it its optional');
                await message.channel.send(embed);
                await msg.delete();
            }
        });
    }
}
