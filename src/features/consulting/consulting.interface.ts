import mongoose, {Document } from "mongoose";




export interface IAvailability{
    start:Date,
    end:Date,
};



export default interface IConsultant extends Document {
    user_id:mongoose.Types.ObjectId,
    areasOfExpertise:string[],
    spokenLanguages:string[],
    bio:string,
    availability:IAvailability[],
    isBanned:Boolean
};

