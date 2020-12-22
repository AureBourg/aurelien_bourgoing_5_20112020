//On récupère le tableau dans le storage
const cartToDisplay = JSON.parse(localStorage.getItem('userCart'));

//Afficher le chiffre du panier selon le nombre d'items dedans
let cartNumber = document.getElementById('header_cart_number');
cartNumber.innerHTML = cartToDisplay.length;

//Texte si le panier est vide
if(cartToDisplay.length==0){
    document.getElementById('main_cart_products').innerHTML+= "Votre panier est vide.";
}else{
    $.get("http://localhost:3000/api/furniture/")
        .done(function(productsLocalHost){
            let total = 0;
            for(let objet of productsLocalHost){//On récupère les infos de chaque item du panier
                for(let cartObjet of cartToDisplay){
                    if(cartObjet.selectedProductId==objet._id){
                        document.getElementById('main_cart_products').innerHTML+= ""+
                        "<div class='col-12' id="+cartObjet.selectedProductId+">"+
                            "<div class='block_product col-12'>"+
                                "<div class='block_product_price'>"+
                                    objet.imageUrl+
                                "</div>"+
                                "<div class='block_product_name'>"+
                                    objet.name+
                                "</div>"+
                                "<div class='block_product_price'>"+
                                    objet.price / 1000 +"0 €"+
                                "</div>"+
                                "<div class='block_product_varnish'>"+
                                    cartObjet.selectedProductVarnish+
                                "</div>"+
                                "<div class='block_product_quantity'>"+
                                    cartObjet.selectedProductQty+
                                "</div>"+
                                "<div id='product_subtotal' class='block_product_subtotal'>"+
                                    (objet.price / 1000)*cartObjet.selectedProductQty+"0 €"+
                                "</div>"+
                            "</div>"+
                        "</div>";
                        //Calcul prix total
                        total = total + (objet.price / 1000)*cartObjet.selectedProductQty;
                        if(cartToDisplay.length>1){
                        document.getElementById('total_cart').innerHTML="Total ("+cartToDisplay.length+" articles) : "+total+"0 €";
                        }else{document.getElementById('total_cart').innerHTML="Total ("+cartToDisplay.length+" article) : "+total+"0 €"};
                    }
                }
            }
        })
        .fail(function(error){
            alert("Connexion au serveur impossible.");
        });
};
