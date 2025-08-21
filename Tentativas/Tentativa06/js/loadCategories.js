const categorias = JSON.parse(localStorage.getItem('categorias')) || []

// Get all categories
const todasCategorias = document.getElementById('todasCategorias')

const editarCategoriaCard = document.getElementById('editarCategoriaCard')

const selectDeCategorias = document.getElementById('selectDeCategorias')

const cancelarEditCateg = document.getElementById('cancelarEditCateg')

// Edit of categories
export const novaCor = document.getElementById('novaCor')
export const novoNome = document.getElementById('novoNome')

// Filter by categories
const selectCategories = document.getElementById('selectCategories')

// Edit of categories
export const bgEditCateg = document.getElementById('bg-editCateg')
const confirmDelCateg = document.getElementById('confirmDelCateg')
const delCancelado = document.getElementById('delCancelado')
const deletarCateg = document.getElementById('deletarCateg')

// Controls which category will suffer changes
export let idCateg

export function loadCategories(){
    categorias.forEach((categoria)=>{
        // Carrega as categorias no select de filtragem
        let opcao = document.createElement('option')

        opcao.value = categoria.id
        opcao.textContent = categoria.nome

        selectCategories.appendChild(opcao)

        // Carrega as categorias no select da criação de cards
        selectDeCategorias.appendChild(opcao)

        // Carrega as categorias no menu de categorias
        let category = document.createElement('div')
        category.classList = 'categoria'

        let categoriaNome = document.createElement('p')
        categoriaNome.textContent = categoria.nome

        category.appendChild(categoriaNome)

        category.addEventListener('click', ()=>{
            idCateg = categoria.id
            editCateg(categoria.nome, categoria.cor) 
        })

        todasCategorias.appendChild(category)

        // Carrega as categorias na edição de card
        editarCategoriaCard.appendChild(opcao)
    })
}

// Abre a edição da categoria e ja deixa com os valores da categoria nos inputs
function editCateg(nome, cor){
    bgEditCateg.style.display = 'flex'
    novoNome.value = nome
    novaCor.value = cor
}

// Fechar a edição de categoria
bgEditCateg.addEventListener('click', (e)=>{
    if(e.target === bgEditCateg){
        bgEditCateg.style.display = 'none'
        confirmDelCateg.style.display = 'none'
    }
})

// Cancela o deletar de categorias
delCancelado.addEventListener('click', ()=>{
    confirmDelCateg.style.display = 'none'
})

// Abre a confirmação de delete de categorias
deletarCateg.addEventListener('click', ()=>{
    confirmDelCateg.style.display = 'block'
})

// Cancela a edição de categorias
cancelarEditCateg.addEventListener('click', ()=>{
    bgEditCateg.style.display = 'none'
})