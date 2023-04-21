import auth from '@/firebase';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const MyPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [user, loading, error] = useAuthState(auth);


    const handleNameChange = (event: any) => {
        setName(event.target.value);
        validateForm();
    };

    const handlePriceChange = (event: any) => {
        setPrice(event.target.value);
        validateForm();
    };

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
        validateForm();
    };

    if (!user) {
        return <div className='min-h-screen flex justify-center items-center'>
            <h1 className='text-2xl'>You are not logged in. Please <Link href="/signin" className='text-blue-500 underline'>sign in</Link> to create new product.</h1>
        </div>
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('Name:', name);
        console.log('Price:', price);
        console.log('Description:', description);
        fetch('/api/post_product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, description, email: user.email })
        })
            .then(res => res.json())
            .then(data => console.log(data))
        setName('');
        setPrice('');
        setDescription('');
        setIsFormValid(false);
    };

    const validateForm = () => {
        if (name && price && description) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="name-input" className="block font-medium mb-1">Name:</label>
                <input id="name-input" type="text" value={name} onChange={handleNameChange} className="w-full border border-gray-300 p-2 rounded" />
            </div>

            <div className="mb-4">
                <label htmlFor="price-input" className="block font-medium mb-1">Price:</label>
                <input id="price-input" type="number" value={price} onChange={handlePriceChange} className="w-full border border-gray-300 p-2 rounded" />
            </div>

            <div className="mb-4">
                <label htmlFor="description-input" className="block font-medium mb-1">Description:</label>
                <textarea id="description-input" value={description} onChange={handleDescriptionChange} className="w-full border border-gray-300 p-2 rounded" />
            </div>

            <button type="submit" disabled={!isFormValid} className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed">Submit</button>
        </form>

    );
};

export default MyPage;