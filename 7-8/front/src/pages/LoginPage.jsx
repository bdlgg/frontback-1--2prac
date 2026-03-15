import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {authApi, tokenStorage} from "../api/client.js";
export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email.trim() || !form.password.trim()) {
            alert("Заполните email и пароль");
            return;
        }
        try {
            setLoading(true);
            const data = await authApi.login({
                email: form.email.trim(),
                password: form.password
            });
            tokenStorage.setTokens(data.accessToken, data.refreshToken);
            navigate("/products");
        }
        catch (error) {
            console.error(error);
            alert(error?.response?.data?.error || "Ошибка входа");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="authPage">
            <div className="authCard">
                <h1 className="authTitle">Вход</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="label">
                        Email
                        <input
                            className="input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="user@example.com"
                        />
                    </label>
                    <label className="label">
                        Пароль
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                    </label>
                    <button className="btn btn--primary btn--full" disabled={loading}>
                        {loading ? "Входим..." : "Войти"}
                    </button>
                </form>
                <p className="authText">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    );
}