import mongoose from "mongoose";


mongoose.set("strictQuery", true);

const ConnectDb = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "database connection error:"));
    db.once("open", function () {
        console.log("Connected successfully");
    });
};

export default ConnectDb;