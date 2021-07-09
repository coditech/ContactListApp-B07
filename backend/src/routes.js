import app from "./app";
import db from "./db";
import initializeDatabase from "./controller";
import multer from "multer";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const date = Date.now();
    // filename will be: image-1345923023436343-filename.png
    const filename = `${fieldname}-${date}-${originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: multerStorage });

const start = async () => {
  const controller = await initializeDatabase();
  app.get("/", (req, res) => res.send("hello world"));
  app.get("/contacts", async (req, res, next) => {
    try {
      const contacts = await controller.getContactsList(req.query.order);
      res.json({
        success: true,
        result: contacts,
      });
    } catch (e) {
      next(e);
    }
  });

  app.get("/contact/:id", async (req, res, next) => {
    try {
      const contact = await controller.getContact(req.params.id);
      res.json({
        success: true,
        result: contact,
      });
    } catch (e) {
      next(e);
    }
  });

  app.post("/contact", upload.single("image"), async (req, res, next) => {
    try {
      console.log(req.file.filename);
      const id = await controller.createContact({
        name: req.query.name,
        email: req.query.email,
        image: req.file.filename,
      });
      res.json({
        success: true,
        result: { id, image: req.file.filename },
      });
    } catch (e) {
      next(e);
    }
  });

  app.delete("/contact", async (req, res, next) => {
    try {
      const response = await controller.deleteContact(req.query.id);
      res.json({
        success: true,
        result: response,
      });
    } catch (e) {
      next(e);
    }
  });

  app.put("/contact", async (req, res, next) => {
    try {
      const response = await controller.updateContact(req.query.id, {
        name: req.query.name,
        email: req.query.email,
      });
      res.json({
        success: true,
        result: response,
      });
    } catch (e) {
      next(e);
    }
  });
  app.use((err, req, res, next) => {
    res.json({
      success: false,
      result: err.message,
    });
  });
  app.listen(8000, () => console.log("server running on port 8000"));
};
start();
