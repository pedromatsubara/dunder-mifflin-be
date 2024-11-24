import { Router } from "express";
import multer from "multer";
import * as employeeController from "../controllers/employeeController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const employeeRouter = Router();

employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get("/:id", employeeController.getEmployeeById);
employeeRouter.post(
  "/",
  upload.single("image"),
  employeeController.createEmployee
);
employeeRouter.put("/:id", employeeController.updateEmployee);
employeeRouter.delete("/:id", employeeController.deleteEmployee);

export default employeeRouter;
