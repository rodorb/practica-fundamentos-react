import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui-components/Button";
import { Page } from "../../layout/Page";
import AdvertsService from "../service/AdvertsService";
import { Advert } from "./Advert";
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
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        (async ()=>{
            let hasError = false;
            setisLoading(true);
            try {
              const advertsData = await AdvertsService.getAllAdvertisements();
              setAdverts(advertsData);  
            } catch (error) {
                hasError = true;
            }finally{
                setisLoading(false);
                if(hasError){
                    setError(hasError);
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