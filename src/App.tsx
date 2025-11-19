import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const queryClient = new QueryClient();
const Index = lazy(() => import("../src/pages/Index"));
const BookingSuccess = lazy(() => import("../src/pages/BookingSuccess"));
const NotFound = lazy(() => import("../src/pages/NotFound"));

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Suspense
              fallback={<div className="p-6 text-center">Loading...</div>}
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
