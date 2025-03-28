import { FC } from "react";
import { ContactFormData } from "../../../schema/contactSchema";

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
            className="border border-gray-300 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-[#0a192f] "
          >
            <div className="space-y-3">
              <p className="font-bold text-xl text-[#CCD6F6]">
                {contact.firstName} {contact.lastName}
              </p>
              <p className="text-[#8892B0]">
                <span className="text-[#CCD6F6] font-medium">Email(s):</span>
                <ul className="list-disc list-inside">
                  {contact.email.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </p>

              <p className="text-[#8892B0]">
                <span className="text-[#CCD6F6] font-medium">Phone(s):</span>
                <ul className="list-disc list-inside">
                  {contact.phoneNumber.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </p>

              {contact.address && (
                <p className="text-[#8892B0]">
                  <span className="text-[#CCD6F6] font-medium">Address:</span>{" "}
                  {contact.address}, {contact.city}, {contact.country}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  contact.id ? onDelete(contact) : console.log("no id")
                }
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-lg px-4 py-2 text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  contact.id ? setInitialContact(contact) : console.log("no id")
                }
                className="border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0a192f] transition-colors duration-200 rounded-lg px-4 py-2 text-sm font-medium"
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
