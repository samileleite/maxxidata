import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ProfessionalTypeController } from "./controllers/ProfessionalTypeController";
import { ProfessionalController } from "./controllers/ProfessionalController";

const router = Router();

export { router };

router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/professional-type", new ProfessionalTypeController().create);
router.put("/professional-type/:id", new ProfessionalTypeController().update);
router.get("/professional-type", new ProfessionalTypeController().index);
router.post("/professional", new ProfessionalController().create);
router.put("/professional/:id", new ProfessionalController().update);
router.get("/professional", new ProfessionalController().index);