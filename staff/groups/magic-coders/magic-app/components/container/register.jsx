function Register ({onSubmit, handleGoToLogin, error}) {

    return <Form className="register" onSubmit={onSubmit} >
        <H2>Sign-up</H2>
        <Input name="name" placeholder="Name" required/>
        <Input name="surname" placeholder="Surname" required/>
        <Input name="phone" placeholder="Phone" />
        <Input name="email" placeholder="Email" type="email" required/>
        <Input name="username" placeholder="Username" required/>
        <Input name="password" placeholder="password" type="Password" required/>
        <Button>Register</Button>
        {error && <P>{error}</P>}
        <A onClick={handleGoToLogin}>Login</A>
    </Form>
}
