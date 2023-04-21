import Image from 'next/image'
import { Inter } from 'next/font/google'
import Products from '../components/Products'
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
const inter = Inter({ subsets: ['latin'] })
import { useRouter } from 'next/router';
import auth from '@/firebase';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  return (
    <main className='bg-gray-100 min-h-screen p-5'>
      {user ? <>
        <div className='flex justify-between items-center'>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
            {user.email && user.email.charAt(0).toUpperCase()}
          </div>
          <button onClick={() => signOut(auth)} className='px-5 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-all'>Log Out</button>
        </div>

      </> : <button onClick={() => router.push('/signin')} className='px-5 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all'>Sign In</button>}
      <h1 className='text-center text-6xl font-bold p-10'>Welcome to next shop</h1>
      <Products userEmail={user?.email as string | undefined} />
      <button onClick={() => router.push('/create_product')} className='mx-auto block mt-5 px-5 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-all'>Create Your Product</button>
    </main>
  )
}
