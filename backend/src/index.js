import app from './app';
import db from './db'
import initializeDatabase from './controller'

const start = async () => {
    const controller = await initializeDatabase();
    app.get("/", (req,res)=>res.send("hello world"));
    app.get("/contacts", async(req,res)=>{
        const contacts = await controller.getContactsList();
        res.send(contacts);
    });
    app.listen(8000, ()=> console.log("server running on port 8000"));
}
start();