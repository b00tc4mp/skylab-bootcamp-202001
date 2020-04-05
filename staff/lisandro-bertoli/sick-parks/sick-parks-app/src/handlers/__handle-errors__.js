const __handleErrors__ = (error, setError) => {
    setError(error)

    setTimeout(() => {
        setError(null)
    }, 3000)
}

export default __handleErrors__