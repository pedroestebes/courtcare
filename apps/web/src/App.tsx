import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Dashboard } from "@/pages/Dashboard";
import { DrillLibrary } from "@/pages/DrillLibrary";
import { DrillDetail } from "@/pages/DrillDetail";
import { Session } from "@/pages/Session";
import { SessionHistory } from "@/pages/SessionHistory";
import { SessionReview } from "@/pages/SessionReview";
import type { ReactNode } from "react";

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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
