import Command from '../../command';
import {User} from "discord.js";

export default class BioCommand extends Command {
    constructor() {
        super('userBio', {
                aliases: ['userBio', "bio"],
                description: {
                    usage: "userBio [get|set] [@user? | your new bio]",
                    text: "gets a users bio or sets your own bio"
                },
                args: [
                    {
                        id: "type",
                        type: ["get", "set"],
                    },
                    {
                        id: "userOrBio",
                        type: (async (message, phrase) => {
                            if (message.content.split(" ")[1] === "get") {
                                return await message.mentions.users.array()[0].fetch()
                            } else if (message.content.split(" ")[1] === "set") return String(phrase)
                            return null
                        }),
                        match: "restContent"
                    }
                ],
                category: "misc"
            }
        )
    }

    async exec(msg, args: {
        type: "get" | "set",
        userOrBio: User | String
    }) {
        if (args.userOrBio instanceof User) {
            return await msg.channel.send(await this.client.userSettings.get(args.userOrBio.id, "bio", "no bio found :("))
        } else if (args.userOrBio) {
            await this.client.userSettings.set(msg.author.id, "bio", args.userOrBio)
            return await msg.channel.send("done!")
        } else {
            return await msg.channel.send("you did not provide a user or your new bio!")
        }

    }
}