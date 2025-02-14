import React from "react";
import { Routes, Route } from "react-router-dom";
import { FamilyAddPage } from "../pages/Family/FamilyAddPage";

export const RouterConfig = () => {
  return (
    <Routes>
      {/* <Route path="/home" element={sad} /> */}

      <Route path="/bagis">
        <Route path="nakdi">
          <Route path="ekle" element={<FamilyAddPage />} />
          <Route path="list" element={<FamilyAddPage />} />
        </Route>
        <Route path="ayni">
          <Route path="ekle" element={<FamilyAddPage />} />
          <Route path="list" element={<FamilyAddPage />} />
        </Route>
      </Route>

      <Route path="/bagisci">
        <Route path="ekle" element={<FamilyAddPage />} />
        <Route path="list" element={<FamilyAddPage />} />
      </Route>

      <Route path="/aile">
        <Route path="ekle" element={<FamilyAddPage />} />
        <Route path="list" element={<FamilyAddPage />} />
      </Route>

      <Route path="/ogrenci">
        <Route path="ekle" element={<FamilyAddPage />} />
        <Route path="list" element={<FamilyAddPage />} />
      </Route>

      <Route path="/yardim">
        <Route path="nakdi">
          <Route path="ekle" element={<FamilyAddPage />} />
          <Route path="list" element={<FamilyAddPage />} />
        </Route>
        <Route path="ayni">
          <Route path="ekle" element={<FamilyAddPage />} />
          <Route path="list" element={<FamilyAddPage />} />
        </Route>
      </Route>

      <Route path="/burs">
        <Route path="ekle" element={<FamilyAddPage />} />
        <Route path="list" element={<FamilyAddPage />} />
      </Route>

      <Route path="/gelirler">
        <Route path="bagis-gelirleri">
          <Route path="nakdi-bagis-gelirleri" element={<FamilyAddPage />} />
          <Route path="ayni-bagis-gelirleri" element={<FamilyAddPage />} />
        </Route>
        <Route path="diger">
          <Route path="ekle" element={<FamilyAddPage />} />
          <Route path="list" element={<FamilyAddPage />} />
        </Route>
      </Route>

      <Route path="/giderler">
        <Route path="yardim-giderler">
          <Route path="nakdi-yardim-giderler" element={<FamilyAddPage />} />
          <Route path="ayni-yardim-giderler" element={<FamilyAddPage />} />
        </Route>
        <Route path="diger">
          <Route path="ekle" element={<FamilyAddPage />} />
          <Route path="list" element={<FamilyAddPage />} />
        </Route>
        <Route path="burs-giderler" element={<FamilyAddPage />} />
      </Route>

      <Route path="/tur">
        <Route path="ekle" element={<FamilyAddPage />} />
        <Route path="list" element={<FamilyAddPage />} />
      </Route>

      <Route path="/envanter">
        <Route path="list" element={<FamilyAddPage />} />
      </Route>

      <Route path="/log">
        <Route path="list" element={<FamilyAddPage />} />
      </Route>
    </Routes>
  );
};
