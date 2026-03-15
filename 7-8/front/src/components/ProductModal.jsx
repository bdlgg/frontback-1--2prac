import React, {useEffect, useState} from 'react';

export default function ProductModal({open, mode, initialItem, onClose, onSubmit}) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (!open) return;
        setTitle(initialItem?.title ?? "");
        setCategory(initialItem?.category ?? "");
        setDescription(initialItem?.description ?? "");
        setPrice(initialItem?.price != null ? String(initialItem.price) : "");
    }, [open, initialItem]);
    if (!open) return null;
    const modalTitle = mode === 'edit' ? "Редактирование товара" : "Создание товара";
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        const parsedPrice = Number(price)
        if (!trimmedTitle) {
            alert("Введите название товара");
            return;
        }
        if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
            alert("Введите корректную цену");
            return;
        }
        onSubmit({
            id: initialItem?.id,
            title: trimmedTitle,
            category: category.trim(),
            description: description.trim(),
            price: parsedPrice
        });
    };
    return (
        <div className="backdrop" onMouseDown={onClose}>
            <div
                className="modal"
                onMouseDown={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                >
                <div className="modal__header">
                    <div className="modal__title">{modalTitle}</div>
                    <button className="iconBtn" onClick={onClose} aria-label="Закрыть">
                        ✕
                    </button>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="label">
                        Название
                        <input
                            className="input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Например, Ноутбук"
                            autoFocus
                        />
                    </label>
                    <label className="label">
                        Категория
                        <input
                            className="input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="например, Электроника"
                        />
                    </label>
                    <label className="label">
                        Описание
                        <input
                            className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Краткое описание"
                        />
                    </label>
                    <label className="label">
                        Цена
                        <input
                            className="input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0"
                            inputMode="numeric"
                        />
                    </label>
                    <div className="modal__footer">
                        <button type="button" className="btn" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn--primary">
                            {mode === "edit" ? "Сохранить" : "Создать"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}