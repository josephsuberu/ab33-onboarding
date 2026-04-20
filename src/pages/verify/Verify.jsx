import { Link } from "react-router-dom";
import "./verify.css";
import InputOtp from "./components/InputOtp";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import useAutoHeight from "./components/useAutoHeight";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import MyAvatar from "./components/MyAvatar";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [otpBtn, setOtpBtn] = useState("Confirm my account");
  const [boolState, setBoolState] = useState({
    isOTPvalid: false,
    isSubmitting: false,
    isCreating: false,
    isCreated: false,
    isCompleted: false,
    isSubmitted: true,
    isAvatarVisible: false,
  });
  const { ref, height } = useAutoHeight();
  const emailSplitRef = useRef(null);

  const isComplete = otp.length === 5;

  // gsap plugin registry
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(CustomEase);

  // customEase
  CustomEase.create("smooth-slide", "0.65, 0, 0.19, 1.06");

  // form submit
  const handleOTP = (e) => {
    e.preventDefault();

    if (isComplete && otp === "12345") {
      // console.log("correct");
      setOtp("");
      setTimeout(() => {
        setBoolState((prev) => ({ ...prev, isOTPvalid: true }));
        setBoolState((prev) => ({ ...prev, isSubmitting: true }));
      }, 1300);
      setTimeout(() => {
        setBoolState((prev) => ({ ...prev, isCreating: true }));
      }, 2500);
      setTimeout(() => {
        setBoolState((prev) => ({ ...prev, isCreated: true }));
      }, 4000);
      setTimeout(() => {
        setBoolState((prev) => ({ ...prev, isCompleted: true }));
      }, 5000);

      // split text instance
      setTimeout(() => {
        document.fonts.ready.then(() => {
          SplitText.create(emailSplitRef.current, {
            type: "lines, chars",
            // autoSplit: true,
            charsClass: "char",
            smartWrap: true,
            onSplit: (self) => {
              // if (hasAnimated.current) return; // ← bail if already ran
              // hasAnimated.current = true;

              const specialChar = self.chars.filter(
                (char) => char.textContent !== "@",
              );

              // console.log(atChar);

              return gsap.to(specialChar, {
                opacity: 0,
                autoAlpha: 0,
                padding: 0,
                margin: 0,
                stagger: {
                  amount: 0.6,
                  from: "center",
                },
                duration: 0.6,
                ease: "smooth-slide",
                onComplete: () => {
                  return gsap.to(specialChar, {
                    width: 0,
                    duration: 0.2,
                    ease: "smooth-slide",

                    onComplete: () => {
                      specialChar.forEach((char) => char.remove());
                    },
                  });
                },
              });
            },
          });
        });
      }, 6000);

      // display avatar profile
      setTimeout(() => {
        setBoolState((prev) => ({ ...prev, isAvatarVisible: true }));
      }, 7500);
    } else {
      setIsOTPvalid(false);
      // console.log("wrong");
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
        setBoolState((prev) => ({
          ...prev,
          isSubmitted: false,
        }));
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
          willChange: height,
          transition: "height 1000ms cubic-bezier(0.65, 0, 0.19, 1.06)",
        }}
      >
        <div
          ref={ref}
          className={cn(
            `${boolState.isOTPvalid ? "inner-creating-acc" : "inner-verify-form"}`,
          )}
        >
          <div>
            <span
              aria-hidden={boolState.isOTPvalid ? true : null}
              className={`handwritten ${boolState.isOTPvalid ? "opacity-0 leading-0" : ""}`}
            >
              We sent your verification code to
            </span>

            <div
              ref={emailSplitRef}
              className={`email-wrapper text-center relative flex justify-center items-center 
               ${boolState.isAvatarVisible ? "blur-md transition-all ease-in" : ""}`}
            >
              joeysuberu@gmail.com
            </div>

            {boolState.isSubmitted && (
              <div className="code-v">
                <Link to="#" className="handwritten">
                  check yor email inbox here
                </Link>
              </div>
            )}

            {boolState.isSubmitted && (
              <InputOtp
                otp={otp}
                setOtp={(value) => {
                  setOtp(value);
                }}
              />
            )}
          </div>

          {boolState.isSubmitted && (
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

          {/* account creation ui */}
          {boolState.isSubmitting && (
            <p
              aria-hidden={boolState.isCreated ? true : null}
              className={cn(
                `handwritten acct-crt-txt transition-all duration-400 ease-in`,
                `${boolState.isCreating ? "opacity-100" : "opacity-0"}`,
                `${boolState.isCompleted ? "opacity-0 delay-75" : ""}`,
              )}
            >
              {boolState.isCreated
                ? "account created :)"
                : "creating your account........"}
            </p>
          )}

          {/* avater profile ui */}
          <div
            aria-hidden
            className={cn(
              `absolute top-1/2 z-2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto avatar-pfp`,
              `${boolState.isAvatarVisible ? "avatar-pfp-visible" : ""}`,
            )}
          >
            <MyAvatar size={250} breathe={true} mouseFollow={true} />
          </div>

          {boolState.isAvatarVisible && (
            <p className="text-3xl w-full  font-medium bottom-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Welcome Joseph
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
