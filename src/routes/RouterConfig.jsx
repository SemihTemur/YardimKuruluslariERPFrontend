import React from "react";
import { Routes, Route } from "react-router-dom";
import FamilyAdd from "../pages/Family/FamilyAdd";
import FamilyList from "../pages/Family/FamilyList";
import { StudentAdd } from "../pages/Student/StudentAdd";
import CategoryAdd from "../pages/Category/CategoryAdd";
import { DonorAdd } from "../pages/Donor/DonorAdd";
import ScholarshipAdd from "../pages/Scholarship/ScholarshipAdd";
import CashDonationAdd from "../pages/Donation/CashDonation/CashDonationAdd";
import CashDonationList from "../pages/Donation/CashDonation/CashDonationList";
import InKindDonationAdd from "../pages/Donation/InKındDonation/InKindDonationAdd";
import CashAidAdd from "../pages/Aid/CashAid/CashAidAdd";
import InKindAidAdd from "../pages/Aid/InKındAid/InKindAidAdd";
import OtherIncomeAdd from "../pages/Income/OtherIncome/OtherIncomeAdd";
import OtherExpense from "../pages/Expense/OtherExpense/OtherExpenseAdd";
import InKindDonationList from "../pages/Donation/InKındDonation/InKindDonationList";
import DonorList from "../pages/Donor/DonorList";
import StudentList from "../pages/Student/StudentList";
import CashAidList from "../pages/Aid/CashAid/CashAidList";
import InKindAidList from "../pages/Aid/InKındAid/InKindAidList";
import ScholarshipList from "../pages/Scholarship/ScholarshipList";
import CategoryList from "../pages/Category/CategoryList";
import InventoryList from "../pages/Inventory/InventoryList";
import CashDonationIncomeList from "../pages/Income/DonationIncome/CashDonationIncomeList";
import InKindDonationIncomeList from "../pages/Income/DonationIncome/InKindDonationIncomeList";
import OtherIncomeList from "../pages/Income/OtherIncome/OtherIncomeList";
import Log from "../pages/Log/Log";
import ScholarshipExpenseList from "../pages/Expense/ScholarshipExpense/ScholarshipExpenseList";
import CashAidExpenseList from "../pages/Expense/DonationExpense/CashAidExpenseList";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/home" />

      <Route path="/bagis">
        <Route path="nakdi">
          <Route path="ekle" element={<CashDonationAdd />} />
          <Route path="list" element={<CashDonationList />} />
        </Route>
        <Route path="ayni">
          <Route path="ekle" element={<InKindDonationAdd />} />
          <Route path="list" element={<InKindDonationList />} />
        </Route>
      </Route>

      <Route path="/bagisci">
        <Route path="ekle" element={<DonorAdd />} />
        <Route path="list" element={<DonorList />} />
      </Route>

      <Route path="/aile">
        <Route path="ekle" element={<FamilyAdd />} />
        <Route path="list" element={<FamilyList />} />
      </Route>

      <Route path="/ogrenci">
        <Route path="ekle" element={<StudentAdd />} />
        <Route path="list" element={<StudentList />} />
      </Route>

      <Route path="/yardim">
        <Route path="nakdi">
          <Route path="ekle" element={<CashAidAdd />} />
          <Route path="list" element={<CashAidList />} />
        </Route>
        <Route path="ayni">
          <Route path="ekle" element={<InKindAidAdd />} />
          <Route path="list" element={<InKindAidList />} />
        </Route>
      </Route>

      <Route path="/burs">
        <Route path="ekle" element={<ScholarshipAdd />} />
        <Route path="list" element={<ScholarshipList />} />
      </Route>

      <Route path="/gelirler">
        <Route path="bagis-gelirleri">
          <Route
            path="nakdi-bagis-gelirleri"
            element={<CashDonationIncomeList />}
          />
          <Route
            path="ayni-bagis-gelirleri"
            element={<InKindDonationIncomeList />}
          />
        </Route>
        <Route path="diger">
          <Route path="ekle" element={<OtherIncomeAdd />} />
          <Route path="list" element={<OtherIncomeList />} />
        </Route>
      </Route>

      <Route path="/giderler">
        <Route path="yardim-giderler">
          <Route
            path="nakdi-yardim-giderler"
            element={<CashAidExpenseList />}
          />
          <Route path="ayni-yardim-giderler" element={<FamilyAdd />} />
        </Route>
        <Route path="diger">
          <Route path="ekle" element={<OtherExpense />} />
          <Route path="list" element={<FamilyAdd />} />
        </Route>
        <Route path="burs-giderler" element={<ScholarshipExpenseList />} />
      </Route>

      <Route path="/tur">
        <Route path="ekle" element={<CategoryAdd />} />
        <Route path="list" element={<CategoryList />} />
      </Route>

      <Route path="/envanter">
        <Route path="list" element={<InventoryList />} />
      </Route>

      <Route path="/log">
        <Route path="list" element={<Log />} />
      </Route>
    </Routes>
  );
};
