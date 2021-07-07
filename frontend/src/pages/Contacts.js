import React from "react";
import ContactsGrid from "../components/ContactsGrid";

export default function Contacts(props) {
  return <ContactsGrid deleteContact={props.deleteContact} {...props} />;
}
