import prismaClient from "../prisma";

interface IUpdateProfessional {
    id: string;
    name: string;
    telephone?: string;
    email?: string;
    professional_type_id: string;
    situation?: boolean;
}

class UpdateProfessionalService {
    async execute(data: IUpdateProfessional) {

        const { id, name, telephone, email, professional_type_id, situation } = data;

        if (!name) {
            throw new Error("Nome deve ser obrigatório");
        }
        if (!professional_type_id) {
            throw new Error("Tipo de profissão deve ser obrigatório");
        }

        const professional = await prismaClient.professional.update({
            where: { id },
            data: { name, telephone, email, professional_type_id, situation },
        });

        return professional;

    }
}

export { UpdateProfessionalService };