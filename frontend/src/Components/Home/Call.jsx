import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const contacts = [
  {
    id: 1,
    name: "Ram Bahadur Thapa",
    post: "Chief Officer",
    phone: "9841000000",
  },
  {
    id: 2,
    name: "Sita Sharma",
    post: "Deputy Officer",
    phone: "9852000000",
  },
  {
    id: 3,
    name: "Hari Prasad",
    post: "Secretary",
    phone: "9863000000",
  },
];

const ContactPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        📞 Contact Persons
      </h1>
      <div className="space-y-4">
        {contacts.map((person) => (
          <div
            key={person.id}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Info */}
            <div>
              <h2 className="text-lg font-semibold">{person.name}</h2>
              <p className="text-gray-600">{person.post}</p>
              <p className="text-gray-800">{person.phone}</p>
            </div>

            {/* Call Button */}
            <a
              href={`tel:${person.phone}`}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition"
            >
              <FaPhoneAlt size={20} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
