'use strict'

let Hapi = require('Hapi');
let jwt = require('jsonwebtoken');
var Boom = require('boom');

//temp user db for prototypinh
let db = require('../userdb');
const addConstantMethod = require( '../utilities' ).addConstantMethod;

const internals = {};
addConstantMethod(internals);
internals.CONSTANT('SECRET' , "aifonv&SDPJNpainvap-qovmsojfvnasdc");




const validate = function validate(decoded, request, callback){
    if (!db[decoded.id]) {

        return callback(null, false);
    }
    else {
        request.user = db[decoded.id];
        return callback(null, true);
    }
};


const checkPassword =  (username, password) => {

    if(db[1].name = username){
        return db['1']
    }


};

const generateToken = (user) =>{
    return jwt.sign(user, internals.SECRET,{
        algorithm: 'HS256',
        expiresIn : '10h'
    })
}


exports.register = function (server, options, next) {

    server.register(require('hapi-auth-jwt2'), (err) => {
        if(err){
            console.log(err);
            return next(err)
        }

        server.auth.strategy('jwt', 'jwt',
            { key: internals.SECRET,          // Never Share your secret key
                validateFunc: validate,            // validate function defined above
                verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
            });

        server.auth.default('jwt');

        server.route([
            {
                method: "POST", path: "/login", config: { auth: false },
                handler: function(request, reply) {
                    let user = checkPassword(request.payload.username);
                    if(user){
                        let token = generateToken(user);
                        reply({token:token});
                    }else{
                        reply(Boom.unauthorized('login failed'))
                    }


                }
            },
            {
                method: 'GET', path: '/register', config: { auth: 'jwt'},
                handler: function(request, reply) {
                    reply({text: 'You used a Token!', user :request.user})
                        .header("Authorization", request.headers.authorization);
                }
            }
        ]);

        next();
    })

}

exports.register.attributes = {
    name:   "Auth",
    version: "0.0.1"
}