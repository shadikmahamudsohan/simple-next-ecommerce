import { connectMongoDB } from "@/libs/mongoConnect";
import product from "@/models/productModel";
import { NextApiRequest, NextApiResponse } from "next";
type Data = {
    msg?: string,
    success?: boolean,
    result?: Array<any> | Record<string, any>,
    error?: any
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method !== "DELETE") {
        res.status(405).send({ msg: "Only delete request are allowed" });
        return;
    }
    const { id } = req.query;
    try {
        await connectMongoDB();
        const result = await product.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            result: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}