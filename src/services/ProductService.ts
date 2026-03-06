import { DraftProductSchema, ProductSchema, ProductArraySchema, type Product } from "../types";
import { safeParse } from "valibot";
import axios from "axios";

type ProductData = {                        //este tipo tan raro es de ponerte encima de const data en NewProduct... es sintaxis de Typescript
 [k: string]: FormDataEntryValue            //es como Record<string, formDataEntryValue>. FormDataEntryValue es tipo del DOM (Web API)
}

const baseUrl = `${import.meta.env.VITE_API_URL}/api/products`;


export async function addProduct(data: ProductData){  //lo que viene de un form de React Router tiene ese tipo... no puedes meterle DraftProductSchea
    try {
        // const result = safeParse(DraftProductSchema, data)
        // console.log(result);   // te devolvía:   succes: false      issues: espera que el price fuera un número, peoro lo interpretaba como string 
        const result = safeParse(DraftProductSchema, {  //result.output es lo que guardará el objeto
            name: data.name,
            price: +data.price  //hay que convertirlo a número   
        })
        
        if (result.success){
            /*const { data } =*/ await axios.post(baseUrl, result.output/*{   result.outut ya es el objeto que espera la api del servidor     
                name: result.output.name,
                price: result.output.price
            }*/) 
        }
        else{
            throw new Error ('Datos no válidos'); //el error que lance será recogido por el catch de abajo
        }
    }
     catch (error) {
        console.log(error);
    }
}

export async function getProducts(){
    try {
        const { data } = await axios(baseUrl);

        const result = safeParse(ProductArraySchema, data.data);

        if (result.success){
            return result.output;
        }
        else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById( productId : Product['id'] ){
    try {
    const urlWithId = baseUrl+`/${productId}`;

        const { data } = await axios.get(urlWithId );

        const result = safeParse(ProductSchema, data.data);

        if (result.success){
            return result.output;
        }
        else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function modifyProduct(data: ProductData, id: Product['id']) {
    try {
        const urlWithId = baseUrl+`/${id}`;
     

        const result = safeParse(ProductSchema, {  //result.output es lo que guardará el objeto
            id,
            name: data.name,
            price: +data.price,  //hay que convertirlo a número /él hizo algo un poco bestia... lo comento aqquí abajo
            availability: data.availability === "true" //hay que convertirlo a bool //él hizo un metodito en útils
        })
        //Para covertir data.price a number con temas de valibolt. Lo encuentro excesivo.
        // import { NumberSchema, number, coerce, parse } from "valibot";

        // const NumberSchema = coerce(number(), Number)

        // const result = safeParse...
        //     id,
        //     price: ParseArgsConfig(NumberScheq, data.price)

        
        if (result.success){
             /*const { data } =*/ await axios.put(urlWithId, result.output//{        //url, datos y, opcional, config.
            //     name: result.output.name,
            //     price: result.output.price,
            //     availability: result.output.availability
            // }
            ) 
        }
        else{
            throw new Error ('Datos no válidos'); //el error que lance será recogido por el catch de abajo
        }
    }
     catch (error) {
        console.log(error);
    }
}

export async function modifyAvailability (id: Product['id']){
    console.log('desde service');
    const urlWithId = baseUrl+`/${id}`;
    try {
        await axios.patch(urlWithId);
    } catch (error) {
        console.log(error);
    }
     
    
}

export async function deleteProduct( id: Product['id']){
try {
     const urlWithId = baseUrl+`/${id}`;
     await axios.delete(urlWithId);
   
} catch (error) {
    throw new Error ('Hubo un error al acceder a base de datos');
}
}
