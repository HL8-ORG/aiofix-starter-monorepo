import Link from 'next/link';
import SignUpForm from '@/_components/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-4">
        <SignUpForm />
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
