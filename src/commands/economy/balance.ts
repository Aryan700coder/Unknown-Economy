import { Command } from "../../structures/Command";
import { GuildMember, MessageEmbed } from "discord.js";
import balanceConfig from "../../models/balance.config";
export default new Command({
    name: "balance",
    description: "This command checks balance of the user you want or you can check your's balance",
    defaultPermission: true,
    userPermissions: ["KICK_MEMBERS"],
    options: [
        {
            name: "user",
            type: "USER",
            description: "Get Balance of a user or yourself.",
            required: false,
        },
    ],
    run: async ({ interaction }) => {
        const target = interaction.options.getMember("user", false) as GuildMember || interaction.member;

        if(target.user.bot) return interaction.followUp("You cannot check balance of a bot")

        const data = await balanceConfig.findOne({ userId: target.user.id });

        if(!data) return interaction.followUp("Hey the user you provided dosen't have anything lol")
        else {
            const { wallet, bank, maxBank } = data;

            const embed = new MessageEmbed()
            .setTitle(`${target.user.username}'s balance`)
            .setDescription(`\`\`\`yaml\nWallet: ⏣ ${wallet}\nBank: ⏣ ${bank}/${maxBank}\`\`\``)
            .setColor('DARK_BUT_NOT_BLACK')
            .setFooter({
                text: "😏"
            })
            .setTimestamp()

            interaction.followUp({
                embeds: [embed]
            })
        }
    }
});
