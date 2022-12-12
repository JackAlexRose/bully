import { connect } from "mongoose";

export default async () => {
  const mongoUri = mongoUriBuilder(
    process.env.MONGO_USER as string,
    process.env.MONGO_PASS as string,
    process.env.MONGO_ADDRESS as string
  );

  await connect(mongoUri);
  console.log("Database Connected!");
};

const mongoUriBuilder = (user: string, pass: string, address: string) => {
  return `mongodb://${user}:${pass}@${address}/bulldogs?authMechanism=DEFAULT`;
};
