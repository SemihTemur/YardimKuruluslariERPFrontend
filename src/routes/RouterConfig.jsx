import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
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
import Role from "../pages/Role/Role";
import User from "../pages/User/User";
import Permission from "../pages/Permission/Permission";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import PrivateRouter from "./PrivateRouter";
import Profil from "../pages/Profil/Profil";
import Log from "../pages/Log/Log";

export const RouterConfig = () => {
  const { user } = useSelector((state) => state.auth);

  const hasRole = (role) => {
    if (user?.authorities?.includes("ROLE_SUPER_ADMIN")) {
      return true;
    }
    return user?.authorities?.includes(role);
  };

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>

      <Route element={<PrivateRouter />}>
        <Route path="/home" element={<Home />} />
        <Route path="/donor" element={<Donor />} />
        {hasRole("FAMILY_LIST") ? (
          <Route path="/family" element={<Family />} />
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}
        {hasRole("STUDENT_LIST") ? (
          <Route path="/student" element={<Student />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        <Route path="/aid">
          {hasRole("CASHAID_LIST") ? (
            <Route path="cash" element={<CashAid />}></Route>
          ) : (
            <Route path="*" element={<Unauthorized />} />
          )}

          {hasRole("INKINDAID_LIST") ? (
            <Route path="inkind" element={<InKindAid />}></Route>
          ) : (
            <Route path="*" element={<Unauthorized />} />
          )}
        </Route>

        {hasRole("CASHDONATION_LIST") ? (
          <Route path="/donation/cash" element={<CashDonation />} />
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        {hasRole("INKINDDONATION_LIST") ? (
          <Route path="/donation/inkind" element={<InKindDonation />} />
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        {hasRole("INKINDAID_LIST") ? (
          <Route path="inkind" element={<InKindAid />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        {hasRole("SCHOLARSHIP_LIST") ? (
          <Route path="/scholarship" element={<Scholarship />} />
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        <Route path="/income">
          <Route path="donation-income">
            <Route path="cash-donations" element={<CashDonationIncome />} />
            <Route
              path="in-kind-donations"
              element={<InKindDonationIncome />}
            />
          </Route>

          {hasRole("OTHERINCOME_LIST") ? (
            <Route path="other" element={<OtherIncome />}></Route>
          ) : (
            <Route path="*" element={<Unauthorized />} />
          )}
        </Route>

        <Route path="/expense">
          <Route path="aid-expense">
            <Route path="cash-aid-expense" element={<CashAidExpense />} />
            <Route path="in-kind-aid-expense" element={<InKindAidExpense />} />
          </Route>
          {hasRole("OTHEREXPENSE_LIST") ? (
            <Route path="other" element={<OtherExpense />}></Route>
          ) : (
            <Route path="*" element={<Unauthorized />} />
          )}
          <Route path="scholarship-expense" element={<ScholarshipExpense />} />
        </Route>

        {hasRole("CATEGORY_LIST") ? (
          <Route path="/category" element={<Category />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        {hasRole("INVENTORY_LIST") ? (
          <Route path="/inventory" element={<Inventory />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        {hasRole("CUSTOMUSER_LIST") ? (
          <Route path="/user" element={<User />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        {hasRole("ROLE_LIST") ? (
          <Route path="/role" element={<Role />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        {hasRole("SUPER_ADMIN") ? (
          <Route path="/permission" element={<Permission />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}

        <Route path="/profile" element={<Profil />} />

        {hasRole("SUPER_ADMIN") ? (
          <Route path="/log" element={<Log />}></Route>
        ) : (
          <Route path="*" element={<Unauthorized />} />
        )}
      </Route>
    </Routes>
  );
};
