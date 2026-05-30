import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/hooks/useTranslation";
import { useToast, Toaster } from "@/hooks/use-toast";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TemplatesPage from "./pages/Templates";
import HistoryPage from "./pages/History";

const queryClient = new QueryClient();

const App = () => {
  const { toasts, toast, dismiss } = useToast();

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster toasts={toasts} onDismiss={dismiss} />
      </TranslationProvider>
    </QueryClientProvider>
  );
};

export default App;
