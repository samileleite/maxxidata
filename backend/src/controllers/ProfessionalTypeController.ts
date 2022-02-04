import { Request, response, Response } from "express";
import prismaClient from "../prisma";
import { CreateProfessionalTypeService } from "../services/CreateProfessionalTypeService";
import { ListProfessionalTypeService } from "../services/ListProfessionalTypeService";
import { UpdateProfessionalTypeService } from "../services/UpdateProfessionalTypeService";

interface IUpdateProfessionalType {
    professional_type_id: string;
    description: string;
    situation?: boolean;



}


class ProfessionalTypeController {
    async create(request: Request, response: Response) {
        const service = new CreateProfessionalTypeService();

        const { description } = request.body;

        try {
            const result = await service.execute(
                description
            );

            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }

    async update(request: Request, response: Response) {
        const service = new UpdateProfessionalTypeService();

        const { id } = request.params;
        // const data = { ...request.body, professional_type_id: id } as IUpdateProfessionalType;
        const { description, situation } = request.body;
        // console.log(data);

        try {

            const result = await service.execute({
                professional_type_id: id,
                description,
                situation,
            });
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message })
        }
    }

    async index(request: Request, response: Response) {
        const service = new ListProfessionalTypeService();


        try {
            const result = await service.execute();

            return response.json(result);

        } catch (err) {
            return response.json({ error: err.message });

        }
    }
}

export { ProfessionalTypeController };