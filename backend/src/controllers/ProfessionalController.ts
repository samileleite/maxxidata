import { Request, Response } from "express";
import { CreateProfessionalService } from "../services/CreateProfessionalService";
import { ListProfessionalService } from "../services/ListProfessionalService";
import { UpdateProfessionalService } from "../services/UpdateProfessionalService";


interface ICreateProfessional {
    id: string;
    name: string;
    telephone?: string;
    email?: string;
    professional_type_id: string;
}


class ProfessionalController {
    async create(request: Request, response: Response) {
        const service = new CreateProfessionalService();

        const { name, telephone, email, professional_type_id } = request.body as ICreateProfessional;

        try {
            const result = await service.execute({
                name,
                telephone,
                email,
                professional_type_id,
            });

            return response.json(result);

        } catch (err) {
            return response.json({ error: err.message });
        }


    }

    async update(request: Request, response: Response) {
        const service = new UpdateProfessionalService();

        const { id } = request.params;
        const { name, telephone, email, professional_type_id, situation } = request.body;

        try {
            const result = await service.execute({
                id,
                name,
                telephone,
                email,
                professional_type_id,
                situation
            });
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message })
        }
    }

    async index(request: Request, response: Response) {
        const service = new ListProfessionalService();

        try {
            const result = await service.execute();
            return response.json(result);
        } catch (err) {
            return response.json({ error: err.message });
        }
    }
}

export { ProfessionalController };