import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-mid mb-6">Enter your name to continue</p>
      <LoginForm />
    </div>
  );
}
