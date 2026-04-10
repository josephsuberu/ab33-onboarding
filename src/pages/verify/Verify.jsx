import { Link } from "react-router-dom";
import "./verify.css";
import InputOtp from "./components/InputOtp";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useAutoHeight from "./components/useAutoHeight";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [otpBtn, setOtpBtn] = useState("Confirm my account");
  const [notSubmitted, setNotSubmitted] = useState(true);
  const [isOTPvalid, setIsOTPvalid] = useState(false);
  const { ref, height } = useAutoHeight();

  const isComplete = otp.length === 5;

  // form submit
  const handleOTP = (e) => {
    e.preventDefault();

    if (isComplete && otp === "12345") {
      console.log("correct");
      setOtp("");
      setTimeout(() => {
        setIsOTPvalid(true);
      }, 1300);
    } else {
      setIsOTPvalid(false);
      console.log("wrong");
      clearTimeout(() => {
        setIsOTPvalid(true);
      }, 1300);
      setOtp("");
    }
  };

  // form button - interactive UI logic
  const handleSubmitOTP = () => {
    setOtpBtn("confirming");
    document.activeElement?.blur(); // remove the focus from the OTP component if using keyboard navigation
    setTimeout(() => {
      setOtp("");
      setOtpBtn(otpBtn);
    }, 1300);

    if (otp === "12345") {
      setTimeout(() => {
        setNotSubmitted(!notSubmitted);
      }, 1300);
    } else null;
  };

  return (
    <main id="verifyForm">
      <form
        onSubmit={handleOTP}
        style={{
          height: height ?? "auto",
          // overflow: "hidden",
          transition: "height 1000ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <div className="inner-verify-form" ref={ref}>
          <div>
            <span
              className={`handwritten ${isOTPvalid ? "opacity-0 leading-0" : ""}`}
            >
              We sent your verification code to
            </span>

            <div className="email-wrapper">joeysuberu@gmail.com</div>

            {notSubmitted && (
              <div className="code-v">
                <Link to="#" className="handwritten">
                  check yor email inbox here
                </Link>
              </div>
            )}

            {notSubmitted && <InputOtp otp={otp} setOtp={(value)=> {setOtp(value)}} />}
          </div>

          {notSubmitted && (
            <div className="w-full">
              <button
                type="submit"
                role="button"
                onClick={handleSubmitOTP}
                disabled={!isComplete}
                className={cn(
                  "mono text-[12px] w-full max-w-100 v-btn",
                  `${isComplete ? "bg-red-500" : "btn-disabled"}`,
                )}
              >
                {otpBtn}
              </button>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
