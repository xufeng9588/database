const _ = require('lodash');
const influx = require('influxdb-nodejs');
const { rates } = require('./Table_Structure/index');
// const { getRates } = require('./index');

class influxLink {
    constructor(options) {
        this.options = options;
        this.init();
    }
    init() {
        this.linkDB();
    }
    linkDB() {
        const { database, host } = this.options;
        const dbName = database;
        // const tableName = 'rates';
        const client = new influx(`http://${host}:8086/${dbName}`)
        // {
        //     host: '10.1.10.41',
        //     port: 8086,
        //     protocol: 'http',
        //     username: '',
        //     password: '',
        //     database: data
        // }
        this.client = client;
    }
    async influxDB() {
        const { tableName, data, field } = this.options;
        const client = this.client;
        const fieldSchema = field;
        // console.log(fieldSchema, field, '...')
        const tagSchema = {
            // spdy: ['speedy', 'fast', 'slow'],
            // method: '*',
            // type: ['1','2','3'],
        };
        return new Promise(async (resolve, replace) => {
            client.schema(tableName, fieldSchema, tagSchema, {
                stripUnknown: true,
            });
            _.forEach(data, d => {
                const ms = d.time;
                const us = `${Math.ceil(process.hrtime()[1] / 1000)}`;
                const ns = `${ms}${_.padStart(us, '6', '0')}`;
                console.log(ms)
                client.write(tableName).tag({
                    // spdy: 'fast',
                    // method: 'GET',
                    // type: '1',
                })
                    .field(d)
                    .time(ns)
                    .then(() => console.info('write point success'))
                    .catch(console.error);
            })
            return
            await client.query(tableName)
                .where('name', 'largeOpenInt')
                // .where('method','GET')
                // .where('use','300','=')
                .then((data) => console.log('success', data.results[0].series[0]))
                .catch(console.error, 'err');
        })
    }
}

async function bb() {
    const test = new influxLink({
        database: rates.database,
        host: rates.host,
        data: [{
            date: 1636963200011,
            instrument_ID: 'BINANCE_BTC-USD_SWAP',
            pair: 'BTC-USD',
            type: 'SWAP',
            Rate: 0.0001,
            exchange: 'BINANCE'
        }, {
            date: 1636963200060,
            instrument_ID: 'BINANCE_BTC-USD_SWAP',
            pair: 'BTC-USD',
            type: 'SWAP',
            Rate: 0.0011,
            exchange: 'BINANCE'
        }],
        field: rates.field
    });
    // console.log(test)
    // const d = await test.influxDB();
}



module.exports = {
    influxLink
}
