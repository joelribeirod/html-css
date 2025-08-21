// Resgatar borda para animação
const animatedBorder = document.getElementById('animatedBorder')

export function loadBorderAnimation(){
    const holderHeigth = holder.offsetHeight - 10
    const holderWidth = holder.offsetWidth - 10

    animatedBorder.animate(
        [
            {transform: `translateX(${holderWidth}px)`},
            {transform: `translateY(${holderHeigth}px)`},
            {transform: `translateX(-${holderWidth}px)`},
            {transform: `translateY(-${holderHeigth}px)`},
            {transform: `translateX(${holderWidth}px)`}
        ],
        {
            duration: 5000,
            iterations: Infinity
        }
    )
}