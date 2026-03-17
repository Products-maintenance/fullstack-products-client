import type { Product } from "../types"
import { FormatCurrency } from "../helpers"
import { redirect, useNavigate, Form, type ActionFunctionArgs, useFetcher } from "react-router-dom"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    await deleteProduct(Number(params.productId))
    return redirect('/');
}



export default function ProductDetails({ product }: ProductDetailsProps) {

    const navigate = useNavigate();
    const fetcher = useFetcher();

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {FormatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST" >
                    <button
                        type="submit"
                        name='id'
                        value={product.id}
                        className={`${product.availability ? "text-black" : 'text-red-600'} 
                        rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}
                    >{product.availability ? "Disponible" : "No disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)} className="bg-indigo-600 text-white text-center rounded-lg w-full p-2 uppercase font-bold text-xs"

                    >Editar</button>
                    <Form
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Seguro que deseas eliminar el producto?')) {
                                e.preventDefault();
                            }

                        }}

                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 text-white text-center rounded-lg w-full p-2 uppercase font-bold text-xs"
                        ></input>
                    </Form>
                </div>
            </td>
        </tr>
    )
}
