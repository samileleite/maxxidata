import axios from "axios";
import prismaClient from "../prisma";



class ListProfessionalService {
    async execute() {
        const result = await prismaClient.professional.findMany();
        return result;
    }
}

export { ListProfessionalService };