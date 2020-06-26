function register(){
  let username = $('#username').value
  let password = $('#password').value
  let password2 = $('#password2').value

  if(username === undefined || password === undefined  ){
    alert('请填写用户名及密码')
    return
  }
  if(username.length < 4 ){
    alert('用户名长度过短')
    return
  }
  if(password.length< 6 ){
    alert('密码长度过短')
    return
  }
  if(password !== password2 ){
    alert('密码输入不一致')
    return
  }
  Ajax.post('/auth/register',{
    data:{
      username,
      password
    },
    onSuccess:function(data){
      console.log(data)
      if(data.code === 0){
        alert('注册成功')
        window.localStorage.setItem('todo_token', data.token)
        window.localStorage.setItem('todo_username', username)
        //random animation
        // window.location.href="todo.html"
        window.location.href = randomAnimationhref();
      }else{
        alert(data.message)
      }
    }
  })
}