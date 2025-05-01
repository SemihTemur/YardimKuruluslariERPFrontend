import React from "react";
import { Routes, Route } from "react-router-dom";
import Student from "../pages/Student/Student";
import CashDonation from "../pages/Donation/CashDonation/CashDonation";
import InKindDonation from "../pages/Donation/InKindDonation/InKindDonation";
import Category from "../pages/Category/Category";
import Donor from "../pages/Donor/Donor";
import Family from "../pages/Family/Family";
import Scholarship from "../pages/Scholarship/Scholarship";
import CashAid from "../pages/Aid/CashAid/CashAid";
import InKindAid from "../pages/Aid/InKindAid/InKindAid";
import OtherIncome from "../pages/Income/OtherIncome/OtherIncome";
import OtherExpense from "../pages/Expense/OtherExpense/OtherExpense";
import Inventory from "../pages/Inventory/Inventory";
import CashDonationIncome from "../pages/Income/DonationIncome/CashDonationIncome";
import InKindDonationIncome from "../pages/Income/DonationIncome/InKindDonationIncome";
import CashAidExpense from "../pages/Expense/AidExpense/CashAidExpense";
import ScholarshipExpense from "../pages/Expense/ScholarshipExpense/ScholarshipExpense";
import InKindAidExpense from "../pages/Expense/AidExpense/InKindAidExpense";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/Login/ForgotPassword";
import Home from "../pages/Home/Home";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>

      <Route path="/home" element={<Home />} />

      <Route path="/donation">
        <Route path="cash" element={<CashDonation />} />
        <Route path="inkind" element={<InKindDonation />} />
      </Route>
      <Route path="/donor" element={<Donor />} />
      <Route path="/family" element={<Family />} />
      <Route path="/student" element={<Student />}></Route>

      <Route path="/aid">
        <Route path="cash" element={<CashAid />}></Route>
        <Route path="inkind" element={<InKindAid />}></Route>
      </Route>
      <Route path="/scholarship" element={<Scholarship />}></Route>
      <Route path="/income">
        <Route path="donation-income">
          <Route path="cash-donations" element={<CashDonationIncome />} />
          <Route path="in-kind-donations" element={<InKindDonationIncome />} />
        </Route>
        <Route path="other" element={<OtherIncome />}></Route>
      </Route>

      <Route path="/expense">
        <Route path="aid-expense">
          <Route path="cash-aid-expense" element={<CashAidExpense />} />
          <Route path="in-kind-aid-expense" element={<InKindAidExpense />} />
        </Route>
        <Route path="other" element={<OtherExpense />}></Route>
        <Route path="scholarship-expense" element={<ScholarshipExpense />} />
      </Route>
      <Route path="/category" element={<Category />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      {/* <Route path="/log">
        <Route path="list" element={<Log />} />
      </Route> */}
    </Routes>
  );
};
