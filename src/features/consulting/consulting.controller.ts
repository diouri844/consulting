import { Router, Response, Request } from 'express';
import { Controller } from '../../shared';
import ConsultantDto from "./dtos/createConsulting.dto";
import UpdateConsultantDto from './dtos/updateConsulting.dto';
import validationMiddleware from '../../middlewares/dataValidator';
import ConsultingServices from './consulting.services';
import { authMiddleware } from '../../middlewares/auth';
import IConsultant, { IAvailability } from "./consulting.interface";
import AvailabilityDto from './dtos/availability.dto';
import { CustomRequest } from '../../shared/interfaces/customRequest.interface';



// create my controller : 

export default class ConsultingController implements Controller{
    path: "/consultants";
    route = Router();
    constructor() {
        this.initializeRoutes();
    };
    initializeRoutes(): void {
        this.route.get(
            "/",
            authMiddleware,
            this.getConsultingList
        );
        this.route.post(
            "/",
            authMiddleware,
            validationMiddleware(ConsultantDto),
            this.createConsulting
        );
        this.route.put(
            "/:userId",
            authMiddleware,
            validationMiddleware(UpdateConsultantDto),
            this.updateConsulting
        );
        this.route.patch(
            "/:userId/availability",
            authMiddleware,
            validationMiddleware(AvailabilityDto),
            this.updateConsultingAvailability
        );
        this.route.delete(
            "/:userId",
            authMiddleware,
            this.deleteConsulting
        );
    }

    async createConsulting(req:CustomRequest,res:Response):Promise<void>{
        const ConsultingPayload:ConsultantDto = req.body;
        //extract user id from request :
        let userId = req.userId!;
        // try to create the consulting : 
        const result = await ConsultingServices.createConsulting(userId,ConsultingPayload);
        res.status(200).send(result);
    };
    async getConsultingList(req:Request, res:Response):Promise<void>{
        let take: number = parseInt(req.query.take as string) || 5;
        let skip: number = parseInt(req.query.skip as string) || 0;
        const result = await ConsultingServices.getConsultings(take,skip);
        res.status(200).send(result);
    };
    async updateConsulting(req:Request, res:Response):Promise<void>{
        let userId = req.params.toString();
        const payload:UpdateConsultantDto = req.body;
        // try to update :
        const result = await ConsultingServices.updateConsulting(userId,payload);
        res.status(200).send(result);
    };
    async updateConsultingAvailability ( req:Request, res:Response ):Promise<void>{
        let userId = req.params.toString();
        const payload:IAvailability[] = req.body;
        // try to update Availability : 
        const result = await ConsultingServices.updateAvailability(userId,payload);
        res.status(200).send(result);
    };
    async deleteConsulting( req:Request, res:Response ):Promise<void>{
        let userId = req.params.toString();
        const result = await ConsultingServices.deleteConsulting(userId);
        res.status(200).send(result);
    };
}