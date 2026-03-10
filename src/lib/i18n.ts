import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      app: {
        title: "Eterapp",
        tagline: "Your assistant for emotional support"
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
      header: {
        loginOrSignup: "Login or Sign Up"
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
        createAccount: "Create a free account",
        welcomeBack: "Welcome back 👋",
        loginSuccess: "You have been logged in successfully.",
        signupSuccess: "Account created successfully!",
        checkEmail: "Please check your email to confirm your account.",
        loginFailed: "Login failed",
        signupFailed: "Registration failed",
        unexpectedError: "An unexpected error occurred",
        error: "Error",
        tryAgain: "An unexpected error occurred. Please try again.",
        emailRequired: "Email required",
        enterEmailFirst: "Please enter your email address first.",
        resetFailed: "Reset failed",
        resetEmailSent: "Reset email sent",
        checkEmailReset: "Please check your email for password reset instructions.",
        captchaError: "Please complete the CAPTCHA",
        captchaFailed: "CAPTCHA verification failed",
        displayName: "Display name",
        displayNamePlaceholder: "What should we call you?",
        signingIn: "Signing in...",
        creatingAccount: "Creating account...",
        continueWith: "Or continue with",
        continueWithGoogle: "Continue with Google",
        backToHome: "Back to home",
        backToLogin: "← Back to login",
        resetPassword: "Reset password",
        resetPasswordDesc: "We'll send a reset link to your email.",
        sendResetLink: "Send reset link",
        sendingResetLink: "Sending...",
        resetSentTo: "Sent! Check your email:",
        wrongEmailOrPassword: "Wrong email or password",
        emailAlreadyRegistered: "This email is already registered",
        passwordsDontMatch: "Passwords don't match",
        agreeToTermsBefore: "I agree to the",
        termsOfService: "Terms of Service",
        agreeToTermsAnd: "and",
        privacyPolicy: "Privacy Policy",
        agreeToTermsAfter: "",
        strength: {
          veryWeak: "Very weak",
          weak: "Weak",
          medium: "Medium",
          strong: "Strong",
          veryStrong: "Very strong"
        }
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
        title: "Subscription & Billing",
        manageBilling: "Manage Subscription",
        currentPlan: "Current Plan",
        upgrade: "Upgrade",
        perMonth: "/month",
        plans: {
          first_step: {
            name: "First Step",
            description: "30 messages/month • 30 days history"
          },
          personal_growth: {
            name: "Personal Growth",
            description: "500 messages/month • Voice assistant • 90 days history"
          },
          expanded_horizons: {
            name: "Expanded Horizons",
            description: "1500 messages/month • Voice + OCR • 180 days history"
          }
        }
      },
      landing: {
        hero: {
          badge: "AI-Powered Emotional Support",
          title: "Eterapp",
          tagline: "Feel heard. Understood. Supported.",
          subtitle: "Eterapp is your assistant for emotional support — available 24/7, non-judgmental, fully confidential.",
          cta: "Start for Free",
          signIn: "Sign In",
          trust: {
            secure: "Secure & Private",
            users: "BG/EN",
            ai: "AI-Powered"
          }
        },
        features: {
          title: "Everything you need",
          description: "Tools crafted with care for your emotional well-being.",
          ai: {
            title: "AI Chat Assistant",
            description: "Talk to Eterapp anytime. It understands you and responds with empathy."
          },
          privacy: {
            title: "Full Privacy",
            description: "Your conversations are encrypted and never shared with third parties."
          },
          bilingual: {
            title: "Bulgarian & English",
            description: "Speak in your native language — Eterapp understands both."
          },
          available: {
            title: "Available 24/7",
            description: "No waiting, no queues. Here whenever you need it."
          }
        },
        pricing: {
          title: "Choose Your Plan",
          subtitle: "Plans designed to support your mental health at every stage",
          firstStep: {
            name: "First Step",
            price: "€0",
            period: "/month",
            description: "The ideal start, no commitment",
            features: [
              "30 AI messages/month",
              "Basic AI assistant",
              "30 days conversation history",
              "BG/EN support"
            ],
            cta: "Start for Free"
          },
          personalGrowth: {
            name: "Personal Growth",
            price: "€19.99",
            period: "/month",
            description: "For deeper emotional work",
            features: [
              "500 AI messages/month",
              "More powerful AI assistant",
              "90 days conversation history",
              "Priority support"
            ],
            cta: "Choose Plan"
          },
          expandedHorizons: {
            name: "Expanded Horizons",
            price: "€39.99",
            period: "/month",
            description: "Full transformation with all features",
            features: [
              "1500 AI messages/month",
              "Most powerful AI assistant",
              "180 days conversation history",
              "Priority support 24/7"
            ],
            cta: "Choose Plan"
          }
        },
        cta: {
          title: "Ready to feel better?",
          description: "Join Eterapp for free. No credit card required.",
          button: "Start Free Today",
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
      security: {
        title: "Security",
        subtitle: "Change password",
        currentPassword: "Current password",
        newPassword: "New password",
        confirmNewPassword: "Confirm new password",
        changePassword: "Change password",
        changing: "Changing...",
        success: "Password changed successfully",
        errorWrongPassword: "Incorrect current password",
        errorPasswordsNoMatch: "Passwords don't match",
        errorMinLength: "Password must be at least 8 characters",
        errorNoNumber: "Password must contain at least one number"
      },
      profile: {
        title: "Profile",
        subtitle: "Account settings",
        forgotPassword: "Forgot your password?",
        resetEmailSent: "✓ Sent! Check your email.",
        accountInfo: {
          title: "Account information",
          subtitle: "Basic data",
          userProfile: "User profile",
          memberSince: "Member since",
          unknown: "Unknown",
          email: "Email"
        },
        settings: {
          title: "Profile settings",
          subtitle: "Update profile information",
          displayName: "Display name",
          displayNamePlaceholder: "Enter display name",
          bio: "Short bio",
          bioPlaceholder: "Write something about yourself",
          save: "Save changes",
          saving: "Saving...",
          successMsg: "Profile updated successfully!",
          errorMsg: "Error updating. Please try again."
        },
        dangerZone: {
          title: "Danger zone",
          subtitle: "Irreversible actions",
          signOut: "Sign out",
          signOutDesc: "Sign out from this device"
        }
      },
      billing: {
        title: "Billing",
        currentPlan: "Current plan",
        choosePlan: "Choose plan",
        startFree: "Start for free",
        month: "month",
        manageSub: "Manage subscription",
        loading: "Loading...",
        plans: {
          first_step: {
            name: "First Step",
            subtitle: "Ideal start with no commitment"
          },
          personal_growth: {
            name: "Personal Growth",
            subtitle: "For deeper emotional work"
          },
          expanded_horizons: {
            name: "Expanded Horizons",
            subtitle: "Full transformation with all features"
          }
        },
        features: {
          aiMessages30: "30 AI messages/month",
          aiMessages500: "500 AI messages/month",
          aiMessages1500: "1500 AI messages/month",
          history30: "30 days conversation history",
          history90: "90 days conversation history",
          history180: "180 days conversation history",
          basicAI: "Basic AI assistant",
          powerfulAI: "More powerful AI assistant",
          mostPowerfulAI: "Most powerful AI assistant",
          bgEn: "BG/EN support",
          prioritySupport: "Priority support",
          prioritySupport247: "Priority support 24/7"
        }
      },
      admin: {
        title: "Admin Dashboard",
        subtitle: "Manage users, subscriptions, and usage analytics",
        panelTitle: "Admin Panel",
        panelSubtitle: "Manage users and subscriptions",
        resetMessages: "Reset messages",
        syncPlan: "Sync plan",
        sendEmail: "Send email",
        resetSuccess: "Messages reset to 0",
        syncSuccess: "Plan synced",
        block: "Block",
        unblock: "Unblock",
        noResults: "No results",
        stats: {
          totalUsers: "Total users",
          paid: "Paid",
          free: "Free",
          blocked: "Blocked"
        },
        table: {
          searchPlaceholder: "Search by email...",
          email: "Email",
          plan: "Plan",
          messages: "Messages",
          registration: "Registration",
          actions: "Actions"
        },
        plans: {
          first_step: "First Step",
          personal_growth: "Personal Growth",
          expanded_horizons: "Expanded Horizons"
        },
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
      },
      footer: {
        rights: "© 2026 Eterapp. All rights reserved.",
        disclaimer: "Eterapp is not a medical service. In case of emergency, call 112 or the Trust Hotline 0800 1 8 400.",
        terms: "Terms",
        privacy: "Privacy",
        gdpr: "GDPR",
        cookies: "Cookies"
      }
    }
  },
  bg: {
    translation: {
      app: {
        title: "Eterapp",
        tagline: "Твоят асистент за емоционална подкрепа"
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
      header: {
        loginOrSignup: "Влезте или се регистрирайте"
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
        createAccount: "Създай акаунт безплатно",
        welcomeBack: "Добре дошъл обратно 👋",
        loginSuccess: "Влязохте успешно в системата.",
        signupSuccess: "Акаунтът е създаден успешно!",
        checkEmail: "Моля, проверете имейла си за потвърждение на акаунта.",
        loginFailed: "Входът неуспешен",
        signupFailed: "Регистрацията неуспешна",
        unexpectedError: "Възникна неочаквана грешка",
        error: "Грешка",
        tryAgain: "Възникна неочаквана грешка. Моля, опитайте отново.",
        emailRequired: "Изисква се имейл",
        enterEmailFirst: "Моля, въведете имейл адреса си първо.",
        resetFailed: "Нулирането неуспешно",
        resetEmailSent: "Имейл за нулиране изпратен",
        checkEmailReset: "Моля, проверете имейла си за инструкции за нулиране на паролата.",
        captchaError: "Моля, завършете CAPTCHA",
        captchaFailed: "Верификацията на CAPTCHA неуспешна",
        displayName: "Показано име",
        displayNamePlaceholder: "Как да те наричаме?",
        signingIn: "Влизане...",
        creatingAccount: "Регистриране...",
        continueWith: "Или продължи с",
        continueWithGoogle: "Продължи с Google",
        backToHome: "Обратно към началото",
        backToLogin: "← Обратно към вход",
        resetPassword: "Нулиране на парола",
        resetPasswordDesc: "Ще изпратим линк за нулиране на твоя имейл.",
        sendResetLink: "Изпрати линк",
        sendingResetLink: "Изпращане...",
        resetSentTo: "Изпратен! Провери имейла си:",
        wrongEmailOrPassword: "Грешен имейл или парола",
        emailAlreadyRegistered: "Имейлът вече е регистриран",
        passwordsDontMatch: "Паролите не съвпадат",
        agreeToTermsBefore: "Съгласявам се с",
        termsOfService: "Условията за ползване",
        agreeToTermsAnd: "и",
        privacyPolicy: "Политиката за поверителност",
        agreeToTermsAfter: "",
        strength: {
          veryWeak: "Много слаба",
          weak: "Слаба",
          medium: "Средна",
          strong: "Силна",
          veryStrong: "Много силна"
        }
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
        title: "Абонамент и плащания",
        manageBilling: "Управление на абонамент",
        currentPlan: "Текущ план",
        upgrade: "Надгради",
        perMonth: "/месец",
        plans: {
          first_step: {
            name: "Първа Стъпка",
            description: "30 съобщения/месец • 30 дни история"
          },
          personal_growth: {
            name: "Личен Растеж",
            description: "500 съобщения/месец • 90 дни история"
          },
          expanded_horizons: {
            name: "Разширени Хоризонти",
            description: "1500 съобщения/месец • 180 дни история"
          }
        }
      },
      landing: {
        hero: {
          badge: "AI-Задвижвана Емоционална Подкрепа",
          title: "Eterapp",
          tagline: "Почувствай се чут. Разбран. Подкрепен.",
          subtitle: "Eterapp е твоят асистент за емоционална подкрепа — наличен 24/7, без осъждане, изцяло поверително.",
          cta: "Започни безплатно",
          signIn: "Вход",
          trust: {
            secure: "Сигурно и поверително",
            users: "BG/EN",
            ai: "AI-Задвижвано"
          }
        },
        features: {
          title: "Всичко, от което се нуждаеш",
          description: "Инструменти, създадени с грижа за твоето емоционално благополучие.",
          ai: {
            title: "AI Чат Асистент",
            description: "Говори с Eterapp по всяко време. Разбира те, отговаря с емпатия."
          },
          privacy: {
            title: "Пълна поверителност",
            description: "Разговорите ти са криптирани и никога не се споделят с трети страни."
          },
          bilingual: {
            title: "Български и Английски",
            description: "Говори на родния си език — Eterapp разбира и двата."
          },
          available: {
            title: "Достъпен 24/7",
            description: "Без чакане, без опашки. Тук съм когато имаш нужда."
          }
        },
        pricing: {
          title: "Избери своя план",
          subtitle: "Планове, създадени да подкрепят психичното ти здраве на всеки етап",
          firstStep: {
            name: "Първа Стъпка",
            price: "€0",
            period: "/месец",
            description: "Идеален старт без ангажимент",
            features: [
              "30 AI съобщения на месец",
              "Основен AI асистент",
              "30 дни история на разговорите",
              "BG/EN поддръжка"
            ],
            cta: "Започни безплатно"
          },
          personalGrowth: {
            name: "Личен Растеж",
            price: "€19.99",
            period: "/месец",
            description: "За задълбочена емоционална работа",
            features: [
              "500 AI съобщения на месец",
              "По-мощен AI асистент",
              "90 дни история на разговорите",
              "Приоритетна поддръжка"
            ],
            cta: "Избери план"
          },
          expandedHorizons: {
            name: "Разширени Хоризонти",
            price: "€39.99",
            period: "/месец",
            description: "Пълна трансформация с всички функции",
            features: [
              "1500 AI съобщения на месец",
              "Най-мощният AI асистент",
              "180 дни история на разговорите",
              "Приоритетна поддръжка 24/7"
            ],
            cta: "Избери план"
          }
        },
        cta: {
          title: "Готов ли си да се почувстваш по-добре?",
          description: "Присъедини се към Eterapp безплатно. Без кредитна карта.",
          button: "Започни безплатно днес",
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
      profile: {
        title: "Профил",
        subtitle: "Настройки на акаунта",
        forgotPassword: "Забравена паролата си?",
        resetEmailSent: "✓ Изпратен! Провери имейла си.",
        accountInfo: {
          title: "Информация за акаунта",
          subtitle: "Основни данни",
          userProfile: "Потребителски профил",
          memberSince: "Член от",
          unknown: "Неизвестно",
          email: "Имейл"
        },
        settings: {
          title: "Настройки на профила",
          subtitle: "Обнови профилната информация",
          displayName: "Показвано име",
          displayNamePlaceholder: "Въведи показвано име",
          bio: "Кратко описание",
          bioPlaceholder: "Напиши нещо за себе си",
          save: "Запази промените",
          saving: "Запазване...",
          successMsg: "Профилът е обновен успешно!",
          errorMsg: "Грешка при обновяване. Опитай отново."
        },
        dangerZone: {
          title: "Опасна зона",
          subtitle: "Необратими действия",
          signOut: "Изход",
          signOutDesc: "Излез от акаунта на това устройство"
        }
      },
      billing: {
        title: "Плащания",
        currentPlan: "Текущ план",
        choosePlan: "Избери план",
        startFree: "Започни безплатно",
        month: "месец",
        manageSub: "Управление на абонамента",
        loading: "Зареждане...",
        plans: {
          first_step: {
            name: "Първа Стъпка",
            subtitle: "Идеален старт без ангажимент"
          },
          personal_growth: {
            name: "Личен Растеж",
            subtitle: "За задълбочена емоционална работа"
          },
          expanded_horizons: {
            name: "Разширени Хоризонти",
            subtitle: "Пълна трансформация с всички функции"
          }
        },
        features: {
          aiMessages30: "30 AI съобщения на месец",
          aiMessages500: "500 AI съобщения на месец",
          aiMessages1500: "1500 AI съобщения на месец",
          history30: "30 дни история на разговорите",
          history90: "90 дни история на разговорите",
          history180: "180 дни история на разговорите",
          basicAI: "Основен AI асистент",
          powerfulAI: "По-мощен AI асистент",
          mostPowerfulAI: "Най-мощният AI асистент",
          bgEn: "BG/EN поддръжка",
          prioritySupport: "Приоритетна поддръжка",
          prioritySupport247: "Приоритетна поддръжка 24/7"
        }
      },
      security: {
        title: "Сигурност",
        subtitle: "Смяна на парола",
        currentPassword: "Текуща парола",
        newPassword: "Нова парола",
        confirmNewPassword: "Потвърди новата парола",
        changePassword: "Смени паролата",
        changing: "Смяна...",
        success: "Паролата е сменена успешно",
        errorWrongPassword: "Грешна текуща парола",
        errorPasswordsNoMatch: "Паролите не съвпадат",
        errorMinLength: "Паролата трябва да е поне 8 символа",
        errorNoNumber: "Паролата трябва да съдържа поне 1 цифра"
      },
      admin: {
        title: "Администраторски панел",
        subtitle: "Управление на потребители, абонаменти и анализи на използване",
        panelTitle: "Административен панел",
        panelSubtitle: "Управление на потребители и абонаменти",
        resetMessages: "Нулирай съобщения",
        syncPlan: "Синхронизирай план",
        sendEmail: "Изпрати имейл",
        resetSuccess: "Съобщенията са нулирани",
        syncSuccess: "Планът е синхронизиран",
        block: "Блокирай",
        unblock: "Деблокирай",
        noResults: "Няма резултати",
        stats: {
          totalUsers: "Общо потребители",
          paid: "Платени",
          free: "Безплатни",
          blocked: "Блокирани"
        },
        table: {
          searchPlaceholder: "Търси по имейл...",
          email: "Имейл",
          plan: "План",
          messages: "Съобщения",
          registration: "Регистрация",
          actions: "Действия"
        },
        plans: {
          first_step: "Първа Стъпка",
          personal_growth: "Личен Растеж",
          expanded_horizons: "Разширени Хоризонти"
        },
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
      },
      footer: {
        rights: "© 2026 Eterapp. Всички права запазени.",
        disclaimer: "Eterapp не е медицинска услуга. При спешност се обади на 112 или Телефон на доверието 0800 1 8 400.",
        terms: "Условия",
        privacy: "Поверителност",
        gdpr: "GDPR",
        cookies: "Бисквитки"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "bg",
    supportedLngs: ["bg", "en"],
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "etherapp_language",
    },
  });

export default i18n;