import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { authenticate, authorize } from "@/middlewares/auth.middleware";
import { UserRole } from "@/types"

const router = Router();
const userController = new UserController();

router.use(authenticate); // Apply authentication middleware to all routes

router.get("/", authorize(UserRole.ADMIN), userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", authorize(UserRole.ADMIN), userController.deleteUser);
//router.post("/register", userController.register);
//router.post("/login", userController.login);
//router.get("/profile", authenticate, userController.getProfile);

export default router;