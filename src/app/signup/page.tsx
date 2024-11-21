import Link from "next/link";
export default async function SignIn() {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="mb-3">
            <h1 className="text-4xl text-center font-semibold">Signup</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <form
              action="/api/auth/signup"
              method="post"
              className="flex flex-col items-center justify-center gap-3"
            >
              {/* Email Input */}
              <label htmlFor="email" className="w-full">
                <input
                  type="email"
                  required
                  id="email"
                  name="email" // Added name attribute
                  className="px-4 py-2 mb-4 border-2 rounded-md w-full"
                  placeholder="Enter your email"
                />
              </label>
  
              {/* Password Input */}
              <label htmlFor="password" className="w-full">
                <input
                  type="password"
                  required
                  id="password"
                  name="password" // Added name attribute
                  className="px-4 py-2 border-2 rounded-md w-full"
                  placeholder="Enter your password"
                />
              </label>
  
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-white px-10 py-2 rounded-lg mt-6"
              >
                Sign up
              </button>
              <Link href="/" className="text-semibold text-red-500">Already have an account ?</Link>
            </form>
          </div>
        </div>
      </>
    );
  }
  