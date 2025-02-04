const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete-contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contacts</h2>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{contact.name}</td>
              <td className="py-2 px-4">{contact.email}</td>
              <td className="py-2 px-4">{contact.phone}</td>
              <td className="py-2 px-4">{contact.message}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => updateContact(contact)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(contact.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
