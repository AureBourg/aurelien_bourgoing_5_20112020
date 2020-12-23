//On récupère le tableau dans le storage
const storageArray = JSON.parse(localStorage.getItem('userCart'));

//Afficher le chiffre du panier selon le nombre d'items dedans
let cartNumber = document.getElementById('header_cart_number');
cartNumber.innerHTML = storageArray.length;

//Texte si le panier est vide
if(storageArray.length==0){
    document.getElementById('main_cart_products').innerHTML+= "Votre panier est vide.";
}else{
    for(let i=0; i<storageArray.length; i++){
        $.get("http://localhost:3000/api/furniture/"+storageArray[i].selectedProductId)
        .done(function(localHostArray){
            document.getElementById('products').innerHTML+= ""+
                    "<div class='col-12' id="+storageArray[i].selectedProductId+">"+
                        "<div class='block_product col-12'>"+
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
                                "<div class='block_product_quantity'>"+
                                    "<i id='quantity_minus' class='fas fa-minus'></i>"+
                                    "<div id='quantity_number' class='block_product_quantity_number'>"+
                                        storageArray[i].selectedProductQty+
                                    "</div>"+
                                    "<i id='quantity_plus' class='fas fa-plus'></i>"+
                                "</div>"+
                            "</div>"+
                            "<div class='block_product_total col-3'>"+
                                "<div id='product_subtotal' class='block_product_subtotal'>"+
                                ((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €"+
                                "</div>"+
                                "<div id='delete_item' class='block_product_delete'>"+
                                    "<i class='fas fa-trash-alt'></i>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
        })
        .fail(function(){
            alert("Connexion au serveur impossible.");
        });
    }

    //Calcul prix total
    let totalQty = 0;
    let totalPrice = 0;
    for(i=0;i<storageArray.length;i++){
        totalQty += storageArray[i].selectedProductQty;
        let productQty = (storageArray[i].selectedProductQty);
        $.get("http://localhost:3000/api/furniture/"+storageArray[i].selectedProductId)
        .done(function(localHostArray){
            let subtotal = ((localHostArray.price / 100)*productQty)
            totalPrice += subtotal;
            if(totalQty<2){
                document.getElementById('total_cart').innerHTML="Total ("+totalQty+" article) : "+totalPrice+" €";
            }else{
                document.getElementById('total_cart').innerHTML="Total ("+totalQty+" articles) : "+totalPrice+" €";               
            }
        })
    }

    /*//Bouton quantité + / -
    let btnMinus = document.getElementById('quantity_minus'+cartObjet.selectedProductId);
    btnMinus.onclick = function(){
        if(cartObjet.selectedProductQty>1){
            cartObjet.selectedProductQty--;
            localStorage.setItem('userCart', JSON.stringify(storageArray));
            window.location.reload();
            document.getElementById('quantity_number'+cartObjet.selectedProductId).innerHTML=cartObjet.selectedProductQty;
        }
    };
    let btnPlus = document.getElementById('quantity_plus'+cartObjet.selectedProductId);
    btnPlus.onclick = function(){
        if(cartObjet.selectedProductQty<9){
            cartObjet.selectedProductQty++;
            localStorage.setItem('userCart', JSON.stringify(storageArray));
            window.location.reload();
            document.getElementById('quantity_number'+cartObjet.selectedProductId).innerHTML=cartObjet.selectedProductQty;
        }
    };

    //Bouton supprimer article
    let btnDelete = document.getElementById('delete_item'+cartObjet.selectedProductId);
    btnDelete.onclick = function(){
        localStorage.removeItem[cartObjet];
        storageArray.splice(cartObjet, 1);
        localStorage.setItem('userCart', JSON.stringify(storageArray));
        window.location.reload();
    }*/

} //Fin else
