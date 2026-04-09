import { useState } from "react";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("form submitted", formData.email);

    navigate("/verify");
  };

  return (
    <main data-form>
      <header className="verif-form-header">
        <img src={logo} alt="ab33 logo" />
      </header>

      <div className="form-wrapper">
        <h1>Sign up</h1>

        <form onSubmit={handleSubmit}>
          <div data-form-group>
            <label htmlFor="fullName">
              <span className="mono">FULL NAME</span>
              <span id="warningBlock"></span>
              <input
                value={formData.fullName}
                required
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                }}
                id="fullName"
                type="text"
              />
            </label>

            <label htmlFor="email">
              <span className="mono">EMAIL</span>
              <span id="warningBlock"></span>
              <input
                value={formData.email}
                required
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                id="email"
                type="email"
              />
            </label>

            <label htmlFor="password">
              <span className="mono">PASSWORD</span>
              <input
                value={formData.password}
                required
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                id="password"
                type="password"
              />
            </label>
          </div>

          <span className="c-new-acct handwritten">
            Don't have an account? create one here
          </span>

          <div className="form-btn-group">
            <button
              type="submit"
              role="button"
              id="#submitBtn"
              className="mono"
            >
              Create my account
            </button>

            {/* <span className="handwritten">or</span>

            <button className="mono">Continue with Google</button> */}
          </div>
        </form>
      </div>
    </main>
  );
}
