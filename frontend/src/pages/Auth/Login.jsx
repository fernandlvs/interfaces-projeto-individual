import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    email,
                    senha,
                }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/admin/agendamentos");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.mensagem ||
                error.message ||
                "Erro no login"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>

                <div className="login-icon">✨</div>

                <h1>Painel Administrativo</h1>
                <p>Acesse o painel de gerenciamento</p>

                {/* EMAIL */}
                <div className="label-row">
                    <label>Email</label>
                </div>
                <input
                    className="input"
                    type="email"
                    placeholder="admin@naildesign.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* SENHA */}
                <div className="label-row">
                    <label>Senha</label>
                    <span className="forgot">Esqueceu a senha?</span>
                </div>

                <div className="password-wrapper">
                    <input
                        className="input"
                        type={showSenha ? "text" : "password"}
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <span onClick={() => setShowSenha(!showSenha)} className="eye-icon">
                        {showSenha ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}