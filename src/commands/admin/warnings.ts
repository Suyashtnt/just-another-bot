import Command from '../../command';
import { GuildMember, MessageEmbed } from 'discord.js';

export default class WarningsCommand extends Command {
	constructor() {
		super('warnings', {
			aliases: ['warns', 'warnings'],
			args: [
				{
					id: 'user',
					type: 'member',
				},
			],
			userPermissions: ['ADMINISTRATOR'],
			description: {
				text: 'gets warnings for a user',
				usage: 'warnings [@user]',
			},
			category: 'admin',
		});
	}

	async exec(msg, args: { user: GuildMember }) {
		const warnings: { guildId: String; msg: String; id: string }[] = await (
			await this.client.userSettings.get(args.user.user.id, 'warns', [])
		).filter((val) => val.guildId === args.user.guild.id);
		console.log(JSON.stringify(warnings));
		const embed = new MessageEmbed().setTitle(
			`warnings for ${args.user.displayName}`,
		);

		for (let warning of warnings) {
			console.log(JSON.stringify(warning));

			embed.addField(warning.id, warning.msg, false);
		}

		msg.channel.send(embed);
	}
}