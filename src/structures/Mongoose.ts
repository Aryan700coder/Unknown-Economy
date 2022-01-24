import { connect }  from "mongoose";
/**
 * This is just a function to connect to mongodb Url.
 * You can use Localhost mongodb or a free cluster.
 */
export default async (url:string) => {
    connect(url).then(() => console.log("Connected to db")).catch(e => console.log(e))
}

/**
 * @info Credits to reconlx for command handler
 * @info Credit me if your using this for your bot.
 */