import * as fileService from "../services/fileService";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { FileServiceError } from "../utils/customErrors";

jest.mock("fs/promises");
jest.mock("sharp");

describe("File Service", () => {
  const uploadsDir = path.resolve(__dirname, "../../", "public/images");
  const mockFilePath = path.join(uploadsDir, "test.jpg");
  const mockBuffer = Buffer.from("mock-data");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("saveImage", () => {
    it("should save an image after ensuring the directory exists", async () => {
      (fs.access as jest.Mock).mockResolvedValue(undefined);
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);

      const sharpMock = sharp as jest.MockedFunction<typeof sharp>;
      const sharpInstanceMock = {
        toFormat: jest.fn().mockReturnThis(),
        toFile: jest.fn().mockResolvedValue(undefined),
      };
      sharpMock.mockReturnValue(sharpInstanceMock as unknown as sharp.Sharp);

      await fileService.saveImage(mockBuffer, "test.jpg");

      expect(fs.access).toHaveBeenCalledWith(uploadsDir);
      expect(fs.mkdir).not.toHaveBeenCalled();
      expect(sharp).toHaveBeenCalledWith(mockBuffer);
      expect(sharpInstanceMock.toFormat).toHaveBeenCalledWith("jpeg");
      expect(sharpInstanceMock.toFile).toHaveBeenCalledWith(mockFilePath);
    });

    it("should throw a FileServiceError if saving the image fails", async () => {
      (fs.access as jest.Mock).mockResolvedValue(undefined);

      const sharpMock = sharp as jest.MockedFunction<typeof sharp>;
      const sharpInstanceMock = {
        toFormat: jest.fn().mockReturnThis(),
        toFile: jest.fn().mockRejectedValue(new Error("Sharp error")),
      };
      sharpMock.mockReturnValue(sharpInstanceMock as unknown as sharp.Sharp);

      await expect(
        fileService.saveImage(mockBuffer, "test.jpg")
      ).rejects.toThrow(new FileServiceError("Failed to save image"));

      expect(sharp).toHaveBeenCalledWith(mockBuffer);
      expect(sharpInstanceMock.toFile).toHaveBeenCalledWith(mockFilePath);
    });
  });

  describe("deleteImage", () => {
    it("should delete an image after ensuring the directory exists", async () => {
      (fs.access as jest.Mock).mockResolvedValue(undefined);
      (fs.unlink as jest.Mock).mockResolvedValue(undefined);

      await fileService.deleteImage("test.jpg");

      expect(fs.access).toHaveBeenCalledWith(mockFilePath);
      expect(fs.unlink).toHaveBeenCalledWith(mockFilePath);
    });

    it("should handle errors when trying to delete a non-existent image", async () => {
      (fs.access as jest.Mock).mockRejectedValue(
        new Error("File does not exist")
      );

      await fileService.deleteImage("test.jpg");

      expect(fs.access).toHaveBeenCalledWith(mockFilePath);
      expect(fs.unlink).not.toHaveBeenCalled();
    });
  });
});
