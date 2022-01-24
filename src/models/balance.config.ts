import { Schema, model } from 'mongoose';

const balanceSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    wallet: { type: Number, default: 5000 },
    bank: { type: Number, default: 0 },
    maxBank: { type: Number, default: 1000},
});

export default model("userMoney", balanceSchema);