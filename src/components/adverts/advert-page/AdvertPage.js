import { Fragment, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Page } from "../../layout/Page";
import AdvertsService from "../service/AdvertsService";
import { AdvertDetail } from "./AdvertDetail";
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';


//  DONE??:  Detalle del anuncio cuyo id es recogido de la URL. Mostrará la foto del
//         anuncio o un placeholder en su lugar si no existe foto.
//  DONE:  Si el anuncio no existe deberia redirigirnos al NotFoundPage.
//  TODO:  Botón para poder borrar el anuncio. Antes de borrar mostar una
//         confirmación al usuario (algo más elaborado que un window.confirm,
//         jugando con el estado de React). Tras el borrado debería redireccionar
//         al listado de anuncios.
 
export const AdvertPage = ()=>{
    const { advertId } = useParams() || '';
    const [ advert, setAdvert ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        (async () => {
            let errorValue = null;
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
        <Page>
            <Fragment>
                
                {isLoading && (
               <Spinner animation="border" role="status" variant="warning" >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
                )}
                { advert && !isLoading && <AdvertDetail {...advert} />}


                {error && (
                    <Toast bg="danger">
                    <Toast.Header>
                      <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>Se ha producido un error en la aplicación.</Toast.Body>
                  </Toast>
                )}
            </Fragment>
        </Page>
    );
}