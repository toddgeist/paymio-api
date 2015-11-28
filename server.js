'use strict'
const Hapi = require('Hapi');
const AuthPlugin = require('./src/plugins/Auth')




const server = new Hapi.Server();



server.connection( {port :3000} );

server.register(AuthPlugin, (err)=>{
    if(err){
        throw err
    }
});


server.start(()=>{
    console.log('Server running at ', server.info.uri)
});