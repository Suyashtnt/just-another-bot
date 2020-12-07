import Command from '../../command';
import { GuildMember, Message } from 'discord.js';

export default class YeetCommand extends Command {
	constructor() {
		super('yeet', {
			aliases: ['kick', 'yeet'],
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			args: [
				{
					id: 'user',
					type: 'member',
				},
				{
					id: 'reason',
					default: '[no reason]',
					match: 'content',
				},
			],
			description: {
				text: 'kicks a user',
				usage: 'yeet [user] [reason?]',
			},
			category: 'admin',
		});
	}

	async exec(msg: Message, { user, reason }: { user: GuildMember; reason: string }) {
		await user.kick(reason);

		return msg.channel.send('yeeted with reason: ' + reason);
	}
}
