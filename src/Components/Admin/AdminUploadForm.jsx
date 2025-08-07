// AdminUploadForm.jsx
import { Button } from "@chakra-ui/react";

export default function AdminUploadForm({ formAction, state, isPending }) {
    return (
        <form id="adminFormForUpload" action={formAction}>
            <div className="header_text_form_wrapper">
                <div className="header_text_form">Добавление нового продукта в базу</div>
            </div>
            <div className="form_wrapper form_wrapper_upload">
                <label htmlFor="category">category:</label>
                <input type="text" id="category" name="category" defaultValue={state.getField('category')} size="50" required pattern="^[A-Za-z\\s]+$" />
                <label htmlFor="name">name:</label>
                <input type="text" id="name" name="name" defaultValue={state.getField('name')} size="50" required pattern="^[A-Za-z0-9s.-]+$" />
                <label htmlFor="frame">frame:</label>
                <input type="text" id="frame" name="frame" defaultValue={state.getField('frame')} size="50" required pattern="^[A-Za-z\\s]+$" />
                <label htmlFor="tyres">tyres:</label>
                <input type="text" id="tyres" name="tyres" defaultValue={state.getField('tyres')} size="50" required pattern="^[A-Za-z\\s]+$" />
                <label htmlFor="deraileurFront">deraileurFront:</label>
                <input type="text" id="deraileurFront" name="deraileurFront" defaultValue={state.getField('deraileurFront')} size="50" required pattern="^[A-Za-z0-9s.-]+$" />
                <label htmlFor="deraileurRear">deraileurRear:</label>
                <input type="text" id="deraileurRear" name="deraileurRear" defaultValue={state.getField('deraileurRear')} size="50" required pattern="^[A-Za-z0-9s.-]+$" />
                <label htmlFor="saddle">saddle:</label>
                <input type="text" id="saddle" name="saddle" defaultValue={state.getField('saddle')} size="50" required pattern="^[A-Za-z0-9s.-]+$" />
                <label htmlFor="shifters">shifters:</label>
                <input type="text" id="shifters" name="shifters" defaultValue={state.getField('shifters')} size="50" required pattern="^[A-Za-z0-9s.-]+$" />
                <label htmlFor="price">price:</label>
                <input type="number" id="price" name="price" defaultValue={state.getField('price')} size="50" required min="0" step="0.01" title="Введите цену (например: 99.99)" />
                <label htmlFor="color">color:</label>
                <input type="text" id="color" name="color" defaultValue={state.getField('color')} size="50" required pattern="^[A-Za-z\\s]+$" />

                <div className="submitButton_wrapper">
                    <Button type="submit" id="submitButtonForUpload" disabled={isPending}>Отправить</Button>
                    <Button type="button" id="exitButtonForUpload" onClick={() => formAction(new FormData())}>Выход</Button>
                </div>
            </div>
        </form>
    );
}
