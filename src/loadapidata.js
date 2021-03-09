$(document).ready(function() {

    function showLoaderPage() {
        // Show the spinning Loader icon
        $('#loader').show()
        $('#container').hide();
        $('#currentSelection').hide();
        $('#errorcontent').hide();
    }

    function showErrorcontentPage(){
        // Show the spinning Loader icon
        $('#loader').hide()
        $('#container').hide();
        $('#currentSelection').hide();
        $('#errorcontent').show();
    }

    function showContainer() {
        //Load the contents
        $('#loader').hide()
        $('#currentSelection').hide();
        $('#errorcontent').hide();
        $("#container").show();
    }

    function createCard(cardData) {
        //Create the card with image, title, and details
        var card;
        card = '<div class="col-md-4">' +
                ' <div class="well text-left">' +
                 '<img class="img-thumbnail" alt="'+ cardData.name + '" src="'+ cardData.image+'" />' +
                 '<h3 class="cardname">' + cardData.name +'</h3>' +
                 '<h4> Details </h4> <ul>' +
                 '<li> Species - ' + cardData.species + ' </li>' +
                 '<li> Location - ' + cardData.location.name +' </li> </ul> ' +
                 '<a class="btn btn-success">Learn More &raquo</a>' +
                 '</div> '+
                 '</div>'
        return card;
    }

    function parseData(data) {
        //Parse json data to render in DOM
        var cardInfo = '';
        var cardName = '';

        //sort the data        
        data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ); 
        
        for ( var i=0; i<=2; i++) {
            cardInfo =  createCard(data[i]);
            $('#container .row').append(cardInfo);
            cardInfo = '';
        }

        //Attach event handler for the Learn more Button
        $("#container .row .btn").on("click", function(event) {
            cardName= ($(this).siblings('.cardname').text());
            if (cardName)
                $('#currentSelection').show();
                $('#currentCardName').html(cardName);

        });
        showContainer();
    }

    function generateRandomNumbers(count) {
        //Generate random numbers for the id
        var uniqueID = [];
        while (uniqueID.length < count)  {
            var randomID  = Math.floor(Math.random() * 400);
            //Check for non repeating random numbers
            if ($.inArray(uniqueID, randomID) == -1 ) {
                uniqueID.push(randomID);
            }
        }    
        return uniqueID.join(',');
    } 

    function loadApi() {
        let ids = "2,4,5";
        var apiUrl = 'https://rickandmortyapi.com/api/character/' + ids;
        //Load Data from server
        $.ajax({
            type: "get",
            url: apiUrl,
            beforeSend: function() {
                showLoaderPage();
            },
            success: function(data) {
                parseData(data);
            },
            error: function() {
                showErrorcontentPage();
            },
            complete: function() {
                $("#loader").hide();
            },
        });
    }

    //Call the API to load Data
    loadApi();
});

