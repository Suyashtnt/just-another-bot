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
				text: 'gets all warnings for a member',
				usage: 'warnings `[@user]`',
			},
			category: 'moderation',
		});
	}

	async exec(msg, args: { user: GuildMember }) {
		const warnings: { guildId: string; msg: string; id: string }[] = await (
			await this.client.userSettings.get(args.user.user.id, 'warns', [])
		).filter((val) => val.guildId === args.user.guild.id);
		console.log(JSON.stringify(warnings));
		const embed = new MessageEmbed().setTitle(
			`warnings for ${args.user.displayName}`,
		);

		for (const warning of warnings) {
			embed.addField(warning.id, warning.msg, false);
		}

		await msg.channel.send(embed);
	}
}
