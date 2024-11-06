const url = 'https://api.github.com/users'
const srcpesc = document.getElementById('src-pes')
const resultado = document.getElementById('res')
let user

srcpesc.addEventListener('click', () => {
    let texto = document.getElementById('iT').value
    user = texto
    teste(user)
})

async function teste(usuario){
    try{
        const res = await fetch(`${url}/${usuario}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
        }).then((resposta) =>{
        return resposta.json()
        })
        console.log(res)
        if(res.status == 404){
            resultado.innerHTML = 'Usuario não encontrado'
        }else{
            resultado.innerHTML = `O nome é ${res.name}<br> E o id é ${res.id}`
        }   
    }catch(err){
        console.log(err)
    }
    
}