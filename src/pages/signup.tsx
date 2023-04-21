import auth from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email, password, confirmPassword)
        createUserWithEmailAndPassword(email, password).then(() => {
            router.push("/")
        })
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="email-input" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password-input" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-lg"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirm-password-input" className="block text-gray-700 font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        id="confirm-password-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
                    disabled={!email || !password || password !== confirmPassword}
                >
                    Sign Up
                </button>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-blue-500 hover:text-blue-700 font-bold">
                        Sign In
                    </Link>
                </p>

                <div className="flex justify-center mt-4">
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg mr-4">
                        Sign Up with Google
                    </button>
                    <p className="text-gray-500 text-sm font-medium">Forgot Password?</p>
                </div>
            </form>
        </div>
    );
}
