import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import fileController from "../controllers/fileController";

const router = Router();

router.use(authMiddleware);

router.post("", fileController.createDir);
router.post("/upload", fileController.uploadFile);
router.post("/avatar", fileController.uploadAvatar);
router.get("", fileController.getFiles);
router.get("/download", fileController.downloadFile);
router.get("/search", fileController.searchFile);
router.delete("/", fileController.deleteFile);
router.delete("/avatar", fileController.deleteAvatar);

export default router;
