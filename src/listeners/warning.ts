import {Listener} from 'discord-akairo';
import {GuildChannel, GuildMember} from 'discord.js';
import {Client} from '../client';

export default class WarningListener extends Listener {
	constructor() {
		super('warningListener', {
			emitter: 'client',
			event: 'guildMemberAdd',
		});
	}

	async exec(member: GuildMember) {
		const guildWarning = await (this.client as Client).guildSettings.get(
			member.guild.id,
			'warning',
			false,
		);

		console.log(guildWarning);

		if (guildWarning) {
			const warnings: any[] = await (this.client as Client).userSettings.get(
				member.user.id,
				'warns',
				[],
			);

			if (warnings.length >= 5) {
				console.log('here');

				const id = await (this.client as Client).guildSettings.get(
					member.guild.id,
					'channel',
					null,
				);

				console.log(id);

				if (!id) return;
				const channel: GuildChannel = (await member.guild.fetch()).channels.resolve(id);

				console.log('here');

				if (!channel) return;

				console.log('here');

				if (channel.isText())
					await channel.send(`${member} has over 5 warnings in other servers!`);
			}
		}
	}
}
