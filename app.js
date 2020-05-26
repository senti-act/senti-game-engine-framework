const server=require('./server.js');
const dbConnection = require('./database/dbConnection');
var DbConnection = new dbConnection();
const port = process.env.NODE_PORT || 4000


server.listen(port, () => {
    console.log('Senti Service started on port', port)
        DbConnection.createPool().then(x => {
            console.log('Database connected');
        })
    }).on('error', (err) => {
        if (err.errno === 'EADDRINUSE') {
            console.log('Service not started, port ' + port + ' is busy')
        } else {
            console.log(err)
        }
})

