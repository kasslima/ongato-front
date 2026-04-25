'use client'
export default function LoginForm(){
    return (
        <div>
            <form>
                <input placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <button>Entrar</button>
            </form>
        </div>
    )
}