import Command from '../../command';
import { GuildMember, Message } from 'discord.js';

export default class SuperYeetCommand extends Command {
	constructor() {
		super('superyeet', {
			aliases: ['ban', 'sy', 'superyeet'],
			args: [
				{
					id: 'user',
					type: 'member',
				},
				{
					id: 'reason',
					type: 'string',
					default: '[no reason]',
					match: 'restContent',
				},
			],
			description: {
				text: 'bans a user',
				usage: `superyeet [user] [reason?]`,
			},
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			category: 'admin',
		});
	}

	async exec(msg: Message, { user, reason }: { user: GuildMember; reason: string }) {
		await user.ban({
			days: 7,
			reason,
		});

		msg.channel.send('BANNED with reason: ' + reason);
	}
}
