import mongoose from 'mongoose';

export const connect = () => {

    const url: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatbot-db';
    console.log("process.env.MONGODB_URI ::: " + process.env.MONGODB_URI);

    mongoose.connect(url);

    mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Error connecting to database  ", err);
    });
}

export const disconnect = (): void => {

    if (!mongoose.connection) {
        return;
    }

    mongoose.disconnect();
};
