import React from "react";

export default function ProductItem({ item, onEdit, onDelete }) {
    return (
        <div className="userRow">
            <div className="userMain">
                <div className="userId">#{item.id}</div>
                <div className="userName">{item.name}</div>
                <div className="userAge">{item.category} | {item.price} ₽</div>
                <div className="userAge" style={{fontSize: '0.9em', opacity: 0.7}}>На складе: {item.stock} шт.</div>
            </div>
            <div className="userActions">
                <button className="btn" onClick={() => onEdit(item)}>
                    Редактировать
                </button>
                <button className="btn btn--danger" onClick={() => onDelete(item.id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
}