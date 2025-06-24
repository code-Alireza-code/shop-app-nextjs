"use client";

import { useState } from "react";
import GetOtp from "./_/components/GetOtp";
import CheckOtp from "./_/components/CheckOtp";

function AuthPage() {
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full md:max-w-sm">
        {formStep === 1 ? (
          <GetOtp setFormStep={setFormStep} setPhoneNumber={setPhoneNumber} />
        ) : (
          <CheckOtp phoneNumber={phoneNumber} setFormStep={setFormStep} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
