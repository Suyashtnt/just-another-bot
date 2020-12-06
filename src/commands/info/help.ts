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

				let userPerms = cmd.userPermissions ? cmd.userPermissions : [];
				if (userPerms) {
					//@ts-ignore
					userPerms.forEach(function (item: string, index: number) {
						const caseElement =
							item[0].toUpperCase() + item.slice(1).toLowerCase();
						console.log(caseElement);

						userPerms[index] = caseElement;
					});
				}
				//@ts-ignore
				const userPermsString = userPerms.join(', ');
				let userPermsStringSpaced = userPermsString.replace('_', ' ');

				let clientPerms = cmd.clientPermissions ? cmd.clientPermissions : [];
				//@ts-ignore
				clientPerms.forEach(function (item: string, index: number) {
					const caseElementelement =
						item[0].toUpperCase() + item.slice(1).toLowerCase();
					console.log(caseElementelement);
					clientPerms[index] = caseElementelement;
				});
				//@ts-ignore
				const clientPermsString = clientPerms.join(', ');
				let clientPermsStringSpaced = clientPermsString.replace('_', ' ');

				const _ = new MessageEmbed()
					.setTitle(`\`${cmd.aliases.join(', ')}\` - ${cmd.category}`)
					.addField('Usage: ', `**${cmd.description.usage}**`)
					.addField(
						'Needed User Permissions:',
						`${userPermsStringSpaced ? userPermsStringSpaced : 'none'}`,
					)
					.addField(
						'Needed Bot Permissions:',
						`${clientPermsStringSpaced ? clientPermsStringSpaced : 'none'}`,
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
