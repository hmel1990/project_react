import {CloseButton, Button, Dialog, Portal} from "@chakra-ui/react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useEffect, useState, useActionState } from "react";
import {useNavigate} from "react-router-dom";
import './Admin.css'
import FormState from "./FormClas_FormState.jsx"
import AdminUploadForm from './AdminUploadForm.jsx';

// схема валидации с помощью Yup
const validationSchema = Yup.object({
    login: Yup.string()
        .min(3, 'Логин должен содержать минимум 3 символа')
        .required('Логин обязателен'),
    password: Yup.string()
        .min(3, 'Пароль должен содержать минимум 3 символа')
        .required('Пароль обязателен'),
});


export default function Admin ()
{
    const addBikesUrl = 'http://hmel.myartsonline.com/dotnet/php/upload.php';
    const initialState = new FormState();


    const [state, formAction, isPending] = useActionState(
        async (_prevState, formData) => {
            try {

            // собираем все поля формы в обычный объект
            const entries = Object.fromEntries(formData.entries());


                const response = await fetch(addBikesUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(entries)
                });

            if (response.ok) {
                // логируем статус ответа и все отправленные данные
                console.log('статус ответа:', response.status);
                console.log('отправленные данные:', entries);
            } else {
                // throw new Error('Ошибка сервера: ' + response.status);
            }

            alert('Данные успешно отправлены!');
            // возвращаем сброшенное состояние после успешной отправки
            return new FormState();

        } catch (error) {
            alert('Произошла ошибка при отправке данных. ' + error.message);
            const entries = Object.fromEntries(formData.entries());
            return new FormState({ ..._prevState.getAllFields(), ...entries });
        }
        },
        initialState
    );

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {

        try {
            if (values.login === 'hmel' && values.password === '123') {
                setIsOpen(false)
            }
            else {
                alert('Введены неверные логин или пароль')
            }

        } catch (error) {
            alert('Произошла ошибка при отправке данных. ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(true)
        return () => {

        };
    }, []);

    return (
        <>
        <div>
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Введите логин и пароль</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <div className="anketa-container">
                                    <Formik
                                        initialValues = {{
                                        login: '',
                                        password: '',
                                    }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting, setFieldValue, Values, resetForm }) => (
                                            <Form id="adminForm">
                                                <fieldset className="anketa-fieldset">

                                                    {/* имя */}
                                                    <label htmlFor="login" className="anketa-label">Имя:</label>
                                                    <Field
                                                        autoComplete="username"
                                                        type="text"
                                                        id="login"
                                                        name="login"
                                                        className="anketa-input"
                                                    />
                                                    <ErrorMessage name="login" component="div" className="anketa-error" /><br />

                                                    {/* фамилия */}
                                                    <label htmlFor="password" className="anketa-label">Пароль:</label>
                                                    <Field
                                                        autoComplete="family-name"
                                                        type="text"
                                                        id="password"
                                                        name="password"
                                                        className="anketa-input"
                                                    />
                                                    <ErrorMessage name="password" component="div" className="anketa-error" /><br />
                                                </fieldset>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button onClick={() => navigate(`/main`)}>На главную</Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    type="submit" form="adminForm"
                                    >Принять</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </div>
            <div>
                <AdminUploadForm formAction={formAction} state={state} isPending={isPending} />
            </div>
        </>
    )
}