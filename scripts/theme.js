/*Fichier dédié à la gestion du thème light and dark*/

const toggle = document.querySelector('#toggle-switch');
const body = document.body;




/*Je regarde s'il y a un theme de stocké 
    - si oui on l'applique et on ajoute le .class necessaire et on change le toggle 
    - si non on regarde les préférences, selon les préférences le scss ajoutera un mixin différent */
function themePreference() {
    const themeStorage = localStorage.getItem('theme');
    
    if (themeStorage === 'light') {
        body.classList.add('light'); 
        toggle.checked = false;
    } else if (themeStorage === 'dark') {
        body.classList.add('dark'); 
        toggle.checked = true;
    } else {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            toggle.checked = false;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggle.checked = true;
        }
    }
}
document.addEventListener("DOMContentLoaded", themePreference);



/*Cas d'erreur 1 : si on touche au prefer color scheme sans reload, sans avoir touché au toggle. 
    solution : on revérifie theme preference() si le prefer color scheme change cependant cela sera inutile à partir du moment ou local storage ne sera pas vide*/
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    themePreference();
});




/* Cas d'erreur 2 : si on utilise la flèche pour faire back à partir de la page détail à cause du cache.
    solution : add event listener si pageshow on revérifie theme preference */

addEventListener("pageshow", themePreference);




/* Puis si on touche au bouton toggle, on change le local storage, .classe et donc de mixin */
function toggleTheme () {
    if (toggle.checked) {
        body.classList.add('dark'); 
        body.classList.remove('light'); 
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light'); 
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};    
toggle.addEventListener('click', toggleTheme); 


    



