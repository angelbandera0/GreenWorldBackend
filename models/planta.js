const {Schema,model}=require("mongoose");

// Declare the Schema of the Mongo model
const plantaSchema = new Schema({
    name:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        index:true,
    },
    img:{
        type:String,
        //required:[true,'La contraseña es obligatoria'],
        
    },
    description:{
        type:String,

    },
    cantLikes:{
        type:Number,
        default: 0
        
    },
    cuidados: {
        type: String,
    },
    isConMaceta: {
        type: Boolean,
        default: false
    },
    isPersonalizable: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
    
});

//Export the model
module.exports = model('Planta', plantaSchema);