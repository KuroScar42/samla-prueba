import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./PhoneSelect.scss";

interface PhoneSelectProps {
  selectedCountryCode?: string;
  phoneNumber?: string;
  onChange: (data: { countryCode: string; phoneNumber: string }) => void;
  hasError?: boolean;
}

const PhoneSelect: React.FC<PhoneSelectProps> = ({
  selectedCountryCode,
  phoneNumber: initialPhoneNumber,
  onChange,
  hasError,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(
    initialPhoneNumber || ""
  );
  const [countryCode, setCountryCode] = useState<string>(
    selectedCountryCode || "us"
  );

  useEffect(() => {
    if (selectedCountryCode) {
      setCountryCode(selectedCountryCode.toLowerCase());
    }
  }, [selectedCountryCode]);

  const handlePhoneChange = (value: string, data: any) => {
    setPhoneNumber(value);
    onChange({ countryCode: data?.dialCode || "", phoneNumber: value });
  };

  return (
    <PhoneInput
      inputClass={`${hasError ? "border-danger" : ""}`}
      buttonClass={`${hasError ? "border-danger" : ""}`}
      searchClass="countrySearch"
      enableSearch
      country={countryCode}
      value={phoneNumber}
      onChange={handlePhoneChange}
      inputStyle={{ width: "100%" }}
    />
  );
};

export default PhoneSelect;
