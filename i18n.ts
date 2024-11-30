import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import * as en from "./locales/en.json";
import * as fr from "./locales/fr.json";

// Set the key-value pairs for the different languages you want to support.
const translations = { en, fr };
const i18n = new I18n(translations);

const CheckPhoneLanguage = () =>
  getLocales()?.[0]?.languageCode?.match(/^(en|fr)$/i)
    ? getLocales()[0].languageCode || "en"
    : "en";

// Set the locale once at the beginning of your app.
i18n.locale = CheckPhoneLanguage();
// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

export default i18n;
