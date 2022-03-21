import { useEffect, useState } from "react";
import { Button } from "../../../shared/components/ui-components/Button";
import { FormField } from "../../../shared/components/ui-components/FormField";
import { Page } from "../../layout/Page";
import AdvertsService from "../service/AdvertsService";

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
    const { name, sale, price, tags, photo } = newAdvertData
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
        // setNewAdvertData((advertData)=>{
        //     return { ...advertData, tags: tagsData };
        // });
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
    }

    const buttonDisabled = 
        !name || 
        (sale === null || sale === undefined) || 
        !price ||
        tags.length <=0;

    return (
        <Page title="Create New Advertisement">
            <div className="newAdvertPage bordered">
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
                    name="price"
                    label="Precio"
                    className="loginForm-field"
                    value={price}
                    onChange={handleInputChange}
                />
                <label>

                    { availableTags.length > 0 && (
                        <select multiple={true} onChange={handleInputChange}>
                            {availableTags.map((tag, idx)=>{
                                return <option key={idx} value={tag}>{tag}</option>
                            })}
                        </select>
                        )
                    }
                </label>
               

                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Male"
                            checked={!sale}
                            onChange={handleInputChange}
                        />
                        Se compra
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Female"
                            checked={sale}
                            onChange={handleInputChange}
                        />
                        En venta
                    </label>
                </div>
                <input
                    type="file"
                    onChange={event => console.log(event.target.files[0])}
                />

                <Button
                    className="loginForm-submit"
                    type="submit"
                    variant="primary"
                    disabled={buttonDisabled}
                >
                    Crear Anuncio
                </Button>
            </form>
            </div>
        </Page>
    );
}