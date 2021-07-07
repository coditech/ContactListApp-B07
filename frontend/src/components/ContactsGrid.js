import React from "react";
import ContactCard from "./ContactCard";

export default function ContactsGrid(props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 60,
      }}
    >
      {props.contacts.map((contact) => (
        <ContactCard
          contact={contact}
          key={contact.id}
          deleteContact={props.deleteContact}
        />
      ))}
    </div>
  );
}
