import { useState } from "react";
import  userService  from "../Services/userService";

const useAddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const addUser = async (user) => {
    setIsLoading(true);
    try {
      const newUser = await userService.postUser(user);
      setUser(newUser);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { addUser, isLoading, error, user };
};

export default useAddUser;
