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
    // I'm not that proud of how this code look, but when i tried to use 1 option for 3 different selects, it went wrong. Apparentetly, you can't create 1 element and append it for many differents elements 
    categorias.forEach((categoria)=>{
        // Carrega as categorias no select de filtragem
        let optionForFilter = document.createElement('option')
        let optionForCreatingCards = document.createElement('option')
        let optionForEditingCategories = document.createElement('option')

        optionForFilter.value = categoria.id
        optionForFilter.textContent = categoria.nome
        optionForCreatingCards.value = categoria.id
        optionForCreatingCards.textContent = categoria.nome
        optionForEditingCategories.value = categoria.id
        optionForEditingCategories.textContent = categoria.nome
        
        // Creating the category that will appear on edit category's menu
        let category = document.createElement('div')
        category.classList = 'categoria'

        let categoriaNome = document.createElement('p')
        categoriaNome.textContent = categoria.nome

        category.appendChild(categoriaNome)

        category.addEventListener('click', ()=>{
            idCateg = categoria.id
            editCateg(categoria.nome, categoria.cor) 
        })

        // Filter by categories
        selectCategories.appendChild(optionForFilter)

        // Selecting a category to edit
        todasCategorias.appendChild(category)

        // Carrega as categorias na edição de card
        editarCategoriaCard.appendChild(optionForEditingCategories)

        // Carrega as categorias no select da criação de cards
        selectDeCategorias.appendChild(optionForCreatingCards)
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