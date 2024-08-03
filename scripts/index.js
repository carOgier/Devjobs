/*Fichier dédié à index avec gestion de la réponse et création du dom */
const listJobs = document.querySelector("#job-list");

/************************API CALL*************************/

/*Appel API au load get all offers */
function loadAllOffers(offset){
    getOffers(
        offset,
        function(object) {
            object.jobs.forEach( jobs => {
                addJobs(jobs.company, 
                    jobs.contract, 
                    jobs.id, 
                    jobs.location,
                    jobs.logo, 
                    jobs.logoBackground, 
                    jobs.position, 
                    jobs.postedAt);
            });
        },
        function(status){
            console.log("errror on error" + status);
        }
    );
}
addEventListener("load", loadAllOffers);



/*Appel API pour la recherche */
let searchFiltersActive = false;
function searchForm(offset) {
    
    const text = document.querySelector(".input-title").value;
    const jobLocation = document.querySelector(".input-location").value;
    const fulltime = document.querySelector(".fulltime-checkbox");

    searchOffers(
        text,
        jobLocation,
        fulltime,
        offset,
        limit,
        function(object) {
            object.jobs.forEach( jobs => {
                addJobs(jobs.company, 
                    jobs.contract, 
                    jobs.id, 
                    jobs.location,
                    jobs.logo, 
                    jobs.logoBackground, 
                    jobs.position, 
                    jobs.postedAt);
            });
            searchFiltersActive = true;
        },
        function(status){
            console.log("errror on error" + status);
        }
    );

}

/*Au submit du form on empêche l'event, on vide la liste et on lance la recherche*/
const form = document.querySelector("#search-form-content");
form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    
    //listJobs.innerHTML = "";
    //listJobs.textContent = "";
    while(listJobs.firstChild){
        listJobs.removeChild(listJobs.firstChild);
    }
    offset = 0;
    loadedCount = 0;
    searchForm();

});



/************************GENERATION DANS LE DOM*************************/

/*Génération dans le DOM des cartes pour les jobs */

function addJobs(company, contract, id, location, logo, logoBackground, position, ts){
    
    const template = document.querySelector("#job-template");
    const clone = template.content.cloneNode(true);
    const post = postedAt(ts);
        
    const link = clone.querySelector("#job-link");
        
    link.href= "details.html?id=" + id;
            
    const h2 = clone.querySelector("h2");
    h2.textContent = position
        
    const logoCompany = clone.querySelector("img");
    logoCompany.src = urlAPI + logo;
    logoCompany.style.backgroundColor = logoBackground;

    const tsContract = clone.querySelector(".ts-contract-data");
    tsContract.textContent = post + " \u2022\ " + contract; 
        
    const companyName = clone.querySelector(".company");
    companyName.textContent = company;
        
    const country = clone.querySelector(".card-location");
    country.textContent = location;
       
    listJobs.append(clone);
}



/************************BUTTONS*************************/

/*Bouton load more qui regarde si search filter is true or false pour savoir s'il doit get all offers ou search offers 
focus décalé à la dernière carte existante avant la génération des suivantes*/
document.querySelector("#load-more").addEventListener("click", loadMore);
function loadMore() {
    offset += 12;
    
    if (searchFiltersActive) {
        searchForm(offset);
    } else {
      loadAllOffers(offset);  
    }

    const jobFocus = document.querySelectorAll(".link-job-title");
    const nthJobCard = jobFocus[offset - 1];
    if (nthJobCard) {
        nthJobCard.focus();
    }

};




let disablebtn = document.querySelector(".load-more-button"); 
const noMore = document.querySelector(".no-more");     
/*fonction pour disable le bouton*/
function disablebtnLoad() {

    disablebtn.disabled = true;
    disablebtn.hidden = true;
    noMore.textContent = "No more offers";
    
}



/*reactiver le bouton*/
function activatebtnLoad(){
    disablebtn.disabled = false;
    disablebtn.hidden = false;
    noMore.textContent = "";
}





/*Gestion de la modale faite maison quand on est en mobile pour le reste du form 
-> reprise du burger menu de Coffee Roasters*/

const filterForm = document.querySelector("#filter-form");
const overlay = document.querySelector("#overlay");
const modalForm = document.querySelector("#modal-form");


function modalEvent() {
    const open = JSON.parse(filterForm.getAttribute('aria-expanded'));
    filterForm.setAttribute('aria-expanded', !open);
    overlay.hidden = !overlay.hidden;
    modalForm.hidden = !modalForm.hidden;
    if(open){
        modalForm.setAttribute('aria-label', 'Close menu');
    } else {
        modalForm.setAttribute('aria-label', 'Open menu'); 
        const firstFocusableElement = modalForm.querySelector('.input-location');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    }
    
}

filterForm.addEventListener("click", modalEvent);
overlay.addEventListener("click", modalEvent);
modalForm.addEventListener("click", modalEvent);
