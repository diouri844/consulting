// import my intefaces 
import { MongoServerSelectionError } from "mongodb";
import IConsultant from "./consulting.interface";
import { IAvailability } from "./consulting.interface";

import mongoose from "mongoose";

// create a schema for each interface : 

const AvailabilitySchema = new mongoose.Schema<IAvailability>(
    {
        start:{
            type:Date,
            required:true
        },
        end:{
            type:Date,
            required:true
        }
    }
);


const ConsultingSchema = new mongoose.Schema<IConsultant>({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    areasOfExpertise:{
        type:[String]
    },
    spokenLanguages:{
        type:[String]
    },
    bio:String,
    availability:[AvailabilitySchema],
    isBanned:{
        type:Boolean,
        default:false
    }
});

ConsultingSchema.set(
    'timestamps', true
).toString();

// create my model based on schema created : 
const ConsultingModel = mongoose.model('Consulting',ConsultingSchema);

export default ConsultingModel;

