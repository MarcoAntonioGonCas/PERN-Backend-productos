import { Model } from "sequelize-typescript";
declare class Product extends Model {
    name: string;
    price: number;
    availability: boolean;
    image: string;
}
export default Product;
