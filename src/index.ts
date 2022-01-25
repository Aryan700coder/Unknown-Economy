require("dotenv").config();
import { ExtendedClient } from "./structures/Client";
import connectToDb from './structures/Mongoose';
export const client = new ExtendedClient();
import dotenv from 'dotenv';

dotenv.config();
client.start();
connectToDb(process.env.mongouri);

/**
 * ;-;
 */