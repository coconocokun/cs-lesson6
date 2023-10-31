import path from "path";
import fs from "fs";
import sharp from "sharp";

// Purpose
// Img down scaler

// 1. read img
let imgPath = "./testImage.jpg";
if (fs.existsSync(imgPath) == true) {
  if (path.extname(imgPath) == ".jpg") {
    sharp(imgPath)
      .metadata()
      .then((meta) => {
        const width = meta.width!;
        const height = meta.height!;
        sharp(imgPath)
          .resize(Math.round(width / 3), Math.round(height / 3))
          .jpeg({ quality: 50 })
          .toFile("./fixed.jpg");
      });
  }
}
