import {useDispatch, useSelector} from "react-redux";
import {Button, Container} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import {plusBikeInCart, minusBikeInCart, removeBikeInCart} from '../Redux/ProviderRedux.jsx'
import {useState, useEffect} from "react";
import {Dialog} from "@chakra-ui/react"
import DialogComponent from './FormCart.jsx';






export default function Cart() {
    const bikesInCart = useSelector((state) => state.bikesFromInfinitieQuery.bikesInCart);
    const navigate = useNavigate();

// ================================================================
    let totalPrice = bikesInCart.reduce((acc, curr) =>acc+parseInt(curr.price), 0);
    let count = bikesInCart.reduce((acc, curr) =>acc+parseInt(curr.count), 0);

    const [quantity, setQuantity] = useState(count);
    const [price, setPrice] = useState(count);
    const dispatch = useDispatch();



    const handlePlusBikeInCart = (id) =>
    {
        dispatch(plusBikeInCart({id}))

    }

    const handleMinusBikeInCart = (id) =>
    {
        dispatch(minusBikeInCart({id}))

    }

    const handleRemoveBikeInCart = (id) =>
    {
        dispatch(removeBikeInCart({id}))

    }

    useEffect(() => {
        const total = bikesInCart.reduce((acc, curr) => acc + parseInt(curr.count), 0);
        setQuantity(total);
        const totalPrice = bikesInCart.reduce((acc, curr) => acc + Number(curr.price*curr.count), 0);
        setPrice(totalPrice);
    }, [bikesInCart]);

    return (

        <Container fluid
                   className="mt-5"
        >
            <div
            style={{width: "70%", margin: "auto", padding: "20px"}}
            >
                <h3
                    className={"text-start"}
                > Корзина </h3>
            </div>

            {bikesInCart.map((product) => (
                <Container
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="d-flex flex-column flex-md-row align-items-center justify-content-between border p-3 mb-3 rounded shadow-sm gap-3"
                    style={{ cursor: 'pointer' }}
                >
                    {/* Левая колонка — изображение */}
                    <div style={{ flexShrink: 0 }}>
                        <img
                            src={`/img/${product.id}.jpg`}
                            alt={`Bike ${product.id}`}
                            style={{
                                height: '100px',
                                width: '100px',
                                objectFit: 'contain',
                            }}
                        />
                    </div>

                    {/* Средняя колонка — текст */}
                    <div className="flex-grow-1 text-center text-md-start">
                        <p className="mb-1"><strong>Model name:</strong> {product.name}</p>
                        <p className="mb-1"><strong>Price:</strong> {product.price} USD</p>
                        <p className="mb-1"><strong>Color:</strong> {product.color}</p>
                    </div>

                    {/* Правая колонка — кнопка */}
                    <div className="d-flex align-items-center justify-content-end gap-2 mt-2 mt-md-0">

                        <Button
                            variant="outline-primary"
                            className="mt-2 mt-md-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMinusBikeInCart(product.id);
                            }}
                        >
                            -
                        </Button>
                        <div>
                            {product.count}
                        </div>
                        <Button
                            variant="outline-primary"
                            className="mt-2 mt-md-0"
                            onClick={(e) => {
                              e.stopPropagation();
                                handlePlusBikeInCart(product.id);
                            }}
                        >
                           +
                        </Button>



                        <Button
                            variant="outline-primary"
                            className="mt-2 mt-md-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveBikeInCart(product.id);
                            }}
                        >
                            удалить
                        </Button>
                    </div>
                </Container>
            ))}
                <Container
                    className="d-flex flex-column flex-md-row align-items-center justify-content-between border p-3 mb-3 rounded shadow-sm gap-3"
                >
                    <div>
                        <Button
                            variant="primary"
                            className="mt-2 mt-md-0 z-1 fw-bold"
                            onClick={() => navigate(`/categories`)}
                        >
                            Продолжить покупки
                        </Button>
                    </div>


                        <div
                            className={"d-flex flex-md-row justify-content-between align-items-center p-3 rounded fs-3 fw-semibold" }
                            style={{border:"1px solid blue", minWidth: "300px", backgroundColor: "rgba(13, 110, 253, 0.15)"}}
                        >
                            {price}$
                            <Dialog.Root
                                size="xl"
                            >
                                <Dialog.Trigger asChild>
                                    <Button variant="primary"
                                            className="mt-2 mt-md-0 z-1 fw-bold"
                                    >
                                        Оформить заказ
                                    </Button>
                                </Dialog.Trigger>
                                <DialogComponent />
                            </Dialog.Root>

                        </div>


                </Container>


        </Container>
    );
}