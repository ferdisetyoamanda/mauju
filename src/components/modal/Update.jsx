import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const EditUserModal = ({ isOpen, onClose, userData }) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setJob(userData.job);
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !job) {
      Swal.fire('Error', 'Please fill in all fields!', 'error');
      return;
    }

    const updatedUser = {
      name: name,
      job: job,
    };

    console.log('Updating user:', updatedUser);

    // Simulasi permintaan API di sini, jika diperlukan

    Swal.fire('Success', 'User has been updated!', 'success');
    onClose(); // Tutup modal setelah berhasil
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Job</label>
            <input
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter job"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
