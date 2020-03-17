export default function() {
    return (async () => {
        await fetch(`http://192.168.43.27/left`, {
            method: 'POST'
        })
        console.log('moving left')
    })()
}