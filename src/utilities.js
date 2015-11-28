
const addConstantMethod = (object)=>{

    const declareConstant = (name, value)=>{
        Object.defineProperty(object, name, {
            enumerable: true,
            configurable: false,
            writable: false,
            value: value
        })
    };

    Object.defineProperty(object,'CONSTANT', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: declareConstant
    });


    Object.defineProperty(object,'CONST', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: declareConstant
    });
};

module.exports = {
    addConstantMethod : addConstantMethod
};