
const url = window.location.search;
const urlParam = new URLSearchParams(url);
const id = urlParam.get("id");

let request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let array = JSON.parse(this.responseText);
            document.getElementById('selected_product').innerHTML+= "<div class='product_img col-8'>"+
            "<img src='"+array.imageUrl+"' alt='"+array._id+"'/>"+
        "</div>"+

        "<div class='product_infos col-4'>"+
            "<div class='product_infos_name'>"+
                array.name+
            "</div>"+
        
            "<div class='product_infos_price'>"+
                array.price / 1000+ " €"+
            "</div>"+

            "<div class='product_infos_personalisation'>"+
                "<div class='product_infos_personalisation_title'>"+
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
                  "</div>"+
            "</div>"+
            "<button id='cart_button' class='button_add_to_cart' onclick='createItems()'>"+
                "Ajouter au panier"+
            "</button>"+
        "</div>";

        function createItems() {
        localStorage.setItem("cart_item_0", array._id);
        }  
    }
}

request.open("GET","http://localhost:3000/api/furniture/"+id);
request.send();


