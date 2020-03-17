export default function() {
    return (async () => {
        await fetch(`http://192.168.43.27/right`, {
            method: 'POST'
        })
        console.log('moving right')
    })()
}