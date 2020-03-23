export default function async() {
    return (async () => {
        try {
            await fetch(`http://192.168.43.236/up`,{
                method: 'GET',
                mode: 'no-cors'
            })
            console.log('moving up')
            
        } catch ({message}) {
            console.log(message)
        }
    })()
}