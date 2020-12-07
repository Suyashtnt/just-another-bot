import Command from '../../command';
import { Message, MessageEmbed } from 'discord.js';

export default class ProfileCommand extends Command {
	constructor() {
		super('profile', {
			aliases: ['profile', 'pf'],

			description: {
				text: 'gets info on your profile',
				usage: 'profile',
			},
			category: 'misc',
			channel: 'guild',
		});
	}

	async exec(msg: Message) {
		const embed = new MessageEmbed()
			.setTitle(`${msg.author.username}'s profile`)
			.addField('nickname', msg.member.nickname ? msg.member.nickname : 'no nick')
			.addField('joined at', msg.member.joinedAt)
			.addField('created at', msg.author.createdAt)
			.addField(
				'boosting since',
				msg.member.premiumSince ? msg.member.premiumSince : 'not boosting',
			)
			.setThumbnail(msg.author.displayAvatarURL())
			.setFooter('haha y e s');

		await msg.channel.send(embed);
	}
}
