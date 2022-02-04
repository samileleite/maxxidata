import prismaClient from "../prisma";



class ListProfessionalTypeService {
    async execute() {
        const result = await prismaClient.professionalType.findMany();
        return result;
    }
}

export { ListProfessionalTypeService };