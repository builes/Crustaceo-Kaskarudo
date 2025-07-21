import { SignupForm } from "../components/auth/SignupForm";

export const Signup = () => {
  return (
    <main className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <SignupForm />
      </div>
    </main>
  );
};
