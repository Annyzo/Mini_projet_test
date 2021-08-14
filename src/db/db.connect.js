require("dotenv").config();
const mongoose = require("mongoose");

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const dsn = `${process.env.MONGOOSE_URL}`;

mongoose.connect(dsn, opts, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('')
    console.log('========================================')
    console.log(`    Mongoose connect on port ${process.env.MONGO_PORT}`);
    console.log('========================================')
  }
});
