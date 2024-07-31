// utils/api.ts
export const fetchUsers = async () => {
    const response = await fetch('http://localhost:5001/api/staff'); // Adjust endpoint as necessary
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };
  