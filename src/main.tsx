import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./lib/i18n";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider } from "./providers/AuthProvider";
import { RecaptchaWrapper } from "./components/recaptcha-wrapper";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <RecaptchaWrapper>
            <App />
            <Toaster />
          </RecaptchaWrapper>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);