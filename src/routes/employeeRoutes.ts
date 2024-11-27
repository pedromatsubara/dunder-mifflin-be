import { Router } from "express";
import multer from "multer";
import * as controller from "../controllers/employeeController";
import { serviceHandler } from "../middlewares/serviceHandler";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get("/", serviceHandler(controller.getAllEmployees));
router.get("/:id", serviceHandler(controller.getEmployeeById));
router.post("/", upload.single("image"), serviceHandler(controller.createEmployee, 201));
router.put("/:id", serviceHandler(controller.updateEmployee));
router.delete("/:id", serviceHandler(controller.deleteEmployee, 204));

export default router;
