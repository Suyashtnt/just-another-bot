import Command from '../../command';
import { BaseGuildEmoji, Message } from 'discord.js';

export default class DownloadEmojiCommand extends Command {
	constructor() {
		super('downloadEmoji', {
			aliases: ['dm', 'download', 'downloadEmoji'],
			args: [
				{
					id: 'emoji',
					type: 'emoji',
				},
			],
			description: {
				text: 'Sends the link of an emoji in this guild',
				usage: 'downloadEmoji [emoji]',
			},
			category: 'emoji',
			channel: 'guild',
		});
	}

	async exec(msg: Message, { emoji }: { emoji: BaseGuildEmoji }) {
		if (!emoji)
			return await msg.channel.send(
				"emoji not found (default emojis don't work yet)",
			);

		await msg.channel.send(`here: ${emoji.url} (click to download)`);
	}
}
