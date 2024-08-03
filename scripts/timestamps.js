/*Fonction de calcul du timestamp*/

/*Récupération d'une fonction de calcul du projet touiteur et modification, 
le double calcul était long et illisible mais tous ces chiffres ne sont pas optimisé*/
/*Si j'ai le temps regarder une autre facon de gérer les timestamps*/

function postedAt(tsJob) {

    const currentTimestamp = Date.now();
    const timeElapsed = currentTimestamp - tsJob;
    
    //const essai = new Date(difference);
    //console.log(essai.getMonth(), essai.getDay(), essai.getHours(), essai.getMinutes());

    //Débuggage anti-moi//
    if (timeElapsed < 0 ) {
        return ('Dans le futur');
    }
    
    const sDiff = Math.floor(timeElapsed / 1000);
    const minDiff = Math.floor(timeElapsed / (1000 * 60));
    const hDiff = Math.floor(timeElapsed / (1000 * 60 * 60));
    const dDiff = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
    const wDiff = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 7));
    const moDiff = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 7 * 4.354));
    const yDiff = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 7 * 4.354 * 12));
    //4.354 pour faire environ en comptant les mois à 30, 28/29 et 31j//
    //Math floor parce que si 28h je préfère dire 1j que 2, arrondie du dessous//
    
    
    if (yDiff > 0){
        return ( yDiff+ 'y ago');
    } else if (moDiff > 0) {
        return (moDiff + 'mo ago');
    } else if (wDiff > 0){
        return (wDiff + 'w ago');
    } else if (dDiff > 0) {
        return (dDiff + 'd ago');
    } else if (hDiff > 0 ) {
        return (hDiff + 'h ago');
    } else if (minDiff > 0 ) {
        return (minDiff + 'min ago');
    } else {
        return ( sDiff + 'sec ago');
    }
}
