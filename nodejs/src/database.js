const database = require("mysql");

class Database {
  constructor(config) {
    this.db = database.createConnection(config);
    this.init();
  }

  init() {
    this.db.connect((err, result) => {
      if (err) throw err;
      console.log("Connected to database");

      const createTable = `
        CREATE TABLE IF NOT EXISTS people (
          id   INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL
        )
      `;

      this.db.query(createTable, (err) => {
        if (err) throw err;
        console.log("Table created successfuly");
      });
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Database;
