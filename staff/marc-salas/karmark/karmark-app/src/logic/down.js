export default function() {
    return (async () => {
        await fetch(`http://192.168.43.236/down`, {
            method: 'GET',
            mode: 'no-cors'
        })
        console.log('moving down')
    })()
}