import * as Yup from "yup";

export const familyYup = Yup.object({
  familyName: Yup.string()
    .min(3, "Aile adı en az 3 harften oluşmalı")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Aile adı yalnızca harflerden oluşmalıdır"
    )
    .required("Aile adı zorunludur"),

  familyMemberCount: Yup.number()
    .typeError("Üye sayısı sadece sayı olmalıdır")
    .integer("Üye sayısı tam sayı olmalıdır")
    .min(1, "En az 1 üye olmalıdır")
    .required("Üye sayısı zorunludur"),

  phoneNumber: Yup.string()
    .matches(
      /^0[5-7]\d{9}$/,
      "Geçerli bir telefon numarası giriniz (0 ile başlamalı, 11 haneli olmalı)"
    )
    .required("Telefon numarası zorunludur"),

  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com)$/,
      "Sadece @gmail.com adresi kabul edilmektedir"
    )
    .required("Email zorunludur"),

  address: Yup.object({
    city: Yup.string().required("İl seçmek zorunludur"),
    district: Yup.string()
      .required("İlçe zorunludur")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Aile adı yalnızca harflerden oluşmalıdır"
      ),
    neighborhood: Yup.string()
      .required("Mahalle zorunludur")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Aile adı yalnızca harflerden oluşmalıdır"
      ),
    street: Yup.string()
      .required("Sokak zorunludur")
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Aile adı yalnızca harflerden oluşmalıdır"
      ),
  }),
});

export const studentYup = Yup.object({
  name: Yup.string()
    .min(3, "Öğrenci adı en az 3 harften oluşmalı")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Öğrenci adı yalnızca harflerden oluşmalıdır"
    )
    .required("Öğrenci adı zorunludur"),

  surname: Yup.string()
    .min(3, "Öğrenci soyadı en az 3 harften oluşmalı")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Öğrenci soyadı yalnızca harflerden oluşmalıdır"
    )
    .required("Öğrenci soyadı zorunludur"),

  age: Yup.number()
    .typeError("Yaş sadece rakam olmalıdır")
    .integer("Yaş tam sayı olmalıdır")
    .positive("Yaş negatif olamaz")
    .min(15, "Yaş en az 15 olmalıdır")
    .max(100, "Yaş en fazla 100 olmalıdır")
    .required("Yaş alanı zorunludur"),

  tckn: Yup.string()
    .matches(/^[1-9]\d{10}$/, "TC Kimlik Numarası 11 haneli olmalıdır") // 11 haneli ve 0 ile başlamayan
    .required("TC Kimlik Numarası zorunludur"),

  phoneNumber: Yup.string()
    .matches(
      /^0[5-7]\d{9}$/,
      "Geçerli bir telefon numarası giriniz (0 ile başlamalı, 11 haneli olmalı)"
    )
    .required("Telefon numarası zorunludur"),

  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com)$/,
      "Sadece @gmail.com adresi kabul edilmektedir"
    )
    .required("Email zorunludur"),

  genderType: Yup.string().required("Cinsiyet seçmek zorunludur"),

  educationLevel: Yup.string().required("Eğitim seviyesi seçmek zorunludur"),

  address: Yup.object({
    city: Yup.string().required("İl seçmek zorunludur"),
    district: Yup.string()
      .required("İlçe zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
    neighborhood: Yup.string()
      .required("Mahalle zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
    street: Yup.string()
      .required("Sokak zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
  }),
});

export const categoryYup = Yup.object({
  itemName: Yup.string()
    .required("Ürün adı zorunludur")
    .min(3, "Ürün en az 3 karakterli olmalıdır")
    .matches(
      /^[^0-9]*$/,
      "Ürün adı sayı içeremez (Sadece harf ve özel karakter girilebilir)"
    ),
  unit: Yup.string()
    .required("Birim zorunludur")
    .min(3, "Adet en az 3 karakterli olmalıdır")
    .matches(
      /^[^0-9]*$/,
      "Ürün adı sayı içeremez (Sadece harf ve özel karakter girilebilir)"
    ),
});

export const donorYup = Yup.object({
  firstName: Yup.string()
    .min(3, "Bağışçı adı en az 3 harften oluşmalı")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Bağışçı adı yalnızca harflerden oluşmalıdır"
    )
    .required("Bağışçı adı zorunludur"),

  lastName: Yup.string()
    .min(3, "Bağışçı soyadı en az 3 harften oluşmalı")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Bağışçı soyadı yalnızca harflerden oluşmalıdır"
    )
    .required("Bağışçı soyadı zorunludur"),

  phoneNumber: Yup.string()
    .matches(
      /^0[5-7]\d{9}$/,
      "Geçerli bir telefon numarası giriniz (0 ile başlamalı, 11 haneli olmalı)"
    )
    .required("Telefon numarası zorunludur"),

  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com)$/,
      "Sadece @gmail.com adresi kabul edilmektedir"
    )
    .required("Email zorunludur"),

  address: Yup.object({
    district: Yup.string()
      .required("İlçe zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
    neighborhood: Yup.string()
      .required("Mahalle zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
    street: Yup.string()
      .required("Sokak zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
  }),
});
