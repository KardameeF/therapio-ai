import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      app: {
        title: "Therapio AI",
        tagline: "Your AI-powered mental wellness companion"
      },
      nav: {
        home: "Home",
        app: "App",
        mood: "Mood",
        sleepStress: "Sleep & Stress",
        goals: "Goals",
        billing: "Billing",
        profile: "Profile",
        admin: "Admin",
        legal: "Legal",
        terms: "Terms",
        privacy: "Privacy",
        gdpr: "GDPR",
        cookies: "Cookies"
      },
      auth: {
        login: "Login",
        signup: "Sign Up",
        logout: "Logout",
        fullName: "Full Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        loginWithGoogle: "Login with Google",
        signupWithGoogle: "Sign up with Google",
        alreadyHaveAccount: "Already have an account?",
        dontHaveAccount: "Don't have an account?",
        forgotPassword: "Forgot password?",
        createAccount: "Create your account",
        welcomeBack: "Welcome back"
      },
      theme: {
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      mood: {
        title: "Mood Tracker",
        howAreYouFeeling: "How are you feeling today?",
        addNote: "Add a note (optional)",
        save: "Save Mood"
      },
      sleepStress: {
        title: "Sleep & Stress",
        sleepHours: "Sleep Hours",
        stressLevel: "Stress Level",
        notes: "Notes",
        save: "Save Entry"
      },
      goals: {
        title: "Goals",
        newGoal: "New Goal",
        goalTitle: "Goal Title",
        description: "Description",
        targetDate: "Target Date",
        completed: "Completed",
        save: "Save Goal"
      },
      billing: {
        title: "Billing",
        manageBilling: "Manage Billing",
        currentPlan: "Current Plan",
        upgrade: "Upgrade Plan"
      },
      landing: {
        hero: {
          badge: "AI-Powered Mental Wellness",
          title: "Therapio AI",
          tagline: "Your AI-powered mental wellness companion",
          cta: "Start Your Journey",
          signIn: "Sign In",
          trust: {
            secure: "Secure & Private",
            users: "10,000+ Users",
            ai: "AI-Powered Insights"
          }
        },
        features: {
          title: "Everything you need for",
          subtitle: "mental wellness",
          description: "Comprehensive tools designed with care to support your emotional well-being journey.",
          mood: {
            title: "Mood Tracking",
            description: "Track your daily mood and emotional patterns with AI insights to understand your well-being."
          },
          sleep: {
            title: "Sleep & Stress",
            description: "Monitor your sleep quality and stress levels for better overall wellness and recovery."
          },
          goals: {
            title: "Goal Setting",
            description: "Set and track your mental health and wellness goals with personalized guidance."
          },
          ai: {
            title: "AI Insights",
            description: "Get personalized recommendations and insights based on your wellness data."
          }
        },
        pricing: {
          title: "Choose your wellness journey",
          subtitle: "Plans designed to support your mental health at every stage",
          firstStep: {
            name: "First Step",
            price: "Free",
            description: "Perfect for getting started with mental wellness tracking",
            features: [
              "5 mood entries per month",
              "5 sleep & stress entries per month",
              "3 active goals",
              "Basic insights",
              "Community support"
            ],
            cta: "Get Started Free"
          },
          personalGrowth: {
            name: "Personal Growth",
            price: "$19.99",
            period: "/month",
            description: "For those ready to dive deeper into their wellness journey",
            features: [
              "Unlimited mood tracking",
              "Unlimited sleep & stress tracking",
              "Unlimited goals",
              "Advanced AI insights",
              "Progress analytics",
              "Priority support"
            ],
            cta: "Start Personal Growth"
          },
          expandedHorizons: {
            name: "Expanded Horizons",
            price: "$39.99",
            period: "/month",
            description: "Complete wellness transformation with premium features",
            features: [
              "Everything in Personal Growth",
              "Personal wellness coach",
              "Custom wellness plans",
              "Advanced stress management tools",
              "Sleep optimization insights",
              "24/7 premium support",
              "Data export & analysis"
            ],
            cta: "Begin Transformation"
          }
        },
        cta: {
          title: "Ready to start your wellness journey?",
          description: "Join thousands of people who are already using Therapio AI to improve their mental health and well-being.",
          button: "Get Started Free",
          privacy: "Learn About Privacy"
        }
      },
      validation: {
        required: "This field is required",
        email: "Please enter a valid email address",
        password: {
          minLength: "Password must be at least 8 characters",
          uppercase: "Password must contain at least one uppercase letter",
          lowercase: "Password must contain at least one lowercase letter",
          number: "Password must contain at least one number",
          special: "Password must contain at least one special character"
        },
        confirmPassword: "Passwords do not match"
      },
      admin: {
        title: "Admin Dashboard",
        subtitle: "Manage users, subscriptions, and usage analytics",
        tabs: {
          users: "Users",
          subscriptions: "Subscriptions",
          usage: "Usage"
        },
        users: {
          title: "User Management",
          columns: {
            userId: "User ID",
            name: "Name",
            locale: "Locale",
            role: "Role",
            createdAt: "Created At"
          }
        },
        subscriptions: {
          title: "Subscription Management",
          columns: {
            id: "ID",
            userId: "User ID",
            plan: "Plan",
            status: "Status",
            periodStart: "Period Start",
            periodEnd: "Period End"
          }
        },
        usage: {
          title: "Usage Analytics",
          columns: {
            id: "ID",
            userId: "User ID",
            aiMessages: "AI Messages",
            voiceMinutes: "Voice Minutes",
            ocrPages: "OCR Pages",
            periodStart: "Period Start",
            periodEnd: "Period End"
          }
        },
        accessDenied: {
          title: "Access Denied",
          description: "You do not have admin privileges to access this page."
        },
        error: {
          title: "Error",
          profile: "Failed to load user profile",
          fetch: "Failed to fetch admin data"
        }
      }
    }
  },
  bg: {
    translation: {
      app: {
        title: "Therapio AI",
        tagline: "Вашият AI-асистент за психично благополучие"
      },
      nav: {
        home: "Начало",
        app: "Приложение",
        mood: "Настроение",
        sleepStress: "Сън и Стрес",
        goals: "Цели",
        billing: "Плащания",
        profile: "Профил",
        admin: "Админ",
        legal: "Правни",
        terms: "Условия",
        privacy: "Поверителност",
        gdpr: "GDPR",
        cookies: "Бисквитки"
      },
      auth: {
        login: "Вход",
        signup: "Регистрация",
        logout: "Изход",
        fullName: "Пълно име",
        email: "Имейл",
        password: "Парола",
        confirmPassword: "Потвърди парола",
        loginWithGoogle: "Вход с Google",
        signupWithGoogle: "Регистрация с Google",
        alreadyHaveAccount: "Вече имате акаунт?",
        dontHaveAccount: "Нямате акаунт?",
        forgotPassword: "Забравена парола?",
        createAccount: "Създайте своя акаунт",
        welcomeBack: "Добре дошли отново"
      },
      theme: {
        light: "Светло",
        dark: "Тъмно",
        system: "Система"
      },
      mood: {
        title: "Проследяване на настроението",
        howAreYouFeeling: "Как се чувствате днес?",
        addNote: "Добави бележка (по избор)",
        save: "Запази настроение"
      },
      sleepStress: {
        title: "Сън и Стрес",
        sleepHours: "Часове сън",
        stressLevel: "Ниво на стрес",
        notes: "Бележки",
        save: "Запази запис"
      },
      goals: {
        title: "Цели",
        newGoal: "Нова цел",
        goalTitle: "Заглавие на целта",
        description: "Описание",
        targetDate: "Крайна дата",
        completed: "Завършено",
        save: "Запази цел"
      },
      billing: {
        title: "Плащания",
        manageBilling: "Управление на плащанията",
        currentPlan: "Текущ план",
        upgrade: "Надграждане на плана"
      },
      landing: {
        hero: {
          badge: "AI-Задвижвано Психично Благополучие",
          title: "Therapio AI",
          tagline: "Вашият AI-асистент за психично благополучие",
          cta: "Започнете пътешествието",
          signIn: "Вход",
          trust: {
            secure: "Сигурно и поверително",
            users: "10,000+ Потребители",
            ai: "AI-Задвижвани прозрения"
          }
        },
        features: {
          title: "Всичко, от което се нуждаете за",
          subtitle: "психично благополучие",
          description: "Цялостни инструменти, създадени с грижа за подпомагане на вашето емоционално благополучие.",
          mood: {
            title: "Проследяване на настроението",
            description: "Проследявайте ежедневното си настроение и емоционални модели с AI прозрения за разбиране на благополучието си."
          },
          sleep: {
            title: "Сън и Стрес",
            description: "Следете качеството на съня и нивата на стрес за по-добро общо благополучие и възстановяване."
          },
          goals: {
            title: "Поставяне на цели",
            description: "Поставете и проследявайте целите си за психично здраве и благополучие с персонализирано ръководство."
          },
          ai: {
            title: "AI Прозрения",
            description: "Получавайте персонализирани препоръки и прозрения въз основа на вашите данни за благополучие."
          }
        },
        pricing: {
          title: "Изберете своето пътешествие към благополучие",
          subtitle: "Планове, създадени да подкрепят психичното ви здраве на всеки етап",
          firstStep: {
            name: "Първа стъпка",
            price: "Безплатно",
            description: "Идеално за започване с проследяване на психичното благополучие",
            features: [
              "5 записа за настроение на месец",
              "5 записа за сън и стрес на месец",
              "3 активни цели",
              "Основни прозрения",
              "Подкрепа от общността"
            ],
            cta: "Започнете безплатно"
          },
          personalGrowth: {
            name: "Личностен растеж",
            price: "$19.99",
            period: "/месец",
            description: "За тези, които са готови да се потопят по-дълбоко в пътешествието си към благополучие",
            features: [
              "Неограничено проследяване на настроението",
              "Неограничено проследяване на съня и стреса",
              "Неограничени цели",
              "Разширени AI прозрения",
              "Анализ на прогрес",
              "Приоритетна поддръжка"
            ],
            cta: "Започнете личностен растеж"
          },
          expandedHorizons: {
            name: "Разширени хоризонти",
            price: "$39.99",
            period: "/месец",
            description: "Пълна трансформация на благополучието с премиум функции",
            features: [
              "Всичко от Личностен растеж",
              "Персонален треньор за благополучие",
              "Персонализирани планове за благополучие",
              "Разширени инструменти за управление на стреса",
              "Прозрения за оптимизация на съня",
              "24/7 премиум поддръжка",
              "Експорт и анализ на данни"
            ],
            cta: "Започнете трансформацията"
          }
        },
        cta: {
          title: "Готови да започнете пътешествието си към благополучие?",
          description: "Присъединете се към хиляди хора, които вече използват Therapio AI за подобряване на психичното си здраве и благополучие.",
          button: "Започнете безплатно",
          privacy: "Научете за поверителността"
        }
      },
      validation: {
        required: "Това поле е задължително",
        email: "Моля, въведете валиден имейл адрес",
        password: {
          minLength: "Паролата трябва да бъде поне 8 символа",
          uppercase: "Паролата трябва да съдържа поне една главна буква",
          lowercase: "Паролата трябва да съдържа поне една малка буква",
          number: "Паролата трябва да съдържа поне едно число",
          special: "Паролата трябва да съдържа поне един специален символ"
        },
        confirmPassword: "Паролите не съвпадат"
      },
      admin: {
        title: "Администраторски панел",
        subtitle: "Управление на потребители, абонаменти и анализи на използване",
        tabs: {
          users: "Потребители",
          subscriptions: "Абонаменти",
          usage: "Използване"
        },
        users: {
          title: "Управление на потребители",
          columns: {
            userId: "ID на потребителя",
            name: "Име",
            locale: "Език",
            role: "Роля",
            createdAt: "Създаден на"
          }
        },
        subscriptions: {
          title: "Управление на абонаменти",
          columns: {
            id: "ID",
            userId: "ID на потребителя",
            plan: "План",
            status: "Статус",
            periodStart: "Начало на периода",
            periodEnd: "Край на периода"
          }
        },
        usage: {
          title: "Анализи на използване",
          columns: {
            id: "ID",
            userId: "ID на потребителя",
            aiMessages: "AI съобщения",
            voiceMinutes: "Гласови минути",
            ocrPages: "OCR страници",
            periodStart: "Начало на периода",
            periodEnd: "Край на периода"
          }
        },
        accessDenied: {
          title: "Достъп отказан",
          description: "Нямате административни права за достъп до тази страница."
        },
        error: {
          title: "Грешка",
          profile: "Неуспешно зареждане на потребителския профил",
          fetch: "Неуспешно зареждане на административните данни"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;