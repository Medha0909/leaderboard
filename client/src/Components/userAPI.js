// src/api/userApi.js
export const fetchUserInfo = async (userId) => {
  const response = await fetch(
    `http://localhost:7000/api/user/v1/get-users-info-id/${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  return response.json();
};
