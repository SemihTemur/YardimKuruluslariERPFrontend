export const familyInitialValues = {
  familyName: "",
  familyMemberCount: "",
  phoneNumber: "",
  email: "",
  address: {
    city: "",
    district: "",
    neighborhood: "",
    street: "",
    userType: "Aile",
  },
};

export const studentInitialValues = {
  name: "",
  surname: "",
  age: "",
  tckn: "",
  phoneNumber: "",
  email: "",
  genderType: "",
  educationLevel: "",
  address: {
    city: "",
    district: "",
    neighborhood: "",
    street: "",
    userType: "Öğrenci",
  },
};

export const categoryInitialValues = {
  itemName: "",
  unit: "",
};

export const donorInitialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  genderType: "",
  address: {
    city: "",
    district: "",
    neighborhood: "",
    street: "",
    userType: "Öğrenci",
  },
};

export const cashDonationInitialValues = {
  donorFirstName: "",
  donorLastName: "",
  amount: "",
  currency: "TRY",
};

export const inKindDonationInitialValues = {
  donorFirstName: "",
  donorLastName: "",
  category: {
    itemName: "",
    unit: "",
  },
  quantity: "",
};

export const cashAidInitialValues = {
  familyName: "",
  aidAmount: "",
  duration: "",
  period: "",
  currency: "TRY",
};

export const inKindAidInitialValues = {
  familyName: "",
  category: {
    itemName: "",
    unit: "",
  },
  quantity: "",
  period: "",
  duration: "",
};

export const otherIncomeInitialValues = {
  description: "",
  amount: "",
  currency: "TRY",
};

export const otherExpenseInitialValues = {
  description: "",
  amount: "",
  currency: "TRY",
};

export const scholarshipInitialValues = {
  studentName: "",
  studentSurname: "",
  scholarshipAmount: "",
  currency: "TRY",
  period: "",
  duration: "",
};

export const userInitialValues = {
  username: "",
  email: "",
  password: "",
  role: "",
};
