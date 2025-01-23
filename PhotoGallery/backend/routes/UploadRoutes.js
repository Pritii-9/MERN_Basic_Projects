import { Router } from "express";
import uploadMiddleware from "../middleware/MultiMiddleware.js";
import UploadModels from "../models/UploadModels.js";

const router = Router();

router.get("/api/get", async (req, res) => {
  try {
    const allPhotos = await UploadModels.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching photos");
  }
});

router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
  try {
    const photo = req.file.filename;
    console.log(photo);
    UploadModels.create({ photo })
      .then((data) => {
        console.log("Successful");
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error saving photo");
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error processing request");
  }
});

export default router;
