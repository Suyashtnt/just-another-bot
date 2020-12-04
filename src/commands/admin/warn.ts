import Command from '../../command';
import { v4 as uuid } from 'uuid';
import { GuildMember, Message } from 'discord.js';
import user from '../../models/user';

export default class WarnCommand extends Command {
	constructor() {
		super('warn', {
			aliases: ['warn'],
			args: [
				{
					id: 'user',
					type: 'member',
				},
				{
					id: 'info',
					match: 'restContent',
				},
			],
			description: {
				text: 'warns a user',
				usage: `warn [user] [reason]`,
			},
			category: 'admin',
			channel: 'guild',
			userPermissions: ['ADMINISTRATOR'],
		});
	}

	async exec(msg: Message, args: { user: GuildMember; info: string }) {
		const oldWarns = await this.client.userSettings.get(args.user.id, 'warns', null);
		await this.client.userSettings
			.set(
				args.user.id,
				'warns',
				oldWarns
					? [
							...oldWarns,
							{
								guildId: args.user.guild.id,
								msg: args.info,
								id: uuid(),
							},
					  ]
					: [
							{
								guildId: args.user.guild.id,
								msg: args.info,
								id: uuid(),
							},
					  ],
			)
			.catch(msg.channel.send);
		await msg.channel.send('Done');
	}
}
