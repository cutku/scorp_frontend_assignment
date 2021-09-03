const langPacktEn = {
  send: "Send",
  english: "English",
  turkish: "Turkish",
  languages: "Languages",
  languagesUpper: "LANGUAGES",
  homepage: "Home Page",
  homepageUpper: "HOME PAGE",
  login: "Login",
  loginUpper: "LOGIN",
  logout: "Logout",
  close: "Close",
  username: "Name",
  password: "Password",
  email: "E-mail",
  contactUs: "Contact Us",
  contactUsUpper: "CONTACT US",
  loginErrorMessage: "Please fill in the blanks.",
  loginPostErrorMessage: "Please fix errors",
  loginConfirmMessage: "User profile updated.",
  postError: "Unexpected error was encountered",
  errorTypeSomething: "* Required",
  errorTypeMail: "Invalid e-mail adress.",
  errorTypePhone: "Invalid phone number.",
  loggedAccountErrorMessage: "Please logout",
  phoneNumber: "Phone Number",
  textField: "Text Field",
  countrySelector: "Country",
  footerText:
    "Should exists on all pages. What is included in the footer does not matter.",
  loremIpsumTitle:
    "Generated 1 paragraph, 98 words, 642 bytes of Lorem Ipsum x 15 Times",
  loremIpsumText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. An entire football is soft, it is time to stress in tomato sauce. So, dear great, convallis sit amet porttitor ac, always, or more than. Bullet now or malesuada price. Eu lorem velit vulputate gravida commodo amet consectetuer consectetuer lacus risus. But sometimes sometimes vehicles. Until the lorem, enhanced and now but, a lot of outdoor deductible. Unfortunately, the price of soft blockage. Gluten. Reserved soccer ecological deductible eu vulputate. Who want to live, ultricies graduated. Moors, or peanut itself.",
  countryList: [
    { id: "TR", name: "Turkey" },
    { id: "US", name: "United States of America" },
    { id: "GB", name: "United Kingdom" },
    { id: "DE", name: "Germany" },
    { id: "SE", name: "Sweden" },
    { id: "KE", name: "Kenya" },
    { id: "BR", name: "Brazil" },
    { id: "ZW", name: "Zimbabwe" }
  ]
};
const langPacktTr = {
  send: "Gönder",
  english: "İngilizce",
  turkish: "Türkçe",
  languages: "Diller",
  languagesUpper: "DİLLER",
  homepage: "Ana Sayfa",
  homepageUpper: "ANA SAYFA",
  login: "Oturum Aç",
  loginUpper: "OTURUM AÇ",
  logout: "Çıkış",
  username: "İsim",
  password: "Şifre",
  email: "E-posta",
  close: "Kapat",
  contactUs: "İletişim",
  contactUsUpper: "İLETİŞİM",
  loginErrorMessage: "Lütfen boşlukları doldurun.",
  loginPostErrorMessage: "Lütfen hataları düzeltin.",
  loginConfirmMessage: "Kullanıcı bilgileri güncellenmiştir.",
  errorTypeSomething: "* Zorunlu alan",
  errorTypeMail: "Hatalı e-posta adresi.",
  errorTypePhone: "Hatalı telefon numarası.",
  postError: "Beklenmedik bir hata ile karşılaşıldı",
  loggedAccountErrorMessage: "Lüften çıkış yapınız",
  phoneNumber: "Telefon Numarası",
  textField: "Metin Alanı",
  countrySelector: "Ülke",
  footerText: "Tüm sayfalarda bulunmalıdır. Altbilgi içeriği önemli değildir.",
  loremIpsumTitle:
    "1 paragraf, 71 sözcük, 504 karakter Lorem Ipsum üretilmiştir x 15 Kere",
  loremIpsumText:
    "Lorem ipsum dolor sit amet, conectetur adipiscing elit. Bütün bir futbol yumuşaktır, domates sosunda stres zamanı. Yani, sevgili büyük, convallis otur amet porttitor ac, her zaman veya daha fazla. Mermi şimdi veya malesuada fiyatı. Eu lorem velit vulputate gravida commodo amet conectetuer conectetuer lacus risus. Ama bazen bazen araçlar. Lorem'e kadar, geliştirilmiş ve şimdi, ancak bir çok açık indirilebilir. Ne yazık ki, yumuşak tıkanıklığın fiyatı. Glüten. Ayrılmış futbol ekolojik indirilebilir ab vulputate. Kim yaşamak ister, ultricies mezun oldu. Moors veya yer fıstığının kendisi.",
  countryList: [
    { id: "TR", name: "Türkiye" },
    { id: "US", name: "Amerika" },
    { id: "GB", name: "Birleşik Krallık" },
    { id: "DE", name: "Almanya" },
    { id: "SE", name: "İsveç" },
    { id: "KE", name: "Kenya" },
    { id: "BR", name: "Brezilya" },
    { id: "ZW", name: "Zimbabve" }
  ]
};
export default {
  state: {
    pageLanguage: langPacktEn,
    selectedLanguage: "en"
  },

  getters: {
    getPageLanguage(state, data) {
      state.pageLanguage.push(data);
    }
  },

  mutations: {
    setPageLanguage(state, data) {
      if (data === "tr") {
        state.selectedLanguage = "tr";
        state.pageLanguage = langPacktTr;
      } else {
        state.selectedLanguage = "en";
        state.pageLanguage = langPacktEn;
      }
    }
  },
  actions: {
    setPageLanguage({ commit }, data) {
      commit("setPageLanguage", data);
    }
  }
};
