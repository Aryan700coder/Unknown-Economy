import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import balanceConfig from "../../models/balance.config";

export default new Command({
  name: "give",
  description:
    "Share some money to friends",
  defaultPermission: true,
  options: [
      {
          name: "target",
          description: "Who you wanna give money?",
          type: "USER",
          required: true
      },
      {
        name: "amount",
        type: "INTEGER",
        description: "Amount to deposit",
        min_value: 1,
        required: true,
    }
  ],
  run: async ({ interaction }) => {
      let data = await balanceConfig.findOne({ userId: interaction.user.id });
      let target = interaction.options.getUser("target", true);
      let amount = interaction.options.getInteger("amount", true);

      

      if(target.bot) return interaction.followUp("You cannot give money to bots.");
      if(target.id === interaction.user.id) return interaction.followUp("You cannot give yourself money.");

      if(amount > data.wallet) return interaction.followUp({
        content: "Your amount must not be greater then wallet"
    });

    if(amount < 0) return interaction.followUp("You cannot give money less then 0");

      let targetData = await balanceConfig.findOne({ userId: target.id });

      if(!targetData) return interaction.followUp("Hey that user dosen't exist in our database.")

      try {
          await balanceConfig.findOneAndUpdate({ userId: target.id }, {
              $inc: {
                  wallet: amount,
              }
          })
          await balanceConfig.findOneAndUpdate({ userId: interaction.user.id }, {
            $inc: {
                wallet: -amount,
            }
        })
      } catch {
          console.error;
      }

      return interaction.followUp({
          embeds: [new MessageEmbed()
        .addField("Gaved", `\`\`\`yaml\n⏣${amount.toLocaleString()}\`\`\``)
    .setColor("RANDOM")]
      })
  },
});
