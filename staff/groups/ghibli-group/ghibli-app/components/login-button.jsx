function LoginButton ({goToLogin}) {
    return <button className="login" onClick={goToLogin}>
        <span className="login__text">LOGIN</span>
        <div className="line"></div>
    </button>
}