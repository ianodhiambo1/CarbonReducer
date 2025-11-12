import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface UserData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<UserData>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  // 🔹 Fetch user data from Firestore
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.warn("No authenticated user found.");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setUserData(data);
          setEditData(data);
        } else {
          console.warn("User not found in Firestore:", user.uid);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Handle form edits
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Save updates to Firestore
  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return alert("User not logged in.");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        fname: editData.fname,
        lname: editData.lname,
        phone: editData.phone,
      });

      setUserData(editData);
      closeModal();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving changes:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Loading user data...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          No user information found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userData.fname || "—"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userData.lname || "—"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userData.email || "—"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userData.phone || "—"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          Edit
        </button>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your personal details below.
            </p>
          </div>

          <form className="flex flex-col"
          onSubmit={(e) => {
    e.preventDefault(); // ⛔ prevent URL reload
    handleSave(); // ✅ call your save function
  }}>
            <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>First Name</Label>
                  <Input
                    name="fname"
                    type="text"
                    value={editData.fname}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    name="lname"
                    type="text"
                    value={editData.lname}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Email Address</Label>
                  <Input
                    name="email"
                    type="text"
                    value={editData.email}
                    disabled
                    className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    type="text"
                    value={editData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
