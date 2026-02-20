import React, {useState, useEffect} from "react";
import "./ProductsPage.scss";
import ProductsList from "../../components/ProductList.jsx";
import ProductModal from "../../components/ProductModal.jsx";
import {api} from "../../api";
export default function ProductsPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // create || edit
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await api.getItems();
            setItems(data);
        } catch (err) {
            console.error(err);
            alert("Ошибка загрузки товаров");
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setModalMode("create");
        setEditingItem(null);
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setModalMode("edit");
        setEditingItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Удалить товар?");
        if (!ok) return;
        try {
            await api.deleteItem(id);
            setItems((prev) => prev.filter((i) => i.id !== id));
        } catch (err) {
            console.error(err);
            alert("Ошибка удаления товара");
        }
    };

    const handleSubmitModal = async (payload) => {
        try {
            if (modalMode === "create") {
                const newItem = await api.createItem(payload);
                setItems((prev) => [...prev, newItem]);
            } else{
                const updatedItem = await api.updateItem(payload.id, payload);
                setItems((prev) => prev.map((p) => (p.id === payload.id) ? updatedItem : p));
            }
            closeModal();
        } catch (err) {
            console.error(err);
            alert("Ошибка сохранения товара");
        }
    };
    return (
        <div className="page">
            <header className="header">
                <div className="header__inner">
                    <div className="brand">ReZone Store</div>
                    <div className="header__right">React + Express</div>
                </div>
            </header>
            <main className="main">
                <div className="container">
                    <div className="toolbar">
                        <h1 className="title">Товары</h1>
                        <button className="btn btn--primary" onClick={openCreate}>
                            + Создать
                        </button>
                    </div>
                    {loading ? (
                        <div className="empty">Загрузка...</div>
                    ) : (
                        <ProductsList items={items} onEdit={openEdit} onDelete={handleDelete} />
                    )}
                </div>
            </main>
            <footer className="footer">
                <div className="footer__inner">©{new Date().getFullYear()} ReZone Store</div>
            </footer>
            <ProductModal
                open={modalOpen}
                mode={modalMode}
                initialItem={editingItem}
                onClose={closeModal}
                onSubmit={handleSubmitModal}
            />
        </div>
    )
}
