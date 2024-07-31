import React from 'react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
}

interface UserSelectProps {
  users: User[];
  role: 'student' | 'staff';
  onUserSelect: (userId: number) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ users, role, onUserSelect }) => {
    console.log(users);
    
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select a {role === 'student' ? 'Student' : 'Staff'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 cursor-pointer"
            onClick={() => onUserSelect(user.id)}
          >
            <div className=" font-semibold mb-2 text-black text-2xl">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-gray-600 mb-1">Email: {user.email}</div>
            <div className="text-gray-600">Date of Birth: {user.date_of_birth}</div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the parent click event
                onUserSelect(user.id);
              }}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Go to {role === 'student' ? 'Student' : 'Staff'} Page
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSelect;
