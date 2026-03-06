import {object, string, number, array, boolean, type InferOutput} from 'valibot' //todos los tipos que usemos en nuestro objeto... Product

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export type Product = InferOutput<typeof ProductSchema>


export const ProductArraySchema = array(ProductSchema);

