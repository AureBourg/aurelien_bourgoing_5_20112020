
const url = window.location.search;
const urlParam = new URLSearchParams(url);
const id = urlParam.get("id");

let request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let array = JSON.parse(this.responseText);
        document.getElementById('product_image').innerHTML+= "<img src='"+array.imageUrl+"' alt='"+array._id+"'/>"
        document.getElementById('product_infos_name').innerHTML+= array.name
        document.getElementById('product_infos_price').innerHTML+= array.price / 1000 + " €"
        document.getElementById('product_infos_personalisation').innerHTML+= "<div class='product_infos_personalisation_title'>"+
                    "<p>Vernis :</p>"+
                "</div>"+
                "<div>"+
                    "<input type='radio' name='personalisation' value='"+array.varnish[0]+"' id='product_infos_personalisation_color_1' checked>"+
                    "<label for='product_infos_personalisation_color'>"+array.varnish[0]+"</label>"+
                  "</div>"+
                  
                  "<div>"+
                    "<input type='radio' name='personalisation' value='"+array.varnish[1]+"' id='product_infos_personalisation_color_2'>"+
                    "<label for='product_infos_personalisation_color_2'>"+array.varnish[1]+"</label>"+
                  "</div>"+
                  
                  "<div>"+
                    "<input type='radio' name='personalisation' value='"+array.varnish[2]+"' id='product_infos_personalisation_color_3'>"+
                    "<label for='product_infos_personalisation_color_3'>"+array.varnish[2]+"</label>"+
                  "</div>"
        document.getElementById('product_infos_description').innerHTML+= array.description

        let cartButton = document.getElementById('button_add_to_cart');
        let cartNumber = document.getElementById('header_cart_number');

        cartNumber.innerHTML = sessionStorage.length -1;
        cartButton.onclick = function(){
            sessionStorage.setItem(array._id, JSON.stringify(array));
            cartNumber.innerHTML = sessionStorage.length -1;
        } 
        
    }
}
request.open("GET","http://localhost:3000/api/furniture/"+id);
request.send();


