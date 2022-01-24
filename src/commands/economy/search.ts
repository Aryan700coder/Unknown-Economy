const locations = [
    {
      name: "car",
      messages: ["You found [amount] in your car! 🚙", "you left [amount] in your car!", "you checked in your car and found [amount]", "you found [amount] under your car seat", "you searched your car and found [amount]!", "you found [amount] somewhere in the car", "you searched and found [amount] in the car"]
    },
    {
      name: "grass",
      messages: ["You found [amount] in the grass!", "You found [amount], I wonder if the dog shat these out", "You searched the grass and found [amount]!", "you found [amount] somewhere in the grass", "you searched and found [amount] in the grass"]
    },
    {
      name: "bathroom",
      messages: ["You searched the bathroom and found [amount]", "You found [amount] in your bathroom! What were you doing in there <:pepe_slam:864656057078513725>", "You found [amount] in your bathtub xD", "You found [amount] in your sink!", "you found [amount] somewhere in the bathroom", "you searched and found [amount] in the bathroom"]
    },
    {
      name: "dumpster",
      messages: ["someone left [amount] in the dumpster", "You found [amount] in the dumpster", "you found [amount] somewhere in the dumpster", "you searched in the dumpster and found [amount]!", "you searched and found [amount] in the dumpster"]
    },
    {
      name: "sewer",
      messages: ["you searched the sewer and found [amount]", "you found [amount] in the sewer!", "you searched and found [amount] in the sewer"]
    },
    {
      name: "park",
      messages: ["you searched the park and found [amount]", "you found [amount] in the park!", "you searched and found [amount] in the park", "someone left [amount] in the park!"]
    },
    {
      name: "carpet",
      messages: ["you searched the carpet and found [amount]", "you found [amount] under the carpet!", "you searched and found [amount] under the carpet", "someone left [amount] under the carpet, I wonder how long its been there"]
    },
    {
      name: "pocket",
      messages: ["you searched the pocket and found [amount]", "you found [amount] in the pocket!", "you searched and found [amount] in the pocket"]
    },
    {
      name: "washer",
      messages: ["you searched the washer and found [amount]", "you found [amount] in the washer!", "you searched and found [amount] in the washer", "someone left [amount] in the washer"]
    },
    {
      name: "coat",
      messages: ["you searched the coat and found [amount]", "you found [amount] in the coat!", "you searched and found [amount] in the coat", "You found [amount], wonder how long that's been there!"]
    }
];

import { Command } from "../../structures/Command";
import { MessageEmbed, MessageButton, MessageActionRow } from "discord.js";
import balanceConfig from "../../models/balance.config";

export default new Command({
  name: "search",
  description:
    "Search any location to get money",
  defaultPermission: true,
  run: async ({ interaction }) => {
      let data = await balanceConfig.findOne({ userId: interaction.user.id });

      const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);

    let search1 = new MessageButton()
    .setCustomId(`${chosenLocations[0].name}`)
    .setStyle(`PRIMARY`)
    .setLabel(`${chosenLocations[0].name}`)

    let search2 = new MessageButton()
    .setCustomId(`${chosenLocations[1].name}`)
    .setStyle(`PRIMARY`)
    .setLabel(`${chosenLocations[1].name}`)

    let search3 = new MessageButton()
    .setCustomId(`${chosenLocations[2].name}`)
    .setStyle(`PRIMARY`)
    .setLabel(`${chosenLocations[2].name}`)

    let searchRow = new MessageActionRow()
    .addComponents(
      search1, search2, search3
    )

    let sentMsg = await interaction.channel.send({content: `**${interaction.user.username},** where do you want to search?\n*pick an option below to start searching that location!*`, components: [searchRow]})

    let collector = sentMsg.createMessageComponentCollector({
      time: 15000,
      max: 1
    })

    let amount = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
        collector.on('collect', async i => {
            let sendEmbed = async (location) =>  {
              let embed = new MessageEmbed()
              .setTitle(`${interaction.user.username} searched the ${location.name}`)
              .setDescription(location.messages[Math.floor(Math.random() * location.messages.length)].replace("[amount]", `⏣ ${amount.toLocaleString()}`))
              .setFooter({
                  text: interaction.user.username
              })
              .setTimestamp()
              .setColor("RANDOM")
              i.update({embeds: [embed], components: [], content: " "})
              try {
                await balanceConfig.findOneAndUpdate(
                    {
                      userId: interaction.user.id,
                    },
                    {
                      $inc: {
                        wallet: amount,
                      },
                    }
                  );
                } catch (err) {
                  console.log(err);
                }
            }
            if(i.user.id !== interaction.user.id) return i.reply({
              content: "You can't interact with this!",
              ephemeral: true
            })
            if(i.customId == chosenLocations[0].name) return sendEmbed(chosenLocations[0])
            if(i.customId == chosenLocations[1].name) return sendEmbed(chosenLocations[1])
            if(i.customId == chosenLocations[2].name) return sendEmbed(chosenLocations[2])
          })
  },
});
