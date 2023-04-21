import { useState } from "react";

type productData = {
    _id: string,
    name: string,
    price: number,
    description: string,
    email: string,
    userEmail: string | undefined;
    handleDelete: any
}

const SingleProduct = ({ _id, description, name, price, email, userEmail, handleDelete }: productData) => {
    const [showButtons, setShowButtons] = useState(false);

    function handleMouseEnter() {
        setShowButtons(true);
    }

    function handleMouseLeave() {
        setShowButtons(false);
    }

    return (
        <div
            key={_id}
            className="relative m-5 py-5 px-10 flex flex-col justify-between items-center rounded-lg shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute inset-0 bg-gray-50 rounded-lg shadow-md"
                style={{ filter: showButtons ? 'blur(2px)' : 'none' }}
            ></div>
            <div className="z-10 text-center relative">
                <h1 className="text-3xl font-bold mb-2" style={{ filter: showButtons ? 'blur(2px)' : 'none' }}>{name}</h1>
                <h2 className="text-xl font-extrabold text-yellow-400 mb-2" style={{ filter: showButtons ? 'blur(2px)' : 'none' }}>${price}</h2>
                <p className="text-gray-700" style={{ filter: showButtons ? 'blur(2px)' : 'none' }}>{description}</p>
                <p className="text-gray-700 font-bold mt-3" style={{ filter: showButtons ? 'blur(2px)' : 'none' }}>created by {userEmail === email ? "you" : email}</p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
                {showButtons && (
                    <div className="flex justify-center">
                        {userEmail === email ? (
                            <button onClick={() => handleDelete(_id)} className="bg-red-500 z-50 text-white px-4 py-2 rounded-md mr-4">
                                Delete
                            </button>
                        ) : (
                            <button className="bg-green-500 z-50 text-white px-4 py-2 rounded-md mr-4">
                                Buy
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleProduct;