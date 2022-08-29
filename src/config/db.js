var mongoose = require("mongoose");

const settingDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "Hackathon"
    }
    await mongoose.connect(process.env.DATA_BASE_URL, DB_OPTIONS)
    console.log('Connected Successfully...')
  } catch (error) {
    console.log(error)
  }
}

module.exports = settingDB;