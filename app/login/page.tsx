import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-accent mb-1">ClassSupport</h1>
          <p className="text-gray-mid text-sm">
            AI-powered pupil support for teachers
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-xs text-gray-mid mt-6">
          MVP Demo Version
        </p>
      </div>
    </div>
  );
}
