//On récupère le tableau dans le storage
const storageArray = JSON.parse(localStorage.getItem('userCart'));

//Afficher le chiffre du panier selon le nombre d'items dedans
let cartNumber = document.getElementById('header_cart_number');
cartNumber.innerHTML = storageArray.length;
if (storageArray.length>9){
    cartNumber.style.fontSize = "16px";
}

//Texte si le panier est vide
if(storageArray.length==0){
    document.getElementById('main_cart_products').innerHTML= "Votre panier est vide.";
    $('#total_cart').hide();
}else{
    for(let i=0; i<storageArray.length; i++){
        $.get("http://localhost:3000/api/furniture/"+storageArray[i].selectedProductId)
        .done(function(localHostArray){

            let cartProduct = document.createElement('div');
            document.getElementById('products').appendChild(cartProduct);
            cartProduct.innerHTML = ""+
                        "<div id="+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+" class='block_product col-12'>"+
                            "<div class='block_product_img col-5'>"+
                                "<img src="+localHostArray.imageUrl+" alt="+storageArray[i].selectedProductId+"/>"+
                            "</div>"+
                            "<div class='block_product_infos col-4'>"+
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
                            "<div id='totaldelete_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ", "_")+"' class='block_product_total col-3'>"+
                                "<div id='subtotal_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+"' class='block_product_subtotal'>"+
                                "</div>"+
                            "</div>"+
                     "</div>";


            //Sous-total de chaque produit
            let subtotal = document.createElement('div');
            subtotal.innerHTML = ((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €";
            document.getElementById("subtotal_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).appendChild(subtotal);


            //Bouton supprimer article
            let btnDelete = document.createElement('button');
            btnDelete.innerHTML = "<i class='fas fa-trash-alt'></i>";
            document.getElementById("totaldelete_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).appendChild(btnDelete);
            // Fonction pour supprimer un objet du panier
            btnDelete.onclick=function(){
                storageArray.splice(i, 1);
                localStorage.setItem('userCart', JSON.stringify(storageArray));
                window.location.reload();
            }


            //Bouton quantité -
            let btnMinus = document.createElement('button');
            btnMinus.innerHTML = "<i class='fas fa-minus'></i>";
            document.getElementById("qtyminusplus_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).prepend(btnMinus);
            //Fonction pour diminuer la quantité de l'article
            btnMinus.onclick=function(){
                if(storageArray[i].selectedProductQty>1){
                    storageArray[i].selectedProductQty--;
                    document.getElementById('qtynumber_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=storageArray[i].selectedProductQty;
                    document.getElementById('subtotal_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €";
                    document.getElementById('total_cart').innerHTML="Total : "+sumtotal('.block_product_subtotal')+" €";
                    localStorage.setItem('userCart', JSON.stringify(storageArray));
                }
            }

            //Bouton quantité +
            let btnPlus = document.createElement('button');
            btnPlus.innerHTML = "<i class='fas fa-plus'></i>";
            document.getElementById("qtyminusplus_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).appendChild(btnPlus);
            //Fonction pour augmenter la quantité de l'article
            btnPlus.onclick=function(){
                if(storageArray[i].selectedProductQty<9){
                    storageArray[i].selectedProductQty++;
                    document.getElementById('qtynumber_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=storageArray[i].selectedProductQty;
                    document.getElementById('subtotal_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €";
                    document.getElementById('total_cart').innerHTML="Total : "+sumtotal('.block_product_subtotal')+" €";
                    localStorage.setItem('userCart', JSON.stringify(storageArray));
                }
            }

            //Fonction pour afficher le prix total du panier
            sumtotal = function(selector) {
                var sum = 0;
                $(selector).each(function() {
                    sum += parseInt($(this).text());
                });
                return sum;
            }
            document.getElementById('total_cart').innerHTML="Total : "+sumtotal('.block_product_subtotal')+" €";
        
        })//Fin .done
        .fail(function(){
            alert("Connexion au serveur impossible.");
        });
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
                console.log(response);
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
        alert("Veuillez vérifier l'exactitude des informations que vous avez renseignez");
    }

}; //Fin fonction onclick


