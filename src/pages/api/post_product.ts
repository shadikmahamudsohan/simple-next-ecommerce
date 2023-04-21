import { connectMongoDB } from "../../libs/mongoConnect"
import product from "../../models/productModel"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name?: string,
    msg?: string,
    success?: boolean,
    error?: any,
    result?: Array<any> | Record<string, any>
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.status(405).send({ msg: "Only post request are allowed" });
        return;
    }
    const productData = req.body;

    try {
        await connectMongoDB();
        product.create(productData).then((data: any) => {
            console.log(productData);

            console.log(data);

            res.status(201).send({
                success: true,
                result: data
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}
