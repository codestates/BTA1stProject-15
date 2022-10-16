const mariadb = require('mariadb');
const db_config = require('../config/db-config.json')
const logger = require('../config/winston.js')

const pool = mariadb.createPool({
    host: db_config.host,
    user: db_config.user,
    port: parseInt(db_config.port),
    password: db_config.password,
    database: db_config.database,
    connectionLimit: parseInt(db_config.connectionLimit)
})

async function ConnectDB() {
	conn = await pool.getConnection(function (err, conn) {
        if(!err) {
          callback(conn);
        }
    });

	await conn.beginTransaction()

    logger.info('[db.js] connection mariadb!!')
	return conn
}

function DisConnectDB() {
    conn.release()
}


module.exports = {
    connectDB: ConnectDB,
    disconnectDB: DisConnectDB
}
