const {Schema,model}=require("mongoose");

// Declare the Schema of the Mongo model
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        index:true,
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria'],
        
    },
    email:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true,
    },
    rol:{
        type:String,
        required:true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String,
    },
    isDeleted: {
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
module.exports = model('User', userSchema);