export default function async() {
    return (async () => {
        try {
            await fetch(`http://192.168.43.27/up`,{
                mode: 'no-cors'
            })
            console.log('moving up')
            
        } catch ({message}) {
            console.log(message)
        }
    })()
}