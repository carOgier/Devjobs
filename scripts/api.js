/*Tous les appels API sans les fonctions qui vont gérer le résultat */
/*si j'ai le temps
    ajouter .then .catch etc ... 
    chercher cas d'erreurs  
*/


let offset = 0;
const limit = 12;
let loadedCount = 0;
const urlAPI = "https://bla.org";




//get all offers//
async function getOffers(offset, onSuccess, onError) {

    const response = await fetch ( urlAPI + `/api/jobs?offset=${offset}&limit=${limit}`, {
        method:"GET"
    });
    loadingAnimation();
    if(response.ok) {
        removeAnimation();
        const object = await response.json();
        onSuccess(object);
        loadedCount += object.jobs.length;

        //si il en reste 0 on peut pas savoir actuellement//
        if ( object.jobs.length < limit || loadedCount === object.total) {
            //console.log("plus rien à afficher en +");
            disablebtnLoad();
        } else {
            //console.log("we can load more");
        }
        
    } else {
        onError(response.status);
    }
}


//get one offer//
async function oneOffer(id, onSuccess, onError) {
    const response = await fetch (urlAPI + `/api/job/${id}`, {
        method:"GET"
    });
    loadingAnimation();
    if(response.ok) {
        removeAnimation();
        const object = await response.json();
        onSuccess(object);
        //console.log(object);
        
    } else {
        onError(response.status);
    }
}


//search offers//
async function searchOffers(text, location, fulltime, offset, limit, onSuccess, onError) {
    const isFulltime = Number(fulltime.checked);

    const response = await fetch (urlAPI + `/api/jobs/search?text=${text}&location=${location}&fulltime=${isFulltime}&offset=${offset}&limit=${limit}`, {
        method:"GET"
    });
    loadingAnimation();
    if(response.ok) {
        removeAnimation();
        const object = await response.json();
        onSuccess(object);
        loadedCount += object.jobs.length;
        
        //j'ai besoin de savoir si object.total est atteint ou pas //
        if ( object.jobs.length < limit || loadedCount === object.total) {
            //console.log("plus rien à afficher en +");
            disablebtnLoad();
        } else {
            //console.log("we can load more");
            activatebtnLoad();
        } 
    } else {
        onError(response.status);
    }
}

