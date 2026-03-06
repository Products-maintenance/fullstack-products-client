import type { Product } from "../types"

type ProductFormProps = {
    product?: Product   //hay que hacerlo opcional... y también abajo, en default value
                        //desde edit vendrá con producto... desde newproduct NO
}

export default function ProductForm( {product} : ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={product?.name}
                //Abajo: para método 1 de trasladar datos desde products aquí
                //defaultValue... no usamos value en esta versión de react-router-dom. Es lo que aparecerá por defecto... pero lo puedes cambiar
                // defaultValue={state.product.name}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    defaultValue={product?.price}
                // defaultValue={state.product.price}
                />
            </div>

        </>
    )
}
