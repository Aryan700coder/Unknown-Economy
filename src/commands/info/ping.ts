import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: "This command replies with pong!",
    run: async ({ interaction, client }) => {
        interaction.followUp(`Pong! | Ping is **${client.ws.ping}**`);
    }
});
