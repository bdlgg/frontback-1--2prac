import React from 'react';
import ProductItem from './ProductItem';

export default function ProductList({items, onEdit, onDelete}) {
    if (!items.length) {
        return <div className="empty">Товаров пока нет</div>;
    }
    return (
        <div className="list">
            {items.map((i) => (
                <ProductItem key={i.id} item={i} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    )
}