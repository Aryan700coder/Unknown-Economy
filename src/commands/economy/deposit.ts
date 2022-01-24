import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import balanceConfig from "../../models/balance.config";

export default new Command({
  name: "deposit",
  description:
    "Deposit some money into your bank...",
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

    let { wallet, maxBank } = data;

    if(amount > wallet) return interaction.followUp({
        content: "Your amount must not be greater then wallet"
    });

    if(amount < 0) return interaction.followUp("You cannot deposit money less then 0");

    if(amount > maxBank) return interaction.followUp({
        content: "You cannot add more money due to bank limit.\nYou can chat and use commands to increase bank space"
    })
      try {
          await balanceConfig.findOneAndUpdate({ userId: interaction.user.id }, {
              $inc: {
                  wallet: -amount,
                  bank: amount
              }
          })
      } catch {
          console.error
      }

      return interaction.followUp({
          embeds: [new MessageEmbed()
        .addFields([
            {
                name: "Deposited",
                value: `\`\`\`yaml\n⏣${amount.toLocaleString()}\`\`\``
            }
        ])
    .setColor("RANDOM")]
      })
  },
});
