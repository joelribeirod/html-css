const allElements = document.querySelectorAll('[data-i18n]')

const textsForLanguages = {
    warn1: {
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
    infoConfirmDelCard:{
        br: 'Tem certeza que deseja apagar o Card?',
        us: 'Are you sure that you want to delete this card?'
    },
    confirmDel:{
        br: 'Sim',
        us: 'Yes'
    },
    cancelDel:{
        br: 'Não',
        us: 'No'
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
    infoDefaultCategory: {
        br: 'Todas as categorias',
        us: 'All categories'
    },
    infoCategory: {
        br: 'Categorias',
        us: 'Categories'
    },
    newCategory: {
        br: 'Criar categoria',
        us: 'Create category'
    },
    infoCategoryName: {
        br: 'Nome da categoria',
        us: 'Category name'
    },
    infoCategoryColor: {
        br: 'Cor da categoria',
        us: 'Category color'
    },
    saveNewCategory: {
        br: 'Salvar categoria',
        us: 'Save category'
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
        us: 'This action is irreversible, and all notes with this category will be deleted also. Are you sure you want to continue?'
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

export function loadLanguage(language){
    console.log(language)

    allElements.forEach(el => {
        const eA = el.getAttribute("data-i18n")
        const lang = language

        el.innerHTML = textsForLanguages[eA][lang]
        
    });
    
}

