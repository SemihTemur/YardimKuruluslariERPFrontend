import React from "react";

const StudentForm = () => {
  return (
    <>
      <div className="form-container__content">
        <Label text="Öğrenci Adı:" />
        <Input type="text" />
      </div>
      <div className="form-container__content">
        <Label text="Öğrenci Soyadı:" />
        <Input type="number" />
      </div>
      <div className="form-container__content">
        <Label text="Yaşı:" />
        <Input type="number" />
      </div>
      <div className="form-container__content">
        <Label text="T.C.Kimlik Numarası:" />
        <Input type="number" />
      </div>
      <div className="form-container__content">
        <Label text="Telefon Numarası:" />
        <Input type="number" />
      </div>
      <div className="form-container__content">
        <Label text="Email:" />
        <Input type="email" />
      </div>
      <div className="form-container__content">
        <Label text="Cinsiyet:" />
        <Select
          value={selectGender}
          onChange={handleSelectGender}
          values={genders}
        />
      </div>
      <div className="form-container__content">
        <Label text="Eğitim Seviyesi:" />
        <Select
          value={selectEducation}
          onChange={handleSelectEducation}
          values={educationLevel}
        />
      </div>
      <div className="form-container__content">
        <Label text="İl:" />
        <Select
          value={selectCity}
          onChange={handleSelectCity}
          values={cities}
        />
      </div>

      <div className="form-container__content">
        <Label text="İlçe:" />
        <Input type="text" />
      </div>
      <div className="form-container__content">
        <Label text="Mahalle:" />
        <Input type="text" />
      </div>
      <div className="form-container__content">
        <Label text="Sokak:" />
        <Input type="text" />
      </div>
      <Button></Button>
    </>
  );
};

export default StudentForm;
