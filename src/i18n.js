import { createI18n } from 'vue-i18n'

// Importar traducciones
import es from './locales/es.json'
import en from './locales/en.json'
import fr from './locales/fr.json'
import zh from './locales/zh.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import pt from './locales/pt.json'
import it from './locales/it.json'
import de from './locales/de.json'
import ru from './locales/ru.json'
import ar from './locales/ar.json'

// Configuración de idiomas
const messages = {
  es,
  en,
  fr,
  'zh-CN': zh,
  ja,
  ko,
  pt,
  it,
  de,
  ru,
  ar
}

// Crear instancia de i18n
const i18n = createI18n({
  legacy: false, // Usar Composition API
  locale: 'es', // Idioma por defecto
  fallbackLocale: 'es', // Idioma de respaldo
  messages,
  globalInjection: true,
  silentTranslationWarn: true,
  missingWarn: false
})

export default i18n