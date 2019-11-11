import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  //destructing some usefull stuff from context API
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  //initialize internal state for this form
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  //set form back when edit is clicked.
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  //onchange function
  const onChange = e =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });

  //form onsubmit

  const onSubmit = e => {
    e.preventDefault();
    //contion for checking what work should clear button do.
    if (current === null) {
      addContact(contact);
    } else {
      //TODO: if current is not null then we need to update it .
      updateContact(contact);
    }

    //clear form
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };

  //clear form when editing
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primay">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
