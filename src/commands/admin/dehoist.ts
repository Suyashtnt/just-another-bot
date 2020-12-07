import Command from '../../command';
import {Message} from 'discord.js';

export default class DehoistCommand extends Command {
	constructor() {
		super('dehoist', {
			aliases: ['dehoist'],
			clientPermissions: ['MANAGE_NICKNAMES'],
			userPermissions: ['MANAGE_NICKNAMES'],
			description: {
				text: 'removes `!` from users names',
				usage: 'dehoist',
			},
			category: 'admin',
			cooldown: 1000 * 60 * 60 * 24,
			channel: 'guild',
		});
	}

	async exec(msg: Message) {
		const members = await msg.guild.members.fetch();

		for (let i = 0; i < 4; i++) {
			await Promise.all(
				members.map(async (member) => {
					if (member.displayName.startsWith('!')) {
						try {
							await member.setNickname(
								member.displayName.startsWith('!')
									? member.displayName.split('!')[1]
									: member.displayName.split('! ')[1],
							);
						} catch (e) {
							msg.channel.send(`Oh no! ${e}`)
						}
					}
				}),
			);
		}
		await msg.channel.send('dehoisted!');
	}
}
