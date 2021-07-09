import React from "react";

export default function AddContactForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target["input-name"].value;
    const email = e.target["input-password"].value;
    const image = e.target["input-image"].files[0];
    props.addContact({ name, email, image });
    props.history.push("/contacts");
  };
  return (
    <>
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__title sr-only">Add Contact</h1>

          <label
            htmlFor="input-name"
            name="input-label"
            className="login__input-label"
          >
            Name
            <input type="text" name="input-name" />
          </label>

          <label htmlFor="input-password" className="login__password-label">
            Email
            <input type="email" name="input-password" />
          </label>
          <label htmlFor="input-image" className="login__password-label">
            Image
            <input type="file" name="input-image" />
          </label>
          <input
            type="submit"
            value="add contact"
            className="login__login-btn"
          />
        </form>
      </div>
    </>
  );
}
