import path from "path";
import fs from "fs";
import sharp from "sharp";
import AdmZip from "adm-zip";

// Purpose
// Img down scaler

// unzipping zip file
// 0. for loop
// 1. read 1 img
// 2. resize / quality down
// 3. save img
// 4. zipping all imgs

let zipPath = "./lesson7_photos.zip";
let fixedZipPath = "./fixed.zip";
let tempFolderPath = "./temp";

if (fs.existsSync(zipPath) == true) {
  let zip = new AdmZip(zipPath);
  zip.extractAllTo(tempFolderPath, true);

  fs.readdir(tempFolderPath, async (err, fileNames) => {
    if (err) throw err;
    fs.mkdirSync(tempFolderPath + "/after");

    for (let i = 0; i < fileNames.length; i++) {
      const fname = fileNames[i];
      let thePath = tempFolderPath + "/" + fname;
      sharp(thePath)
        .metadata()
        .then((meta) => {
          const width = meta.width!;
          const height = meta.height!;
          sharp(thePath)
            .resize(Math.round(width / 3), Math.round(height / 3))
            .jpeg({ quality: 50 })
            .toFile(tempFolderPath + "/after/" + fname);
        });
    }
  });
}
