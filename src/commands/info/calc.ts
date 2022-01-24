import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";
import simple from 'simply-djs'
export default new Command({
    name: "calculator",
    description: "Simple calculator that uses button",
    async run({ interaction, client }) {
        simple.calculator(interaction, {
            embedColor: "BLUE",
            embedFooter: `${interaction.user.username}`,
            slash: true,
        })
    }
});

