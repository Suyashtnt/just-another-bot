import Command from '../../command';
import { GuildMember } from 'discord.js';

export default class DeleteWarnCommand extends Command {
	constructor() {
		super('deleteWarn', {
			aliases: ['deleteWarn', 'dw'],
			args: [
				{
					id: 'user',
					type: 'member',
				},
				{
					id: 'uuid',
				},
			],
			description: {
				usage: 'dw [@user] [uuid]',
				text:
					'deletes a warnings from a user. Get the UUID from the warnings command',
			},
			category: 'admin',
			userPermissions: ['ADMINISTRATOR'],
		});
	}

	async exec(msg, args: { user: GuildMember; uuid: string }) {
		try {
			const warnings: {
				guildId: String;
				msg: String;
				id: string;
			}[] = await this.client.userSettings.get(args.user.id, 'warns', null);
			if (!warnings) return await msg.channel.send("that user doesn't exist lol");
			const newWarns = warnings.filter((val) => val.id != args.uuid);
			if (newWarns === warnings)
				return await msg.channel.send('cannot find that warning!');
			await this.client.userSettings.set(args.user.id, 'warns', newWarns);
			return msg.channel.send(`removed!`);
		} catch (e) {
			await msg.channel.send(`oh no! ${e}`);
			console.log(e);
		}
	}
}
