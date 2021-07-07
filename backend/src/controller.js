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
    let statement = "SELECT contact_id AS id, name, email FROM contacts";
    if (order === "name") {
      statement += " ORDER BY name";
    }
    if (order === "email") {
      statement += " ORDER BY email";
    }
    try {
      const rows = await db.all(statement);
      return rows;
    } catch (e) {
      throw new Error("Was not able to retrieve list of contacts");
    }
  };

  const getContact = async (id) => {
    let statement = `SELECT contact_id AS id, name, email FROM contacts where contact_id= ${id}`;
    try {
      const rows = await db.all(statement);
      return rows;
    } catch (e) {
      throw new Error(`Was not able to retrieve the contact with id ${id}`);
    }
  };
  const createContact = async (props) => {
    if (!props || !props.name || !props.email) {
      throw new Error(`Name and email need to be specified.`);
    }

    const { name, email } = props;
    // const name = props.name; const email = props.email;
    try {
      const result = await db.run(
        `INSERT INTO contacts (name,email) VALUES (?, ?)`,
        [name, email]
      );

      //check if changes = 0 then an error should be created
      if (result.changes === 0) {
        throw new Error(
          `Was not able to create a contact with the given name and email.`
        );
      }
      const id = result.lastID;

      return id;
    } catch (e) {
      throw new Error(`Was not able to create a contact.`);
    }
  };

  const deleteContact = async (id) => {
    try {
      const result = await db.run(
        `DELETE from contacts where contact_id= ${id}`
      );
      if (result.changes != 0) {
        return true; //to do a success message
      } else
        throw new Error(`Could not find the contact with id ${id} to delete.`);
    } catch (e) {
      throw new Error(`Was not able to delete contact.`);
    }
  };
  const updateContact = async (id, props) => {
    if (!props) {
      throw new Error(`You need to specify new name and or email to update.`);
    }
    const { name, email } = props;
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
    try {
      const result = await db.run(stmt, ...params);
      if (result.changes === 0)
        throw new Error(
          `Was not able to find the contact with id ${id} to update.`
        );
      return true;
    } catch (e) {
      throw new Error(`Was not able to update the contact with id ${id}.`);
    }
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
