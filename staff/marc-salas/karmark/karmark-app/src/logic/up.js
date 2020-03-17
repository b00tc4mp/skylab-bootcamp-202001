export default function async() {
    return (async () => {
        const response = await fetch(`http://192.168.43.27/up`, {
            method: 'POST'
        })
        console.log('moving up')
    })()
}