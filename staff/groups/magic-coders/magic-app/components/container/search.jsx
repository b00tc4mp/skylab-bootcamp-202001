function Search({title, onSubmit, error, search}){
    const {name} = search
    return (
    <Form className="search" onSubmit={onSubmit} >

        <h4>Search Card</h4>

        <Input name="query" placeholder="" required={false} defaultValue={name ? name: ''}/>
        {error && <P>{error}</P>}
        <Button className="button--pressed">Search</Button>
        
        { error && <Feedback message={error.message} /> }
    </Form>)
}