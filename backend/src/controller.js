import sqlite3 from "sqlite3";
import { open } from "sqlite";
import SQL from "sql-template-strings";

const initializeDatabase = async () => {
  const db = await open({
    filename: "db.sqlite",
    driver: sqlite3.Database,
  });
  /**
   * retrieves the contacts from the database
   */
  const getContactsList = async (order) => {
    console.log(order);
    let statement = "SELECT contact_id AS id, name, email FROM contacts";
    if (order === "name") {
      statement += " ORDER BY name";
    }
    if (order === "email") {
      statement += " ORDER BY email";
    }
    const rows = await db.all(statement);
    // rows.forEach( ({ id, name, email }) => returnString+=`[id:${id}] - ${name} - ${email}` )
    return rows;
  };

  const getContact = async (id) => {
    let statement = `SELECT contact_id AS id, name, email FROM contacts where contact_id= ${id}`;

    const rows = await db.all(statement);
    // rows.forEach( ({ id, name, email }) => returnString+=`[id:${id}] - ${name} - ${email}` )
    return rows;
  };
  const createContact = async (blah) => {
    const { name, email } = blah;
    // const name = props.name; const email = props.email;
    //to do check that name and email both exist
    const result = await db.run(
      `INSERT INTO contacts (name,email) VALUES (?, ?)`,
      [name, email]
    );
    //console.log(result);
    //check if changes = 0 then an error should be created
    const id = result.lastID;
    return id;
  };

  const deleteContact = async (id) => {
    const result = await db.run(`DELETE from contacts where contact_id= ${id}`);
    if (result.changes != 0) {
      return true; //to do a success message
    } else return false; //to do an error
  };
  const updateContact = async (id, blah) => {
    const { name, email } = blah;
    let stmt,
      params = [];
    if (name && email) {
      stmt = `UPDATE contacts SET email = ?, name = ? WHERE contact_id = ?`;
      params = [email, name, id];
    } else if (name && !email) {
      stmt = `UPDATE contacts SET name = ? WHERE contact_id = ?`;
      params = [name, id];
    } else if (email && !name) {
      stmt = `UPDATE contacts SET email = ? WHERE contact_id = ?`;
      params = [email, id];
    }
    const result = await db.run(stmt, ...params);
    if (result.changes === 0) return false;
    return true;
  };

  const controller = {
    getContactsList,
    getContact,
    createContact,
    deleteContact,
    updateContact,
  };

  return controller;
};

export default initializeDatabase;
