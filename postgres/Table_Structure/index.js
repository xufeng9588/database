const column = {
    database: 'data',
    tableName: 'rates',
    host: 'localhost',
    field: 'exchange,instrument_ID,pair,type,Rate,time',
    values: '$1, $2, $3, $4, $5, $6'
}
const linePG = {
    database: 'postgres',
    tableName: 'line',
    host: 'localhost',
    field: 'time,time_interval,type,result',
    values: '$1, $2, $3, $4'
}
const kLinePG = {
    database: 'data',
    tableName: 'kLine',
    host: 'localhost',
    field: 'time,exchange,instrument_ID,pair,type,open,high,low,close',
    values: '$1, $2, $3, $4, $5, $6, $7, $8, $9'
}



module.exports = {
    column,
    linePG,
    kLinePG
}