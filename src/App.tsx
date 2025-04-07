import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import ContactForm from "./assets/components/organisms/ContactForm";
import DisplayContacts from "./assets/components/organisms/DisplayContacts";
import { ContactFormData } from "./schema/contactSchema";

import { useContacts } from "./hooks/useContacts";
import Modal from "./assets/components/atoms/Modal";
import Button from "./assets/components/atoms/Button";
import MainTitle from "./assets/components/atoms/MainTitle";
import { useFilteredContacts } from "./hooks/useFilteredContacts";
import { handleExport, handleImport } from "./utils/localStorage";

function App() {
  const [initialContact, setInitialContact] = useState<ContactFormData | null>(
    null
  );
  const { contacts, onAdd, onUpdate, onDelete } = useContacts();
  const { filterUsers, filteredUsers } = useFilteredContacts(contacts);
  const [visible, setVisible] = useState(false);

  const setContact = (contact: ContactFormData | null) => {
    setInitialContact(contact);
    setVisible(true);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click(); // This will open the file picker
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <MainTitle
          title="Phonebook Task - Local"
          description="Built with React, Tailwind, localStorage, Custom hooks, React Hook
            Form, Zod, Toastify"
        />
        <div className="flex flex-row gap-2">
          <Button title="Import Contacts" onClick={handleImportClick} />
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            onChange={handleImport}
            className="hidden"
          />
          <Button
            title="Add Contact"
            onClick={() => {
              setVisible(true);
              setInitialContact(null);
            }}
          />
          <Button title="Export Contacts" onClick={() => handleExport()} />
        </div>
        <input
          onChange={(e) => filterUsers(e.target.value)}
          className="bg-[#CCD6F6] text-center text-[#0A192F] text-lg rounded-lg px-2 py-1 m-4 align-middle border-none outline-none"
          placeholder="Search"
        />
      </div>
      <Modal visible={visible} setVisible={setVisible} title="Contact">
        <ContactForm
          onAdd={onAdd}
          onUpdate={onUpdate}
          initialData={initialContact}
          setInitialData={setContact}
          setVisible={setVisible}
        />
      </Modal>

      <DisplayContacts
        contacts={filteredUsers}
        onDelete={onDelete}
        setInitialContact={setContact}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
