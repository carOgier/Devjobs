/*Fichier dédié à details avec gestion de la réponse et création du dom */

/*Récupération de mon paramètre id dans l'url*/
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');



/************************API CALL*************************/
/*Appel API pour get one offer */
function getDetailOffer() {
    oneOffer(
        id,
        function(object) {
            addJob(object.apply, 
                object.company, 
                object.contract, 
                object.description, 
                object.id, 
                object.location, 
                object.logo, 
                object.logoBackground, 
                object.position, 
                object.postedAt, 
                object.requirements, 
                object.role, 
                object.website );
        },
        function(status){
            console.log("errror on error" + status);
        }
    );
}
addEventListener("load", getDetailOffer);



/************************GENERATION DANS LE DOM*************************/
/*Génération de la page détail approprié avec un clone de template 
pour l'instant une fonction de génération pour header main et footer*/
function addJob(apply, company, contract, description, id, location, logo, logoBackground, position, tsJob, requirements, role, website ){
    
    const header = document.querySelector("#job-header");
    const headerTemplate = document.querySelector("#job-header-template");
    const headerClone = headerTemplate.content.cloneNode(true);

    const companyName = headerClone.querySelector(".position");
    companyName.textContent = company;

    const logoCompany = headerClone.querySelector("img");
    logoCompany.src = urlAPI + logo;
    logoCompany.style.backgroundColor = logoBackground;

    const site = headerClone.querySelector(".website");
    site.textContent = company + ".com";

    const companySite = headerClone.querySelector(".company-site");
    companySite.href = website;

    header.append(headerClone);







    const detailJob = document.querySelector("#job-detail");
    const mainTemplate = document.querySelector("#job-detail-template");
    const mainClone = mainTemplate.content.cloneNode(true);
    const post = postedAt(tsJob);
    
    const tsContract = mainClone.querySelector(".ts-contract-data");
    tsContract.textContent = post + " \u2022\ " + contract;

    const h2 = mainClone.querySelector("h2");
    h2.textContent = position

    const country = mainClone.querySelector(".card-location");
    country.textContent = location;


    const applyNow = mainClone.querySelector(".fake-btn");
    applyNow.href = apply;


    const dcription = mainClone.querySelector(".description");
    dcription.textContent = description;

    const requirementsContent = mainClone.querySelector(".requirements-content");
    requirementsContent.textContent = requirements.content;

    /*Génération de chaque item des listes car j'ignore combien à l'avance*/
    const ul = mainClone.querySelector(".requirements-list");
    requirements.items.forEach(requirements => {
        let li = document.createElement("li");
        li.textContent = requirements;
        ul.appendChild(li);        
    });

    const rolesContent = mainClone.querySelector(".roles-content");
    rolesContent.textContent = role.content;
    const ol = mainClone.querySelector(".roles-list");
    role.items.forEach(role => {
        let li = document.createElement("li");
        li.textContent = role;
        ol.appendChild(li);        
    });

    detailJob.append(mainClone);




    const footer = document.querySelector("#footer-template");
    const footerTemplate = document.querySelector("#job-footer-template");
    const footerClone = footerTemplate.content.cloneNode(true);

    const footerJob = footerClone.querySelector("h3");
    footerJob.textContent = position;

    const footerCompany = footerClone.querySelector("p");
    footerCompany.textContent = company;

    const linkFooter = footerClone.querySelector(".fake-btn");
    linkFooter.href = apply;

    footer.appendChild(footerClone);
}
