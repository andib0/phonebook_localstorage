import { useState } from "react";
import { ContactFormData } from "../schema/contactSchema";
import {
  getStoredContacts,
  saveContact,
  updateContact,
  deleteContact,
} from "../utils/localStorage";

export const useContacts = () => {
  const [contacts, setContacts] = useState<ContactFormData[]>(
    getStoredContacts()
  );

  // Add contact
  const onAdd = (data: ContactFormData) => {
    saveContact(data);
    setContacts(getStoredContacts());
  };

  // Delete contact
  const onDelete = (data: ContactFormData) => {
    deleteContact(data.id);
    setContacts(getStoredContacts());
  };

  // Update contact
  const onUpdate = (updated: ContactFormData) => {
    updateContact(updated);
    setContacts(getStoredContacts());
  };

  return {
    contacts,
    onAdd,
    onDelete,
    onUpdate,
  };
};
