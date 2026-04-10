import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOtp({otp, setOtp}) {
  return (
    <div className="h-15 flex justify-center items-center">
      <InputOTP value={otp} onChange={setOtp} id="digits-only" maxLength={5} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className="h-15 w-15 " />
          <InputOTPSlot index={1} className="h-15 w-15" />
          <InputOTPSlot index={2} className="h-15 w-15" />
          <InputOTPSlot index={3} className="h-15 w-15" />
          <InputOTPSlot index={4} className="h-15 w-15 " />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
