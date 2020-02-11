function Register ({onSubmit, handleGoToLogin, error}) {

    return <Form className="register" onSubmit={onSubmit} >
        <img src="../logo.png" alt=""/>
        <Input name="name" placeholder="Name" />
        <Input name="surname" placeholder="Surname" />
        <Input name="phone" placeholder="Phone" required={false} />
        <Input name="email" placeholder="Email" type="email" />
        <Input name="username" placeholder="Username" />
        <Input name="password" placeholder="password" type="Password" />
        <Button>Register</Button>
        {error && <P>{error}</P>}
        <A onClick={handleGoToLogin}>Login</A>
    </Form>
}
