import { useState, useEffect } from "react";
import { ContactFormData } from "../schema/contactSchema";

export function useFilteredContacts(contacts: ContactFormData[] | null) {
  const [filteredUsers, setFilteredUsers] = useState<ContactFormData[] | null>(
    contacts
  );

  const filterUsers = (str: string) => {
    if (str) {
      setFilteredUsers(
        contacts?.filter(
          (contact) =>
            contact.firstName.toLowerCase().includes(str.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(str.toLowerCase())
        ) || []
      );
    } else {
      setFilteredUsers(contacts);
    }
  };

  useEffect(() => {
    setFilteredUsers(contacts);
  }, [contacts]);

  return { filteredUsers, filterUsers };
}
