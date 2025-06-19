import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-300 via-sky-200 to-sky-100 px-4">
      <div className="w-full max-w-md bg-white dark:bg-white/[0.05] p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-800 dark:text-white mb-2">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter the email address linked to your account, and we’ll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-md"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-center text-gray-700 dark:text-gray-400">
          Wait, I remember my password?
          <Link href="/login" className="ml-1 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Login here
          </Link>
        </div>
      </div>
    </main>
  );
}
