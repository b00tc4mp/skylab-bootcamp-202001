export default function() {
    return (async () => {
        await fetch(`http://192.168.43.27/left`, {
            mode: 'no-cors'
        })
        console.log('moving left')
    })()
}