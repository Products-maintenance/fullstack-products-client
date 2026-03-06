import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

// VIT!!   "request" es el objeto que contiene toda la info entrada en el formulario.
// No es fácil de recuperar... hay que hacerlo como aparece aquí abajo
export async function action({ request } : ActionFunctionArgs) { //--> la request siempre ha de llevar este tipo: ActionFunctionArgs
    const data = Object.fromEntries(await request.formData()) 
    //orig, request.formData() es un array de entradas dobles [['name', 'Jordi'], ['age, 23]]]
    //sale un objecto con el conjunto de key values --> {name: "Jordi", age: 23}
    //const data = [...await request.formData()] Con esto sale un poco raro, un array con un array por propiedad

    let error = '';
    if (Object.values(data).includes("")) {
        error = 'Todos los campos son obligatorios';
    }

    if (error.length) {
        return error;  //VIT! Cdo devuelves algo en tus "actions" están de vuelta en tu componente Form, 
        // por medio de un hook llamado useActionData
    }

    await addProduct(data); //await para que no vaya a otra linea hasta que haya acabado la cosa

    return redirect('/'); //al final, que te lleve a otro lado. Esto también es de react-router-dom
                            //no se devuelve abajo a "const error = useActionData" porque "redirect" destruye NewProduct.tsx... 
                            // ya se está yendo a Products.tsx 


}


export default function NewProduct() {

    const error = useActionData(); //esto contiene lo que devuelva (return) la function "action".
                //solo se usa si hay error, si no, se hace una redirección.

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">
                    Volver a productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method="POST"
            >
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
