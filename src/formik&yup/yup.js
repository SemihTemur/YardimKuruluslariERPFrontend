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
    .min(3, "Aile adı en az 3 harften oluşmalı")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Aile adı yalnızca harflerden oluşmalıdır"
    )
    .required("Aile adı zorunludur"),

  surname: Yup.string()
    .min(3, "Aile adı en az 3 harften oluşmalı")
    .matches(
      /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      "Aile adı yalnızca harflerden oluşmalıdır"
    )
    .required("Aile adı zorunludur"),

  age: Yup.number()
    .typeError("Yaş sadece rakam olmalıdır")
    .integer("Yaş tam sayı olmalıdır")
    .positive("Yaş negatif olamaz")
    .min(15, "Yaş en az 15 olmalıdır")
    .max(100, "Yaş en fazla 100 olmalıdır")
    .required("Yaş alanı zorunludur"),

  tc: Yup.string()
    .matches(/^\d{11}$/, "TC Kimlik Numarası 11 haneli olmalıdır") // Sadece 11 rakam
    .test("is-valid-tc", "Geçersiz TC Kimlik Numarası", (value) => {
      if (!value) return false;

      // Algoritma kontrolü (ilk basamağın 0 olmaması, geçerli bir numara olup olmadığı)
      const arr = value.split("").map((digit) => parseInt(digit, 10));

      // İlk rakam 0 olamaz
      if (arr[0] === 0) return false;

      // 10. basamağın 10'luk toplamına göre hesaplanması
      const check1 =
        arr
          .slice(0, 10)
          .reduce((acc, num, idx) => acc + (idx % 2 === 0 ? num : 0), 0) % 10;
      const check2 =
        arr
          .slice(1, 9)
          .reduce((acc, num, idx) => acc + (idx % 2 === 0 ? num : 0), 0) % 10;

      // Algoritma: 10. ve 11. basamak kontrolü
      return check1 === arr[9] && check2 === arr[10];
    })
    .required("TC Kimlik Numarası zorunludur"),

  phoneNumber: Yup.string()
    .matches(
      /^0[5-7]\d{9}$/,
      "Geçerli bir telefon numarası giriniz (0 ile başlamalı, 11 haneli olmalı)"
    )
    .required("Telefon numarası zorunludur"),

  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),

  gender: Yup.string().required("Cinsiyet seçmek zorunludur"),

  education: Yup.string().required("Eğitim seviyesi seçmek zorunludur"),

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
