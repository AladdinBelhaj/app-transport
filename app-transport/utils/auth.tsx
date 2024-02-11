// app/auth/auth.ts

// Function to save token to local storage
export const saveToken = (token: string): void => {
  // if (typeof window !== "undefined") {
  localStorage.setItem("token", token);
};
// };

// Function to retrieve token from local storage
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token;
  }
  return null;
};

// Function to remove token from local storage
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
