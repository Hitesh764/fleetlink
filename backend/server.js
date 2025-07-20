const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require("dotenv")

dotenv.config();




mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
