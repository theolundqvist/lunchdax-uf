
function uploadFile(file, name){
    var storageRef = storage.ref('images/'+name);

    storageRef.put(file)
    .then((snapshot)=>{
        console.log("done")
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
            Cropper.canvas.attr("data-url", downloadURL)

            var id = name.split('/')[1]
            
            if(id == "restaurant"){
                restRef.update({
                    image_url:downloadURL
                })
                .catch((e)=>{
                    console.log(e.code)
                })
            }
            else if(restaurant.dishes.length-1 <= id){
                restaurant.dishes[id].image_url = downloadURL;
    
                restRef.update({
                    dishes:restaurant.dishes
                })
                .then(()=>{
                    getData()
                })
                .catch((e)=>{
                    console.log(e.code)
                })
            }

            
        });
    })
    .catch((e)=>{
        console.log("error: " + e.code)
    })
}

function nonNull(property, standardvalue) {
    return (property == null) ? standardvalue : property;
}


function Cropper(sourceDOM, canvasDOM) {

    Cropper.img = sourceDOM;
    Cropper.canvas = canvasDOM;

    this.crop = function (src, settings = {}) {

        
        Cropper.src = src;
        Cropper.namn = nonNull(settings.name, "name");
        Cropper.uploadSize = nonNull(settings.uploadSize, 480);
        Cropper.size = nonNull(settings.size, 0);
        Cropper.upload = nonNull(settings.upload, false)
        Cropper.uid = nonNull(settings.uid, 'asdasd')

        if(src.startsWith('data:')) {Cropper.drawSrc();}
        else {
            if(true){     
                var canvas = Cropper.canvas
                var img = Cropper.img
                img.attr('src', src)

                img[0].onload = (()=>{
                    try {
                        var context = canvas[0].getContext("2d")
                        canvas.attr('width', img[0].width); canvas.attr('height', img[0].height);
        
                        context.drawImage(img[0], 0, 0);
                        var data = canvas[0].toDataURL()

                        if(data.startsWith('data:image/png;base64')) Cropper.drawSrc(data);
                        }

                    catch(err) {
                        alert('Ägaren av bilden du länkade har blockerat oss från att använda den.      Om du laddar ner filen kan du istället dra och släppa den på bilden. Eller välja via utforskaren genom att trycka "Välj en fil"')
                    }
                })
            }
        }
    }


    Cropper.uploadImg = function (uid){

        if(uid != null) return uploadFile(canvasToBlob(Cropper.canvas), Cropper.namn);
    }
    Cropper.drawSrc = function (src = Cropper.src, width = Cropper.uploadSize, upload = Cropper.upload, drawWidth = Cropper.size, index=0, uid = Cropper.uid){

        var sx, sy, sWidth, sHeight;
        
        var img = Cropper.img
        var canvas =  Cropper.canvas
        
        const resizeFunc = () => Cropper.drawSrc(src, drawWidth, false, 0, index + 1);
        const uploadFunc = () => Cropper.uploadImg(uid);
        img.attr('src', "")
        img.attr('src', src);
        canvas.attr('src', "")

        var WIDTH = width;

        img[0].onload = (()=>{

            // access image size here 
            var h = img[0].height
            var w = img[0].width
            if(h < width) width = h;
    
            if(h < w){
                sWidth = sHeight = h;
                sy = 0;
                sx = (w - h)/2;
    
                if(w < width) width = w;
    
            }else{
                sWidth = sHeight = w;
                sy = (h - w)/2;
                sx = 0;
    
                if(h < width) width = h;
            }
        
            if(index > 0){
                width = WIDTH
                console.log(width)
            }

            var ctx = canvas[0].getContext('2d');
            canvas.attr('width', width); canvas.attr('height', width);


            ctx.drawImage(img[0], sx, sy, sWidth, sHeight, 0, 0, width, width);


            if(upload){uploadFunc()}
            if(drawWidth != 0){resizeFunc()}
        })
    }
}



function canvasToBlob(canvas) {
    var blob;
    if (typeof InstallTrigger !== 'undefined') { // Firefox
        canvas.toBlob(function(_blob) {
        blob = _blob;
        }, 'image/png');
    } else { // all other browsers
        blob = dataURItoBlob(canvas[0].toDataURL('image/png'));
    }

    return blob;
}

function sameType(a, b) {
    var objectA = Object(a) === a,
        objectB = Object(b) === b;
    if (objectA && objectB)
        return Object.getPrototypeOf(a) === Object.getPrototypeOf(b);
    else if (!objectA && !objectB)
        return typeof a === typeof b;
    else
        return false;
}

function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });

}
