import path from "path";
import fs from "fs";
import sharp from "sharp";
import AdmZip from "adm-zip";

// Define paths
let originalZipPath = "./lesson7_photos.zip";
let tempUnzipPath = "./temp";

// unzipping zip file
let zip = new AdmZip(originalZipPath);
zip.extractAllTo(tempUnzipPath, true);
// 0. for loop
fs.readdir(tempUnzipPath, (err, fileNames) => {
  if (err) throw err;

  // create after folder
  fs.mkdirSync(tempUnzipPath + "/after");

  for (let i = 0; i < fileNames.length; i++) {
    const fName = fileNames[i];

    let imgPath = tempUnzipPath + "/" + fName;
    if (fs.existsSync(imgPath) == true) {
      if (path.extname(imgPath) == ".jpg" || path.extname(imgPath) == ".JPG") {
        sharp(imgPath)
          .metadata()
          .then((meta) => {
            const width = meta.width!;
            const height = meta.height!;
            sharp(imgPath)
              .resize(Math.round(width / 3), Math.round(height / 3))
              .jpeg({ quality: 50 })
              .toFile(tempUnzipPath + "/after/" + fName);
          });
      }
    }
  }
});
