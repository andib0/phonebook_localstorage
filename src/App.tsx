import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ContactForm from "./assets/components/organisms/ContactForm";
import DisplayContacts from "./assets/components/organisms/DisplayContacts";
import { ContactFormData } from "./schema/contactSchema";

import { useContacts } from "./hooks/useContacts";
import Modal from "./assets/components/atoms/Modal";
import Button from "./assets/components/atoms/Button";

function App() {
  const [initialContact, setInitialContact] = useState<ContactFormData | null>(
    null
  );
  const { contacts, onAdd, onUpdate, onDelete } = useContacts();
  const [visible, setVisible] = useState(false);

  const setContact = (contact: ContactFormData | null) => {
    setInitialContact(contact);
    setVisible(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-[#CCD6F6] text-6xl font-bold m-4">
          Phonebook Task - Local
          <p className="text-sm text-[#8892B0] font-bold">
            Built with react, tailwind, localStorage, cutom hooks, react hook
            form, zod
          </p>
        </div>
        <Button
          title="Add New"
          onClick={() => {
            setVisible(true);
            setInitialContact(null);
          }}
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
        contacts={contacts}
        onDelete={onDelete}
        setInitialContact={setContact}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
