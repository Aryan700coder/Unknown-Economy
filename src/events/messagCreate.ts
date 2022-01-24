import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";
import balanceConfig from "../models/balance.config";

export default new Event("messageCreate", async (message) => {
    const data = await balanceConfig.findOne({ userId: message.author.id });

    if(!data) {
        await balanceConfig.create({
            userId: message.author.id,
        });
    };

    const randomAmt = Math.floor(Math.random() * 110) + 1;

    await balanceConfig.findOneAndUpdate({ userId: message.author.id }, {
        $inc: {
            maxBank: randomAmt,
        }
    })
});
