var idForUpload;
var modalForUpload;

  function createDropArea(modal, dishId = "restaurant") {

    idForUpload = dishId;
    modalForUpload = modal;

    modal.find('#url').unbind().bind().change((e) => {
      var target = $(e.currentTarget)
      if (target.val() && target.val().length > 11) {
        uploadImageFromUrl(target.val(), idForUpload, modal)
      }
    })


    let dropAreaJQ = modal.find('.drop-area')
    let dropArea = dropAreaJQ[0]

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)

    })

    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

    function highlight(e) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }

    dropArea.addEventListener('drop', handleDrop, false)

    
}
    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files

        handleFiles(files)
    }


  function handleFiles(files) {
    if (!files[0].type.match(/image.*/)) {
      console.log("The dropped file is not an image: ", files[0].type);
      return;
    }

    var cropper = new Cropper(modalForUpload.find('#source'), modalForUpload.find('#canvas'));
    
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      cropper.crop(reader.result,
        {
          name: restUid + '/' + idForUpload,
          size: 240,
          uploadSize: 480,
          upload: true
        });
    }
  }

  function uploadImageFromUrl(url, dishId, modal) {
    var cropper = new Cropper(modal.find('#source'), modal.find('#canvas'));
    cropper.crop(url,
      {
        name: restUid + '/' + dishId,
        size: 240,
        uploadSize: 480,
        upload: true
      });
  }
