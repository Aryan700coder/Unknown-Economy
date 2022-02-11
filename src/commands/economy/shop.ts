import { Command } from "../../structures/Command";
import items from "../../util/shopItems";
import Discord from "discord.js";
import paginationEmbed from "../../util/pagination" 
export default new Command({
  name: "shop",
  description: "Returns all buyable items from shop!",
  run: async ({ interaction, client }) => {
    if (items.length === 0) return;

    const shopList = items
      .map(value => {
        return `> ${value.emoji} | **${value.name}** - **⏣${value.price.toLocaleString()}**\n   <:reply:931114100719747092> \`${value.summary}\``
      });

    const pages = [];

    const button1 = new Discord.MessageButton()
                .setCustomId('previousbtn')
                .setEmoji("⬅️")
                .setStyle('SECONDARY');

const button2 = new Discord.MessageButton()
                .setCustomId('nextbtn')
                .setEmoji("➡️")
                .setStyle('SECONDARY');

    items.forEach((value, n) => {
      pages.push(new Discord.MessageEmbed()
        .setTitle("> __Shop Items__")
                    .setDescription(`> ${value.emoji} | **${value.name}** - **⏣${value.price.toLocaleString()}**\n   <:reply:931114100719747092> \`${value.summary}\``))
    });

    const buttonList = [
      button1,
      button2,
    ];

    paginationEmbed(interaction, pages, buttonList, 5000);

    /*const embed = new Discord.MessageEmbed()
      .setTitle("**Shop Items**")
      .setDescription(`\`\`\`yaml\nWrite /buy <item name>\`\`\`\n${shopList.join("\n")}`)
      .setColor("NOT_QUITE_BLACK")

    interaction.followUp({
      embeds: [embed]
    });*/


  }
});