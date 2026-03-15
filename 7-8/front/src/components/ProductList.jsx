import React from "react";
import ProductItem from "./ProductItem.jsx";

export default function ProductList({items, onEdit, onDelete, onView}) {
    if (!items.length) {
        return <div className="empty">Товаров пока нет</div>
    }
    return (
        <div className="list">
            {items.map((item) => (
                <ProductItem
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView} />
            ))}
        </div>
    );
}