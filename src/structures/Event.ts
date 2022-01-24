import { ClientEvents } from "discord.js";

export class Event<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        public run: (...args: ClientEvents[Key]) => any
    ) {}
}

/**
 * @info Credits to reconlx for command handler
 * @info Credit me if your using this for your bot.
 */