import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

export const useLogout = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const logout = () => {
    // React auth kit signout
    signOut();

    // Navigate to home page
    navigate("/");
  };

  return { logout };
};
