import { useParams } from 'react-router-dom';
import {Button, Card, CardImg} from "react-bootstrap";
import {useSelector} from "react-redux";
import style from './ProductPage.module.css'

import queryClient from "../QueryClientProvider/QueryClientProvider.jsx";
// const cachedData = queryClient.getQueryData(['posts']);
// const allBikes = cachedData?.pages.flatMap(page=>page)||[];


export default function ProductPage() {
    const bikesData = useSelector((state) => state.bikesFromInfinitieQuery.bikesData);
    const { id } = useParams();

    const filteredBikes = bikesData.find(bike => Number(bike.id)===Number(id));

    console.log("bikesData from page", bikesData);

    return (
        <>
            <Card
            className={`bike-card mt-5 m-auto ${style.card}`}

            // style={{background: `url(/img/${id}.jpg) center center / 80% no-repeat`}}
            >
                <Card.Img
                    className={style.smallImage}
                    variant="top"
                    src={`/img/${id}.jpg`}
                    alt={`Bike ${id}`}
                />
                <Card.Body>
                    <Card.Title>
                        <h3>Model name: {filteredBikes.name}</h3>
                    </Card.Title>
                        <br/>
                        <div>Price: {filteredBikes.price} USD.</div>
                        <div>Color: {filteredBikes.color}</div>

                <Button variant="outline-primary"
                        data-id={filteredBikes.id}
                        data-name={filteredBikes.name}
                        data-price={filteredBikes.price}
                        style={{minWidth: "25%"}}
                >
                    В корзину
                </Button>
                    <Card.Text className="mt-2">
                        Price with discount: {filteredBikes.price * 0.9}
                    </Card.Text>
                <button className={`heart ${style.heart}`}></button>
                <button className={`scales ${style.scales}`}></button>

                </Card.Body>
            </Card>

        </>


    );
}
