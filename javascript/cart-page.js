//On récupère le tableau dans le storage
const storageArray = JSON.parse(localStorage.getItem('userCart'));
console.log(storageArray);

//Afficher le chiffre du panier selon le nombre d'items dedans
let cartNumber = document.getElementById('header_cart_number');
cartNumber.innerHTML = storageArray.length;

//Texte si le panier est vide
if(storageArray.length==0){
    document.getElementById('main_cart_products').innerHTML+= "Votre panier est vide.";
}else{
    $.get("http://localhost:3000/api/furniture/")
        .done(function(localHostArray){
            let total = 0;
            for(let localHostObjet of localHostArray){//On récupère les infos de chaque item du panier
                for(let cartObjet of storageArray){
                    if(cartObjet.selectedProductId==localHostObjet._id){
                        document.getElementById('main_cart_products').innerHTML+= ""+
                        "<div class='col-12' id="+cartObjet.selectedProductId+">"+
                            "<div class='block_product col-12'>"+
                                "<div class='block_product_img col-5'>"+
                                    "<img src="+localHostObjet.imageUrl+" alt="+cartObjet.selectedProductId+"/>"+
                                "</div>"+
                                "<div class='block_product_infos col-4'>"+
                                    "<div class='block_product_name'>"+
                                        localHostObjet.name+
                                    "</div>"+
                                    "<div class='block_product_price'>"+
                                        localHostObjet.price / 1000 +"0 €"+
                                    "</div>"+
                                    "<div class='block_product_varnish'>"+
                                        "Vernis : "+cartObjet.selectedProductVarnish+
                                    "</div>"+
                                    "<div class='block_product_quantity'>"+
                                        "<i id='quantity_minus' class='fas fa-minus'></i>"+
                                        "<div id='quantity_number' class='block_product_quantity_number'>"+
                                            cartObjet.selectedProductQty+
                                        "</div>"+
                                        "<i id='quantity_plus' class='fas fa-plus'></i>"+
                                    "</div>"+
                                "</div>"+
                                "<div class='block_product_total col-3'>"+
                                    "<div id='product_subtotal' class='block_product_subtotal'>"+
                                        ((localHostObjet.price / 1000)*cartObjet.selectedProductQty).toFixed(1)+"0 €"+
                                    "</div>"+
                                    "<div id='delete_item' class='block_product_delete'>"+
                                        "<i class='fas fa-trash-alt'></i>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>";

                        //Calcul prix total
                        /*
                        let intitotal=document.getid(total)
                        inittotal=0
                        inittotal = inittotal+document.getid(productsubtotal)*/
                        total = total + (localHostObjet.price / 1000)*cartObjet.selectedProductQty;
                        if(cartObjet.selectedProductQty>1){
                        document.getElementById('total_cart').innerHTML="Total ("+cartObjet.selectedProductQty+" articles) : "+total.toFixed(1)+"0 €";
                        }
                        else{document.getElementById('total_cart').innerHTML="Total ("+cartObjet.selectedProductQty+" article) : "+total.toFixed(1)+"0 €"
                        };

                        //Bouton quantité + / -
                        let btnMinus = document.getElementById('quantity_minus');
                        btnMinus.onclick = function(){
                            if(cartObjet.selectedProductQty>1){
                                cartObjet.selectedProductQty--;
                                localStorage.setItem('userCart', JSON.stringify(storageArray));
                                window.location.reload();
                                document.getElementById('quantity_number').innerHTML=cartObjet.selectedProductQty;
                            }
                        };
                        let btnPlus = document.getElementById('quantity_plus');
                        btnPlus.onclick = function(){
                            if(cartObjet.selectedProductQty<9){
                                cartObjet.selectedProductQty++;
                                localStorage.setItem('userCart', JSON.stringify(storageArray));
                                window.location.reload();
                                document.getElementById('quantity_number').innerHTML=cartObjet.selectedProductQty;
                            }
                        };

                        //Bouton supprimer article
                        let btnDelete = document.getElementById('delete_item');
                        btnDelete.onclick = function(){
                            localStorage.removeItem[cartObjet];
                            storageArray.splice(cartObjet, 1);
                            localStorage.setItem('userCart', JSON.stringify(storageArray));
                            window.location.reload();
                        }
                    }
                }
            }
        })
        .fail(function(error){
            alert("Connexion au serveur impossible.");
        });
};
