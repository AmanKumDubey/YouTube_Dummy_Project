import mongoose, {Schema, Types} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userScheama =new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avtar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:true,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video",
        }
    ],
    password:{
        type:String,
        required:[true, 'Password is required'],
    },
    refreshToken:{
        type:String,
    },
    
    timestamps:true
    
})

userScheama.pre("save",async function name(next) {
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10)
    next()
})
userScheama.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

userScheama.methods.generateAccessToken=function(){
        jwt.sign(
            {
                _id:this._id,
                email:this.email,
                username:this.username,
                fullname:this.fullname
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
}

userScheama.methods.generateRefreshToken=function(){
    
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const user=mongoose.model("User",userScheama);
