import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui-components/Button";
import { Page } from "../../layout/Page";
import AdvertsService from "../service/AdvertsService";
import { Advert } from "./Advert";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


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
    const [ availableTags, setAvailableTags ] = useState(["lifestyle","mobile","motor","work"])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //TODO: estado de slider, si se saca a  otro componente, mover tambien este estado
    // const [ sliderState , setSliderState ] = useState({
    //         min: 1,
    //         max: 100,
    //         step: 10,
    //         value: 1
    // });

    //TODO: Filtros, Añadir un Botón para resetear los filtros y volver a mostrar todos los productos
    const [filters, setFilters] = useState({
        nameFilter : 'Todos', //input de texto
        onSaleFilter: 'Todos',//radio buttons ['Todos', 'En venta', 'Se compra']
        priceFilter: {
            min: 1,
            max: 100,
            step: 10,
            value: 1
    }   , //slider ( si mueve el slider mostrar los productos que se cumplan con que sean igual o mayor al precio seleccionado)
        tagsFilter: [], //multiselect, donde se podrán seleccionar uno o más tags de los devueltos por el API   
    });

    const { min, max, step, value } = filters.priceFilter;
    const { nameFilter, onSaleFilter, priceFilter, tagsFilter } = filters;
    const ADVERT_TYPES = [ 'En venta', 'Se compra' ];
    //TODO: estado de slider, si se saca a  otro componente, mover tambien este estado
    useEffect(()=>{
        (async ()=>{
            let errorValue = null;
            setIsLoading(true);
            try {
              const advertsData = await AdvertsService.getAllAdvertisements();
              const tagsData = await AdvertsService.getTags();
              setAvailableTags(tagsData); 
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


    //TODO: funciones controladoras del cambio de slider
    const onSliderChange = (value) => {
        console.log(value);
        setFilters((oldFilterValue) =>{
            return {...oldFilterValue, priceFilter : {...oldFilterValue.priceFilter, value }}
        });
    };
    
    const onSliderInputChange = (defaultValue)=> (event) => {
        const evtTarget = event.target;
        setFilters((oldFilterValue) =>{
            return {...oldFilterValue, priceFilter : {...oldFilterValue.priceFilter, [evtTarget.name]:  +evtTarget.value || defaultValue }};
        });
    };


    const onFilterChange = (event)=>{
        const evtTarget = event?.target;
        const filterKey = evtTarget?.name;
         
        setFilters((oldFilterValue)=>{
            const filterValue = filterKey === 'tagsFilter'?  
            Array.from(evtTarget?.options).filter((e)=> e.selected)?.map(o=> o.value) : evtTarget.value;
            return{
                ...oldFilterValue,
                [filterKey] : filterValue
            }
        })

    }

    const labelStyle = { minWidth: '60px', display: 'inline-block' };
    const inputStyle = { marginBottom: '10px' };
    return (
        <Page title="Welcome to Nodepop">
            <div>
                {adverts.length > 0?(
                    <Fragment>
                        {/* //TODO:  PARTE DE FILTROS - PODRIA IR TODO A UN COMPONENTE */}
                            <div style={{ width: 600, margin: 50 }}>
                                    <h1>ZONA DE FILTROS</h1>
                                    {/* FILTRO POR NOMBRE */}
                                    <label>Nombre anuncio:</label>
                                    <input type="text" name="nameFilter" id="nameFilter" onChange={onFilterChange} />
                                    {/* FILTRO POR TIPO DE ANUNCIO COMPRA/VENTA */}
                                    {ADVERT_TYPES.map((adType, idx)=>(
                                        <div key={idx} className="form-check">
                                        <label>
                                            <input
                                                type="radio"
                                                name="onSaleFilter"
                                                value={adType}
                                                checked={onSaleFilter === adType} 
                                                onChange={onFilterChange}
                                            />
                                            {adType}
                                        </label>
                                    </div>
                                    ))}

                                    {/* FILTRO POR PRECIO */}
                                    <div className="price-filter">
                                        <label style={labelStyle}>Precio Minimo: </label>
                                        <input
                                            type="number"
                                            name="min"
                                            value={min}
                                            onChange={onSliderInputChange(1)}
                                            style={inputStyle}
                                            />
                                        <br />

                                        <label style={labelStyle}>Precio Maximo: </label>
                                        <input
                                            type="number"
                                            name="max"
                                            value={max}
                                            onChange={onSliderInputChange(100)}
                                            style={inputStyle}
                                            />
                                        <br />

                                        <label style={labelStyle}>Step: </label>
                                        <input
                                            type="number"
                                            name="step"
                                            value={step}
                                            onChange={onSliderInputChange(1)}
                                            style={inputStyle}
                                            />
                                        <br />
                                        <br />

                                        <label style={labelStyle}>A partir de: </label>
                                        <span> {value} €</span>
                                        <br />
                                        <br />

                                        <Slider
                                            value={value}
                                            min={min}
                                            max={max}
                                            step={step}
                                            onChange={onSliderChange}
                                        />  
                                    </div>

                                    {/* FILTRO POR TAGS */}
                                    <label htmlFor="tagsFilter">Tags:</label>
                                    <select name="tagsFilter" id="tagsFilter" multiple  onChange={onFilterChange}>
                                        {availableTags.map((tag, idx)=>(
                                            <option key={idx} value={tag}>{tag}</option>
                                        ))}
                                    </select>
                                    
                            </div>
                            {/* //TODO: FIN  PARTE DE FILTROS - PODRIA IR TODO A UN COMPONENTE */}


                            <ul>
                                {adverts.map((advert) => {
                                    return (
                                        <li key={advert.id}>
                                            <Link to={`/adverts/${advert.id}`}>
                                                <Advert {...advert} />
                                            </Link>
                                        </li>
                                    );

                                })}
                            </ul>
                        </Fragment>
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