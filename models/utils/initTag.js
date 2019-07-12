const connect = require("./connect");
const _sql =
    "INSERT tag(title, icon_name) VALUES ('react','react'),('vue','vue')";
  connect
    .querySQL(_sql)
    .then(rows => {
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
    });