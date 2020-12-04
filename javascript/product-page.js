
const url = window.location.search;
const urlParam = new URLSearchParams(url);
const id = urlParam.get("id");

let request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let array = JSON.parse(this.responseText);
        for(let i=0; i<array.length; i++){
            document.getElementById('selected-product').innerHTML+= "<div class='product_img col-8'>"+
            "<img src='"+array[0].imageUrl+"' alt='"+array[0]._id+"'/>"+
        "</div>"+

        "<div class='product_infos col-4'>"+
            "<div class='product_infos_name'>"+
                array[0].name+
            "</div>"+
        
            "<div class='product_infos_price'>"+
                array[0].price / 1000+ " €"+
            "</div>"+

            "<div class='product_infos_personalisation'>"+
                "<div class='product_infos_personalisation_title'>"+
                    "<p>Vernis :</p>"+
                "</div>"+
                "<div>"+
                    "<input type='radio' name='personalisation' value='"+array[0].varnish[0]+"' id='product_infos_personalisation_color_1' checked>"+
                    "<label for='product_infos_personalisation_color'>"+array[0].varnish[0]+"</label>"+
                  "</div>"+
                  
                  "<div>"+
                    "<input type='radio' name='personalisation' value='"+array[0].varnish[1]+"' id='product_infos_personalisation_color_2'>"+
                    "<label for='product_infos_personalisation_color_2'>"+array[0].varnish[1]+"</label>"+
                  "</div>"+
                  
                  "<div>"+
                    "<input type='radio' name='personalisation' value='"+array[0].varnish[2]+"' id='product_infos_personalisation_color_3'>"+
                    "<label for='product_infos_personalisation_color_3'>"+array[0].varnish[2]+"</label>"+
                  "</div>"+
            "</div>"+
            "<button class='button_add_to_cart'>"+
                "Ajouter au panier"+
            "</button>"+
        "</div>";
        };
    }
    else if(this.status == 500){
        console.log("error");
    }
}
request.open("GET","http://localhost:3000/api/furniture/"+id);
request.send();