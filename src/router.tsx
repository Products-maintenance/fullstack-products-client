import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, { loader as productsLoader, action as availabilityAction } from './views/Products';
import NewProduct, { action as newProductAction } from './views/NewProduct';
import EditProduct, { loader as editProductLoader, action as editProductAction}  from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';



//esta es una forma de declarar el archivo router. La otra está en el buscador de bebidas <BrowserRouter><Routes>...
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        // Todo lo que pongas en children es lo que aparecerá en layout/outlet... lo configurado aquí abajo para cada path
        children: [
            {
                element: <Products />,
                index: true,
                loader: productsLoader,
                action: availabilityAction
            },
            {
                path: 'productos/nuevo', 
                element: <NewProduct />,
                action: newProductAction        
            },
            {
                path: 'productos/:productId/editar', //ROA pattern - Resource oriented architechture. Entidad principal, id, acción
                element: <EditProduct />,   //estas rutas no tienen nada que ver con la api de backend... son rutas que tú pones siguiendo una convención
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:productId/eliminar',
                action: deleteProductAction
            }
        ]
    }
]

)