import mongoose  from "mongoose";

import HttpException from "../../exceptions/httpException";

import ConsultingModel from "./consulting.model";
import IConsultant, { IAvailability } from "./consulting.interface";
import ConsultantDto from "./dtos/createConsulting.dto";
import UpdateConsultantDto from "./dtos/updateConsulting.dto";
//import AvailabilityDto from "./dtos/availability.dto";
import { ResponseStatusType } from '../../shared/types';



export default class ConsultingServices{
    // static method to get list of consulting ; 
    static getConsultings = async (take:number, skip:number) => {
        // get all document from the db ; 
        const consultings = await ConsultingModel.find(
            {}
        ).limit(take).skip(skip);
        const count = await ConsultingModel.countDocuments();
        return {
            consultings,
            count
        }
    };
    //static method to create new consulting item : 
    static createConsulting = async ( userId:string ,ConsultingPayload:ConsultantDto )
    :Promise<IConsultant>=>{
        // update consulting user_id : 
        ConsultingPayload.user_id = userId;
        // try to insert it :
        try{
            const consultingToInsert = new ConsultingModel(
                ConsultingPayload
            );
            const result = await consultingToInsert.save();
            return result;
        }catch(error)
        {
            throw new HttpException(500, 'couldnt create an consulting ');
        }
    };
    // static method  to update consulting by user id :
    static updateConsulting = async ( userId:string, ConsultingPayload:UpdateConsultantDto)
    :Promise<IConsultant> =>{
        let updated = await ConsultingModel.findByIdAndUpdate(userId,ConsultingPayload);
        if( ! updated ){
            throw new HttpException(
                500,
                'something went weong during updating the consulting ',
              );
        }
        let result:IConsultant = updated;
        return result
    }
    // static method to update consulting availability by user id : 
    static updateAvailability = async (userId:string, AvailabilityPayload:IAvailability[])
    :Promise<IConsultant> => {
        let target = await ConsultingModel.findById(userId);
        if( !target ){
            throw new HttpException(
                500,
                'something went weong during finding the consulting availability',
              );
        }
        try{
            // update availability : 
            target.availability = AvailabilityPayload;
            await target.save();
            let result:IConsultant = target;
            return result;
        }catch(error){
            console.log( error );
            throw new HttpException(
                500,
                'something went weong during updating the consulting availability ',
              );
        }
    }
    //static method to delete consulting by user id :
    static deleteConsulting = async (userId:string)
    :Promise<ResponseStatusType> => {
        let responseMessage: ResponseStatusType = { status:true ,message: '' };
        let taregt = await ConsultingModel.findByIdAndRemove(userId);
        if( !taregt ){
            throw new HttpException(
                500,
                'oudnt delete the consulting ',
            );
        }
        responseMessage.message = "deleted succesuflly the consulting";
        return responseMessage;
    }
}