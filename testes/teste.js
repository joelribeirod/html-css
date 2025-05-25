let level = 100
// let battleRequire

//     battleRequire = (level-1)*2+1 
//     x = (x-1)*2+1 

// Esse codigo calcula quantas batalhas serão necessarias para subir o level

function totBattles(n){
    if(n <= 0){
        return 0
    }

    return (n-1)*2+1 + totBattles(n-1)
}

console.log(totBattles(level))

// let totBattlessss = 0
// for (let c = 1; c <= level; c++){
//     let battleRequired

//     battleRequired = (c-1)*2+1 

//     totBattlessss += battleRequired
// }

// console.log(totBattlessss)