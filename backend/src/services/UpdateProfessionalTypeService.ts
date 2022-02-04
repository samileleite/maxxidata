import prismaClient from "../prisma";

interface IUpdateProfessionalType {
    professional_type_id: string;
    description: string;
    situation?: boolean;
}

class UpdateProfessionalTypeService {
    async execute(data: IUpdateProfessionalType) {

        const { professional_type_id, description, situation } = data;

        if (!description) {
            throw new Error("Tipo de profissonal deve ser obrigatório");
        }

        const professionalType = await prismaClient.professionalType.update({
            where: { id: professional_type_id },
            data: { description, situation },
        });

        return professionalType;

    }
}

export { UpdateProfessionalTypeService };