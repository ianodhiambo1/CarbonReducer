import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, twitterProvider, db } from "../../firebaseConfig";
import { setUserCookie } from "../../utils/auth";
import { doc, setDoc } from "firebase/firestore"; // ✅ for Firestore


interface SignUpFormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  phone: string;
}

type FieldKey = keyof SignUpFormData;
type Errors = Partial<Record<FieldKey | "terms" | "firebase", string>>;

export default function SignUpForm(): React.ReactElement {
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name as FieldKey]: undefined, firebase: undefined }));
  };

  // ✅ Google sign-up → save cookies and go to home
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userObj = {
        uid: user.uid,
        email: user.email,
        fname: user.displayName?.split(" ")[0] || "",
        lname: user.displayName?.split(" ")[1] || "",
      };
      const token = await user.getIdToken();
      setUserCookie(userObj, token);

      alert(`Welcome, ${user.displayName || "User"}! Redirecting to dashboard...`);
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-in failed. Please try again.");
    }
  };

  // ✅ Twitter sign-up → save cookies and go to home
  const handleTwitterSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      const user = result.user;

      const userObj = {
        uid: user.uid,
        email: user.email,
        fname: user.displayName?.split(" ")[0] || "",
        lname: user.displayName?.split(" ")[1] || "",
      };
      const token = await user.getIdToken();
      setUserCookie(userObj, token);

      alert(`Welcome, ${user.displayName || "User"}! Redirecting to dashboard...`);
      navigate("/");
    } catch (error) {
      console.error("Twitter Sign-In Error:", error);
      alert("Twitter Sign-in failed. Please try again.");
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isChecked) newErrors.terms = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Email sign-up → store name + phone in Firebase, but don’t stay logged in
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // ✅ Update Firebase Auth profile
      await updateProfile(user, {
        displayName: `${formData.fname} ${formData.lname}`,
      });

      // ✅ Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      });

      alert(`Welcome, ${formData.fname}! Your account has been created. Please sign in.`);
      navigate("/signin");
    } catch (error: any) {
      console.error("Firebase Sign-Up Error:", error);
      let msg = "Sign-up failed. Please try again.";
      if (error.code === "auth/email-already-in-use") msg = "Email already registered.";
      else if (error.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (error.code === "auth/weak-password") msg = "Password must be at least 6 characters.";

      setErrors((prev) => ({ ...prev, firebase: msg }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create your account with email or Google.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="fname"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                  {errors.fname && <p className="text-sm text-red-500">{errors.fname}</p>}
                </div>

                <div className="sm:col-span-1">
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="lname"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                  {errors.lname && <p className="text-sm text-red-500">{errors.lname}</p>}
                </div>
              </div>

              <div>
                <Label>
                  Phone Number<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={(v: boolean) => setIsChecked(v)}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span>{" "}
                  and our <span className="text-gray-800 dark:text-white">Privacy Policy</span>
                </p>
              </div>

              {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
              {errors.firebase && <p className="text-sm text-red-500">{errors.firebase}</p>}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </div>
            </div>
          </form>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 mt-8">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
            >
              Sign up with Google
            </button>

            <button
              onClick={handleTwitterSignUp}
              type="button"
              className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
            >
              Sign up with X
            </button>
          </div>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{" "}
              <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
