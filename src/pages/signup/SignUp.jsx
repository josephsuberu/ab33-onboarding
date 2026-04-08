import { useState } from "react";
import logo from "/logo.svg";
import { useRef } from "react";
import { useEffect } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  let invalidAttempts = 0;
  let formFilled = true;

  const formRef = useRef(null);
  const submitBtn = document.querySelector("#submitBtn");

  useEffect(() => {
    const inputs = formRef.current.querySelectorAll("[required]");
    console.log(formRef.current.querySelectorAll("[required]"));
    console.log(formFilled);
    console.log(invalidAttempts);

    // validation check
    const updateSubmitState = () => {
      inputs.forEach((input) => {
        const warning = input.parentElement.querySelector("#warningBlock");
        console.log(warning);

        // reset state first
        warning.textContent = "";

        if (!input.checkValidity()) {
          formFilled = false;
          warning.textContent = input.validationMessage;
        } else {
          warning.textContent = "";
        }
      });

      const allValid = Array.from(inputs).every((input) =>
        input.checkValidity(),
      );

      if (allValid) {
        formFilled = true;
        submitBtn.disabled = false;
        submitBtn.textContent = "submit";
        submitBtn.classList.remove("hidden");
        submitBtn.style.cssText = "cursor: pointer;";
      }
    };

    // live validation block on each input
    inputs.forEach((input) =>
      input.addEventListener("input", updateSubmitState),
    );

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log("form submitted", formData.email);

      updateSubmitState();

      if (formFilled) {
        console.log("Form submitted successfully");
        invalidAttempts = 0;
      } else {
        invalidAttempts++;
      }

      if (invalidAttempts >= 3) {
        formFilled = false;
        submitBtn.disabled = true;
        submitBtn.textContent = "removing...";
        submitBtn.classList.add("holdExcessive");
        setTimeout(() => {
          submitBtn.style.cssText = " cursor: default;";
          submitBtn.classList.remove("holdExcessive");
          submitBtn.classList.add("hidden");
        }, 800);
      } else {
        formFilled = true;
        submitBtn.disabled = false;
        submitBtn.textContent = "submit";
      }
    };

    document.addEventListener("DOMContentLoaded", () => {
      formRef.current.addEventListener("submit", handleSubmit);
    });
  }, []);

  return (
    <main data-form>
      <header className="verif-form-header">
        <img src={logo} alt="ab33 logo" />
      </header>

      <div className="form-wrapper">
        <h1>Sign up</h1>

        <form ref={formRef}>
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
