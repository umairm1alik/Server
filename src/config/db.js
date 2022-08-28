var mongoose = require("mongoose");

// const setupDB = () => {
//   console.log("process.env.DB", process.env.DB);
//   mongoose.connect(
//     process.env.DB,
//     function (err) {
//       if (err) throw err;
//       console.log("successfully connected with database");
//     }
//   );
// };
const setupDB = async () => {
    try {
      const DB_OPTIONS = {
        dbName: "Hackathon"
      }
      await mongoose.connect(process.env.DB, DB_OPTIONS)
      console.log('Connected Successfully...')
    } catch (error) {
      console.log(error)
    }
  }

module.exports = setupDB;