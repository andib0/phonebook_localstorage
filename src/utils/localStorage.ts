import { toast } from "react-toastify";
import { ContactFormData } from "../schema/contactSchema";

const STORAGE_KEY = "contacts";

export const getStoredContacts = (): ContactFormData[] => {
  const storedContacts = localStorage.getItem(STORAGE_KEY);
  return storedContacts ? JSON.parse(storedContacts) : [];
};

export const saveContact = (newContact: ContactFormData) => {
  const existingContacts = getStoredContacts();
  const updatedContacts = [...existingContacts, newContact];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
    toast.success("Successfully saved contact");
  } catch (err) {
    toast.error(`Error Updating Contact: ${err}`);
  }
};

export const deleteContact = (contactId?: string) => {
  const existingContacts = getStoredContacts();
  const updatedContacts = existingContacts.filter(
    (contact) => contact.id !== contactId
  );
  try {
    toast.success("Successfully saved contact");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
  } catch (err) {
    toast.error(`Error Updating Contact: ${err}`);
  }
};

export const updateContact = (updatedContact: ContactFormData) => {
  if (!updatedContact.id) return;

  const existingContacts = getStoredContacts();
  const updatedContacts = existingContacts.map((contact) =>
    contact.id === updatedContact.id ? updatedContact : contact
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
    toast.success("Successfully saved contact");
  } catch (err) {
    toast.error(`Error Updating Contact: ${err}`);
  }
};
