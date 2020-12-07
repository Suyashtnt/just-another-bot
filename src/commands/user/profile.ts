import Command from '../../command';
import {GuildMember, Message, MessageEmbed} from 'discord.js';

export default class ProfileCommand extends Command {
	constructor() {
		super('profile', {
			aliases: ['profile', 'pf'],
			description: {
				text: 'gets a users profile',
				usage: 'profile `[@member?]`',
			},
			args: [
				{
					id: 'member',
					type: 'member',
					default: msg => msg.member
				}
			],
			category: 'user',
			channel: 'guild',
		});
	}

	async exec(msg: Message, {member}: { member: GuildMember }) {
		const user = member.user;
		const embed = new MessageEmbed()
			.setTitle(`${user.username}'s profile`)
			.addField('nickname', member.nickname ? member.nickname : 'no nick')
			.addField('joined at', member.joinedAt)
			.addField('created at', user.createdAt)
			.addField(
				'boosting since',
				msg.member.premiumSince ? msg.member.premiumSince : 'not boosting',
			)
			.setThumbnail(user.displayAvatarURL())
			.setFooter('haha y e s');

		await msg.channel.send(embed);
	}
}
