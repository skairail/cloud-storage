import fs from "fs";
import File from "../models/File";
import config from "config";

class FileService {
  createDir(file: any): Promise<{ message: string }> {
    const filePath = `${config.get("filePath")}\\${file.user}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exists" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }

  deleteFile(file: any): void {
    const path = this.getPath(file);
    if (file.type === "dir") {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }

  getPath(file: any): string {
    return `${config.get("filePath")}\\${file.user}\\${file.path}`;
  }
}

export default new FileService();
