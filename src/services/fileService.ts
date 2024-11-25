import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { FileServiceError } from "../utils/customErrors";

const uploadsDir = path.resolve(__dirname, "../../", "public/images");

const createUploadsDirIfNotExist = async (): Promise<void> => {
  try {
    await fs.access(uploadsDir);
  } catch (error) {
    console.error("Directory does not exist, creating it...");
    await fs.mkdir(uploadsDir, { recursive: true });
  }
};

export const saveImage = async (
  buffer: Buffer,
  fileName: string
): Promise<void> => {
  const filePath = path.join(uploadsDir, fileName);
  try {
    await createUploadsDirIfNotExist();
    await sharp(buffer as Buffer)
      .toFormat("jpeg")
      .toFile(filePath);
  } catch (error) {
    throw new FileServiceError("Failed to save image");
  }
};

export const deleteImage = async (fileName: string): Promise<void> => {
  const filePath = path.join(uploadsDir, fileName);
  try {
    await createUploadsDirIfNotExist();
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Failed to delete file");
  }
};
