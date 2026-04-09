import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold text-foreground mb-3">ClassSupport</h1>
      <p className="text-gray-mid text-lg mb-8 max-w-md">
        AI-powered guidance to help teachers navigate classroom challenges with
        confidence.
      </p>
      <Link
        href="/login"
        className="px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg hover:bg-accent-hover transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
