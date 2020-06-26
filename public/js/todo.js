var guid = 0;
var CL_COMPLETED = 'completed';
var CL_SELECTED = 'selected';
var CL_EDITING = 'editing';
var data = model.data;

function update() {
  model.flush();


  var activeCount = 0;
  var completedCount = 0;

  var todoList = $('.todo-list');
  todoList.innerHTML = '';
  data.items.forEach(function (itemData, index) {
    if (data.selectType == '' || (data.selectType && data.selectType == itemData.type)) {
      if (!itemData.completed) {
        activeCount++;
      } else {
        completedCount++;
      }
    }


    if (
      (data.filter == 'All' ||
        (data.filter == 'Active' && !itemData.completed) ||
        (data.filter == 'Completed' && itemData.completed)) && (data.selectType == '' || (data.selectType && data.selectType == itemData.type))
    ) {
      var item = document.createElement('li');
      var id = 'item' + guid++;
      item.setAttribute('id', id);
      if (itemData.completed) item.classList.add(CL_COMPLETED);
      item.innerHTML = [
        '<div class="view ' + `view-pri-${['高','中','低'].indexOf(itemData.priority)}` + '">',
        '  <input class="toggle" type="checkbox">',
        '  <label class="todo-label">' + itemData.msg,
        '</label>',

        '<span>'+(itemData.date||'')+'</span>',
        '  <button class="destroy"></button>',
        '</div>'
      ].join('');



      item.addEventListener('touchstart', function (e) {
        this.startX = e.touches[0].clientX;
      });
      item.addEventListener('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.endX = e.changedTouches[0].clientX;
        let distance = this.startX - this.endX;
        if (distance > 0) {
          this.style.transform = `translate3d(${-distance}px, 0, 0)`;
          if (distance > 80) {
            data.items.splice(index, 1);
            update();
          }
        }
      });

      item.addEventListener('touchend', function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.transform = `translate3d(0, 0, 0)`;
      });

      var label = item.querySelector('.todo-label');
      var timeOutEvent;
      label.addEventListener('touchstart', function (e) {
        longClick = 0;
        timeOutEvent = setTimeout(function () {
          longClick = 1;
        }, 300);
      });
      label.addEventListener('touchmove', function (e) {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        e.preventDefault();
      });
      label.addEventListener('touchend', function (e) {
        clearTimeout(timeOutEvent);
        if (timeOutEvent != 0 && longClick == 1) {

          item.classList.add(CL_EDITING);

          var edit = document.createElement('input');
          var finished = false;
          edit.setAttribute('type', 'text');
          edit.setAttribute('class', 'edit');
          edit.setAttribute('value', label.innerHTML);
          edit.style.width = window.screen.availWidth/2 + "px";

          function finish() {
            if (finished) return;
            finished = true;
            item.removeChild(edit);
            item.classList.remove(CL_EDITING);
          }

          edit.addEventListener('blur', function () {
            finish();
          }, false);

          edit.addEventListener('keyup', function (ev) {
            if (ev.keyCode == 27) { // Esc
              finish();
            } else if (ev.keyCode == 13) {
              label.innerHTML = this.value;
              itemData.msg = this.value;
              update();
            }
          }, false);

          item.appendChild(edit);
          edit.focus();

        }
        return false;
      });

      label.addEventListener('dblclick', function () {
        item.classList.add(CL_EDITING);

        var edit = document.createElement('input');
        var finished = false;
        edit.setAttribute('type', 'text');
        edit.setAttribute('class', 'edit');
        edit.setAttribute('value', label.innerHTML);

        function finish() {
          if (finished) return;
          finished = true;
          item.removeChild(edit);
          item.classList.remove(CL_EDITING);
        }

        edit.addEventListener('blur', function () {
          finish();
        }, false);

        edit.addEventListener('keyup', function (ev) {
          if (ev.keyCode == 27) { // Esc
            finish();
          } else if (ev.keyCode == 13) {
            label.innerHTML = this.value;
            itemData.msg = this.value;
            update();
          }
        }, false);

        item.appendChild(edit);
        edit.focus();
      }, false);

      var itemToggle = item.querySelector('.toggle');
      itemToggle.checked = itemData.completed;
      itemToggle.addEventListener('change', function () {
        itemData.completed = !itemData.completed;
        update();
      }, false);

      itemToggle.addEventListener('touchstart', function () {
        itemData.completed = !itemData.completed;
        update();
      }, false);

      item.querySelector('.destroy').addEventListener('click', function () {
        data.items.splice(index, 1);
        update();
      }, false);

      todoList.insertBefore(item, todoList.firstChild);
    }
  });



  var newTodo = $('.new-todo');
  newTodo.value = data.msg;

  // var completedCount = data.items.length - activeCount;
  var count = $('.todo-count');
  count.innerHTML = activeCount + ' left; ';
  count.innerHTML += completedCount + ' complete; ';
  if (activeCount + completedCount > 0) {
    count.innerHTML += (completedCount * 100 / (activeCount + completedCount)).toFixed(0) + '% complete ;';
  }

  var clearCompleted = $('.clear-completed');
  clearCompleted.style.visibility = completedCount > 0 ? 'visible' : 'hidden';

  var toggleAll = $('.toggle-all');
  toggleAll.style.visibility = data.items.length > 0 ? 'visible' : 'hidden';
  toggleAll.checked = data.items.length == completedCount;

  var filters = makeArray($All('.filters li a'));
  filters.forEach(function (filter) {
    if (data.filter == filter.innerHTML) filter.classList.add(CL_SELECTED);
    else filter.classList.remove(CL_SELECTED);
  });
}

function jumpMemo(){
  console.log("yes");
  window.location.href = "/memo.html";
}

window.onload = function () {
  console.log(window.localStorage.getItem('todo_token'));
  if (window.localStorage.getItem('todo_token') != null) {
    Ajax.post('/auth/checkToken', {
      token: window.localStorage.getItem('todo_token'),
      onFailure: function(){
        window.location.href = "/login.html";
      },
      onSuccess: function(){
        // direct = getQueryVariable("direct");
        // console.log(direct);
        // if (direct != "true"){
        //   //random arts
        //   window.location.href = "/diary.html"; 
        // }
        color = getQueryVariable("color");
        if (color != false){
          $('.todoapp').style.background = color.slice(0, 3) + "a" + color.slice(3, color.length - 1) + ",0.2"+")";
        }
      }
    });
  } else {
    window.location.href = "/login.html";
  }
  document.body.style.width = window.screen.availWidth + "px";
  // $('#memojump').addEventListener("click", function(){
  //   console.log("yes");
  //   window.location.href = "/memo.html";
  // });
  model.init(function () {



    var data = model.data;

    var newTodo = $('.new-todo');
    newTodo.addEventListener('keyup', function () {
      model.data.msg = newTodo.value;
    });
    newTodo.addEventListener('change', function () {
      model.data.msg = newTodo.value;
      // model.flush();
    });
    newTodo.addEventListener('keyup', function (ev) {
      if (ev.keyCode != 13) return; // Enter

      addinput();
    }, false);


    var clearCompleted = $('.clear-completed');
    clearCompleted.addEventListener('click', function () {
      for(let i = data.items.length-1;i>=0;i--){
        if(data.items[i].completed){
          data.items.splice(i, 1);
        }
      }
      // data.items.forEach(function (itemData, index) {
      //   if (itemData.completed) data.items.splice(index, 1);
      // });
      update();
    }, false);

    var toggleAll = $('.toggle-all');
    toggleAll.addEventListener('change', function () {
      var completed = toggleAll.checked;
      data.items.forEach(function (itemData) {
        itemData.completed = completed;
      });
      update();
    }, false);

    var filters = makeArray($All('.filters li a'));
    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        data.filter = filter.innerHTML;
        filters.forEach(function (filter) {
          filter.classList.remove(CL_SELECTED);
        });
        filter.classList.add(CL_SELECTED);
        update();
      }, false);
    });

    update();
  });
};


var _btn = $(".btn-slide-bar"),
  slideBar = $(".slide-bar");
slideBar.style.transform = 'translate3d(-150px, 0, 0)';

loadType();


_btn.onclick = function (e) {
  e.preventDefault();
  e.stopPropagation();
  slideBar.style.transform = 'translate3d(0, 0, 0)';
};
slideBar.onclick = function (e) {
  e.preventDefault();
  e.stopPropagation();
  slideBar.style.transform = 'translate3d(-150px, 0, 0)';
};

function logout(){
  window.localStorage.removeItem('todo_token');
  window.localStorage.removeItem('todo_username');
  window.location.href = "/login.html";
}

function randomColor(){
  window.location.href = "/palette.html";
}


function loadType() {
  Ajax.get('/api/type/list', {
    token: window.localStorage.getItem('todo_token'),
    onSuccess: function (data) {
      types = data.types;
      slideBar.children[0].innerHTML = '<li>' + '' + '</li>';
      slideBar.children[0].innerHTML += '<li onclick="jumpMemo()">' + 'Memo' + '</li>';
      slideBar.children[0].innerHTML += '<li onclick="filter(\'\')">' + '全部' + '</li>';
      $("#typelist").innerHTML='';
      data.types.forEach(function (item) {
        $("#typelist").innerHTML += '<option>' + item.typeContent + '</option>';
        slideBar.children[0].innerHTML += '<li tid=' + item.id + ' onclick="filter(\'' + item.typeContent + '\')">' + item.typeContent + '</li>';
      });
      slideBar.children[0].innerHTML += '<li onclick="addType()">+</li>';
      slideBar.children[0].innerHTML += '<li onclick="logout()">Logout</li>';
      slideBar.children[0].innerHTML += '<li onclick="randomColor()">Change Color</li>';
    }
  });
}

function addType() {
  var a = prompt('新增类型');
  if (a) {
    Ajax.post('/api/type/create', {
      data: {
        typeContent: a
      },
      token: window.localStorage.getItem('todo_token'),
      onSuccess: function (data) {
        if (data.code === 0) {
          alert('新增类型成功');
          loadType();
        } else {
          alert(data.message);
        }
      }
    });
  }
}

function filter(typeContent) {
  model.data.selectType = typeContent;
  update();
}

function addinput() {
  var content = $('.new-todo').value;
  if (content == '') {
    alert('input msg is empty');
    return;
  }
  data.items.push({
    msg: content,
    completed: false,
    priority: $('#priorityinput').value,
    date: $('#dateinput').value,
    type: $('#typeinput').value || '',
  });
  update();
}