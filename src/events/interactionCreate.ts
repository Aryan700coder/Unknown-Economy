import { CommandInteractionOptionResolver, Permissions } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";
import balanceConfig from "../models/balance.config";
import * as colors from 'colors'

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            return console.log("[Command Logger] : That Command dosn't exist")
        }

        const userData = await balanceConfig.findOne({ userId: interaction.user.id });

        const randomAmt = Math.floor(Math.random() * 110) + 1;

    await balanceConfig.findOneAndUpdate({ userId: interaction.user.id }, {
        $inc: {
            maxBank: randomAmt,
        }
    })

        if(!userData) {
            await balanceConfig.create({
                userId: interaction.user.id,
            });
        }

        console.log(`[Command Logger] : ${interaction.user.username} used ${interaction.commandName} command!`)

        try {
            command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedInteraction
            });

        } catch (e) {
            await interaction.followUp({
                content: "Oops got a error",
                ephemeral: true,
            });

            console.log(e)
        }

        
    }
});
