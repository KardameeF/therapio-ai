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
        backToChat: "← Back to chat",
        legal: "Legal",
        terms: "Terms",
        privacy: "Privacy",
        gdpr: "GDPR",
        cookies: "Cookies",
        features: "Features"
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
        welcomeBack: "Welcome back",
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
        month: "month",
        monthly: "Monthly",
        yearly: "Yearly",
        yearlyDiscount: "−15%",
        saveYearlyPG: "Save €36/year",
        saveYearlyEH: "Save €72/year",
        disclaimer: "Billing is handled through Stripe. Monthly plans are billed once a month. Yearly plans are billed once for the full year. You can cancel anytime from your profile. Prices include VAT.",
        downgrade: "Downgrade plan",
        downgradeSuccess: "Your plan will change at the end of the current billing period.",
        choosePlan: "Choose plan",
        startFree: "Start for free",
        manageSub: "Manage subscription",
        loading: "Loading...",
        plans: {
          first_step: {
            name: "First Step",
            description: "30 messages/month • 30 days history",
            subtitle: "Ideal start with no commitment"
          },
          personal_growth: {
            name: "Personal Growth",
            description: "500 messages/month • Voice assistant • 90 days history",
            subtitle: "For deeper emotional work"
          },
          expanded_horizons: {
            name: "Expanded Horizons",
            description: "1500 messages/month • Voice + OCR • 180 days history",
            subtitle: "Full transformation with all features"
          }
        },
        features: {
          aiMessages30: "30 AI messages/month",
          aiMessages500: "500 AI messages/month",
          aiMessages1500: "1500 AI messages/month",
          history30: "30 days history",
          history90: "90 days history",
          history180: "180 days history",
          basicAi: "Basic AI assistant",
          powerfulAi: "Powerful AI assistant",
          mostPowerfulAi: "Most powerful AI assistant",
          sessionNotes: "Session notes",
          tasks: "Tasks",
          audioTherapy: "Audio therapies",
          voiceAssistant: "Voice assistant",
          bgEn: "BG/EN support",
          prioritySupport: "Priority support",
          prioritySupport247: "Priority support 24/7"
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
        howItWorks: {
          title: "How Eterapp works",
          subtitle: "Three steps to better emotional wellbeing",
          step1: {
            title: "Choose your type of conversation",
            desc: "Need to vent? Want to understand yourself better? Working through something specific? Eterapp asks — and offers the kind of conversation you need right now."
          },
          step2: {
            title: "Talk. No judgment, no waiting.",
            desc: "An AI assistant calibrated specifically for emotional and personal support. It doesn't give ready answers — it asks the right questions."
          },
          step3: {
            title: "See how you grow",
            desc: "After each session — notes, tasks and audio therapies to keep moving forward. Your progress, visible and measurable."
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
              "30 days conversation history"
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
              "Session notes",
              "Growth tasks",
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
              "Audio therapies",
              "Voice assistant",
              "Session notes",
              "Growth tasks",
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
        voicePreference: {
          title: "Preferred voice",
          subtitle: "Choose the voice for guided therapy sessions",
          female: "Female",
          male: "Male",
          saved: "Saved!"
        },
        dangerZone: {
          title: "Danger zone",
          subtitle: "Irreversible actions",
          signOut: "Sign out",
          signOutDesc: "Sign out from this device"
        },
        deleteAccount: "Delete account",
        deleteAccountDesc: "All data will be permanently deleted",
        deleteAccountBtn: "Delete account",
        deleteConfirmTitle: "⚠️ Delete Account",
        deleteConfirmDesc: "This action is irreversible. All conversations, notes, and data will be permanently deleted.",
        deleteTypeConfirm: "Type DELETE to confirm:",
        deleteTypePlaceholder: "DELETE",
        deleteConfirmBtn: "Delete forever",
        deleteCancel: "Cancel"
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
      chat: {
        voiceUpgradeRequired: "Upgrade your plan for voice messages",
        recording: "Recording... Tap again to stop",
        transcribing: "Transcribing...",
        micError: "Cannot access microphone",
        deleteSession: "Delete chat",
        newChat: "New Chat",
        recent: "Recent",
        noChats: "No chats yet",
        noResults: "No results",
        searchPlaceholder: "Search chats...",
        disclaimer: "Eterapp is not a medical service.",
        greeting: "Hello, how are you today?",
        greetingSub: "I'm here for you. You can share anything.",
        messagesLeft: "messages left",
        upgradeForMore: "Upgrade for more",
        limitReached: "Monthly message limit reached.",
        upgradeNow: "Upgrade now",
        imageUpgradeRequired: "Upgrade for image support",
        imageTooLarge: "Image too large (max 4MB)",
        imageAttached: "Image attached",
        sessionNotes: "Session Notes",
        sessionNotesEmpty: "No notes for this session yet.",
        sessionTasks: "Session Tasks",
        sessionTasksEmpty: "No tasks for this session yet.",
        upgradeForInsights: "Upgrade to unlock session insights",
        completed: "Completed",
        therapyAudio: "Guided Therapy",
        therapyAudioEmpty: "No therapy audio for this session.",
        upgradeForTherapy: "Upgrade to Expanded Horizons for guided therapies",
        listenNow: "Listen now",
        duration: "Duration",
        voiceMode: "Voice mode",
        voiceModeActive: "Voice mode active — speak now",
        voiceModeUpgrade: "Upgrade to Expanded Horizons for voice assistant",
        voiceModeSpeaking: "Speaking...",
        voiceModeListening: "Listening...",
        warning75: "You've used {{used}}/{{limit}} messages this month (75%). Consider upgrading.",
        warning90: "Almost at your limit — {{used}}/{{limit}} messages used. Add credits to continue.",
        upgradePlan: "Upgrade or add credits →",
        notes: "Notes",
        tasks: "Tasks",
        thinking: "Eterapp is thinking...",
        historyOptimized: "History optimized for faster response",
        speaking: "Speaking...",
        loadingTherapy: "Loading therapy session..."
      },
      featuresPage: {
        hero: {
          title: "Everything Eterapp offers",
          subtitle: "Choose the plan that fits your needs"
        },
        plans: {
          free: "Free",
          personal_growth: "Personal Growth",
          expanded_horizons: "Expanded Horizons"
        },
        table: {
          feature: "Feature",
          aiMessages: "AI messages / month",
          sessionNotes: "Session notes",
          tasks: "Tasks",
          audioTherapy: "Audio therapies",
          voiceAssistant: "Voice assistant",
          history: "History",
          support: "Support",
          days: "{{count}} days",
          support_basic: "Basic",
          support_priority: "Priority",
          support_247: "24/7",
          price: "Price",
          price_free: "Free",
          price_pg: "€19.99/mo",
          price_eh: "€39.99/mo"
        },
        details: {
          title: "How each feature works",
          sessionNotes: {
            title: "Session Notes",
            description: "AI automatically generates a summary after each session — emotional state, main topics, what to watch going forward. Access them from the clipboard icon in the sidebar."
          },
          tasks: {
            title: "Tasks",
            description: "AI suggests practical, actionable steps after your conversation. Small goals to work on over the next few days. Access them from the checkmark icon in the sidebar."
          },
          audioTherapy: {
            title: "Audio Therapies",
            description: "Curated therapeutic audio sessions matched to your mood and emotional needs. Available from the headphones icon in the sidebar after qualifying sessions."
          },
          voiceAssistant: {
            title: "Voice Assistant",
            description: "Speak with Eterapp using your voice. The assistant listens, responds with text-to-speech, and continues the conversation hands-free. Access it from the headphones icon in the chat input."
          }
        },
        payg: {
          title: "Over your limit? Don't stop.",
          description: "Top up with prepaid credits and keep chatting beyond your plan's monthly limit.",
          packages: "Credit packages: 5, 10, or 20 BGN",
          costPerMessage: "1 extra message = 0.02 BGN from your prepaid balance",
          budgetCap: "Set a monthly spending cap — we stop automatically when you reach it",
          cta: "Add credits"
        },
        cta: {
          title: "Ready to feel better?",
          subtitle: "Start your journey with Eterapp today.",
          startFree: "Start for free",
          upgrade: "Upgrade your plan",
          manage: "Manage subscription"
        }
      },
      prepaid: {
        title: "Prepaid Credits",
        balance: "Balance: {{credits}} credits ({{amount}} BGN)",
        topUp5: "Add €5",
        topUp10: "Add €10",
        topUp20: "Add €20",
        budgetCap: "Monthly spending cap (EUR):",
        budgetCapHint: "0 = no limit",
        costPerMessage: "Extra messages cost 0.02 BGN each",
        budgetCapReached: "Monthly spending cap reached. Add credits or increase your cap.",
        save: "Save",
        success: "Credits added successfully!"
      },
      common: {
        saving: "Saving...",
        loading: "Loading..."
      },
      footer: {
        rights: "© 2026 Eterapp. All rights reserved.",
        disclaimer: "Eterapp is not a medical service. In case of emergency, call 112 or the Trust Hotline 0800 1 8 400.",
        terms: "Terms",
        privacy: "Privacy",
        gdpr: "GDPR",
        cookies: "Cookies",
        cookieSettings: "Cookie Settings"
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
        admin: "Адм.",
        backToChat: "← Към чата",
        legal: "Правни",
        terms: "Условия",
        privacy: "Поверителност",
        gdpr: "GDPR",
        cookies: "Бисквитки",
        features: "Функции"
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
        welcomeBack: "Добре дошъл обратно",
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
        month: "месец",
        monthly: "Месечно",
        yearly: "Годишно",
        yearlyDiscount: "−15%",
        saveYearlyPG: "Спести €36/год",
        saveYearlyEH: "Спести €72/год",
        disclaimer: "Таксуването се извършва чрез Stripe. При месечен план — таксуването е веднъж месечно. При годишен план — таксуването е еднократно за цялата година. Можеш да отмениш по всяко време от профила си. Цените са с включен ДДС.",
        downgrade: "Премини на по-нисък план",
        downgradeSuccess: "Планът ти ще бъде променен в края на текущия период.",
        choosePlan: "Избери план",
        startFree: "Започни безплатно",
        manageSub: "Управление на абонамент",
        loading: "Зареждане...",
        plans: {
          first_step: {
            name: "Първа Стъпка",
            description: "30 съобщения/месец • 30 дни история",
            subtitle: "Идеален старт без ангажимент"
          },
          personal_growth: {
            name: "Личен Растеж",
            description: "500 съобщения/месец • 90 дни история",
            subtitle: "За задълбочена емоционална работа"
          },
          expanded_horizons: {
            name: "Разширени Хоризонти",
            description: "1500 съобщения/месец • 180 дни история",
            subtitle: "Пълна трансформация с всички функции"
          }
        },
        features: {
          aiMessages30: "30 AI съобщения/месец",
          aiMessages500: "500 AI съобщения/месец",
          aiMessages1500: "1500 AI съобщения/месец",
          history30: "30 дни история",
          history90: "90 дни история",
          history180: "180 дни история",
          basicAi: "Основен AI асистент",
          powerfulAi: "По-мощен AI асистент",
          mostPowerfulAi: "Най-мощният AI асистент",
          sessionNotes: "Сесийни бележки",
          tasks: "Задачи",
          audioTherapy: "Аудио терапии",
          voiceAssistant: "Гласов асистент",
          bgEn: "BG/EN поддръжка",
          prioritySupport: "Приоритетна поддръжка",
          prioritySupport247: "Приоритетна поддръжка 24/7"
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
        howItWorks: {
          title: "Как работи Eterapp",
          subtitle: "Три стъпки до по-добро емоционално здраве",
          step1: {
            title: "Избери своя тип разговор",
            desc: "Искаш да разтовариш душата си? Да разбереш себе си по-добре? Да работиш върху конкретна тема? Eterapp те пита — и предлага разговора, от който имаш нужда точно сега."
          },
          step2: {
            title: "Говори. Без осъждане, без чакане.",
            desc: "AI асистент, калибриран специално за емоционална и личностна подкрепа. Не дава готови отговори — задава правилните въпроси."
          },
          step3: {
            title: "Виж как се развиваш",
            desc: "След всяка сесия — бележки, задачи и аудио терапии за да продължиш напред. Твоят прогрес, видим и измерим."
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
              "30 AI съобщения/месец",
              "Основен AI асистент",
              "30 дни история"
            ],
            cta: "Започни безплатно"
          },
          personalGrowth: {
            name: "Личен Растеж",
            price: "€19.99",
            period: "/месец",
            description: "За задълбочена емоционална работа",
            features: [
              "500 AI съобщения/месец",
              "По-мощен AI асистент",
              "Бележки от сесии",
              "Задачи за растеж",
              "90 дни история",
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
              "1500 AI съобщения/месец",
              "Най-мощен AI асистент",
              "Аудио терапии",
              "Гласов асистент",
              "Бележки от сесии",
              "Задачи за растеж",
              "180 дни история",
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
        voicePreference: {
          title: "Предпочитан глас",
          subtitle: "Избери глас за насочените терапии",
          female: "Женски",
          male: "Мъжки",
          saved: "Запазено!"
        },
        dangerZone: {
          title: "Опасна зона",
          subtitle: "Необратими действия",
          signOut: "Изход",
          signOutDesc: "Излез от акаунта на това устройство"
        },
        deleteAccount: "Изтрий акаунта",
        deleteAccountDesc: "Изтрива всички данни завинаги",
        deleteAccountBtn: "Изтрий акаунта",
        deleteConfirmTitle: "⚠️ Изтриване на акаунт",
        deleteConfirmDesc: "Това действие е необратимо. Всички разговори, бележки и данни ще бъдат изтрити завинаги.",
        deleteTypeConfirm: "Напиши ИЗТРИЙ за да потвърдиш:",
        deleteTypePlaceholder: "ИЗТРИЙ",
        deleteConfirmBtn: "Изтрий завинаги",
        deleteCancel: "Отказ"
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
      chat: {
        voiceUpgradeRequired: "Надгради плана си за гласови съобщения",
        recording: "Записва се... Натисни отново за спиране",
        transcribing: "Транскрибира се...",
        micError: "Не може да се получи достъп до микрофона",
        deleteSession: "Изтрий чат",
        newChat: "Нов чат",
        recent: "Последни",
        noChats: "Няма чатове още",
        noResults: "Няма резултати",
        searchPlaceholder: "Търси в чатовете...",
        disclaimer: "Eterapp не е медицинска услуга.",
        greeting: "Здравей, как си днес?",
        greetingSub: "Тук съм за теб. Можеш да споделиш всичко.",
        messagesLeft: "съобщения остават",
        upgradeForMore: "Надгради за повече",
        limitReached: "Месечният лимит на съобщенията е достигнат.",
        upgradeNow: "Надгради сега",
        imageUpgradeRequired: "Надгради плана за изображения",
        imageTooLarge: "Изображението е твърде голямо (макс. 4MB)",
        imageAttached: "Изображение прикачено",
        sessionNotes: "Бележки от сесията",
        sessionNotesEmpty: "Все още няма бележки за тази сесия.",
        sessionTasks: "Задачи от сесията",
        sessionTasksEmpty: "Все още няма задачи за тази сесия.",
        upgradeForInsights: "Надгради за достъп до анализ на сесията",
        completed: "Изпълнена",
        therapyAudio: "Насочена терапия",
        therapyAudioEmpty: "Няма аудио терапия за тази сесия.",
        upgradeForTherapy: "Надгради до Разширени хоризонти за насочени терапии",
        listenNow: "Слушай сега",
        duration: "Продължителност",
        voiceMode: "Гласов режим",
        voiceModeActive: "Гласов режим — говори сега",
        voiceModeUpgrade: "Надгради до Разширени хоризонти за гласов асистент",
        voiceModeSpeaking: "Говори...",
        voiceModeListening: "Слуша...",
        warning75: "Използвали сте {{used}}/{{limit}} съобщения този месец (75%). Помислете за надграждане.",
        warning90: "Почти сте на лимита — {{used}}/{{limit}} съобщения. Добавете кредити за да продължите.",
        upgradePlan: "Надгради или добави кредити →",
        notes: "Бележки",
        tasks: "Задачи",
        thinking: "Eterapp мисли...",
        historyOptimized: "Историята е оптимизирана за по-бърз отговор",
        speaking: "Говори...",
        loadingTherapy: "Зарежда терапевтична сесия..."
      },
      featuresPage: {
        hero: {
          title: "Всичко което Eterapp предлага",
          subtitle: "Изберете плана, който отговаря на вашите нужди"
        },
        plans: {
          free: "Безплатен",
          personal_growth: "Личен Растеж",
          expanded_horizons: "Разширени Хоризонти"
        },
        table: {
          feature: "Функция",
          aiMessages: "AI съобщения / месец",
          sessionNotes: "Сесийни бележки",
          tasks: "Задачи",
          audioTherapy: "Аудио терапии",
          voiceAssistant: "Гласов асистент",
          history: "История",
          support: "Поддръжка",
          days: "{{count}} дни",
          support_basic: "Базова",
          support_priority: "Приоритетна",
          support_247: "24/7",
          price: "Цена",
          price_free: "Безплатно",
          price_pg: "€19.99/мес",
          price_eh: "€39.99/мес"
        },
        details: {
          title: "Как работи всяка функция",
          sessionNotes: {
            title: "Сесийни бележки",
            description: "AI автоматично генерира обобщение след сесията — емоционално състояние, основни теми, какво да се наблюдава. Достъпно от иконата с клипборд в сайдбара."
          },
          tasks: {
            title: "Задачи",
            description: "AI предлага практически стъпки след разговора. Малки цели за следващите дни. Достъпно от иконата с отметка в сайдбара."
          },
          audioTherapy: {
            title: "Аудио терапии",
            description: "Подбрани терапевтични аудио сесии, съобразени с настроението ти. Достъпно от иконата със слушалки в сайдбара след подходяща сесия."
          },
          voiceAssistant: {
            title: "Гласов асистент",
            description: "Говори с Eterapp на глас. Асистентът слуша, отговаря чрез синтез на реч и продължава разговора без ръце. Достъпно от иконата със слушалки в чат полето."
          }
        },
        payg: {
          title: "Излезли извън лимита? Не спирай.",
          description: "Заредете с предплатени кредити и продължете да чатите отвъд месечния лимит на плана.",
          packages: "Пакети кредити: 5, 10 или 20 лв",
          costPerMessage: "1 допълнително съобщение = 0.02 лв от предплатения баланс",
          budgetCap: "Задайте месечен лимит за допълнителни разходи — ние спираме автоматично",
          cta: "Зареди кредити"
        },
        cta: {
          title: "Готови ли сте да се почувствате по-добре?",
          subtitle: "Започнете пътуването си с Eterapp днес.",
          startFree: "Започни безплатно",
          upgrade: "Надгради плана си",
          manage: "Управлявай абонамента"
        }
      },
      prepaid: {
        title: "Предплатени кредити",
        balance: "Баланс: {{credits}} кредита ({{amount}} лв)",
        topUp5: "Зареди €5",
        topUp10: "Зареди €10",
        topUp20: "Зареди €20",
        budgetCap: "Месечен лимит за разходи (€):",
        budgetCapHint: "0 = без лимит",
        costPerMessage: "Допълнителните съобщения струват 0.02 лв всяко",
        budgetCapReached: "Месечният лимит е достигнат. Добавете кредити или увеличете лимита.",
        save: "Запази",
        success: "Кредитите са добавени успешно!"
      },
      common: {
        saving: "Запазва...",
        loading: "Зарежда..."
      },
      footer: {
        rights: "© 2026 Eterapp. Всички права запазени.",
        disclaimer: "Eterapp не е медицинска услуга. При спешност се обади на 112 или Телефон на доверието 0800 1 8 400.",
        terms: "Условия",
        privacy: "Поверителност",
        gdpr: "GDPR",
        cookies: "Бисквитки",
        cookieSettings: "Настройки за бисквитки"
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