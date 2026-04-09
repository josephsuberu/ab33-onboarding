import { Link } from "react-router-dom";
import "./verify.css";

export default function Verify() {
  return (
    <main data-form id="verify">
      <form>
        <span className="handwritten">We sent your verification code to</span>

        <div className="email-wrapper">joeysuberu@gmail.com</div>

        <div className="code-v">
          <Link to="#" className="handwritten">
            check yor email inbox here
          </Link>
        </div>

        <button type="submit" role="button" id="v-btn" className="mono">
          Confirm my account
        </button>
      </form>
    </main>
  );
}
