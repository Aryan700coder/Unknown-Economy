import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: "help",
    description: "Help command",
    run: async ({ interaction, client }) => {

        const command = client.commands.map(cmd => {
            return `\`${cmd.name}\`\n<:reply:931114100719747092> ${cmd.description}`
        });

        const embed = new MessageEmbed()
        .setTitle(`All the commands for ${client.user.username}`)
        .setDescription(`${command.join("\n")}`)
        .setColor('RANDOM')

        interaction.followUp({
            embeds: [embed]
        })
    }
});
