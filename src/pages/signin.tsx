import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase'

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        // code for signing in with email and password
        signInWithEmailAndPassword(email, password).then(() => {
            router.push("/")
        })
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="email-input" className="block text-gray-700 font-bold mb-2">
                        Email:
                    </label>
                    <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email address"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password-input" className="block text-gray-700 font-bold mb-2">
                        Password:
                    </label>
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!email || !password}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign In
                </button>
                <div className="mt-4 text-center">
                    <span className="text-gray-700">
                        Don&apos t have an account?{" "}
                    </span>
                    <Link href="/signup" className="text-blue-500 hover:text-blue-700 font-bold">
                        Sign Up
                    </Link>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-gray-700">
                        Forgot your password?{" "}
                    </span>
                    <a href="#" className="text-blue-500 hover:text-blue-700 font-bold">
                        Click here
                    </a>
                </div>
            </form>
            <button
                onClick={() => console.log("Sign in with Google")}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default SignInForm;
