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
      legal: {
        pageTitle: "Privacy Policy",
        lastUpdated: "Last updated",
        lastUpdatedDate: "14 March 2026",
        dataController: {
          title: "1. Data Controller",
          intro: "The data controller responsible for your personal data is:",
          address: "Sofia, Bulgaria",
          email: "Email"
        },
        whatWeCollect: {
          title: "2. What Data We Collect",
          accountData: "Account data",
          email: "Email address",
          password: "Password (stored in hashed form only — we never see or store your plaintext password)",
          displayName: "Display name (optional)",
          chatContent: "Chat content",
          chatMessages: "Messages exchanged with the AI assistant",
          sessionNotes: "Session notes and tasks generated from conversations",
          chatWarning: "Chat messages may contain emotional or health-related information. This constitutes special category data under Article 9 of GDPR. We process this data only with your explicit consent.",
          subscriptionData: "Subscription and payment data",
          currentPlan: "Current subscription plan",
          paymentHistory: "Payment history and billing information (processed and stored by Stripe — we do not store your card details)",
          creditBalance: "Prepaid credit balance",
          technicalData: "Technical data",
          ipAddress: "IP address",
          browserInfo: "Browser type and version",
          deviceInfo: "Device information",
          usagePrefs: "Usage preferences (language, theme)"
        },
        legalBasis: {
          title: "3. Legal Basis for Processing",
          intro: "We process your personal data under the following legal bases as defined by the General Data Protection Regulation (GDPR):",
          contractTitle: "Performance of a contract — Article 6(1)(b)",
          contractDesc: "Processing necessary to provide the Eterapp service, including account authentication, subscription management, and delivering core functionality.",
          consentTitle: "Explicit consent — Article 6(1)(a) and Article 9(2)(a)",
          consentDesc: "Processing of chat content and any emotional or health-related data it may contain. You provide this consent when you use the chat feature. You may withdraw consent at any time (see Section 7 below).",
          legitimateTitle: "Legitimate interest — Article 6(1)(f)",
          legitimateDesc: "Processing necessary for security measures, fraud prevention, and service reliability. Our legitimate interest does not override your fundamental rights and freedoms."
        },
        processors: {
          title: "4. Third-Party Processors",
          intro: "We share your data with the following categories of third-party processors, each bound by data processing agreements:",
          category: "Category",
          company: "Company",
          region: "Region",
          legalBasis: "Legal basis",
          openAiNote: "OpenAI does not use data submitted via the API to train its models.",
          moreInfo: "For detailed privacy policies of each processor, see the links in our"
        },
        automatedDecisions: {
          title: "5. Automated Decision-Making",
          p1: "Eterapp uses artificial intelligence to generate conversational responses, session notes, and tasks based on your chat messages.",
          p2: "This AI processing does not constitute automated decision-making that produces legal effects or similarly significantly affects you within the meaning of Article 22 GDPR. No profiling is carried out."
        },
        dataRetention: {
          title: "6. Data Retention",
          accountData: "Account data: Retained until you delete your account.",
          chatHistory: "Chat history: Retained until deleted by you or upon account deletion.",
          paymentData: "Payment and billing data: Retained for 5 years to comply with tax and accounting obligations under Bulgarian law.",
          technicalLogs: "Technical logs: Retained for 90 days, then automatically deleted."
        },
        yourRights: {
          title: "7. Your Rights",
          intro: "Under GDPR Articles 15–22, you have the right to:",
          access: "Access — Obtain a copy of the personal data we hold about you (Art. 15)",
          rectification: "Rectification — Correct inaccurate or incomplete data (Art. 16)",
          erasure: "Erasure — Request deletion of your data (\u201Cright to be forgotten\u201D) (Art. 17)",
          restriction: "Restriction — Request restricted processing in certain circumstances (Art. 18)",
          portability: "Data portability — Receive your data in a structured, machine-readable format (Art. 20)",
          object: "Object — Object to processing based on legitimate interest (Art. 21)",
          withdraw: "Withdraw consent — Withdraw your consent at any time without affecting the lawfulness of prior processing",
          howToTitle: "How to withdraw consent or delete your data",
          howToApp: "In the app: Settings \u2192 Delete account",
          howToEmail: "By email: send a request to privacy@eterapp.io",
          responseTime: "We will respond to your request within one month of receipt (GDPR Article 12(3)).",
          complaintTitle: "Right to lodge a complaint",
          complaintIntro: "You have the right to lodge a complaint with the Commission for Personal Data Protection (CPDP/\u041A\u0417\u041B\u0414):"
        },
        children: {
          title: "8. Children",
          p1: "In accordance with Article 25c of the Bulgarian Personal Data Protection Act (\u0417\u0417\u041B\u0414), the minimum age for consenting to data processing in connection with information society services is 14 years.",
          p2: "Children under the age of 14 may only use Eterapp with the consent of a parent or legal guardian. If we become aware that we have collected data from a child under 14 without appropriate parental consent, we will delete that data promptly."
        },
        crisis: {
          title: "9. Crisis Situations",
          p1: "Eterapp is not a crisis service and does not replace professional emergency help. If you or someone you know is in a crisis situation or experiencing thoughts of self-harm, please contact:",
          emergency: "Emergency Services: 112",
          childLine: "National Child Helpline: 116 111"
        },
        policyChanges: {
          title: "10. Changes to This Policy",
          p1: "We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the \u201CLast updated\u201D date. For significant changes, we may also notify you via email.",
          p2: "Your continued use of Eterapp after changes take effect constitutes acceptance of the revised policy."
        },
        contact: {
          title: "11. Contact",
          p1: "For any questions about this Privacy Policy or our data practices:",
          email: "Email: privacy@eterapp.io"
        },
        cookies: {
          pageTitle: "Cookie Policy",
          whatTitle: "1. What Are Cookies",
          whatP1: "Cookies are small text files stored on your device when you visit a website. They allow the website to recognise your device and remember information about your visit, such as your preferences or login status.",
          whatP2: "This Cookie Policy is issued in accordance with the Bulgarian Electronic Communications Act (\u0417\u0417\u0415\u0421) and the EU ePrivacy Directive (2002/58/EC).",
          categoriesTitle: "2. Categories of Cookies",
          strictlyTitle: "Strictly Necessary",
          strictlyDesc: "Essential for the website to function. They enable core functionality such as authentication, payment processing, and storing your cookie preference. These cookies do not require your consent under the ePrivacy Directive.",
          functionalTitle: "Functional",
          functionalDesc: "Remember your preferences (such as language and theme) to provide a personalised experience. These cookies require your consent.",
          securityTitle: "Security",
          securityDesc: "Protect the service from automated abuse and fraud. They are considered strictly necessary and do not require separate consent.",
          tableTitle: "3. Cookies We Use",
          colName: "Cookie Name",
          colProvider: "Provider",
          colPurpose: "Purpose",
          colDuration: "Duration",
          colCategory: "Category",
          thirdPartyTitle: "4. Third-Party Cookie Policies",
          thirdPartyIntro: "The following third-party services may set cookies on your device. You can review their privacy policies here:",
          managingTitle: "5. Managing Cookies",
          managingIntro: "You can control and manage cookies through your browser settings:",
          chromeInstr: "Chrome: Settings \u2192 Privacy and security \u2192 Cookies and other site data",
          firefoxInstr: "Firefox: Settings \u2192 Privacy & Security \u2192 Cookies and Site Data",
          safariInstr: "Safari: Preferences \u2192 Privacy \u2192 Manage Website Data",
          edgeInstr: "Edge: Settings \u2192 Cookies and site permissions \u2192 Manage and delete cookies and site data",
          managingNote: "Please note that blocking strictly necessary cookies may prevent Eterapp from functioning correctly.",
          changesTitle: "6. Changes to This Policy",
          changesP1: "We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date.",
          contactTitle: "7. Contact",
          contactP1: "If you have any questions about this Cookie Policy, please contact us at privacy@eterapp.io",
          table: {
            purposeAuthSession: "Authentication session",
            purposeOAuthPKCE: "OAuth PKCE security",
            purposeFraudPrevention: "Fraud prevention",
            purposePaymentSession: "Payment session",
            purposeBotDetection: "Bot detection (reCAPTCHA v3)",
            purposeCookieConsent: "Stores cookie preference",
            purposeLanguage: "Language preference",
            purposeTheme: "Theme preference (light/dark)",
            durationSession: "Session",
            durationYear: "1 year",
            duration6Months: "6 months"
          }
        },
        gdpr: {
          pageTitle: "GDPR Compliance",
          intro: "This page supplements our Privacy Policy with specific information about your rights under the General Data Protection Regulation (EU) 2016/679 (GDPR) and the Bulgarian Personal Data Protection Act (PDPA/\u0417\u0417\u041B\u0414).",
          rightsTitle: "Your Rights Under GDPR",
          rightsIntro: "As a data subject under GDPR, you have the following rights:",
          accessTitle: "Right of Access (Article 15)",
          accessDesc: "You have the right to obtain confirmation as to whether personal data concerning you is being processed, and to access that data along with information about how it is used.",
          rectificationTitle: "Right to Rectification (Article 16)",
          rectificationDesc: "You have the right to have inaccurate personal data corrected and incomplete personal data completed.",
          erasureTitle: "Right to Erasure (Article 17)",
          erasureDesc: "You have the right to request the deletion of your personal data (\u201Cright to be forgotten\u201D) where the data is no longer necessary, you withdraw consent, or there is no overriding legitimate ground for processing.",
          restrictionTitle: "Right to Restrict Processing (Article 18)",
          restrictionDesc: "You have the right to request the restriction of processing of your personal data in certain circumstances, such as when you contest its accuracy.",
          portabilityTitle: "Right to Data Portability (Article 20)",
          portabilityDesc: "You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another controller.",
          objectTitle: "Right to Object (Article 21)",
          objectDesc: "You have the right to object to the processing of your personal data where the processing is based on legitimate interests.",
          lawfulBasisTitle: "Lawful Basis for Processing",
          lawfulBasisIntro: "We process your personal data under the following lawful bases:",
          lawfulContract: "Performance of a contract (Art. 6(1)(b)): Account creation, authentication, and subscription management.",
          lawfulConsent: "Explicit consent (Art. 6(1)(a) and Art. 9(2)(a)): Processing of chat content, including emotional and health-related data (special category data).",
          lawfulLegitimate: "Legitimate interest (Art. 6(1)(f)): Security measures, fraud prevention, and service reliability.",
          lawfulObligation: "Legal obligation (Art. 6(1)(c)): Retention of billing records as required by tax and accounting law.",
          specialDataTitle: "Special Category Data",
          specialDataP1: "Chat messages exchanged with the AI assistant may contain emotional or health-related information. This constitutes special category data under Article 9 of GDPR.",
          specialDataIntro: "We process this data under the following conditions:",
          specialDataLegalBasis: "Legal basis: Explicit consent (Article 9(2)(a)). You provide this consent each time you use the chat feature.",
          specialDataEncryption: "Encryption: All chat data is encrypted in transit (TLS) and at rest.",
          specialDataAccess: "Access restrictions: Chat data is accessible only to you and is processed by OpenAI solely for generating AI responses.",
          specialDataSharing: "No sharing: Your chat content is not shared with any third party other than OpenAI for the purpose of providing the service.",
          specialDataTraining: "No training: OpenAI does not use data submitted via the API to train its models.",
          dpoTitle: "Data Protection Contact",
          dpoP1: "We do not currently have a formally appointed Data Protection Officer (DPO) as we do not meet the mandatory appointment thresholds under Article 37 GDPR.",
          dpoP2: "For all data protection enquiries, please contact:",
          breachTitle: "Data Breach Notification",
          breachP1: "In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you without undue delay.",
          breachP2: "We will also notify the relevant supervisory authority (\u041A\u0417\u041B\u0414) within 72 hours of becoming aware of the breach, as required by Article 33 GDPR.",
          transfersTitle: "International Transfers",
          transfersEEA: "Within the EEA (no transfer outside the EEA)",
          transfersOutside: "Outside the EEA — protected by Standard Contractual Clauses (Article 46(2)(c) GDPR)",
          supervisoryTitle: "Supervisory Authority",
          supervisoryIntro: "You have the right to lodge a complaint with the Bulgarian supervisory authority:",
          exerciseTitle: "Exercising Your Rights",
          exerciseIntro: "To exercise any of your GDPR rights, please contact us at:",
          exerciseSubject: "Subject line: \u201CGDPR Rights Request\u201D",
          exerciseNote: "Please include your full name and the email address associated with your account.",
          exerciseResponse: "We will respond to your request within one month of receipt. In complex cases, we may extend this period by up to two additional months, in which case we will inform you within the first month."
        },
        terms: {
          pageTitle: "Terms of Service",
          acceptanceTitle: "1. Acceptance of Terms",
          acceptanceP1: "By accessing and using Eterapp (\u201Cthe Service\u201D), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use the Service.",
          descriptionTitle: "2. Description of Service",
          descriptionP1: "Eterapp provides AI-based emotional support through conversational interaction, session notes, growth tasks, and audio therapies.",
          descriptionP2: "Eterapp is NOT a medical service. It is not psychotherapy, psychological counselling, or psychiatric treatment. Eterapp does not diagnose, treat, or cure any medical or mental health condition.",
          descriptionP3: "Eterapp does not replace professional psychological, psychiatric, or medical help. If you are experiencing a mental health crisis, please contact a qualified professional immediately (see Section 6).",
          minAgeTitle: "3. Minimum Age",
          minAgeP1: "In accordance with Article 25c of the Bulgarian Personal Data Protection Act (\u0417\u0417\u041B\u0414), the minimum age for using Eterapp is 14 years.",
          minAgeP2: "Users under the age of 14 may only use Eterapp with the verifiable consent of a parent or legal guardian. If we discover that a user under 14 is using the Service without appropriate consent, we will terminate the account and delete associated data.",
          userRespTitle: "4. User Responsibilities",
          userResp1: "You must provide accurate and truthful information when creating your account.",
          userResp2: "You are responsible for maintaining the confidentiality of your account credentials.",
          userResp3: "You must not use the Service for any illegal or unauthorised purpose.",
          userResp4: "You must not attempt to gain unauthorised access to the Service or its systems.",
          userResp5: "You must not use the Service to generate content that is harmful, abusive, or violates the rights of others.",
          subscriptionTitle: "5. Subscription and Payments",
          subscriptionP1: "Eterapp offers subscription plans with varying features and message limits.",
          subscriptionStripe: "All payments are processed securely by Stripe Inc. Eterapp does not store your credit card details.",
          subscriptionCancel: "You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period.",
          subscriptionRefund: "Refunds are handled in accordance with the Bulgarian Consumer Protection Act (\u0417\u0430\u043A\u043E\u043D \u0437\u0430 \u0437\u0430\u0449\u0438\u0442\u0430 \u043D\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u0438\u0442\u0435). For digital content and services, you have the right to withdraw within 14 days of purchase, unless you have explicitly consented to immediate provision of the service and acknowledged that you waive your right of withdrawal.",
          disclaimerTitle: "6. Medical Disclaimer",
          disclaimerP1: "Eterapp is an AI-based emotional support tool. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health professional with any questions you may have regarding a medical or mental health condition.",
          disclaimerCrisis: "If you are in a crisis situation or experiencing thoughts of self-harm, please immediately contact:",
          disclaimerEmergency: "Emergency Services: 112",
          disclaimerChildLine: "National Child Helpline: 116 111",
          disclaimerP2: "Eterapp is not a substitute for emergency psychiatric help. Never disregard professional medical advice or delay seeking treatment because of something you read or experienced in Eterapp.",
          privacyTitle: "7. Privacy and Data",
          privacyP1: "Your privacy is important to us. Please review our Privacy Policy and GDPR Compliance page, which also govern your use of the Service.",
          ipTitle: "8. Intellectual Property",
          ipP1: "All content, features, and functionality of Eterapp — including text, graphics, logos, and software — are the property of Eterapp and are protected by copyright, trademark, and other intellectual property laws.",
          ipP2: "Your chat content and personal data remain your property. We do not claim ownership of user-generated content.",
          liabilityTitle: "9. Limitation of Liability",
          liabilityP1: "To the fullest extent permitted by applicable law, Eterapp shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the Service.",
          liabilityP2: "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable Bulgarian or EU law, including liability for death or personal injury caused by negligence, or for fraud.",
          governingTitle: "10. Governing Law and Jurisdiction",
          governingP1: "These Terms are governed by and construed in accordance with the laws of the Republic of Bulgaria and applicable EU law.",
          governingP2: "Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of the Republic of Bulgaria.",
          governingODR: "Consumers within the EU may also use the European Commission\u2019s Online Dispute Resolution platform:",
          changesTitle: "11. Changes to Terms",
          changesP1: "We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of Eterapp after the changes take effect constitutes acceptance of the revised Terms.",
          contactTitle: "12. Contact",
          contactP1: "If you have any questions about these Terms of Service, please contact us at privacy@eterapp.io"
        }
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
        backToHome: "Back",
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
        manage: "Manage",
        downgrade: "Downgrade",
        downgradeTitle: "Downgrade plan?",
        downgradeWarning: "Downgrading will reduce your message limits and features at the end of the current billing period. Are you sure?",
        downgradeSuccess: "Your plan will change at the end of the current billing period.",
        cancel: "Cancel",
        confirmDowngrade: "Yes, downgrade",
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
          bio: "About me",
          bioPlaceholder: "A few words about yourself...",
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
        cookiePreferences: "Cookie Preferences",
        cookiePreferencesDesc: "Reset your cookie consent choice. The cookie banner will appear again on reload.",
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
        loading: "Loading...",
        close: "Close"
      },
      cookieBanner: {
        title: "Cookie Preferences",
        description: "We use cookies to keep Eterapp running, protect against abuse, and remember your preferences. Choose which categories you accept below.",
        strictlyTitle: "Strictly Necessary",
        strictlyDesc: "Required for authentication, payments, and core functionality. Cannot be disabled.",
        functionalTitle: "Functional",
        functionalDesc: "Remember your language and theme preferences across sessions.",
        securityTitle: "Security",
        securityDesc: "Protect the service from automated abuse and fraud (reCAPTCHA). Cannot be disabled.",
        alwaysActive: "Always on",
        privacyPolicy: "Privacy Policy",
        cookiePolicy: "Cookie Policy",
        termsOfService: "Terms of Service",
        declineAll: "Decline all",
        savePreferences: "Save preferences",
        acceptAll: "Accept all"
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
      legal: {
        pageTitle: "Политика за поверителност",
        lastUpdated: "Последна актуализация",
        lastUpdatedDate: "14 март 2026",
        dataController: {
          title: "1. Администратор на данни",
          intro: "Администраторът на лични данни, отговорен за вашите данни, е:",
          address: "София, България",
          email: "Имейл"
        },
        whatWeCollect: {
          title: "2. Какви данни събираме",
          accountData: "Данни за акаунта",
          email: "Имейл адрес",
          password: "Парола (съхранявана само в хеширан вид — ние никога не виждаме или съхраняваме паролата ви в plaintext)",
          displayName: "Показвано име (незадължително)",
          chatContent: "Съдържание на чата",
          chatMessages: "Съобщения, разменени с AI асистента",
          sessionNotes: "Бележки от сесии и задачи, генерирани от разговорите",
          chatWarning: "Съобщенията в чата могат да съдържат емоционална или здравна информация. Това представлява данни от специална категория по чл. 9 от GDPR. Обработваме тези данни само с вашето изрично съгласие.",
          subscriptionData: "Данни за абонамент и плащания",
          currentPlan: "Текущ абонаментен план",
          paymentHistory: "История на плащанията и информация за фактуриране (обработвана и съхранявана от Stripe — ние не съхраняваме данните на вашата карта)",
          creditBalance: "Баланс на предплатени кредити",
          technicalData: "Технически данни",
          ipAddress: "IP адрес",
          browserInfo: "Тип и версия на браузъра",
          deviceInfo: "Информация за устройството",
          usagePrefs: "Предпочитания за използване (език, тема)"
        },
        legalBasis: {
          title: "3. Правно основание за обработка",
          intro: "Обработваме вашите лични данни на следните правни основания съгласно Общия регламент за защита на данните (GDPR):",
          contractTitle: "Изпълнение на договор — чл. 6(1)(б)",
          contractDesc: "Обработка, необходима за предоставяне на услугата Eterapp, включително удостоверяване на акаунта, управление на абонамента и предоставяне на основните функционалности.",
          consentTitle: "Изрично съгласие — чл. 6(1)(а) и чл. 9(2)(а)",
          consentDesc: "Обработка на съдържанието на чата и всякакви емоционални или здравни данни, които може да съдържа. Давате това съгласие при използване на функцията за чат. Можете да оттеглите съгласието си по всяко време (вж. Раздел 7 по-долу).",
          legitimateTitle: "Легитимен интерес — чл. 6(1)(е)",
          legitimateDesc: "Обработка, необходима за мерки за сигурност, предотвратяване на измами и надеждност на услугата. Нашият легитимен интерес не надделява над вашите основни права и свободи."
        },
        processors: {
          title: "4. Обработващи трети страни",
          intro: "Споделяме вашите данни със следните категории обработващи трети страни, всяка от които е обвързана от споразумения за обработка на данни:",
          category: "Категория",
          company: "Компания",
          region: "Регион",
          legalBasis: "Правно основание",
          openAiNote: "OpenAI не използва данните, изпратени чрез API, за обучение на своите модели.",
          moreInfo: "За подробни политики за поверителност на всеки обработващ вижте връзките в нашата"
        },
        automatedDecisions: {
          title: "5. Автоматизирано вземане на решения",
          p1: "Eterapp използва изкуствен интелект за генериране на разговорни отговори, бележки от сесии и задачи въз основа на вашите съобщения в чата.",
          p2: "Тази AI обработка не представлява автоматизирано вземане на решения, което поражда правни последици или по подобен начин съществено засяга вас по смисъла на чл. 22 от GDPR. Не се извършва профилиране."
        },
        dataRetention: {
          title: "6. Срок на съхранение на данните",
          accountData: "Данни за акаунта: Съхранявани до изтриване на акаунта.",
          chatHistory: "История на чата: Съхранявана до изтриване от вас или при изтриване на акаунта.",
          paymentData: "Данни за плащания и фактуриране: Съхранявани за 5 години за спазване на данъчните и счетоводни задължения съгласно българското законодателство.",
          technicalLogs: "Технически логове: Съхранявани за 90 дни, след което се изтриват автоматично."
        },
        yourRights: {
          title: "7. Вашите права",
          intro: "Съгласно чл. 15–22 от GDPR имате следните права:",
          access: "Достъп — Получете копие на личните данни, които притежаваме за вас (чл. 15)",
          rectification: "Коригиране — Коригирайте неточни или непълни данни (чл. 16)",
          erasure: "Изтриване — Поискайте изтриване на вашите данни (\u201Cправо да бъдете забравени\u201D) (чл. 17)",
          restriction: "Ограничаване — Поискайте ограничаване на обработката при определени обстоятелства (чл. 18)",
          portability: "Преносимост на данните — Получете вашите данни в структуриран, машинночитаем формат (чл. 20)",
          object: "Възражение — Оспорете обработката въз основа на легитимен интерес (чл. 21)",
          withdraw: "Оттегляне на съгласие — Оттеглете съгласието си по всяко време, без да засягате законосъобразността на предишната обработка",
          howToTitle: "Как да оттеглите съгласие или да изтриете данните си",
          howToApp: "В приложението: Настройки \u2192 Изтриване на акаунт",
          howToEmail: "По имейл: изпратете заявка до privacy@eterapp.io",
          responseTime: "Ще отговорим на вашата заявка в рамките на един месец от получаването (чл. 12(3) от GDPR).",
          complaintTitle: "Право на жалба",
          complaintIntro: "Имате право да подадете жалба до Комисията за защита на личните данни (КЗЛД):"
        },
        children: {
          title: "8. Деца",
          p1: "Съгласно чл. 25в от Закона за защита на личните данни (ЗЗЛД), минималната възраст за даване на съгласие за обработка на данни във връзка с услуги на информационното общество е 14 години.",
          p2: "Деца под 14-годишна възраст могат да използват Eterapp само със съгласието на родител или законен настойник. Ако узнаем, че сме събрали данни от дете под 14 години без подходящо родителско съгласие, ще изтрием тези данни незабавно."
        },
        crisis: {
          title: "9. Кризисни ситуации",
          p1: "Eterapp не е кризисна услуга и не замества професионална спешна помощ. Ако вие или някой, когото познавате, се намирате в кризисна ситуация или изпитвате мисли за самонараняване, моля свържете се с:",
          emergency: "Спешна помощ: 112",
          childLine: "Национален телефон за деца: 116 111"
        },
        policyChanges: {
          title: "10. Промени в тази политика",
          p1: "Можем периодично да актуализираме тази Политика за поверителност. Ще ви уведомяваме за съществени промени, като публикуваме актуализираната политика на тази страница и обновяваме датата. При значителни промени може да ви уведомим и по имейл.",
          p2: "Продължаването на използването на Eterapp след влизане в сила на промените представлява приемане на преразгледаната политика."
        },
        contact: {
          title: "11. Контакт",
          p1: "За въпроси относно тази Политика за поверителност или нашите практики за данни:",
          email: "Имейл: privacy@eterapp.io"
        },
        cookies: {
          pageTitle: "Политика за бисквитки",
          whatTitle: "1. Какво са бисквитките",
          whatP1: "Бисквитките са малки текстови файлове, съхранявани на вашето устройство при посещение на уебсайт. Те позволяват на уебсайта да разпознае вашето устройство и да запомни информация за посещението ви, като предпочитанията или статуса на влизане.",
          whatP2: "Тази Политика за бисквитки е издадена в съответствие с българския Закон за електронните съобщения (ЗЗЕС) и Директивата на ЕС за ePrivacy (2002/58/ЕО).",
          categoriesTitle: "2. Категории бисквитки",
          strictlyTitle: "Строго необходими",
          strictlyDesc: "Необходими за функционирането на уебсайта. Те осигуряват основни функционалности като удостоверяване, обработка на плащания и съхраняване на предпочитанията ви за бисквитки. Тези бисквитки не изискват вашето съгласие съгласно Директивата за ePrivacy.",
          functionalTitle: "Функционални",
          functionalDesc: "Запомнят вашите предпочитания (като език и тема), за да осигурят персонализирано изживяване. Тези бисквитки изискват вашето съгласие.",
          securityTitle: "Сигурност",
          securityDesc: "Защитават услугата от автоматизирани злоупотреби и измами. Считат се за строго необходими и не изискват отделно съгласие.",
          tableTitle: "3. Бисквитките, които използваме",
          colName: "Наименование",
          colProvider: "Доставчик",
          colPurpose: "Цел",
          colDuration: "Продължителност",
          colCategory: "Категория",
          thirdPartyTitle: "4. Политики за бисквитки на трети страни",
          thirdPartyIntro: "Следните услуги на трети страни могат да поставят бисквитки на вашето устройство. Можете да прегледате техните политики за поверителност тук:",
          managingTitle: "5. Управление на бисквитките",
          managingIntro: "Можете да контролирате и управлявате бисквитките чрез настройките на браузъра си:",
          chromeInstr: "Chrome: Настройки \u2192 Поверителност и сигурност \u2192 Бисквитки и други данни за сайтове",
          firefoxInstr: "Firefox: Настройки \u2192 Поверителност и сигурност \u2192 Бисквитки и данни за сайтове",
          safariInstr: "Safari: Предпочитания \u2192 Поверителност \u2192 Управление на данни за уебсайтове",
          edgeInstr: "Edge: Настройки \u2192 Бисквитки и разрешения за сайтове \u2192 Управление и изтриване на бисквитки",
          managingNote: "Моля, имайте предвид, че блокирането на строго необходимите бисквитки може да попречи на правилното функциониране на Eterapp.",
          changesTitle: "6. Промени в тази политика",
          changesP1: "Можем периодично да актуализираме тази Политика за бисквитки. Промените ще бъдат публикувани на тази страница с актуализирана дата.",
          contactTitle: "7. Контакт",
          contactP1: "Ако имате въпроси относно тази Политика за бисквитки, моля свържете се с нас на privacy@eterapp.io",
          table: {
            purposeAuthSession: "Сесия за удостоверяване",
            purposeOAuthPKCE: "Сигурност при OAuth влизане",
            purposeFraudPrevention: "Предотвратяване на измами",
            purposePaymentSession: "Платежна сесия",
            purposeBotDetection: "Засичане на ботове (reCAPTCHA v3)",
            purposeCookieConsent: "Запазва предпочитанията за бисквитки",
            purposeLanguage: "Предпочитание за език",
            purposeTheme: "Предпочитание за тема (светла/тъмна)",
            durationSession: "Сесия",
            durationYear: "1 година",
            duration6Months: "6 месеца"
          }
        },
        gdpr: {
          pageTitle: "Съответствие с GDPR",
          intro: "Тази страница допълва нашата Политика за поверителност със специфична информация за вашите права съгласно Общия регламент за защита на данните (ЕС) 2016/679 (GDPR) и българския Закон за защита на личните данни (ЗЗЛД).",
          rightsTitle: "Вашите права съгласно GDPR",
          rightsIntro: "Като субект на данни по GDPR имате следните права:",
          accessTitle: "Право на достъп (чл. 15)",
          accessDesc: "Имате право да получите потвърждение дали се обработват лични данни, свързани с вас, и да получите достъп до тези данни заедно с информация за начина им на използване.",
          rectificationTitle: "Право на коригиране (чл. 16)",
          rectificationDesc: "Имате право неточните лични данни да бъдат коригирани и непълните лични данни да бъдат допълнени.",
          erasureTitle: "Право на изтриване (чл. 17)",
          erasureDesc: "Имате право да поискате изтриване на личните си данни (\u201Cправо да бъдете забравени\u201D), когато данните вече не са необходими, оттеглите съгласието си или няма преобладаващо законно основание за обработка.",
          restrictionTitle: "Право на ограничаване на обработката (чл. 18)",
          restrictionDesc: "Имате право да поискате ограничаване на обработката на личните ви данни при определени обстоятелства, като например когато оспорвате точността им.",
          portabilityTitle: "Право на преносимост на данните (чл. 20)",
          portabilityDesc: "Имате право да получите личните си данни в структуриран, широко използван и машинночитаем формат и да ги предадете на друг администратор.",
          objectTitle: "Право на възражение (чл. 21)",
          objectDesc: "Имате право да възразите срещу обработката на личните ви данни, когато обработката се основава на легитимни интереси.",
          lawfulBasisTitle: "Правно основание за обработка",
          lawfulBasisIntro: "Обработваме вашите лични данни на следните правни основания:",
          lawfulContract: "Изпълнение на договор (чл. 6(1)(б)): Създаване на акаунт, удостоверяване и управление на абонамент.",
          lawfulConsent: "Изрично съгласие (чл. 6(1)(а) и чл. 9(2)(а)): Обработка на съдържанието на чата, включително емоционални и здравни данни (данни от специална категория).",
          lawfulLegitimate: "Легитимен интерес (чл. 6(1)(е)): Мерки за сигурност, предотвратяване на измами и надеждност на услугата.",
          lawfulObligation: "Законово задължение (чл. 6(1)(в)): Съхранение на данни за фактуриране съгласно данъчното и счетоводното законодателство.",
          specialDataTitle: "Данни от специална категория",
          specialDataP1: "Съобщенията в чата с AI асистента могат да съдържат емоционална или здравна информация. Това представлява данни от специална категория по чл. 9 от GDPR.",
          specialDataIntro: "Обработваме тези данни при следните условия:",
          specialDataLegalBasis: "Правно основание: Изрично съгласие (чл. 9(2)(а)). Давате това съгласие всеки път, когато използвате функцията за чат.",
          specialDataEncryption: "Криптиране: Всички данни от чата са криптирани при пренос (TLS) и в покой.",
          specialDataAccess: "Ограничен достъп: Данните от чата са достъпни само за вас и се обработват от OpenAI единствено за генериране на AI отговори.",
          specialDataSharing: "Без споделяне: Съдържанието на вашия чат не се споделя с трети страни, освен с OpenAI за целите на предоставяне на услугата.",
          specialDataTraining: "Без обучение: OpenAI не използва данните, изпратени чрез API, за обучение на своите модели.",
          dpoTitle: "Контакт за защита на данните",
          dpoP1: "Понастоящем нямаме официално назначено Длъжностно лице по защита на данните (ДЛЗД), тъй като не отговаряме на праговете за задължително назначаване съгласно чл. 37 от GDPR.",
          dpoP2: "За всички запитвания относно защитата на данните, моля свържете се с:",
          breachTitle: "Уведомяване при нарушение на данни",
          breachP1: "В случай на нарушение на личните данни, което вероятно ще доведе до висок риск за вашите права и свободи, ще ви уведомим без неоправдано забавяне.",
          breachP2: "Ще уведомим и съответния надзорен орган (КЗЛД) в рамките на 72 часа от узнаването за нарушението, съгласно изискванията на чл. 33 от GDPR.",
          transfersTitle: "Международни трансфери",
          transfersEEA: "В рамките на ЕИП (без трансфер извън ЕИП)",
          transfersOutside: "Извън ЕИП — защитени от Стандартни договорни клаузи (чл. 46(2)(в) от GDPR)",
          supervisoryTitle: "Надзорен орган",
          supervisoryIntro: "Имате право да подадете жалба до българския надзорен орган:",
          exerciseTitle: "Упражняване на вашите права",
          exerciseIntro: "За упражняване на правата ви по GDPR, моля свържете се с нас на:",
          exerciseSubject: "Тема: \u201CЗаявка за права по GDPR\u201D",
          exerciseNote: "Моля включете пълното си име и имейл адреса, свързан с вашия акаунт.",
          exerciseResponse: "Ще отговорим на вашата заявка в рамките на един месец от получаването. При сложни случаи можем да удължим този срок с до два допълнителни месеца, като ще ви информираме в рамките на първия месец."
        },
        terms: {
          pageTitle: "Общи условия",
          acceptanceTitle: "1. Приемане на условията",
          acceptanceP1: "С достъп до и използването на Eterapp (\u201CУслугата\u201D) приемате и се съгласявате да бъдете обвързани от тези Общи условия. Ако не сте съгласни с тези условия, не трябва да използвате Услугата.",
          descriptionTitle: "2. Описание на услугата",
          descriptionP1: "Eterapp предоставя AI-базирана емоционална подкрепа чрез разговорно взаимодействие, бележки от сесии, задачи за развитие и аудио терапии.",
          descriptionP2: "Eterapp НЕ е медицинска услуга. Не е психотерапия, психологическо консултиране или психиатрично лечение. Eterapp не диагностицира, лекува или лекува каквото и да е медицинско или психично разстройство.",
          descriptionP3: "Eterapp не замества професионална психологическа, психиатрична или медицинска помощ. Ако преживявате психична криза, моля незабавно се свържете с квалифициран специалист (вж. Раздел 6).",
          minAgeTitle: "3. Минимална възраст",
          minAgeP1: "Съгласно чл. 25в от Закона за защита на личните данни (ЗЗЛД), минималната възраст за използване на Eterapp е 14 години.",
          minAgeP2: "Потребители под 14-годишна възраст могат да използват Eterapp само с проверимото съгласие на родител или законен настойник. Ако открием, че потребител под 14 години използва Услугата без подходящо съгласие, ще закрием акаунта и ще изтрием свързаните данни.",
          userRespTitle: "4. Отговорности на потребителя",
          userResp1: "Трябва да предоставяте точна и вярна информация при създаване на акаунта си.",
          userResp2: "Отговорни сте за запазването на поверителността на вашите идентификационни данни.",
          userResp3: "Не трябва да използвате Услугата за незаконни или неоторизирани цели.",
          userResp4: "Не трябва да се опитвате да получите неоторизиран достъп до Услугата или нейните системи.",
          userResp5: "Не трябва да използвате Услугата за генериране на вредно, обидно или нарушаващо правата на трети лица съдържание.",
          subscriptionTitle: "5. Абонамент и плащания",
          subscriptionP1: "Eterapp предлага абонаментни планове с различни функционалности и лимити на съобщения.",
          subscriptionStripe: "Всички плащания се обработват сигурно от Stripe Inc. Eterapp не съхранява данните на вашата кредитна карта.",
          subscriptionCancel: "Можете да отмените абонамента си по всяко време от настройките на акаунта. Отмяната влиза в сила в края на текущия период на фактуриране.",
          subscriptionRefund: "Възстановяванията се обработват в съответствие с българския Закон за защита на потребителите. За цифрово съдържание и услуги имате право да се откажете в рамките на 14 дни от покупката, освен ако изрично не сте се съгласили с незабавното предоставяне на услугата и не сте потвърдили, че се отказвате от правото си на отказ.",
          disclaimerTitle: "6. Медицинска декларация",
          disclaimerP1: "Eterapp е AI-базиран инструмент за емоционална подкрепа. НЕ е заместител на професионален медицински съвет, диагноза или лечение. Винаги търсете съвет от квалифициран здравен специалист при въпроси относно медицинско или психично здравно състояние.",
          disclaimerCrisis: "Ако се намирате в кризисна ситуация или изпитвате мисли за самонараняване, моля незабавно се свържете с:",
          disclaimerEmergency: "Спешна помощ: 112",
          disclaimerChildLine: "Национален телефон за деца: 116 111",
          disclaimerP2: "Eterapp не е заместител на спешна психиатрична помощ. Никога не пренебрегвайте професионален медицински съвет и не отлагайте лечение поради нещо, което сте прочели или преживели в Eterapp.",
          privacyTitle: "7. Поверителност и данни",
          privacyP1: "Вашата поверителност е важна за нас. Моля прегледайте нашата Политика за поверителност и страницата за съответствие с GDPR, които също регулират използването на Услугата.",
          ipTitle: "8. Интелектуална собственост",
          ipP1: "Цялото съдържание, функционалности и функции на Eterapp — включително текст, графики, лога и софтуер — са собственост на Eterapp и са защитени от авторско право, търговска марка и други закони за интелектуална собственост.",
          ipP2: "Съдържанието на чата и личните ви данни остават ваша собственост. Ние не претендираме за собственост върху съдържание, генерирано от потребители.",
          liabilityTitle: "9. Ограничаване на отговорността",
          liabilityP1: "В максималната степен, допустима от приложимото законодателство, Eterapp не носи отговорност за косвени, случайни, специални, последващи или наказателни щети, включително без ограничение загуба на печалби, данни, употреба, репутация или други нематериални загуби в резултат на използването на Услугата.",
          liabilityP2: "Нищо в тези Условия не изключва или ограничава отговорността, която не може да бъде изключена или ограничена съгласно приложимото българско или европейско право, включително отговорността за смърт или телесна повреда, причинени от небрежност, или за измама.",
          governingTitle: "10. Приложимо право и юрисдикция",
          governingP1: "Тези Условия се уреждат и тълкуват в съответствие със законодателството на Република България и приложимото право на ЕС.",
          governingP2: "Всички спорове, произтичащи от или свързани с тези Условия, са подсъдни на компетентните съдилища на Република България.",
          governingODR: "Потребителите в ЕС могат също да използват платформата на Европейската комисия за онлайн решаване на спорове:",
          changesTitle: "11. Промени в условията",
          changesP1: "Запазваме си правото да изменяме тези Условия по всяко време. Ще уведомяваме потребителите за съществени промени по имейл или чрез Услугата. Продължаването на използването на Eterapp след влизане в сила на промените представлява приемане на преразгледаните Условия.",
          contactTitle: "12. Контакт",
          contactP1: "Ако имате въпроси относно тези Общи условия, моля свържете се с нас на privacy@eterapp.io"
        }
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
        backToHome: "Назад",
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
        manage: "Управлявай",
        downgrade: "Понижи",
        downgradeTitle: "Понижаване на плана?",
        downgradeWarning: "Понижаването ще намали лимитите и функциите ти в края на текущия период. Сигурен ли си?",
        downgradeSuccess: "Планът ти ще бъде променен в края на текущия период.",
        cancel: "Отказ",
        confirmDowngrade: "Да, понижи",
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
          bio: "За мен",
          bioPlaceholder: "Няколко думи за теб...",
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
        cookiePreferences: "Предпочитания за бисквитки",
        cookiePreferencesDesc: "Нулирай избора си за бисквитки. Банерът ще се покаже отново при презареждане.",
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
        loading: "Зарежда...",
        close: "Затвори"
      },
      cookieBanner: {
        title: "Предпочитания за бисквитки",
        description: "Използваме бисквитки за работата на Eterapp, защита срещу злоупотреби и запомняне на предпочитанията ви. Изберете кои категории приемате по-долу.",
        strictlyTitle: "Строго необходими",
        strictlyDesc: "Необходими за удостоверяване, плащания и основна функционалност. Не могат да бъдат изключени.",
        functionalTitle: "Функционални",
        functionalDesc: "Запомнят предпочитанията ви за език и тема между сесиите.",
        securityTitle: "Сигурност",
        securityDesc: "Защитават услугата от автоматизирани злоупотреби и измами (reCAPTCHA). Не могат да бъдат изключени.",
        alwaysActive: "Винаги включени",
        privacyPolicy: "Политика за поверителност",
        cookiePolicy: "Политика за бисквитки",
        termsOfService: "Общи условия",
        declineAll: "Откажи всички",
        savePreferences: "Запази избора",
        acceptAll: "Приеми всички"
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