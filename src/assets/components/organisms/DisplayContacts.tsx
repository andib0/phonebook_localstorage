import { FC } from "react";
import { ContactFormData } from "../../../schema/contactSchema";
import DescriptionList from "../atoms/DescriptionList";
import Address from "../atoms/Address";
import { toast } from "react-toastify";

type TDisplayContacts = {
  setInitialContact: (contact: ContactFormData) => void;
  contacts: ContactFormData[] | null;
  onDelete: (contact: ContactFormData) => void;
};

const DisplayContacts: FC<TDisplayContacts> = ({
  setInitialContact,
  contacts,
  onDelete,
}) => {
  const deleteUser = (contact: ContactFormData) => {
    try {
      if (contact.id) {
        onDelete(contact);
      } else {
        toast.error(`Contact has no id`);
      }
    } catch (err) {
      toast.error(`Error Updating Contact: ${err}`);
    }
  };

  const editUser = (contact: ContactFormData) => {
    try {
      if (contact.id) {
        setInitialContact(contact);
      } else {
        toast.error(`Contact has no id`);
      }
    } catch (err) {
      toast.error(`Error Updating Contact: ${err}`);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {contacts?.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 text-lg">No contacts yet.</p>
        </div>
      ) : (
        contacts?.map((contact, index) => (
          <div
            key={index}
            className="relative border border-gray-300 bg-[#0a192f] p-6 rounded-xl shadow-sm text-white transition-all duration-200 ease-in-out hover:bg-[#112240] hover:border-gray-100 hover:scale-102 hover:shadow-md"
          >
            <div className="space-y-3">
              <p className="font-bold text-xl text-[#CCD6F6]">
                {contact.firstName} {contact.lastName}
              </p>

              <DescriptionList title="Email" list={contact.email} />
              <DescriptionList title="Phone" list={contact.phoneNumber} />

              {contact.address && (
                <Address
                  address={contact.address}
                  city={contact.city}
                  country={contact.country}
                />
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => deleteUser(contact)}
                className="border cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-lg px-4 py-2 text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => editUser(contact)}
                className="border cursor-pointer border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0a192f] transition-colors duration-200 rounded-lg px-4 py-2 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayContacts;
