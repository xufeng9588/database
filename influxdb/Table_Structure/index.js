const rates = {
    database: 'data',
    tableName: 'rates',
    host: 'localhost',
    field: {
        exchange: 's',
        instrument_ID: 's',
        pair: 's',
        Rate: 'f',
        type: 's',
        time: 'f'
    }
}
const line = {
    database: 'Line',
    tableName: 'Line',
    host: 'localhost',
    field: {
        type: 's',
        time: 'f',
        result: 'f',
        time_interval: 's'
    }
}
const kLine = {
    database: 'data',
    tableName: 'kLine',
    host: 'localhost',
    field: {
        time: 'f',
        exchange: 's',
        instrument_ID: 's',
        pair: 's',
        type: 's',
        open: 's',
        high: 's',
        low: 's',
        close: 's'
    }
}

module.exports = {
    rates,
    line,
    kLine
}