//On appelle notre classe d'objets
let classPanier = new Panier();

//On récupère le tableau dans le storage
const storageArray = JSON.parse(localStorage.getItem('userCart'));

//Afficher le chiffre du panier selon le nombre d'items dedans
classPanier.updateCartNumber("storageArray");

//Texte si le panier est vide
if(storageArray.length==0){
    document.getElementById('main_cart_products').innerHTML= "Votre panier est vide.";
    document.getElementById('total_cart').style.display = 'none';
}else{
    for(let i=0; i<storageArray.length; i++){
        //Requête GET pour afficher les items du panier
        var request = new Request("http://localhost:3000/api/furniture/"+storageArray[i].selectedProductId, {
            method: "GET",
        })

        fetch(request)
        .then(response => response.json())
        .then(response = function(localHostArray) {
            let cartProduct = document.createElement('div');
            document.getElementById('products').appendChild(cartProduct);
            cartProduct.innerHTML = ""+
                        "<div id="+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+" class='block_product row'>"+
                            "<div class='block_product_img col-md-5'>"+
                                "<img src="+localHostArray.imageUrl+" alt="+storageArray[i].selectedProductId+"/>"+
                            "</div>"+
                            "<div class='block_product_infos col-md-4'>"+
                                "<div class='block_product_name'>"+
                                    localHostArray.name+
                                "</div>"+
                                "<div class='block_product_price'>"+
                                    localHostArray.price / 100 +" €"+
                                "</div>"+
                                "<div class='block_product_varnish'>"+
                                    "Vernis : "+storageArray[i].selectedProductVarnish+
                                "</div>"+
                                "<div id='qtyminusplus_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+"' class='block_product_quantity'>"+
                                    "<div id='qtynumber_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+"' class='block_product_quantity_number'>"+
                                        storageArray[i].selectedProductQty+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                            "<div id='totaldelete_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ", "_")+"' class='block_product_total col-md-3'>"+
                                "<div id='subtotal_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+"' class='block_product_subtotal'>"+
                                "</div>"+
                            "</div>"+
                     "</div>";
                     
            //On appelle notre classe d'objets
            let classPanier = new Panier(i, localHostArray);

            //Fonctions pour gérer la quantité des articles dans notre panier
            classPanier.enleverUnArticle();

            classPanier.retirerUneQuantite();

            classPanier.ajouterUneQuantite();

            //Fonction pour afficher les sous-totaux du panier
            classPanier.sousTotal();

            //Fonction pour afficher le prix total du panier  
            sumtotal = function(selector){    
                var sum = 0;
                var selectors = document.getElementsByClassName(selector);
                for(let i=0; i<selectors.length; i++){
                    sum += parseInt(selectors[i].textContent);
                }
                return sum;
            }            
            
            document.getElementById('total_cart').innerHTML="Total : "+sumtotal('block_product_subtotal')+" €";
        })
        .catch(err => alert("Connexion au serveur impossible.", err)); // Message d'erreur

    }//Fin boucle for

}; //Fin else



let checkForm = document.getElementById('main_cart_form');
const clickToSend = document.getElementById('main_cart_form_button');

//Requête POST pour envoyer les données du formulaire au clic du bouton
clickToSend.onclick = function(event){

    event.preventDefault();

    let lastName = document.getElementById('user_lastname').value;
    let firstName = document.getElementById('user_firstname').value;
    let email = document.getElementById('user_mail').value;
    let address = document.getElementById('user_address').value;
    let city = document.getElementById('user_city').value;

    // Création de l'objet contact
    let contact = {
        lastName,
        firstName,
        email,
        address,
        city
    };

    // Création du tableau product
    const products = [];
    for (let i=0; i<storageArray.length; i++){
        products.push(storageArray[i].selectedProductId)
    }

    //Requête Fetch POST
    const request = new Request(("http://localhost:3000/api/furniture/order"), {
        method: 'POST',
        body: JSON.stringify({
            contact,
            products
        }),
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    });

    //Vérification du bon remplissage du formulaire
    if (checkForm.checkValidity() === true) {
        fetch(request)
            .then(response => response.json())
            .then(response => {
                
                let getOrderId = response.orderId;
                let getTotalPrice = document.getElementById('total_cart').textContent;

                let validOrder = {
                    getOrderId,
                    getTotalPrice
                };
                
                localStorage.clear();

                sessionStorage.setItem("confirmOrder", JSON.stringify(validOrder));
                sessionStorage.setItem("userEmail", JSON.stringify(email));
                sessionStorage.setItem("userName", JSON.stringify(firstName));
               
                window.location = 'order-confirmation-page.html';
                
            })

    // Alerte si le formulaire n'est pas bien rempli        
    } else if (checkForm.checkValidity() === false) {
        alert("Veuillez vérifier l'exactitude des informations que vous avez renseigné");
    }

}; //Fin fonction onclick


