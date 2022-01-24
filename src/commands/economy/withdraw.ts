import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import balanceConfig from "../../models/balance.config";

export default new Command({
  name: "withdraw",
  description:
    "Withdraw some money from your bank...",
  defaultPermission: true,
  options: [
      {
          name: "amount",
          type: "INTEGER",
          description: "Amount to deposit",
          min_value: 1,
          required: true,
      }
  ],
  run: async ({ interaction }) => {

    let amount = interaction.options.getInteger("amount", true);

    let data = await balanceConfig.findOne({ userId: interaction.user.id });

    let { wallet } = data;

    if(amount > wallet) return interaction.followUp({
        content: "Your amount must not be greater then wallet"
    });

    if(amount < 0) return interaction.followUp("You cannot deposit money less then 0");
      try {
          await balanceConfig.findOneAndUpdate({ userId: interaction.user.id }, {
              $inc: {
                  wallet: amount,
                  bank: -amount
              }
          })
      } catch {
          console.error
      }

      return interaction.followUp({
          embeds: [new MessageEmbed()
        .addFields([
            {
                name: "Withdrawn",
                value: `\`\`\`yaml\n⏣${amount.toLocaleString()}\`\`\``
            }
        ])
    .setColor("RANDOM")]
      })
  },
});
