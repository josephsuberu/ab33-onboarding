import { Link } from "react-router-dom";
import "./verify.css";
import InputOtp from "./components/InputOtp";

export default function Verify() {
  return (
    <main data-form id="verify">
      <form>
        <div>
          <span className="handwritten">We sent your verification code to</span>

          <div className="email-wrapper">joeysuberu@gmail.com</div>

          <div className="code-v">
            <Link to="#" className="handwritten">
              check yor email inbox here
            </Link>
          </div>

          <InputOtp />
        </div>

        <div className="w-full">
          <button
            type="submit"
            role="button"
            id="v-btn"
            className="mono text-[12px] w-full max-w-100"
          >
            Confirm my account
          </button>
        </div>
      </form>
    </main>
  );
}
