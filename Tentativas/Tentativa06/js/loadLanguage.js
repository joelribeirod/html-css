// Main warn
const aviso = document.getElementById('aviso')

// Editing a card
const infoNewSummary = document.getElementById('infoNewSummary')
const infoNewCategory = document.getElementById('infoNewCategory')
const infoNoCategory1 = document.getElementById('infoNoCategory1')
const infoNewDescription = document.getElementById('infoNewDescription')
const cancel = document.getElementById('cancel')
const sendEdit = document.getElementById('sendEdit')

// Deleting a card
const infoConfirmDelCard = document.getElementById('infoConfirmDelCard')
const confirmDel = document.getElementById('confirmDel')
const cancelDel = document.getElementById('cancelDel')

// Creating a new card
const infoCreateSummary = document.getElementById('infoCreateSummary')
const infoChooseCategory = document.getElementById('infoChooseCategory')
const infoNoCategory2 = document.getElementById('infoNoCategory2')
const infoCreateDescription = document.getElementById('infoCreateDescription')
const sendNote = document.getElementById('sendNote')

// Creating a new category
const infoCategoryName = document.getElementById('infoCategoryName')
const infoCategoryColor = document.getElementById('infoCategoryColor')
const saveNewCategory = document.getElementById('saveNewCategory')

// Default category for the filter
const infoDefaultCategory = document.getElementById('infoDefaultCategory')

// Controls for the div where the user creates a new category
const infoCategory = document.getElementById('infoCategory')
const newCategory = document.getElementById('newCategory')

// Editing a category
const infoEditValue = document.getElementById('infoEditValue')
const infoNewCategName = document.getElementById('infoNewCategName')
const infoNewCategColor = document.getElementById('infoNewCategColor')
const salvarEditCateg = document.getElementById('salvarEditCateg')
const cancelarEditCateg = document.getElementById('cancelarEditCateg')

// Deleting a category
const infoDelCateg = document.getElementById('infoDelCateg')
const deletarCateg = document.getElementById('deletarCateg')
const infoWarnForDelCateg = document.getElementById('infoWarnForDelCateg')
const delConfirmado = document.getElementById('delConfirmado')
const delCancelado = document.getElementById('delCancelado')

// Warn 2
const infoWarn2 = document.getElementById('infoWarn2')
const infoWarn2ForMobile = document.getElementById('infoWarn2ForMobile')

const textsForLanguages = {
    aviso: {
        br: 'Sua anotações ficaram salvas mesmo ao sair',
        us: 'Your notes remain even after you leave the site'
    },
    infoNewSummary: {
        br: 'Qual é o novo resumo?',
        us: 'What&#39s the new summary?'
    },
    infoNewCategory: {
        br: 'Qual é a nova categoria?',
        us: 'What&#39s the new category?'
    },
    infoNoCategory1: {
        br: 'Sem categoria',
        us: 'No category'
    },
    infoNewDescription: {
        br: 'Qual é a nova descrição?',
        us: 'What&#39s the new description?'
    },
    cancel: {
        br: 'Cancelar',
        us: 'Cancel'
    },
    sendEdit: {
        br: 'Concluir',
        us: 'Finish'
    },
    infoCreateSummary: {
        br: 'Escreva o resumo do FlashCard',
        us: 'Write the FlashCard summary'
    },
    infoChooseCategory: {
        br: 'Escolha uma categoria',
        us: 'Choose a category'
    },
    infoNoCategory2: {
        br: 'Sem categoria',
        us: 'No category'
    },
    infoCreateDescription: {
        br: 'Escreva a descrição do FlashCard',
        us: 'Write the FlashCard Description'
    },
    sendNote: {
        br: 'Criar FlashCard',
        us: 'Create FlashCard'
    },
    infoCategory: {
        br: 'Categorias',
        us: 'Categories'
    },
    newCategory: {
        br: 'Criar categoria',
        us: 'Create category'
    },
    infoEditValue: {
        br: 'Editar Valores',
        us: 'Edit Values'
    },
    infoNewCategName: {
        br: 'Novo nome',
        us: 'New name'
    },
    infoNewCategColor: {
        br: 'Nova cor',
        us: 'New color'
    },
    salvarEditCateg: {
        br: 'Salvar Edição',
        us: 'Save edit'
    },
    cancelarEditCateg: {
        br: 'Cancelar edição',
        us: 'Cancel edit'
    },
    infoDelCateg: {
        br: 'Deletar a categoria',
        us: 'Delete the category'
    },
    deletarCateg: {
        br: 'Deletar Categoria',
        us: 'Delete category'
    },
    infoWarnForDelCateg: {
        br: 'Essa ação é irreversível, e todas as anotações que possuem essa categoria também serão deletas. Tem certeza de que quer prosseguir?',
        us: 'This action is irreversible, and all notes with this category will be deleted also. Are you sure that you want to continue?'
    },
    delConfirmado: {
        br: 'Prosseguir',
        us: 'Continue'
    },
    delCancelado: {
        br: 'Cancelar',
        us: 'Cancel'
    }, 
    infoWarn2: {
        br: 'Esse site se baseia no armazenamento através do localstorage, resumidamente, isso significa que as informações ficam armazenadas no seu navegador, no seu dispostivo e caso o navegador tenha as informações desse site deletadas, isso significa que suas anotações também serão perdidas no processo.',
        us: 'This site is based on a feature called localStorage, it means that every information on this site will be storaged on your browser, on your device. And if your browser delete the informations of our site, your notes/categories will be deleted also'
    },
    infoWarn2ForMobile: {
        br: 'Esse site se baseia no armazenamento através do localstorage, resumidamente, isso significa que as informações ficam armazenadas no seu navegador, no seu dispostivo e caso o navegador tenha as informações desse site deletadas, isso significa que suas anotações também serão perdidas no processo.',
        us: 'This site is based on a feature called localStorage, it means that every information on this site will be storaged on your browser, on your device. And if your browser delete the informations of our site, your notes/categories will be deleted also'
    },
}

export function loadLanguage(){
    const textoAviso = document.getElementById('textoAviso')
    console.log(textsForLanguages.aviso['us'])
}

