import sqlite3 from "sqlite3";
import { open } from "sqlite";
import SQL from 'sql-template-strings';

const initializeDatabase = async () => {
    const db = await open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
      })
/**
   * retrieves the contacts from the database
   */
 const getContactsList = async () => {
    let returnString = ""
    const rows = await db.all("SELECT contact_id AS id, name, email FROM contacts")
   // rows.forEach( ({ id, name, email }) => returnString+=`[id:${id}] - ${name} - ${email}` )
    return rows
  }



const controller = {
    getContactsList
  }

  return controller;
}

export default initializeDatabase;

