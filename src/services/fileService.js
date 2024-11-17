const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

class FileService {
  constructor() {
    this.uploadsDir = path.resolve(__dirname, "../../", "public/images");
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async saveImage(buffer, fileName) {
    const filePath = path.join(this.uploadsDir, fileName);
    await sharp(buffer).toFormat("jpeg").toFile(filePath);
    return filePath;
  }

  async deleteFile(fileName) {
    const filePath = path.join(this.uploadsDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

module.exports = new FileService();
