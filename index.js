// init = require("./init");

app = require("./app");

const db = require('./models')
db.sequelize.sync().then((e)=>console.log("afasfsaf"))
const port = 5550;
app.listen(port, () => {
  
  console.log("Connected on http://localhost:" + port);
});
