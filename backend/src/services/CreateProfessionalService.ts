import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface ICreateProfessional {
    name: string;
    telephone?: string;
    email?: string;
    professional_type_id: string;
}


class CreateProfessionalService {
    async execute(data: ICreateProfessional) {
        const { name, telephone, email, professional_type_id } = data;

        if (!name) {
            throw new Error("Nome deve ser obrigatório");
        }

        if (!professional_type_id) {
            throw new Error("Tipo de profissional deve ser obrigatório");
        }

        const professional = await prismaClient.professional.create({
            data: {
                name,
                telephone,
                email,
                professional_type_id
            }

        });


        return professional;
    }
}

export { CreateProfessionalService };