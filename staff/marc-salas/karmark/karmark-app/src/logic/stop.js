export default function() {
    return (async () => {
        await fetch(`http://192.168.43.27/stop`, {
            method: 'POST'
        })
        console.log('STOP')
    })()
}