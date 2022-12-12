import { connect } from "mongoose";

export default async () => {
  await connect(`mongodb://${process.env.MONGO_ADDRESS as string}`, {
    authSource: "admin",
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    dbName: "bulldogs",
  });
  console.log("Database Connected!");
};
