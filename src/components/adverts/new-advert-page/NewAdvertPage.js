import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormField } from "../../../shared/components/ui-components/FormField";
import { Page } from "../../layout/Page";
import AdvertsService from "../service/AdvertsService";
import ButtonBootstrap from 'react-bootstrap/Button';
import './NewAdvertPage.css';


// TODO: Formulario con TODOS los inputs necesarios para crear un nuevo
// anuncio:
//     Nombre
//     Compra / Venta
//     Tags disponibles.
//     Precio
//     Foto
// TODO: Todos los campos, excepto la foto serán requeridos para crear un
// anuncio. Manejar estas validaciones con React, por ejemplo
// desabiltando el submit hasta pasar todas las validaciones.
// TODO: Tras la creaciónTras la creación del anuncio debería redireccionar a la página del anuncio.
export const NewAdvertPage = ()=>{
    const [newAdvertData, setNewAdvertData] = useState({
        name: '',
        sale: null,
        price: "0",
        tags: [],
        photo: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ availableTags, setAvailableTags ] = useState(["lifestyle","mobile","motor","work"])
    const { name, sale, price, tags, photo } = newAdvertData;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        (async()=>{
            let errorValue;
            setIsLoading(true)
            try {
                const tagsData = await AdvertsService.getTags();
                setAvailableTags(tagsData);
            } catch (error) {
                errorValue = error;
            }finally{
                setIsLoading(false);
                errorValue && setError(errorValue)
            }
        })();
    }, []);

    const handleInputChange = (event) =>{
        const evtTarget = event?.target;
        const key = evtTarget?.name;
        let value = evtTarget.value
        if(key === 'tags'){
            value =  Array.from(evtTarget?.options).filter((e)=> e.selected)?.map(o=> o.value); 
        } 

        if(key === 'sale'){
            value =  JSON.parse(value); 
        } 

        if(key === 'price'){
            const regex = /^\d+.\d{1,2}/;
            const regexMatch = regex.exec(value)?.[0];
            if(regexMatch && (value.includes(',') || value.includes('.'))){
               value = regexMatch; 
            }
            
            value = value === ""? "" : parseFloat(parseFloat(value)?.toFixed(2));  //Number(Math.round(value * 100) / 100); 
        }
        
        if(key === 'photo'){
            value = event?.target?.files[0];
        }
            
        setNewAdvertData((oldAdvertData)=>{
            
            return{
                ...oldAdvertData,
                [key] : value
            }
        })
    }

    const handleSubmit = async (event) =>{

        event.preventDefault();
        let errorValue = null;
        let redirectTo;
        setIsLoading(true);
        
        try{
            const formData = new FormData();
            for ( var key in newAdvertData ) {
                newAdvertData[key]!== null &&
                newAdvertData[key]!== undefined &&
                formData.append(key, newAdvertData[key]);
            }
            const createdAdvert =  await AdvertsService.createAdvert(formData);
            redirectTo = `/adverts/${createdAdvert?.id}`;
        }catch(err){
            errorValue = err;
        }finally{
            setIsLoading(false);
            if(errorValue){
                setError(errorValue);
            }else{
                redirectTo && navigate(redirectTo, { replace: true }); 
            }  
        }
    }

    const buttonDisabled = 
        !name || 
        (sale === null || sale === undefined) || 
        !price ||
        tags.length <=0;

    return (
        <Page >
            <div className="newAdvertPage bordered">
                <h1>Nuevo Anuncio</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <FormField
                        type="text"
                        name="name"
                        label="Nombre"
                        className="loginForm-field"
                        value={name}
                        onChange={handleInputChange}
                    // ref={ref}
                    />
                    <FormField
                        type="number"
                        step='0.01'
                        name="price"
                        label="Precio"
                        className="loginForm-field"
                        value={price}
                        onChange={handleInputChange}
                    />
                    <div className="type-and-tags-container">
                        <label>
                            <span>Etiquetas</span>
                            { availableTags.length > 0 && (
                                <select className="form-select" size="3" aria-label="multiple select example" name="tags" id="tags" multiple={true} onChange={handleInputChange}>
                                    {availableTags.map((tag, idx)=>{
                                        return <option key={idx} value={tag}>{tag}</option>
                                    })}
                                </select>
                                )
                            }
                        </label>
                    
                        <div className="form-check">
                            <label>Tipo anuncio</label>
                            <div className="radio">
                                <label>
                                    <input className="form-check-input"
                                        name="sale"
                                        type="radio"
                                        value="false"
                                        checked={sale === false}
                                        onChange={handleInputChange}
                                    />
                                    Se compra
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input  className="form-check-input"
                                        name="sale"
                                        type="radio"
                                        value="true"
                                        checked={sale === true}
                                        onChange={handleInputChange}
                                    />
                                    En venta
                                </label>
                            </div> 
                        </div>
                    </div>
                    

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Selecciona una foto para el anuncio</label>
                        <input
                            className="form-control"
                            name="photo"
                            type="file"
                            id="formFile"
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="formButton">
                        <ButtonBootstrap size="lg" className="submit-form-button" variant="primary" type="submit" disabled={buttonDisabled}>
                            Crear Anuncio                    
                        </ButtonBootstrap>
                    </div>
                    
                </form>
            </div>
        </Page>
    );
}