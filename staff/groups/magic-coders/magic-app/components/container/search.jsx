function Search({title, onSubmit, error}){
    return (
    <Form className="search" onSubmit={onSubmit} >
        <h3 style={{color: 'white'}}>{title}</h3>
        
        <Input name="query" placeholder="" required={false}/>
        {error && <P>{error}</P>}
        <Button>Search</Button>
        
        { error && <Feedback message={error.message} /> }
    </Form>)
}