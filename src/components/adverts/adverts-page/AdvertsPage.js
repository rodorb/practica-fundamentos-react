import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui-components/Button";
import { Page } from "../../layout/Page";
import AdvertsService from "../service/AdvertsService";
import { Advert } from "./Advert";

// AdvertsPage:
// DONE: o Listado de anuncios. Cada anuncio presentará nombre, precio, si es
// compra o venta y los tags. No es necesario mostrar la foto en este
// listado.
// DONE: o Manejará el estado cuando no haya ningún anuncio de mostrar, con un
// enlace a la página de creación de anuncios.
// DONE: o Cada anuncio del listado tendrá un enlace al detalle del anuncio (ruta
// /adverts/:id).
// TODO: o Zona de filtros: Formulario con distintos inputs, donde podremos
// introducir los filtros que queremos aplicar sobre el listado.
// TODO: Filtro por nombre (input tipo texto)
// TODO: Filtro compra/venta (input tipo radio ‘venta’, ‘compra’, ‘todos’)
// TODO: Filtro por precio (input donde podremos seleccionar el rango de
// precios por el que queremos filtrar). Podeis usar un componente
// como este. https://github.com/react-component/slider
// TODO: Filtro por tags (input donde podremos seleccionar uno o varios
// tags de los disponibles). Al aplicar el filtro se mostrarán los
// anuncios que contengan todos los tags elegidos.
// TODO: EXTRA: Estaría bien que la aplicación “recordase” las
// preferencias de filtrado del usuario, de modo que cada vez que
// se entre en esta ruta estuviesen ya marcados los últimos filtros
// aplicados y con ellos se realizase la petición al API. Estas
// preferencias deberían permanecer guardadas aunque cerremos
// el navegador.
const EmptyAdvertsPage = () => {
    return (<div style={{ textAlign: 'center' }}>
    <p>No adverts to show!</p>
    <Button as={Link} to="/advers/new" variant="primary">
        Be the first create one!
    </Button>
    </div>)
}
export const AdvertsPage = ()=>{
    const [adverts, setAdverts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        (async ()=>{
            let errorValue = null;
            setIsLoading(true);
            try {
              const advertsData = await AdvertsService.getAllAdvertisements();
              setAdverts(advertsData);  
            } catch (error) {
                errorValue = error;
            }finally{
                setIsLoading(false);
                if(errorValue){
                    setError(errorValue);
                }
            }
        })();

    }, []);
    return (
        <Page title="Welcome to Nodepop">
            <div>
                {adverts.length > 0?(
                    <ul>
                        {adverts.map((advert) => {
                            return (
                                <li key={advert.id}>
                                    <Link to={`/adverts/${advert.id}`}>
                                        <Advert {...advert}/>
                                    </Link>
                                </li>
                            )
                             
                        })}
                    </ul>
                    ): <EmptyAdvertsPage/> }


                {isLoading && (
                <div>
                ...Loading - TODO: Spinner should be shown here
                </div>
                )}

                {error && (
                    <div onClick={setError(null)} className="loginPage-error">
                    {error.message} - TODO: An error notification should be shown here
                    </div>
                )}
            </div>
        </Page>
        
        

        
    );
}