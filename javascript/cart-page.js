let storageArray =[];
let quantity = document.getElementById('cart_number_quantity').value;


for (var i = 0; i < sessionStorage.length; i++) {
    //let storageArray = [sessionStorage.getItem(sessionStorage.key(i))];
    storageArray.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    };
//console.log(storageArray);

for (let i=0; i<storageArray.length; i++){
    document.getElementById('cart_product_name').innerHTML += storageArray[i].name;
    document.getElementById('cart_product_varnish').innerHTML += storageArray[i].varnish[0];
    document.getElementById('cart_product_price').innerHTML += storageArray[i].price / 1000;
    document.getElementById('sous-total').innerHTML += (storageArray[i].price / 1000) *quantity;
};