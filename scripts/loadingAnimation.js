/*Animation pour ajouter LOADING au Dom et sa classe CSS puis la retirer*/
//essai document fragment//

const targetAnimation = document.querySelector("#job-result");
let animationContent;
function loadingAnimation() {
    
    animationContent = document.createElement("div");
    animationContent.className = "smoke";

    const fragment = document.createDocumentFragment(); 

    const letters = ["L", "O", "A", "D", "I", "N", "G"];

    letters.forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        fragment.appendChild(span);
    });

    animationContent.appendChild(fragment);
    targetAnimation.appendChild(animationContent); 
}


function removeAnimation() {
    targetAnimation.removeChild(animationContent); 
}