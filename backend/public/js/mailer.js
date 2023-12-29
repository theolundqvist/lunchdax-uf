$(window).load(function () {

var rca = []

$('.submitBtn1').on('click', function (e) {
    checkForm($("[name='form1']"), $(this))

})

$('.submitBtn2').on('click', function (e) {
    checkForm($("[name='form2']"), $(this))
})

var glForm = null;


function checkForm(form, btn){
    glForm = form

    var rsFormErrors = false;
    var recaptchaId = 'recaptcha_' + btn.data('recaptcha');
    var rsFormFields = glForm.find('input');

    var rsFormEmail = glForm.find("[name='mail']");


    // Button ripple effect


    // Reset form errors
    rsFormFields.removeClass('error');
    rsFormErrors = false;

    // Validate form fields
    rsFormFields.each(function(i){
        var field = $(this)
        if(!field.val()) {
            rsFormErrors = true;
            field.addClass('error');
        }
    })


    if(!isValidEmail(rsFormEmail.val())) {
        rsFormErrors = true;
        rsFormEmail.addClass('error');
    }

    if(rsFormErrors) {
        console.log(glForm.serialize())
        return false;
    } else {

        if(rca[recaptchaId] === undefined){
            rca[recaptchaId] = grecaptcha.render(recaptchaId, {
                'sitekey' : '6LeBRIQUAAAAAEoHHBBfscFcsiG3dZ0rtGfw92xg',
                'callback' : onExecutedCaptcha,
                'size' : 'invisible',
                'badge':'inline'
            });

        } else {
            grecaptcha.reset(rca[recaptchaId]);
        }

        grecaptcha.execute(rca[recaptchaId]);
        return false;
    }
}


function onExecutedCaptcha(token) {
    var sendingMsg = null, textMsg = null;

    textMsg = 'Ditt meddelande skickades, vi kommer att svara så fort vi kan!';
    sendingMsg = 'Skickar meddelande...';
    
  
    swal({
      text: sendingMsg,
      button: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
    $.get('https://lunchdaxuf.se/newMessage?'+glForm.serialize(), function (data, status) {
        console.log(status)

            grecaptcha.reset();
            swal.close();

            if(data == 'sent'){
                swal({
                  text: textMsg,
                  icon: "success",
                });
                glForm.find("input[type=text], input[type=email], textarea").val("");
            } else {
                swal({
                  text: data,
                  icon: "error",
                });
            }
    })
  }
})



function isValidEmail(emailAddress) {

    var re = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))/g
    return re.test(emailAddress);
    
};

