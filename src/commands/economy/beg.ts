import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
import balanceConfig from "../../models/balance.config";
export default new Command({
  name: "beg",
  description:
    "Uh Oh, Beg for some quick money",
  defaultPermission: true,
  run: async ({ interaction }) => {
    let people = [
      "taylor swift",
      "drake",
      "dank memer",
      "fisherman",
      "your mum",
      "driver",
      "police",
      "Leonardo da Vinci",
      "Robert Downey Jr.",
      "Dwayne Johnson",
      "adele",
      "olivia rodrigo",
      "Travis Scott",
      "Cardi B",
      "Harry Styles",
      "Honey Bot",
      "mee7",
      "Dua Lipa",
      "Ed Sheeran",
      "Camila Cabello",
      "Shown Mendes",
      "Boba",
      "Scarlet Potato",
      "Rick Astley",
      "Random Bri'ish guy"
    ];

    let desc: any;
    let color: any;
    let chances = Math.floor(Math.random() * 3) >= 2 ? true : false
    if(chances == true) {
      color = "GREEN";
      let amount = Math.floor(Math.random() * (1+1500-400) + 400)
      desc = [
        `"here take ⏣${amount}"`,
        `"aww u poor little beggar, take ⏣${amount}"`,
        `"here take this ⏣${amount}"`,
        `"here take this ⏣${amount} coins"`,
        `you got ⏣${amount} for begging`,
        `Imagine begging and got ⏣${amount}`,
        `Woah u begged and got ⏣${amount}`,
        `You begged at stranger and got ⏣${amount}`,
        `You begged from a begger and got ⏣${amount}`
      ];
      try {
          await balanceConfig.findOneAndUpdate({ userId: interaction.member.id }, {
              $inc: {
                  wallet: amount
              }
          })
      } catch {

      }
    } else {
      color = "RED"
        let amount = Math.floor(Math.random() * (1+1500-400) + 400)
        desc = [
          `Imagine begging`,
          `lmao u get nothing.`,
          `ewww imagine begging for coins`,
          `"no."`,
          `You begged and you got nothing!`,
          `you got nothing from begging lol`,
          `go get a life! stop begging`,
          `"ew beggars!! go away!!"`,
          `"here take this ⏣${amount}.. Sike! you get nothing"`,
          `Stop begging!!`,
          `"Get a job and earn your own money"`
        ]
      }
  
      let embed = new MessageEmbed()
      .setTitle(`${people[Math.floor(Math.random() * people.length)]}`)
      .setDescription(desc[Math.floor(Math.random() * desc.length)])
      .setColor(color);
      interaction.followUp({embeds: [embed]})
  },
});
