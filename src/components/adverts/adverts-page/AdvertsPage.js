import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "../../layout/Page";
import './AdvertsPage.css';
import { Advert } from "./Advert";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from "react-redux";
import { getAdvertisements, getTags, getUi } from "../../../store-redux/selectors";
import { advertisements, allTags, uiResetError } from "../../../store-redux/actions";



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
    return (
    <div style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: '5rem', color: 'blue', display: 'flex'
        , justifyContent:'center', alignItems: 'center',   margin: '14rem' }}>
        <p>No adverts to show!</p>
        <Link style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: '5rem', color: 'red' }}  as={Link} to="/adverts/new" variant="primary">
            Be the first create one!
        </Link>
    </div>)
}
export const AdvertsPage = ()=>{
    const dispatch = useDispatch();
    const adverts = useSelector(getAdvertisements);
    const availableTags = useSelector(getTags);
    const { isLoading, error } = useSelector(getUi);
    // const [adverts, setAdverts] = useState([]);
    // const [ availableTags, setAvailableTags ] = useState(["lifestyle","mobile","motor","work"])
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    //TODO: Filtros, Añadir un Botón para resetear los filtros y volver a mostrar todos los productos
    const [filters, setFilters] = useState({
        nameFilter : 'Todos', //input de texto
        onSaleFilter: 'Todos',//radio buttons ['Todos', 'En venta', 'Se compra']
        priceFilter: {
            isFiltered: false,
            min: 1,
            max: 100,
            step: 10,
            value: 1
    }   , //slider ( si mueve el slider mostrar los productos que se cumplan con que sean igual o mayor al precio seleccionado)
        tagsFilter: [], //multiselect, donde se podrán seleccionar uno o más tags de los devueltos por el API   
    });

    const { min, max, step, value } = filters.priceFilter;
    const { nameFilter, onSaleFilter, priceFilter, tagsFilter } = filters;
    const ADVERT_TYPES = [ 'En venta', 'Se compra', 'Todos' ];
    //TODO: estado de slider, si se saca a  otro componente, mover tambien este estado
    useEffect(()=>{
        dispatch(advertisements());
        dispatch(allTags());
    }, [dispatch]);


    //TODO: funciones controladoras del cambio de slider
    const onSliderChange = (value) => {
        console.log(value);
        setFilters((oldFilterValue) =>{
            return {...oldFilterValue, priceFilter : {...oldFilterValue.priceFilter, value, isFiltered: true }}
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
    const filteredAdverts = adverts?.filter((advert)=>{
        const activeFilters = [];
        if(nameFilter !== 'Todos'){
            activeFilters.push(advert?.name?.toLowerCase().includes(nameFilter.toLowerCase()));
        }
        if(onSaleFilter !== 'Todos'){
            onSaleFilter === ADVERT_TYPES[0] ?  
                activeFilters.push(advert?.sale === true) : 
                activeFilters.push(advert?.sale === false);
        }

        if(priceFilter?.isFiltered){
            activeFilters.push(advert.price >= priceFilter.value);
        }

        if(tagsFilter?.length > 0){
            activeFilters.push(tagsFilter.every((tag)=> { return advert?.tags?.includes(tag) }));
        }

        return activeFilters.every(af => af);
    })

    const labelStyle = { minWidth: '60px', display: 'block', fontWeight: 'bold' };
    const inputStyle = { marginBottom: '10px' };
    return (
        <Page title="Welcome to Nodepop">
            <div className="advert-page-content">
                {!isLoading && !error &&<Fragment>
                {adverts.length > 0  ?(
                    <Fragment>
                        {/* //TODO:  PARTE DE FILTROS - PODRIA IR TODO A UN COMPONENTE */}
                            <div className="filter-zone">
                                    <h2>Filtrar anuncios</h2>
                                    {/* FILTRO POR NOMBRE */}
                                    <label style={labelStyle}>Nombre:</label>
                                    <input type="text" name="nameFilter" id="nameFilter" onChange={onFilterChange} />
                                    {/* FILTRO POR TIPO DE ANUNCIO COMPRA/VENTA */}
                                    <div style={{paddingBottom: "1rem", paddingTop: "1rem"}}>
                                       {ADVERT_TYPES.map((adType, idx)=>(
                                            <div key={idx}>
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
                                    </div>
                                    

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
                                        

                                        <label style={labelStyle}>Precio Maximo: </label>
                                        <input
                                            type="number"
                                            name="max"
                                            value={max}
                                            onChange={onSliderInputChange(100)}
                                            style={inputStyle}
                                            />
                                        

                                        <label style={labelStyle}>Step: </label>
                                        <input
                                            type="number"
                                            name="step"
                                            value={step}
                                            onChange={onSliderInputChange(1)}
                                            style={inputStyle}
                                            />
                                        
                                        

                                        <label style={labelStyle}>A partir de: 
                                            <span style={ {fontSize: '1.2rem', fontWeight: 'bolder'}}> {value} €</span>
                                        </label>

                                        <Slider
                                            value={value}
                                            min={min}
                                            max={max}
                                            step={step}
                                            onChange={onSliderChange}
                                        />  
                                    </div>

                                    {/* FILTRO POR TAGS */}
                                    <label style={labelStyle} htmlFor="tagsFilter">Etiquetas:</label>
                                    <select name="tagsFilter" id="tagsFilter" multiple  onChange={onFilterChange}>
                                        {availableTags.map((tag, idx)=>(
                                            <option key={idx} value={tag}>{tag}</option>
                                        ))}
                                    </select>
                                    
                            </div>
                            {/* //TODO: FIN  PARTE DE FILTROS - PODRIA IR TODO A UN COMPONENTE */}


                            <div id="ad">
                                {filteredAdverts.map((advert) => {
                                    return (
                                        <div key={advert.id}>
                                            <Link to={`/adverts/${advert.id}`}>
                                                <Advert {...advert} />
                                            </Link>
                                            
                                        </div>
                                    );

                                })}
                            </div>
                    </Fragment>
                    ): <EmptyAdvertsPage/> }

                </Fragment>}
                

                {isLoading && (
                <Spinner animation="border" role="status" variant="warning" >
                <span className="visually-hidden">Loading...</span>
                </Spinner>
                )}

                {error && !isLoading && (
                    <Toast bg="danger" onClose={() => dispatch(uiResetError())}>
                    <Toast.Header>
                      <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>Se ha producido un error en la aplicación.</Toast.Body>
                  </Toast>
                )}
            </div>
        </Page>
        
        

        
    );
}