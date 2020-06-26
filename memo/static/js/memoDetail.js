window.onload = function () {

    document.querySelector('.back').addEventListener('click', function(event) {
        location.href = "javascript:history.go(-1)";
    })

}