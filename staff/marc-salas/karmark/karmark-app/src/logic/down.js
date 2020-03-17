export default function() {
    return (async () => {
        await fetch(`http://192.168.43.27/down`, {
            method: 'POST'
        })
        console.log('moving down')
    })()
}