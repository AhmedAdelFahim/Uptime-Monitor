import {connect} from 'mongoose';
import {getConfig} from "./config";

const startDbConnection = async () => {
  try {
    await connect(getConfig().DB_URL, {authSource: "admin"});
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {startDbConnection};