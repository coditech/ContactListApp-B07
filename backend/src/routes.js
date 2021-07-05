import app from "./app";
import db from "./db";
import initializeDatabase from "./controller";

const start = async () => {
  const controller = await initializeDatabase();
  app.get("/", (req, res) => res.send("hello world"));
  app.get("/contacts", async (req, res) => {
    const contacts = await controller.getContactsList(req.query.order);
    res.json(contacts);
  });

  app.get("/contact", async (req, res) => {
    const contact = await controller.getContact(req.query.id);
    res.json(contact);
  });

  app.post("/contact", async (req, res) => {
    const id = await controller.createContact({
      name: req.query.name,
      email: req.query.email,
    });
    res.json(id);
  });

  app.delete("/contact", async (req, res) => {
    const response = await controller.deleteContact(req.query.id);
    res.json(response);
  });

  app.put("/contact", async (req, res) => {
    const response = await controller.updateContact(req.query.id, {
      name: req.query.name,
      email: req.query.email,
    });
    res.json(response);
  });
  app.listen(8000, () => console.log("server running on port 8000"));
};
start();
