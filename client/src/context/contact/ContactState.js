import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        type: "professional",
        id: 1,
        name: "ann",
        email: "ann@gmail.com",
        phone: "999-999-9999"
      },
      {
        type: "personal",
        id: 2,
        name: "zeze",
        email: "zeze@gmail.com",
        phone: "111-111-1111"
      },
      {
        type: "professional",
        id: 3,
        name: "tim",
        email: "tim@gmail.com",
        phone: "666-666-6666"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add contact

  //delet contact

  //set current contact

  //clear current contact

  //update contact

  //Filter contacts

  //Clear Filter
  //console.log(object);
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
      <p>{console.log("get here!")}</p>
    </ContactContext.Provider>
  );
};

export default ContactState;
