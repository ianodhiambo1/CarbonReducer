import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Cookies from "js-cookie";

export const handleLogout = async (navigate: (path: string) => void) => {
  try {
    // ✅ Firebase logout
    await signOut(auth);

    // ✅ Remove cookies
    Cookies.remove("user");
    Cookies.remove("auth_token");

    // Optional: Confirm in console
    console.log("✅ Cookies cleared. User signed out.");

    // ✅ Redirect to sign-in page
    navigate("/signin");
  } catch (error) {
    console.error("Logout error:", error);
    alert("Failed to log out. Please try again.");
  }
};
