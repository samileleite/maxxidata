import prismaClient from "../prisma";

class CreateProfessionalTypeService {
    async execute(description: string) {

        if (!description) {
            throw new Error("Tipo de profissional deve ser obrigatório");
        }

        const professionalType = await prismaClient.professionalType.create({
            data: { description }
        })

        return professionalType;

    }
}

export { CreateProfessionalTypeService };