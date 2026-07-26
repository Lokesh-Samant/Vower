export default function MethodSelect({ onSelect }) {
    return (
        <div className="w-full max-w-sm">
            {/* Mobile-only logo + welcome */}
            <div className="mb-10 flex flex-col items-center text-center lg:hidden">
                <div className="mb-3">
                    <img
                        src="/vower-logo.jpeg"
                        alt="Vower icon"
                        className="h-24 w-24 object-contain rounded-2xl"
                    />
                </div>
                <img
                    src="/vower-logo-main.jpeg"
                    alt="Vower"
                    className="h-24 w-auto object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                />
                <p className="mt-2 text-volt-deep/60">&ldquo;Powering every promise.&rdquo;</p>
            </div>

            {/* Desktop heading */}
            <div className="mb-7 hidden lg:block">
                <h2 className="font-display text-2xl font-semibold text-volt-deep">
                    Get started
                </h2>
                <p className="mt-1 text-sm text-volt-deep/50">
                    Choose how you&apos;d like to sign up.
                </p>
            </div>

            <div className="space-y-3">
                {/* Sign up with Email */}
                <button
                    type="button"
                    onClick={() => onSelect('email')}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-volt-deep/10 bg-white py-3 text-sm font-medium text-volt-deep transition hover:border-volt-deep/20 hover:bg-volt-soft/60"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Sign up with Email
                </button>

                {/* Sign up with Phone */}
                <button
                    type="button"
                    onClick={() => onSelect('phone')}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-volt-deep/10 bg-white py-3 text-sm font-medium text-volt-deep transition hover:border-volt-deep/20 hover:bg-volt-soft/60"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <line x1="12" y1="18" x2="12" y2="18" />
                    </svg>
                    Sign up with Phone
                </button>

                {/* Sign up with Google */}
                <button
                    type="button"
                    onClick={() => onSelect('google')}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-volt-deep/10 bg-white py-3 text-sm font-medium text-volt-deep transition hover:border-volt-deep/20 hover:bg-volt-soft/60"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.89c2.27-2.09 3.56-5.17 3.56-8.81Z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.89-3c-1.08.73-2.46 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.92H1.28v3.09A12 12 0 0 0 12 24Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.31 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.28a12 12 0 0 0 0 10.82l4.03-3.09Z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.59l4.03 3.09C6.25 6.86 8.89 4.77 12 4.77Z"
                        />
                    </svg>
                    Sign up with Google
                </button>
            </div>

            <p className="mt-8 text-center text-sm text-volt-deep/60">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-volt-dim hover:underline">
                    Log in
                </a>
            </p>
        </div>
    )
}
