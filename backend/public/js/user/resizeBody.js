$(window).load(() => { resizeBody() })


function resizeBody() {
    var sizes = [252, 486, 714, 947, 1178, 1412, 1653]

    var body = $('body')

    var windowWidth = $(window).width()

    body.width(windowWidth * 0.8)

    var width = body.width()
    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];

        if (width > size && width < sizes[i + 1]) {
            width = size;
            break;
        }
    }
    body.width(width)
    $('footer').width(width)
}

window.onresize = function () {
    resizeBody()
}
