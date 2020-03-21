let i = 0
export default async function recursive(code) {
        await fetch(`http://192.168.43.27/${code[i]}`, {
            method: 'GET',
            mode: 'no-cors'
        })
        console.log(`moving ${code[i]}`)

    setTimeout(async () => {
        if (i < code.length - 1) {
            i++
            recursive(code)
        }else{
            await fetch(`http://192.168.43.27/stop`, {
                method: 'GET',
                mode: 'no-cors'
            })
            i = 0
        }
    }, 1000)

}