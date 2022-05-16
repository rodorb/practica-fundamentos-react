import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../../layout/Page";
import { AdvertDetail } from "./AdvertDetail";
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from "react-redux";
import { getAdvert, getUi } from "../../../store-redux/selectors";
import { advertisement } from "../../../store-redux/actions";


//  DONE??:  Detalle del anuncio cuyo id es recogido de la URL. Mostrará la foto del
//         anuncio o un placeholder en su lugar si no existe foto.
//  DONE:  Si el anuncio no existe deberia redirigirnos al NotFoundPage.
//  TODO:  Botón para poder borrar el anuncio. Antes de borrar mostar una
//         confirmación al usuario (algo más elaborado que un window.confirm,
//         jugando con el estado de React). Tras el borrado debería redireccionar
//         al listado de anuncios.
 
export const AdvertPage = ()=>{
    const { advertId } = useParams() || '';
    const dispatch = useDispatch();
    const advert = useSelector(getAdvert(advertId));
    const { error, isLoading } = useSelector(getUi);

    useEffect(() => {
        dispatch(advertisement(advertId))
    }, [dispatch, advertId]);

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