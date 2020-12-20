import Command from '../../command';
import { Message, MessageEmbed, PermissionResolvable } from 'discord.js';
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
				text: 'sends a help message',
				usage: 'help `[commandName?]`',
			},
			category: 'info',
			cooldown: 1000 * 60,
		});
	}

	async exec(message: Message, args: { commandName: string }) {
		const msg = await message.channel.send('Helping...');

		if (!args.commandName) {
			const embed = new MessageEmbed()
				.setTitle("Here's your help!")
				.setColor('#00FF00')
				.setFooter(
					'if a argument has a ? attached to it its optional. If a command name has a strikethrough format you dont have enough perms to run it.',
				);

			const prefix = await this.client.guildSettings.get(
				message.guild.id,
				'prefix',
				'r!',
			);

			this.handler.categories.map((category) =>
				embed.addField(
					category.id,
					`${category
						.map((command) => {
							const hasPerms = !message.member.hasPermission(
								<PermissionResolvable[]>command.userPermissions,
							);
							return `${hasPerms ? '~~' : ''}${prefix}${command.description.usage}${
								hasPerms ? '~~' : ''
							} | ${command.description.text}\n---------\n`;
						})
						.join('')}`,
					true,
				),
			);

			const sent = await message.channel.send(embed);
			await msg.delete();

			try {
				await sent.react('🗑');
				const waited = await sent.awaitReactions(
					(reaction, user) => {
						return (
							['🗑'].includes(reaction.emoji.name) && user.id === message.author.id
						);
					},
					{ max: 1, time: 60000, errors: ['time'] },
				);

				const reaction = waited.first();
				if (reaction.emoji.name !== '🗑')
					return await message.channel.send(
						"you reacted to something that isn't a 🗑",
					);
			} catch (e) {
				console.log(e);
			}

			await sent.delete();
			await message.channel.send('deleted help message');
		} else {
			const cmd = this.client.commandHandler.findCommand(args.commandName);
			if (!cmd) return msg.channel.send('I could not find that command');

			const userPerms = <PermissionResolvable[]>cmd.userPermissions
				? (<PermissionResolvable[]>cmd.userPermissions).map((val) => val.toString())
				: null;
			const userPermsString = userPerms
				? userPerms
						.map((item) => {
							return item[0].toUpperCase() + item.slice(1).toLowerCase();
						})
						.join(', ')
						.replace('_', ' ')
				: null;

			const clientPerms = <PermissionResolvable[]>cmd.clientPermissions
				? (<PermissionResolvable[]>cmd.clientPermissions).map((val) =>
						val.toString(),
				  )
				: null;
			const clientPermsString = clientPerms
				? clientPerms
						.map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase())
						.join(', ')
						.replace('_', ' ')
				: null;

			const embed = new MessageEmbed()
				.setTitle(`\`${cmd.aliases[0]}\` from \`${cmd.category}\``)
				.setDescription(cmd.description.text)
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
	}
}
