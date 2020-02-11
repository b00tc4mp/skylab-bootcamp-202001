function Search({title, onSubmit, error}){

    return (
    <Form className="search" onSubmit={onSubmit} >
        <h3 style={{color: 'white'}}>{title}</h3>
        {error && <P>{error}</P>}
        <Input name="query" placeholder="" required={false}/>
        <Button>Search</Button>
    </Form>)
}