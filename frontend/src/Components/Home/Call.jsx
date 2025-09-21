import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const contacts = [
  {
    id: 1,
    name: "Ram Bahadur Thapa",
    post: "Information Officer",
    phone: "9841000000",
  },
  {
    id: 2,
    name: "Sita Sharma",
    post: "Information Officer",
    phone: "9852000000",
  },
  {
    id: 3,
    name: "Hari Prasad",
    post: "Information Officer",
    phone: "9863000000",
  },
];

const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Contact Persons
      </h1>

      <div className="space-y-6">
        {contacts.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Info */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900">
                {person.name}
              </h2>
              <p className="text-sm text-gray-500">{person.post}</p>
              <p className="text-sm text-gray-700 mt-1">{person.phone}</p>
            </div>

            {/* Call Button */}
            <a
              href={`tel:${person.phone}`}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition"
              aria-label={`Call ${person.name}`}
            >
              <FaPhoneAlt size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
