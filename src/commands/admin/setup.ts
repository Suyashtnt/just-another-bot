import Command from '../../command';
import { Message, TextChannel } from 'discord.js';

export default class SetupCommand extends Command {
	constructor() {
		super('setup', {
			aliases: ['setup'],
			userPermissions: ['MANAGE_GUILD'],
			args: [
				{
					id: 'chnl',
					type: 'textChannel',
					prompt: {
						start: 'what is your main/welcoming channel?',
						retries: 3,
						retry:
							"that isn't a channel in this server or not a channel at all. Please try again.",
					},
				},
				{
					id: 'warning',
					type: 'bool',
					prompt: {
						start:
							'would you like to see how many warns a user has before they enter this server?',
						retry: "that's not a boolean. Please type `yes` or `no`",
						retries: 3,
					},
				},
			],
			description: {
				text: 'sets up this bot',
				usage: 'setup',
			},
			channel: 'guild',
			category: 'admin',
		});
	}

	async exec(msg: Message, args: { chnl: TextChannel; warning: boolean }) {
		console.log(args.warning);

		try {
			await this.client.guildSettings.set(msg.guild.id, 'warning', args.warning);
			await this.client.guildSettings.set(msg.guild.id, 'channel', args.chnl.id);
		} catch (err) {
			return msg.channel.send(`FAILED! ${err}`);
		}
		await msg.channel.send('done!');
	}
}
