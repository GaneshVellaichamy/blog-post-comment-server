const mySql = require('mysql');
var DBConfig = {

    blogPostSqlDB: mySql.createPool({
        host: 'sql12.freemysqlhosting.net',
        user: 'sql12599765',
        password: 'Du4jqvGgN6',
        database: 'sql12599765',
    })
};
module.exports = DBConfig;