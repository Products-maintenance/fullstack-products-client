import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom"
import { getProducts, modifyAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import type { Product } from "../types"

export async function loader() {
  const products = await getProducts()

  return products;

}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await modifyAvailability(+data.id)

}



export default function Products() {

  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="min-w-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 text-center  sm:w-auto w-fit">
          Agregar Producto
        </Link>
      </div>

      <div className="p-2 overflow-x-auto max-w-full">
        <table className="w-full mt-5 table-auto min-w-150">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails
                product={product}
                key={product.id}
              />
            ))}

          </tbody>
        </table>
      </div>

    </>
  )
}
