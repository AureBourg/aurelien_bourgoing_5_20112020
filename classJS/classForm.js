class Formulaire{
    recupValeursInput(){
        let lastName = document.getElementById('user_lastname').value;
        let firstName = document.getElementById('user_firstname').value;
        let email = document.getElementById('user_mail').value;
        let address = document.getElementById('user_address').value;
        let city = document.getElementById('user_city').value;

        let contact = {
            lastName,
            firstName,
            email,
            address,
            city
        }
    }

    envoiForm(){
        const request = new Request(("URL" + parambackend), {
            method: 'POST',
            body: JSON.stringify({
                contact,
            }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        });
    }

    recupResponseForm(){
        if (checkForm.checkValidity() === true) {
            fetch(request)
                .then(response => response.json())
                .then(response => {
                    let getResponse = response.paramresponse;
                
                    window.location = 'order-confirmation-page.html';
                    
                })

        // Alerte si le formulaire n'est pas bien rempli        
        } else if (checkForm.checkValidity() === false) {
            alert("Veuillez vérifier l'exactitude des informations que vous avez renseigné");
        }
    }
}