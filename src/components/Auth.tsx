import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  authType: "login" | "signup";
}

interface User {
  name: string;
  email: string;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, authType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [currentType, setCurrentType] = useState(authType);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if ((currentType === "signup" && !name) || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      // Create user object
      const user: User = {
        name: name || email.split("@")[0],
        email,
      };

      // Store user in localStorage
      localStorage.setItem("gigzlrUser", JSON.stringify(user));

      toast({
        title: `${
          currentType === "login" ? "Logged in" : "Account created"
        } successfully!`,
        description: "Welcome to Gigzlr!",
      });

      setIsLoading(false);
      onClose();

      // Dispatch authentication event
      window.dispatchEvent(new Event("userAuthenticated"));
    }, 1000);
  };

  const toggleAuthType = () => {
    setCurrentType(currentType === "login" ? "signup" : "login");
    // Reset form
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-gigzlr-dark">
            <div className="modal-header border-gigzlr-charcoal-light">
              <h5 className="modal-title text-white">
                {currentType === "login" ? "Login" : "Create Account"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {currentType === "signup" && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn-gigzlr py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : null}
                    {currentType === "login" ? "Login" : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer border-gigzlr-charcoal-light justify-content-center">
              <p className="text-gigzlr-gray">
                {currentType === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={toggleAuthType}
                  className="text-gigzlr-blue ms-2 bg-transparent border-0"
                >
                  {currentType === "login" ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default Auth;
