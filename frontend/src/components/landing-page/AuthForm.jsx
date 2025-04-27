import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/components/authform.scss';
import googleIcon from '../../assets/signin-login/google icon.svg';
import toast from "react-hot-toast";
// import { Spinner } from "../Dashboard/create-certificate/Spinner";

const AuthForm = ({ isSignup, onSubmit, submit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    ...(isSignup && { name: "" }), // Adds name field only for signup
  });

  const [error, setError] = useState(""); // State to store validation error

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // The password validation: Clears error if the user types a valid password
    if (name === "password" && value.length >= 8) {
      setError("");
    }
  };

  const handleSubmit = () => {

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("All fields are required!");
      return;
    }

    // ✅ Checks if the password is at least 8 characters
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    onSubmit(formData); // Calls parent submit function
  };

  const googleConnect = () => {
    toast.error("Google auth isn't available at this time! Please sign in or login using email and password")
  }

  const handleNavigation = (event) => {
    // event.preventDefault(); // Prevent default form submission

    // Check if inputs are empty
    
    console.log(formData);
    // If inputs are filled, navigate
    setError(""); // Clear any previous errors
    navigate("/xertis/dashboard/overview");
  };
  return (
    <form className="form-container">
      {isSignup && (
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </label>
      )}

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="xertis@gmail.com"
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="********"
        />
        {isSignup && (
          <p className="password-label-text">Must be at least 8 characters</p>
        )}
      </label>

      {/* Shows error message if password is too short */}
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      {/* Remember Me & Forgot Password (Only in Login) */}
      {!isSignup && (
        <div className="remember-me">
          <label>
            Remember Me
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          </label>
          <a
            href="/forgot-password"
            style={{ textDecoration: "none", color: "blue" }}
          >
            Forgot Password?
          </a>
        </div>
      )}
      <div className="form-buttons">
        {isSignup ? (
          <button type="button" onClick={isSignup ? handleSubmit : undefined} className="submit-btn">
            {submit ? (
              <>
                <Spinner /> <span>Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        ) : (
          <button type="button" onClick={!isSignup ? handleSubmit : undefined} className="submit-btn">
            {submit ? (
              <>
                <Spinner/> <span >Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        )}
        <button
          onClick={googleConnect}
          type="button"
          className="google-signup-button"
        >
          <img src={googleIcon} alt="google logo" />
          {isSignup ? "Sign up with Google" : "Sign in with Google"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
