




function Card(id, title, price, description, imgUrl, days, attr){

    this.title = title
    this.price = price
    this.description = description
    this.image_url = imgUrl
    this.id = id;
    this.days = days
    this.attributes = attr
    this.getAttr = function(){
        if(this.attributes) {return this.attributes}
        else{
            return {
                veg:false,
                vegan:false,
                gluten:false,
                laktos:false
            }
        }
    }

    
    if(!imgUrl){
        imgUrl = restaurant.image_url
    }

    this.html = 
        '<div class="card">'+
            '<form id='+id+'>'+
                '<img class="card-img-top" src='+ getImageUrl(imgUrl) +' alt="Card image cap" height = "221">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">'+ title +'</h5>'+
                    '<h6 class="card-text">'+ price + ':-' + '</h6>'+
                    '<p>'+ description +'</p>'+

                    '<a class="btn btn-secondary editBtn" role="button" style="color:white">Redigera</a>'+
                    '<a class="btn btn-danger removeBtn" role="button" style="color:white">Stryk</a>'+
                '</div>'+
            '</form>'+
        '</div>'

    

}

function getImageUrl(url){
    if(!url){
        return "../images/placeholder.png"
    }
    return '"' + url + '"'
}