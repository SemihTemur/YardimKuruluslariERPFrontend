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
    district: Yup.string().required("İlçe zorunludur"),
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
    .min(2, "Adet en az 3 karakterli olmalıdır")
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

  genderType: Yup.string().required("Cinsiyet zorunludur"),

  address: Yup.object({
    city: Yup.string().required("İl zorunludur"),
    district: Yup.string().required("İlçe zorunludur"),
    neighborhood: Yup.string()
      .required("Mahalle zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
    street: Yup.string()
      .required("Sokak zorunludur")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/),
  }),
});

export const cashDonationYup = Yup.object({
  donorFirstName: Yup.string().required(
    "Bağışçı adı ve soyadı seçmek zorunludur."
  ),
  amount: Yup.number()
    .typeError("Miktar sayısal bir değer olmalıdır")
    .positive("Miktar pozitif bir değer olmalıdır")
    .required("Miktar alanı zorunludur")
    .test(
      "decimal",
      "Miktar en fazla 2 ondalık basamak içermelidir",
      (value) => {
        if (!value) return true; // Eğer değer yoksa, doğrulama geçerli olsun
        // Sayının ondalık kısmının en fazla 2 basamak olup olmadığını kontrol et
        return /^\d+(\.\d{1,2})?$/.test(value);
      }
    ),
  currency: Yup.string(),
});

export const inKindDonationYup = Yup.object({
  donorFirstName: Yup.string().required(
    "Bağışçı adı ve soyadı seçmek zorunludur."
  ),
  category: Yup.object({
    itemName: Yup.string().required("Ürün adı seçmek zorunludur"),
    unit: Yup.string().required("Birim seçmek zorunludur"),
  }),
  quantity: Yup.number()
    .required("Miktar zorunludur")
    .typeError("Miktar sayısal bir değer olmalıdır")
    .positive("Miktar pozitif olmalıdır")
    .integer("Miktar tam sayı olmalıdır"),
});

export const cashAidYup = Yup.object({
  familyName: Yup.string().required("Aile adi seçmek zorunludur."),
  aidAmount: Yup.number()
    .typeError("Yardım miktarı sayısal bir değer olmalıdır")
    .positive("Yardım miktarı pozitif bir değer olmalıdır")
    .required("Yardım miktarı alanı zorunludur")
    .test(
      "decimal",
      "Yardım miktarı en fazla 2 ondalık basamak içermelidir",
      (value) => {
        if (!value) return true; // Eğer değer yoksa, doğrulama geçerli olsun
        // Sayının ondalık kısmının en fazla 2 basamak olup olmadığını kontrol et
        return /^\d+(\.\d{1,2})?$/.test(value);
      }
    ),

  currency: Yup.string(),
  period: Yup.string().required("Dönem seçmek zorunludur"),
  duration: Yup.number()
    .required(" Yardım süresi zorunludur")
    .typeError("Yardım süresi sayısal bir değer olmalıdır")
    .positive("Yardım süresi pozitif olmalıdır")
    .integer("Yardım süresi tam sayı olmalıdır"),
});

export const inKindAidYup = Yup.object({
  familyName: Yup.string().required("Aile adı seçmek zorunludur."),
  category: Yup.object({
    itemName: Yup.string().required("Ürün adı seçmek zorunludur"),
    unit: Yup.string().required("Birim seçmek zorunludur"),
  }),
  quantity: Yup.number()
    .required("Miktar zorunludur")
    .typeError("Miktar sayısal bir değer olmalıdır")
    .positive("Miktar pozitif olmalıdır")
    .integer("Miktar tam sayı olmalıdır"),
  period: Yup.string().required("Dönem seçmek zorunludur"),
  duration: Yup.number()
    .required(" Yardım süresi zorunludur")
    .typeError("Yardım süresi sayısal bir değer olmalıdır")
    .positive("Yardım süresi pozitif olmalıdır")
    .integer("Yardım süresi tam sayı olmalıdır"),
});

export const otherIncomeYup = Yup.object({
  description: Yup.string()
    .matches(
      /^[a-zA-ZÇĞİÖŞÜçğıöşü\s]+$/,
      "Açıklama yalnızca harflerden oluşmalıdır."
    )
    .required("Açıklama yazmak zorunludur."),
  amount: Yup.number()
    .typeError("Miktar sayısal bir değer olmalıdır")
    .positive("Miktar pozitif bir değer olmalıdır")
    .required("Miktar alanı zorunludur")
    .test(
      "decimal",
      "Miktar en fazla 2 ondalık basamak içermelidir",
      (value) => {
        if (!value) return true; // Eğer değer yoksa, doğrulama geçerli olsun
        // Sayının ondalık kısmının en fazla 2 basamak olup olmadığını kontrol et
        return /^\d+(\.\d{1,2})?$/.test(value);
      }
    ),
  currency: Yup.string(),
});

export const otherExpenseYup = Yup.object({
  description: Yup.string()
    .matches(
      /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/,
      "Açıklama yalnızca harflerden oluşmalıdır."
    )
    .required("Açıklama yazmak zorunludur."),
  amount: Yup.number()
    .typeError("Miktar sayısal bir değer olmalıdır")
    .positive("Miktar pozitif bir değer olmalıdır")
    .required("Miktar alanı zorunludur")
    .test(
      "decimal",
      "Miktar en fazla 2 ondalık basamak içermelidir",
      (value) => {
        if (!value) return true; // Eğer değer yoksa, doğrulama geçerli olsun
        // Sayının ondalık kısmının en fazla 2 basamak olup olmadığını kontrol et
        return /^\d+(\.\d{1,2})?$/.test(value);
      }
    ),
  currency: Yup.string(),
});

export const scholarshipYup = Yup.object({
  studentName: Yup.string().required("Öğrenci adı ve soyadı seçmek zorunludur"),
  scholarshipAmount: Yup.number()
    .typeError("Burs miktarı sayısal bir değer olmalıdır")
    .positive("Burs miktarı pozitif bir değer olmalıdır")
    .required("Burs miktarı alanı zorunludur")
    .test(
      "decimal",
      "Burs miktarı en fazla 2 ondalık basamak içermelidir",
      (value) => {
        if (!value) return true; // Eğer değer yoksa, doğrulama geçerli olsun
        // Sayının ondalık kısmının en fazla 2 basamak olup olmadığını kontrol et
        return /^\d+(\.\d{1,2})?$/.test(value);
      }
    ),
  currency: Yup.string(),
  period: Yup.string().required("Dönem seçmek zorunludur"),
  duration: Yup.number()
    .required(" Yardım süresi zorunludur")
    .typeError("Yardım süresi sayısal bir değer olmalıdır")
    .positive("Yardım süresi pozitif olmalıdır")
    .integer("Yardım süresi tam sayı olmalıdır"),
});

export const userYup = Yup.object().shape({
  username: Yup.string()
    .required("Kullanıcı adı zorunludur")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .max(20, "Kullanıcı adı en fazla 20 karakter olabilir"),

  email: Yup.string()
    .required("Email zorunludur")
    .email("Geçerli bir email adresi giriniz"),

  password: Yup.string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(20, "Şifre en fazla 20 karakter olabilir"),

  role: Yup.string().required("Rol seçimi zorunludur"),
});
