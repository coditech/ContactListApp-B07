import React from "react";

export default function ContactCard(props) {
  return (
    <figure className="snip1336">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
        alt="sample87"
      />
      <figcaption>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg"
          alt="profile-sample4"
          className="profile"
        />
        <h2>
          {props.contact.name}
          <span>{props.contact.email}</span>
        </h2>

        <a href="#" className="follow">
          More Info
        </a>
        <button
          className="info"
          onClick={() => props.deleteContact(props.contact.id)}
        >
          Delete
        </button>
      </figcaption>
    </figure>
  );
}
