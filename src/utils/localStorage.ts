import { toast } from "react-toastify";
import { ContactFormData, contactSchema } from "../schema/contactSchema";

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
    toast.success("Successfully added contact");
  } catch (err) {
    toast.error(`Error adding contact: ${err}`);
  }
};

export const deleteContact = (contactId?: string) => {
  const existingContacts = getStoredContacts();
  const updatedContacts = existingContacts.filter(
    (contact) => contact.id !== contactId
  );
  try {
    toast.success("Successfully deleted contact");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
  } catch (err) {
    toast.error(`Error removing contact: ${err}`);
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
    toast.success("Successfully updated contact");
  } catch (err) {
    toast.error(`Error updating contact: ${err}`);
  }
};

export const handleExport = () => {
  const storedContacts = getStoredContacts();
  try {
    if (!storedContacts) {
      toast.error("No saved contacts found to export.");
      return;
    }

    if (!Array.isArray(storedContacts) || storedContacts.length === 0) {
      toast.error("No valid contacts found in localStorage.");
      return;
    }

    const dataToExport = {
      exportedAt: new Date().toISOString(),
      contacts: storedContacts,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `storedContacts-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Contacts exported successfully!");
  } catch (err) {
    toast.error(`Failed to export contacts: ${err}`);
  }
};

export const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const fileContent = e.target?.result as string;
      console.log(
        "Imported file content:",
        fileContent.substring(0, 200) + "..."
      );

      const json = JSON.parse(fileContent);

      let contactsToImport: ContactFormData[] = [];

      if (json.contacts && Array.isArray(json.contacts)) {
        contactsToImport = json.contacts;
      } else if (Array.isArray(json)) {
        contactsToImport = json;
      } else if (json.id) {
        contactsToImport = [json];
      }
      // 4. Custom format with contacts under different key
      else {
        // Look for any array property that might contain contacts
        const arrayProps = Object.keys(json).filter((key) =>
          Array.isArray(json[key])
        );
        if (arrayProps.length > 0) {
          // Try the first array property
          contactsToImport = json[arrayProps[0]];
        } else {
          throw new Error(
            "Could not find any contacts data in the imported file."
          );
        }
      }

      if (contactsToImport.length === 0) {
        throw new Error("No contacts found in the imported file.");
      }

      console.log(`Found ${contactsToImport.length} contacts to import`); // Log for debugging

      // At this point, validate and process the contacts
      const parsedContacts: ContactFormData[] = [];
      const invalidContacts: unknown[] = [];

      for (const item of contactsToImport) {
        // Simple validation instead of schema validation for debugging
        if (item && typeof item === "object") {
          // Ensure each contact has an ID
          if (!item.id) {
            item.id = crypto.randomUUID
              ? crypto.randomUUID()
              : Date.now().toString();
          }

          try {
            const result = contactSchema.safeParse(item);
            if (result.success) {
              parsedContacts.push(result.data);
            } else {
              console.error("Contact validation failed:", result.error.errors);
              invalidContacts.push(item);
            }
          } catch (validationErr) {
            console.error("Validation error:", validationErr);
            invalidContacts.push(item);
          }
        } else {
          invalidContacts.push(item);
        }
      }

      if (parsedContacts.length === 0) {
        throw new Error("None of the contacts in the file passed validation.");
      }

      // Merge with existing contacts
      const existing = localStorage.getItem(STORAGE_KEY);
      const existingContacts = existing ? JSON.parse(existing) : [];

      // Merge without duplicates (based on id)
      const mergedContacts = [
        ...existingContacts.filter(
          (ec: ContactFormData) => !parsedContacts.some((ic) => ic.id === ec.id)
        ),
        ...parsedContacts,
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedContacts));

      if (invalidContacts.length > 0) {
        toast.warning(
          `Imported ${parsedContacts.length} contacts. ${invalidContacts.length} contacts were skipped due to validation errors.`
        );
      } else {
        toast.success(
          `Successfully imported ${parsedContacts.length} contacts.`
        );
      }

      // Trigger a refresh
      window.dispatchEvent(new Event("contactsUpdated"));
    } catch (err) {
      console.error("Full import error:", err);
      toast.error(
        `Import failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  };

  reader.readAsText(file);

  // Clear input
  event.target.value = "";
};
