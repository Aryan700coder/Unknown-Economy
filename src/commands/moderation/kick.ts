import { Command } from "../../structures/Command";
import { GuildMember } from "discord.js";
import Mongo from '../../structures/Mongoose';
export default new Command({
    name: "kick",
    description: "This command kicks the user you want",
    defaultPermission: true,
    userPermissions: ["KICK_MEMBERS"],
    options: [
        {
            name: "user",
            type: "USER",
            description: "Get User",
            required: true,
        },
        {
            name: "reason",
            type: "STRING",
            description: "This is a reason to kick a member",
            required: false,
        }
    ],
    run: async ({ interaction }) => {
        let target = interaction.options.getMember('user', true) as GuildMember;
        let reason = interaction.options.getString("reason", false) || "No reason provided";

        if(target.kickable) {
            target.kick(reason).then(() => {
               interaction.followUp({
                   content: `You kicked \`${target.user.tag}\`\nReason: **${reason}**`,
                   ephemeral: true,
               })
            });
        } else {
            interaction.followUp({
                content: "That user is not kickable",
                ephemeral: true,
            })
        }
    }
});
