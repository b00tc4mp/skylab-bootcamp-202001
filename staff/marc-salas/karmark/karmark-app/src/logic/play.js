let i = 0
export default async function recursive(code) {
        await fetch(`http://192.168.43.27/${code[i]}`, {
            mode: 'no-cors'
        })
        console.log(`moving ${code[i]}`)

    setTimeout(() => {
        if (i < code.length - 1) {
            i++
            recursive(code)
        }else{
            i = 0
        }
    }, 1000)

}