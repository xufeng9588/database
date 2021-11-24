

const { Client, Pool } = require('pg');
const _ = require('lodash');
const { transformPG } = require('../../rates/utils/transform')
const { column } = require('./Table_Structure/index')

class postgresLink {
    constructor(options) {
        this.options = options;
        this.init();
    }
    init() {
        this.linkPG()
    }
    linkPG() {
        const { database, host } = this.options;
        const config = {
            user: 'postgres',
            host: host,
            database: database,
            password: 'postgres',
            port: 5432
        };
        const client = new Client(config);
        const pool = new Pool(config);
        this.client = client;
        this.pool = pool;
    }
    async pgDBinput() {
        const { tableName, field, data, values } = this.options;
        const client = this.client;
        const handleData = data;
        client.connect()
        var text = `INSERT INTO ${tableName}(${field}) VALUES(${values}) RETURNING *`
        _.forEach(handleData, async d => {
            var values = d;
            // console.log(values)
            try {
                const res = await client.query(text, values);
                console.log(res.rows[0])
            } catch (err) {
                console.log(err.stack)
            }
        })
    }
    async pgDBquery() {
        // queryData('localhost','SELECT * FROM public.users WHERE exchange = $1','BINANCE')
        const { query, keyword } = this.options;
        const pool = this.pool;
        pool.on('error', (err, client) => {
            console.log('Unexpected error on idle client', err);
            process.exit(-1)
        })
        pool.connect((err, client, done) => {
            if (err) throw err
            client.query(query, [keyword], (err, res) => {
                done()
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res.rows[0], 1)
                }
            })
        })
    }
}

async function cc() {
    const test = new postgresLink({
        database: column.database,
        host: column.host,
        data: [
            'BINANCE',
            'BINANCE_ETH-USD_SWAP',
            'ETH-USD',
            'SWAP',
            0.0001,
            1637020800000
        ],
        field: column.field,
        query: 'SELECT * FROM public.users WHERE exchange = $1',
        keyword: 'BINANCE'
    })
    const d = await test.pgDBinput();
}


module.exports = {
    postgresLink
}