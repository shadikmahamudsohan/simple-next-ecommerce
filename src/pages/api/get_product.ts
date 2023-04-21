import { connectMongoDB } from "../../libs/mongoConnect"
import product from "../../models/productModel"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string,
  msg?: string,
  success?: boolean,
  result?: Array<any> | Record<string, any>,
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only get request are allowed" });
    return;
  }

  try {
    await connectMongoDB();
    const todo = await product.find();
    res.status(200).json({
      success: true,
      result: todo
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, msg: "Something went wrong" });
  }
}
