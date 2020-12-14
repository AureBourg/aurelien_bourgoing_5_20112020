let storageArray =[];
//let quantity = document.getElementById('cart_number_quantity').value;


for (var i = 0; i < sessionStorage.length; i++) {
    //let storageArray = [sessionStorage.getItem(sessionStorage.key(i))];
    storageArray.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    };
//console.log(storageArray);

for (let i=0; i<storageArray.length; i++){
    //document.getElementById('cart_product_name').innerHTML += storageArray[i].name;
    //document.getElementById('cart_product_varnish').innerHTML += storageArray[i].varnish[0];
    //document.getElementById('cart_product_price').innerHTML += storageArray[i].price / 1000;
    //document.getElementById('sous-total').innerHTML += (storageArray[i].price / 1000) *quantity;

    document.getElementById('cart_product').innerHTML+= ""+
                    "<div class='row'>"+
                        "<div class='cart_product_img col'>"+
                            "<img src='"+storageArray[i].imageUrl+"' alt='Meuble 2'/>"+
                        "</div>"+

                        "<div id='cart_product_name' class='cart_product_name col'>"+
                            storageArray[i].name +
                        "</div>"+

                        "<div id='cart_product_varnish' class='cart_product_varnish col'>"+
                            //storageArray[i].varnish[1] +
                        "</div>"+
                        
                        "<div id='cart_product_price' class='cart_product_price col'>"+
                            storageArray[i].price / 1000 +
                        "</div>"+
                        "<div class='cart_product_quantity col'>"+
                            "<label for='cart_number_quantity'>Quantité</label>"+
                            "<input id='cart_number_quantity' type='number' value='1' min='1'>"+
                        "</div>"+
                        "<div id='sous-total'>"+
                            //(storageArray[i].price / 1000) *quantity
                        "</div>"+
                    "</div>";
};