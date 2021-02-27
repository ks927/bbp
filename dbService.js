const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err) console.log('db error', err);

    console.log('db ', connection.state);
});

class DbService {

    // do not keep creating this class
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getUsers() {
        const queryString = "select * from User";

        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(queryString, (err, results) => {
                if(err) reject(new Error(err.message));
                
                resolve(results);
            });
        });

            return response;
        } catch(err) {
            console.log('api err', err)
        }


    }
}

module.exports = DbService;