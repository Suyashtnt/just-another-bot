import { Command as old, CommandOptions } from 'discord-akairo';
import { Client } from './client';

export default class Command extends old {
	public constructor(id: string, options?: cmdOptions) {
		super(id, options);
	}
	client: Client;
	description: {
		text: string;
		usage: string;
	};
}

interface cmdOptions extends CommandOptions {
	description: {
		text: string;
		usage: string;
	};
}
