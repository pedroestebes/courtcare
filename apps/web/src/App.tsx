import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Landing } from "@/pages/Landing";
import type { ReactNode } from "react";

// Lazy-load all routes except Landing (first page users see)
const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("@/pages/Register").then((m) => ({ default: m.Register })));
const Pricing = lazy(() => import("@/pages/Pricing").then((m) => ({ default: m.Pricing })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const DrillLibrary = lazy(() => import("@/pages/DrillLibrary").then((m) => ({ default: m.DrillLibrary })));
const DrillDetail = lazy(() => import("@/pages/DrillDetail").then((m) => ({ default: m.DrillDetail })));
const Session = lazy(() => import("@/pages/Session").then((m) => ({ default: m.Session })));
const SessionHistory = lazy(() => import("@/pages/SessionHistory").then((m) => ({ default: m.SessionHistory })));
const SessionReview = lazy(() => import("@/pages/SessionReview").then((m) => ({ default: m.SessionReview })));
const Recovery = lazy(() => import("@/pages/Recovery").then((m) => ({ default: m.Recovery })));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-brand-400 border-t-transparent animate-spin" />
        <p className="text-sm text-white/40">Loading...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drills"
            element={
              <ProtectedRoute>
                <DrillLibrary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drills/:slug"
            element={
              <ProtectedRoute>
                <DrillDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/session/:slug"
            element={
              <ProtectedRoute>
                <Session />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <SessionHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history/:id"
            element={
              <ProtectedRoute>
                <SessionReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <ProtectedRoute>
                <Recovery />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
