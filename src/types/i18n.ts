export type Language = 'ru' | 'en' | 'kz';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

// Базовые переводы
export interface CommonTranslations {
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  edit: string;
  delete: string;
  close: string;
  back: string;
  next: string;
  previous: string;
  submit: string;
  confirm: string;
  yes: string;
  no: string;
  required: string;
  optional: string;
  search: string;
  filter: string;
  sort: string;
  all: string;
  none: string;
  select: string;
  clear: string;
  reset: string;
  apply: string;
  learn_more: string;
  get_started: string;
  contact_us: string;
  read_more: string;
  show_more: string;
  show_less: string;
}

// Навигация и Header
export interface HeaderTranslations {
  brand: string;
  nav: {
    catalog: string;
    calculator: string;
    academy: string;
    reviews: string;
    about: string;
    contact: string;
  };
  auth: {
    login: string;
    register: string;
    profile: string;
    logout: string;
    consult: string;
  };
  assistant: string;
  menu: {
    open: string;
    close: string;
    navigation: string;
    help: string;
    account: string;
  };
}

// Footer
export interface FooterTranslations {
  company: {
    name: string;
    description: string;
  };
  links: {
    about: string;
    services: string;
    contact: string;
    privacy: string;
    terms: string;
  };
  social: {
    follow_us: string;
  };
  copyright: string;
}

// Главная страница
export interface HomeTranslations {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

// Каталог
export interface CatalogTranslations {
  title: string;
  subtitle: string;
  filters: {
    all: string;
    category: string;
    price: string;
    features: string;
  };
  sort: {
    name: string;
    price: string;
    popularity: string;
  };
  results: {
    found: string;
    showing: string;
  };
}

// Калькулятор
export interface CalculatorTranslations {
  title: string;
  subtitle: string;
  providers: {
    title: string;
    select: string;
  };
  parameters: {
    title: string;
    input_tokens: string;
    output_tokens: string;
    requests_per_month: string;
  };
  results: {
    title: string;
    cost_per_request: string;
    monthly_cost: string;
  };
  scenarios: {
    title: string;
    apply: string;
  };
}

// Аутентификация
export interface AuthTranslations {
  login: {
    title: string;
    email: string;
    password: string;
    remember: string;
    forgot: string;
    submit: string;
    no_account: string;
    register_link: string;
  };
  register: {
    title: string;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    terms: string;
    submit: string;
    have_account: string;
    login_link: string;
  };
  validation: {
    required: string;
    email_invalid: string;
    password_min: string;
    passwords_match: string;
  };
}

// Профиль
export interface ProfileTranslations {
  title: string;
  personal_info: string;
  orders: string;
  settings: string;
  logout: string;
}

// Юридические страницы
export interface LegalTranslations {
  privacy_policy: {
    title: string;
    last_updated: string;
    content: string[];
  };
  public_offer: {
    title: string;
    last_updated: string;
    content: string[];
  };
  consent: {
    title: string;
    content: string[];
  };
  telegram_agreement: {
    title: string;
    content: string[];
  };
}

// Объединенный тип для всех переводов
export interface AllTranslations {
  common: CommonTranslations;
  header: HeaderTranslations;
  footer: FooterTranslations;
  home: HomeTranslations;
  catalog: CatalogTranslations;
  calculator: CalculatorTranslations;
  auth: AuthTranslations;
  profile: ProfileTranslations;
  legal: LegalTranslations;
}
