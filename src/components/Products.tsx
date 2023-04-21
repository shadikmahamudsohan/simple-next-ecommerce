import { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
type productData = {
    _id: string,
    name: string,
    price: number,
    description: string,
    email: string,
}[]
interface ProductsProps {
    userEmail: string | undefined;
}


const Products = ({ userEmail }: ProductsProps) => {

    const [productData, setProductData] = useState<productData>([]);
    const [refresh, setRefresh] = useState(0)
    useEffect(() => {
        fetch('/api/get_product')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProductData(data.result);
                }
            });
    }, [refresh]);
    const handleDelete = (id: string) => {
        fetch(`/api/delete_product/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRefresh(refresh + 1)
                }
            });
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                productData.map(({ description, _id, name, price, email }) => (
                    <SingleProduct key={_id} description={description} _id={_id} name={name} price={price} email={email} userEmail={userEmail} handleDelete={handleDelete} />
                ))
            }
        </div>
    );
};
export default Products;