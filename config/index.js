const config = {
  mysql: {
    connectionLimit : 10,
    host: "112.64.158.146",
    port: 33306,
    user: 'root',
    password: 'aixiaoyao',
    database: 'blog'
  },
  jwtsecret: 'aixiaoyao',
  staticPath: "http://localhost:3000" 
}
module.exports = config;