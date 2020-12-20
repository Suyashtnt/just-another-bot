import { Message, MessageEmbed } from 'discord.js';
import Command from '../../command';

export default class ServerInfoCommand extends Command {
	constructor() {
		super('serverInfo', {
			aliases: ['serverInfo', 'si'],
			description: {
				text: 'servers info',
				usage: 'serverInfo',
			},
			category: 'info',
			channel: 'guild',
		});
	}

	async exec(msg: Message) {
		const guild = await msg.guild.fetch();
		const embed = new MessageEmbed()
			.setTitle(`Info for ${guild.name}`)
			.setThumbnail(guild.iconURL());

		embed.addField(
			'General Info',
			`${
				guild.owner
					? `Owner: ${guild.owner.displayName}(${guild.owner.user.username}${guild.owner.user.discriminator})`
					: ''
			}
		ID: ${guild.id}
		Description: ${guild.description ? guild.description : 'No desc'}
		Large Guild: ${guild.large ? 'yes' : 'no'}
		Icon Url: [Click me](${guild.iconURL()})
		Region: ${guild.region}
		`,
			true,
		);

		embed.addField(
			'Boost Info',
			`Boost Level: ${guild.premiumTier}
		Boosts: ${
			guild.premiumSubscriptionCount ? guild.premiumSubscriptionCount : 'no boosts'
		}
		Vanity url: ${guild.vanityURLCode ? guild.vanityURLCode : 'no URL'}
		Vanity uses: ${guild.vanityURLUses ? guild.vanityURLUses : 0}
		Banner: ${guild.bannerURL() ? guild.bannerURL() : 'no banner url'}
		`,
			true,
		);

		try {
			const members = await guild.members.fetch();

			embed.addField(
				'Stats',
				`Members: ${members.filter((val) => !val.user.bot).size}
			Bots: ${members.filter((val) => val.user.bot).size}
			Total: ${members.size}
			Emojis: ${guild.emojis.cache.size}
		`,
				true,
			);
		} catch (e) {
			console.log(e);
		}

		embed.addField(
			'Channels',
			`Total: ${guild.channels.cache.size}
		Voice Channels: ${guild.channels.cache.filter((val) => !val.isText()).size}
		Text Channels: ${guild.channels.cache.filter((val) => val.isText()).size}
		`,
			true,
		);

		msg.channel.send(embed);
	}
}
