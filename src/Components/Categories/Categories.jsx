import {useEffect, useRef, useState} from "react";
import {useInfiniteQuery} from '@tanstack/react-query';
import './Categories.css';
import { Container, Row, Col, Card, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addData, addBikesInCart} from '../Redux/ProviderRedux.jsx'


// ========================= Переменные ==============================================

// const offset = 0; // или любое значение, например, (page - 1) * limit
const limit = 4;
const getBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/get_bikes_react.php';



// ========================= Функциональный компонент ==============================================
export default function Categories ()
{
    const bikesData = useSelector((state) => state.bikesFromInfinitieQuery.bikesData);
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState('');
    const loadMoreRef = useRef(null);

    const handleAddToCart = (id) => {
        const filteredBike = bikesData.find(bike => Number(bike.id)===Number(id));
        dispatch(addBikesInCart(filteredBike));
    }

    const getBikesFromDB = async ({pageParam=1}, signal) =>{
        try {
            const response = await fetch(`${getBikesUrl}?offset=${(pageParam - 1) * 4}&limit=${limit}`, {
                signal,
            });
            if  (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
            const bikes = await response.json();

            return bikes;
        }
        catch(e) {
            console.log (`Произошла ошибка: ${e.message}`);
            return [];
        }
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1, signal }) => getBikesFromDB({ pageParam }, signal),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length < limit ? undefined : allPages.length + 1
        },
    })

    const allBikes = data?.pages.flatMap(page=>page)||[];
    const filteredBikes = filterText? allBikes.filter(bike =>bike.category.includes(filterText)):allBikes;

    let latestPage = [];
    if (data){
        latestPage = data.pages[data.pages.length - 1];
    }

    const dispatch = useDispatch();



    useEffect(() => {
    const observer = new IntersectionObserver(
        (entries)=> {
            const target = entries[0];
            if (target.isIntersecting &&hasNextPage && !isFetchingNextPage)
            {
                fetchNextPage();
            }

        }, {threshold:0.1})


        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }
        dispatch(addData(latestPage));


        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [loadMoreRef, isFetchingNextPage, hasNextPage, fetchNextPage]);



    if (status === 'loading') return <p>Загрузка...</p>
    if (status === 'error') return <p>Ошибка загрузки</p>


    // ======================================== Рендеринг ===============================================================

    return (
        <>
            <div
                data-testid="test-for-list-class"
                className="sticky-top d-flex justify-content-end"
                 style={{
                         height: '45px',
                         marginTop: "10px",
                         top: "80px",
                         width: "100%",
                         backgroundColor:"white",
                     }}>
                <select className="form-select sticky-top "
                        style={{maxWidth: "30%", marginRight: "20px"}}
                        aria-label="Default select example"
                        onChange={(event) =>
                        {setFilterText(event.target.value) }}
                        value={filterText}>
                    <option value="">Выберите категорию</option>
                    <option value="RUUT">RUUT</option>
                    <option value="MYLC">MYLC</option>
                    <option value="RATT">RATT</option>
                </select>
            </div>

            <div className="cards-wrapper">

                    <Container fluid className="ms-4 me-4 mt-5">
                        <Row>
                            {filteredBikes.map((product) => (
                                <Col xs={12} md={6}
                                     key={`${product.id}`}>
                                <Card
                                     onClick={() => navigate(`/product/${product.id}`)}
                                     className="bike-card me-2 ms-2"
                                     style={{background: `url(./img/${product.id}.jpg) center center / 80% no-repeat`}}>

                                    <h3>Model name: {product.name}</h3>
                                    <p>Price: {product.price} USD.</p>
                                    <p>Color: {product.color}</p>
                                    <Button
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            handleAddToCart(product.id)}}
                                        variant="outline-primary"
                                        className="add-to-cart" id="buybtn"
                                        data-id={product.id} data-name={product.name}
                                        data-price={product.price}>
                                        В корзину
                                    </Button>
                                    <button className="heart"></button>
                                    <button className="scales"></button>
                                    <div className="discount">Price with discount: {product.price * 0.9}</div>

                                </Card>
                                </Col>
                                    ))}
                        </Row>
                    </Container>




            </div>
                <div ref={loadMoreRef} style={{height: '20px'}}></div>
        </>


    )
}

