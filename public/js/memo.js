function deleteMemo(target) {
    target.parentNode.removeChild(target);
    // popup.close();
}
function refreshMovable() {
    var movables = $All('.movable');
    //限制最大宽高，不让滑块出去
    //手指触摸开始，记录div的初始位置
    movables.forEach(function (target) {
        // target.style.position = "absolute";
        // target.style.left = positionLeft + "px";
        // target.style.top = positionTop + "px";
        var maxW = document.body.clientWidth - target.offsetWidth;
        var maxH = document.body.clientHeight - target.offsetHeight;
        var touchStartL, touchStartT, oriLeftPos, oriTopPos, oriZ;
        target.addEventListener('touchstart', function (e) {
            longClick = 0;
            move = 0;
            var ev = e || window.event;
            var touch = ev.targetTouches[0];
            touchStartL = touch.pageX;
            touchStartT = touch.pageY;
            console.log(target.offsetLeft);
            oriLeftPos = target.offsetLeft;
            oriTopPos = target.offsetTop;
            timeOutEvent = setTimeout(function () {
                if (move == 0) {
                    console.log("longpress");
                    popup.open(target, true, function(){
                        deleteMemo(target);
                    });
                    longClick = 1;
                }
            }, 500);
            document.addEventListener("touchmove", defaultEvent, {
                passive: false
            });
        });
        //触摸中的，位置记录
        target.addEventListener('touchmove', function (e) {
            if (longClick == 0) {
                move = 1;
                var ev = e || window.event;
                var touch = ev.targetTouches[0];
                var touchL = touch.pageX;
                var touchT = touch.pageY;
                target.style.left = (touchL + oriLeftPos - touchStartL) + 'px';
                target.style.top = (touchT + oriTopPos - touchStartT) + 'px';
                if ($("#mobileBodyContent").offsetHeight < parseInt(target.style.top) + target.offsetHeight) {
                    $("#mobileBodyContent").style.height = parseInt(target.style.top) + target.offsetHeight + "px";
                }
            }
        });
        //触摸结束时的处理
        target.addEventListener('touchend', function () {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0 && longClick == 0 && move == 0) {
                //click
            }
            update();
            document.removeEventListener("touchmove", defaultEvent);
        });
    });
    //阻止默认事件
    function defaultEvent(e) {
        e.preventDefault();
    }
}

function createMemo(target) {
    var defaultLeft = "10px";
    var defaultTop = "20px";
    console.log(target);
    inputTitle = target.querySelector('#titleinput').value;
    inputContent = target.querySelector('#contentinput').value;
    inputColor = target.querySelector('#colorinput').value;
    if (inputColor.length != 7) {
        inputColor = window.defaultColor;
    }
    newMemo = document.createElement('div');
    //template
    // <div class="postit1 movable">
    //             <h3>Shopping list</h3>
    //             <p>
    //                 tomato<br>
    //                 carrot<br>
    //                 egg<br>
    //                 cheese<br>
    //             </p>
    //         </div>
    newMemo.className = "postit1 movable";
    newMemo.innerHTML = "<h3>" + inputTitle + "</h3>" + "<p>" + inputContent + "</p>";
    newMemo.style.backgroundColor = inputColor;
    $('#mobileBodyContent').appendChild(newMemo);
    popup.close();
    update();
    refreshMovable();
}

window.onload = function () {
    window.userId = -1;
    window.defaultColor = "#fefabc";
    window.popup = {};
    popup = window.popup;
    console.log(window.localStorage.getItem('todo_token'));
    if (window.localStorage.getItem('todo_token') != null) {
        Ajax.post('/auth/checkToken', {
            token: window.localStorage.getItem('todo_token'),
            onFailure: function () {
                window.location.href = "/login.html";
            },
            onSuccess: function (data) {
                window.userId = data.userId;
                console.log(window.userId);
                loadData();
            }
        });
    } else {
        window.location.href = "/login.html";
    }
    var burgerBtn = document.getElementById('burgerBtn');
    var mobile = document.getElementById('mobile');

    burgerBtn.addEventListener('click', function () {
        mobile.classList.toggle('navigation');
    }, false);
    //prototype
    //<div class="postit1">
    //     <h3>Title:<input id="titleinput"/></h3>
    //     <p> Content:<br/>
    //         <textarea id="contentinput">

    //         </textarea>
    //     </p>
    // </div>
    $('#createMemo').addEventListener('click', function () {
        inputMemo = document.createElement('div');
        inputMemo.classList.add("postit1");
        inputMemo.innerHTML = '<h3>Title:<input id="titleinput"/></h3><p> Content:<br/><textarea id="contentinput"></textarea><br/>Color: <input id="colorinput"/></p>';
        popup.open(inputMemo, false, createMemo);
    }, false);
    $('#backToUnfor').addEventListener('click', function(){
        window.location.href = "/todo.html";
    });
    $('#display').addEventListener('click', function(){
        window.location.href = "http://116.62.106.18:8080/memo/detailMemo?userId=" + window.userId;
    });
    positionLeft = 20;
    positionTop = 10;
    gap = 10;
    Object.assign(popup, {
        init: function () {
            // $('.postit1').addEventListener('touchstart', function () {
            //     popup.open(this);
            // });
        },
        open: function (target, backtouch, closeCallback) {
            $('#mobileBodyContent').classList.add('pop');
            popupEle = document.createElement('div');
            popupEle.classList.add('popup');
            memo = target.cloneNode(true);
            console.log(memo);
            bgEle = document.createElement('div');
            bgEle.classList.add('bg');
            closeEle = document.createElement('div');
            closeEle.innerHTML = '<svg><use xlink:href="#close"></use></svg>';
            closeEle.classList.add("close");
            shadowEle = document.createElement('div');
            shadowEle.classList.add("shadow");

            memo.appendChild(closeEle);
            memo.appendChild(shadowEle);
            popupEle.appendChild(memo);
            popupEle.appendChild(bgEle);
            if (closeCallback != null) {
                closeEle.addEventListener("click", function () {
                    closeCallback(memo);
                });
            }
            $('#mobile').insertBefore(popupEle, $('#mobile').firstChild);
            //TODO: add delete effect
            // $('.popup .postit1').addEventListener('touchstart', function (e) {
            //     $('.popup').style.pointerEvents = 'none';
            //     console.log("post");
            //     return false;
            // });
            if (backtouch == true) {
                $('.popup').addEventListener('touchend', function () {
                    console.log("background");
                    popup.close();
                });
            }
            setTimeout(function () {
                $('.popup').classList.add('pop');
            }, 10);
        },
        close: function () {
            $('#mobileBodyContent, .popup').classList.remove('pop');
            setTimeout(function () {
                $('.popup').parentNode.removeChild($('.popup'));
                update();
            }, 100);
        }
    });
    popup.init();

};

function update() {
    //construct data
    var data = {};
    data.userId = window.userId;
    data.memos = [];
    memos = $All(".movable");
    memos.forEach(function (target) {
        newMemo = {};
        newMemo.innerHTML = target.innerHTML;
        newMemo.left = target.style.left;
        newMemo.top = target.style.top;
        newMemo.className = target.className;
        newMemo.color = target.style.backgroundColor;
        data.memos.push(newMemo);
    });
    console.log(data);
    Ajax.post('http://116.62.106.18:8080/memo/updateMemo', {
        data: data,
        onFailure: function () {
            window.location.href = "/memo.html";
        }
    });
}

function loadData() {
    Ajax.post('http://116.62.106.18:8080/memo/getMemo', {
        data: {
            "userId": window.userId
        },
        onSuccess: function (data) {
            console.log(data);
            memos = data.data.Memos;
            memoContainer = $("#mobileBodyContent");
            memoContainer.innerHTML = "";
            for (var index in memos) {
                console.log(index);
                memo = memos[index];
                newMemo = document.createElement("div");
                newMemo.className = memo.className;
                newMemo.innerHTML = memo.innerHTML;
                newMemo.style.position = "absolute";
                newMemo.style.left = memo.left;
                newMemo.style.top = memo.top;
                newMemo.style.backgroundColor = memo.color;
                memoContainer.appendChild(newMemo);
            }
            refreshMovable();
        }
    });
}