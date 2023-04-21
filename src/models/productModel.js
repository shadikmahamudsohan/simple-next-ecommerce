import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: [true, "product name is required"]
    },
    price: {
        type: Number,
        require: [true, "product price is required"],
        min: 0
    },
    description: {
        type: String,
        require: [true, "please provide a short description"],
    },
    email: {
        type: String,
        require: [true, "please provide the user email"],
    }
});

if (models.Product) {
    delete models.Product;
}
const product = model("Product", productSchema);
export default product;