import {Dialog, Portal, CloseButton} from "@chakra-ui/react"
import {Button, Container} from "react-bootstrap";
import './FormCart.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useState} from "react";
import {useSelector} from "react-redux";


// схема валидации с помощью Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Логин должен содержать минимум 3 символа')
        .required('Имя обязательно'),
    surname: Yup.string()
        .min(3, 'Логин должен содержать минимум 3 символа')
        .required('Фамилия обязательна'),
    phone: Yup.string()
        .matches(/^\+?\d{10,15}$/, 'Некорректный номер телефона')
        .optional(),
    email: Yup.string()
        .email('Некорректный email')
        .required('email обязателен'),
    delivery: Yup.string()
        .oneOf(['UkrPost', 'MeestПочта', 'Новая почта'], 'Выберите способ доставки')
        .required('Выберите способ доставки'),
    payment: Yup.string()
        .oneOf(['cardPay', 'applePay', 'fop'], 'Выберите Способ оплаты')
        .required('Выберите Способ оплаты'),
});

// начальное состояние формы
const initialValues = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    delivery: '',
    payment: '',
};



export default function DialogComponent() {

    const bikesInCart = useSelector((state) => state.bikesFromInfinitieQuery.bikesInCart);
    const totalPrice = bikesInCart.reduce((acc, curr) =>acc+parseInt(curr.price), 0);

// обработчик отправки формы
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {

        try {
            setOrder (values);
            // const formData = new FormData();
            // Object.entries(values).forEach(([key, value]) => {
            //         formData.append(key, value);
            // });

        } catch (error) {
            alert('Произошла ошибка при отправке данных. ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };



    const [order, setOrder] = useState({});

    return (
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>

                    <Dialog.Header>
                        <Dialog.Title>Оформление заказа</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        {/*==================================================================================*/}
                        <div className="anketa-container">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, setFieldValue, Values, resetForm }) => (
                                    <Form id="myForm">
                                        <fieldset className="anketa-fieldset">
                                            <legend className="anketa-legend">Форма для отправки</legend>

                                            {/* имя */}
                                            <label htmlFor="name" className="anketa-label">Имя:</label>
                                            <Field
                                                autoComplete="given-name"
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="anketa-input"
                                            />
                                            <ErrorMessage name="name" component="div" className="anketa-error" /><br />

                                            {/* фамилия */}
                                            <label htmlFor="surname" className="anketa-label">Фамилия:</label>
                                            <Field
                                                autoComplete="family-name"
                                                type="text"
                                                id="surname"
                                                name="surname"
                                                className="anketa-input"
                                            />
                                            <ErrorMessage name="surname" component="div" className="anketa-error" /><br />

                                            {/* телфеон */}
                                            <label htmlFor="phone" className="anketa-label">Телефон:</label>
                                            <Field
                                                autoComplete="tel"
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                className="anketa-input"
                                            />
                                            <ErrorMessage name="phone" component="div" className="anketa-error" /><br />

                                            {/* почта */}
                                            <label htmlFor="email" className="anketa-label">Почта:</label>
                                            <Field
                                                autoComplete="email"
                                                // type="text"
                                                id="email"
                                                name="email"
                                                className="anketa-input"
                                            />
                                            <ErrorMessage name="email" component="div" className="anketa-error" /><br />

                                            <Container
                                                className="d-flex flex-column flex-md-row justify-content-between align-items-center"
                                            >

                                            <div>


                                            {/* Доставка */}
                                            <label className="anketa-label">Доставка:</label><br />
                                            <Field
                                                type="radio"
                                                id="NewPost"
                                                name="delivery"
                                                value="Новая почта"
                                                className="anketa-radio"
                                            />
                                            <label htmlFor="NewPost" className="anketa-radio-label">Новая почта</label><br />

                                            <Field
                                                type="radio"
                                                id="MeestPost"
                                                name="delivery"
                                                value="MeestПочта"
                                                className="anketa-radio"
                                            />
                                            <label htmlFor="MeestPost" className="anketa-radio-label">MeestПочта</label><br />

                                            <Field
                                                type="radio"
                                                id="UkrPost"
                                                name="delivery"
                                                value="UkrPost"
                                                className="anketa-radio"
                                            />
                                            <label htmlFor="UkrPost" className="anketa-radio-label">УкрПочта</label><br />

                                            <ErrorMessage name="delivery" component="div" className="anketa-error" /><br />
                                            </div>

                                            <div>
                                                {/* Оплата */}
                                            <label className="anketa-label">Оплата:</label><br />
                                            <Field
                                                type="radio"
                                                id="cardPay"
                                                name="payment"
                                                value="cardPay"
                                                className="anketa-radio"
                                            />
                                            <label htmlFor="cardPay" className="anketa-radio-label">Наличными или карточкой при получении</label><br />

                                            <Field
                                                type="radio"
                                                id="applePay"
                                                name="payment"
                                                value="applePay"
                                                className="anketa-radio"
                                            />
                                            <label htmlFor="applePay" className="anketa-radio-label">Оплата картой (Apple Pay, Google Pay)</label><br />

                                            <Field
                                                type="radio"
                                                id="fop"
                                                name="payment"
                                                value="fop"
                                                className="anketa-radio"
                                            />
                                            <label htmlFor="fop" className="anketa-radio-label">Оплата на счет (только для ФОП и ТОВ)</label><br />

                                            <ErrorMessage name="payment" component="div" className="anketa-error" /><br />
                                            </div>

                                            </Container>
                                            {/*<Container*/}
                                            {/*    className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3 mb-3 gap-3"*/}
                                            {/*    style={{border:"1px solid red"}}*/}
                                            {/*>*/}

                                            {/*/!* кнопки *!/*/}
                                            {/*<Button*/}
                                            {/*    type="submit"*/}
                                            {/*    disabled={isSubmitting}*/}
                                            {/*    className="anketa-button anketa-button-submit"*/}
                                            {/*>*/}
                                            {/*    {isSubmitting ? 'Отправка...' : 'Отправить'}*/}



                                        </fieldset>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                    </Dialog.Body>



                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm"
                                     bg="gray.100"          // фон кнопки
                                     color="gray.800"       // цвет иконки "крестика"
                                     _hover={{bg: "gray.200"}} // фон при наведении
                        />
                    </Dialog.CloseTrigger>


                    <Container
                        className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-3 gap-3 p-3"
                        style={{maxWidth: "750px"}}
                    >
                        <div>
                            <Button type="reset" form="myForm"
                                    style={{backgroundColor:"rgb(75, 92, 113)"}}
                            >

                                Сбросить
                            </Button>
                        </div>

                        <div>
                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <Button type="submit" form="myForm"
                                            style={{backgroundColor:"rgb(75, 92, 113)"}}
                                    >
                                        Отправить
                                    </Button>
                                </Dialog.Trigger>
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content>
                                            <Dialog.Header>
                                                <Dialog.Title>Заказ оформлен</Dialog.Title>
                                            </Dialog.Header>
                                            <Dialog.Body>
                                                <div>
                                                    Имя: {order.name}<br />
                                                    Фамилия: {order.surname}<br />
                                                    Почта: {order.email}<br />
                                                    Телефон: {order.phone}<br />
                                                    Способ доставки: {order.delivery}<br />
                                                    Способ оплаты: {order.payment}<br />
                                                    <br />
                                                    <h6>Заказ на сумму: {totalPrice} $</h6>
                                                </div>
                                            </Dialog.Body>
                                            <Dialog.CloseTrigger asChild>
                                                <CloseButton size="sm"
                                                             bg="gray.100"          // фон кнопки
                                                             color="gray.800"       // цвет иконки "крестика"
                                                             _hover={{bg: "gray.200"}} // фон при наведении
                                                />
                                            </Dialog.CloseTrigger>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                </Portal>
                            </Dialog.Root>
                        </div>
                    </Container>

                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
);
}

