import { LoginForm } from "@/components/auth/LoginForm";

export const Login = () => {
  return (
    <main className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <LoginForm />
      </div>
    </main>
  );
};
