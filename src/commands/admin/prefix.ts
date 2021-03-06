import Command from '../../command';
import { Message } from 'discord.js';

export default class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix', 'prfx', 'prf'],
			args: [
				{
					id: 'prefix',
					default: 'r!',
				},
			],
			userPermissions: ['ADMINISTRATOR'],
			description: {
				text: 'sets the prefix',
				usage: 'prefix `[prefix?]`',
			},
			category: 'admin',
			channel: 'guild',
		});
	}

	async exec(
		msg: Message,
		args: {
			prefix: string;
		},
	) {
		const oldPrefix = this.client.guildSettings.get(msg.guild.id, 'prefix', 'r!');

		await this.client.guildSettings.set(msg.guild.id, 'prefix', args.prefix);
		return msg.channel.send(`Prefix changed from ${oldPrefix} to ${args.prefix}`);
	}
}
