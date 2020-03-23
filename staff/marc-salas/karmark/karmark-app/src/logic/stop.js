export default function() {
    return (async () => {
        await fetch(`http://192.168.43.236/stop`, {
            method: 'GET',
            mode: 'no-cors'
        })
        console.log('STOP')
    })()
}