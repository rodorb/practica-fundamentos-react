import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Page } from "../../layout/Page";
import { Advert } from "../adverts-page/Advert";
import AdvertsService from "../service/AdvertsService";

/**
 *   - TODO:  Detalle del anuncio cuyo id es recogido de la URL. Mostrará la foto del
 *      anuncio o un placeholder en su lugar si no existe foto.
 *   - TODO:  Si el anuncio no existe deberia redirigirnos al NotFoundPage.
 *   - TODO:  Botón para poder borrar el anuncio. Antes de borrar mostar una
 *      confirmación al usuario (algo más elaborado que un window.confirm,
 *      jugando con el estado de React). Tras el borrado debería redireccionar
 *      al listado de anuncios.
 */
export const AdvertPage = ()=>{
    const { advertId } = useParams() || '';
    const [ advert, setAdvert ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        (async () => {
            let errorValue = false;
            setIsLoading(true);
            try {
                const advertData = await AdvertsService.getAdvert(advertId);
                setAdvert(advertData);
            } catch (error) {
                errorValue = error;
            } finally {
                setIsLoading(false);
                errorValue && setError(errorValue);
            }
        })();
        
    }, [advertId]);

    if (error?.status === 401) {
        return <Navigate to="/login" />;
    }
  
    if (error?.status === 404) {
        return <Navigate to="/404" />;
    }

    return (
        <Page title="Welcome to Nodepop">
            <div>
                
                {isLoading && (
                <div>
                ...Loading - TODO: Spinner should be shown here
                </div>
                )}
                { advert && !isLoading && <Advert {...advert} />}


                {error && (
                    <div onClick={setError(null)} className="loginPage-error">
                    {error.message} - TODO: An error notification should be shown here
                    </div>
                )}
            </div>
        </Page>
    );
}