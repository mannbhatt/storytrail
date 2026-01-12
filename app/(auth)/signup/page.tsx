"use client";



export default function SignupPage() {
  const handleLogin = () => {
    // Redirect user to Supabase Google OAuth route
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="w-full h-[72px] bg-primary"></div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
           <h1 className="text-black font-heading text-3xl lg:text-4xl font-semibold text-center mb-4 drop-shadow-md">
              Join <span className="text-accent-brand">StoryTrail</span>
            </h1>
            <p className="mt-2 text-sm text-text-gray-700">
              Share your travel stories and discover hidden gems around the world
            </p>
          </div>

          <div className="  order-2 border-2 border-primary rounded-lg bg-white transition-all duration-300 group">
            <div className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 font-heading">
                    Get Started
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Sign up with your Google account
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleLogin}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                      </svg>
                    </span>
                    Continue with Google
                  </button>
                </div>

                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/90 text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    By continuing, you agree to our{' '}
                    <a href="#" className="font-medium text-primary hover:text-primary/80">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-primary hover:text-primary/80">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom decorative element */}
            <div className="bg-primary/10 border-t-2 border-primary py-4 px-6 text-center">
              <p className="text-xs text-gray-600">
                Join thousands of travelers sharing their stories
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-white/80">
        <p>© {new Date().getFullYear()} StoryTrail. All rights reserved.</p>
      </footer>
    </div>
  );
}
