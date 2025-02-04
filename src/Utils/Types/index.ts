export type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  telephone: string;
  idType: string;
  idNumber: string;
};

export type AdditionalDataInputs = {
  department: string;
  municipality: string;
  direction: string;
  monthlyEarns: string;
  photos: Array<File>;
};
