import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: "help",
    description: "Help command",
    run: async ({ interaction, client }) => {
        const command = client.commands.map(cmd => `\`${cmd.name}\``);

        const embed = new MessageEmbed()
        .setTitle(`Information of **__${client.user.username}__**`)
        .setDescription(`💪 **__Features__**\n> **${client.commands.size}+ Commands**\nFree, Meaning you don't need to pay anything\`\`\`yaml\nAre you new to this bot?\nWrite /guide for guide on how to use this bot.\`\`\``)
        .addField("Commands for Honey Bot", `${command.join(" | ")}`, true)
        .setColor("BLURPLE")
        .setFooter({
            text: "Honey Bot Op"
        })

        interaction.followUp({
            embeds: [embed]
        })
    }
});
