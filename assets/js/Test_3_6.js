if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $input = $("#input")
    const $equivalentTable = $("#equivalent")
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")

    let regex 

    //Тест ввода
    $submitBtn.on('click',(event)=>{
        event.preventDefault();
        let text = ''
        let errorStatus = false
        if($input.val().trim() === '') $result.text("Ошибка: Заполните текстовое поле")
        else{
          if($input.val().length<8 || $input.val().length>15){
            text = 'Некорректное количество символов. \n'
            errorStatus = true
          } 
          regex = /[0-9]/
          if(!regex.test($input.val())){
            text += 'В пароле нет цифр. \n'
            errorStatus = true
          }
          regex = /[a-z]/
          if(!regex.test($input.val())){
            text += 'В пароле нет латиских букв в нижнем регистре. \n'
            errorStatus = true
          }
          regex = /[!@#$%^&*]/
          if(!regex.test($input.val())){
            text += 'В пароле нет специальных символов. \n'
            errorStatus = true
          }
          if(errorStatus == false) text = 'Корректный пароль'
          $result.text(text)
        }
        

        
       
        
            $equivalentTable.append(`
            <tr><td>`+$input.val()+`</td>
            <td>`+$result.text()+`</td>
            <td>
                <select name="status" id="">
                    <option value="1">Pass</option>
                    <option value="0">Fail</option>
                </select>
            </td>
            <td class="switch-cell">
                <img src="../assets/img/cross.png" alt="">
            </td>
            </tr>`)
        $input.val('')
    })
    
    //"Удаление" из таблицы
    $tables.on('click', (event)=>{
      let target = event.target.closest('img')
      let row
      try{
         row = target.parentElement.parentElement
        }
      catch(error){
        return
      } 
      if(!row.classList.contains('remove')){
        row.classList.add('remove')
        target.setAttribute('src', '../assets/img/check mark.png')
        target.setAttribute('alt', 'check mark.png')
      }
      else{
        row.classList.remove('remove')
        target.setAttribute('src', '../assets/img/cross.png')
        target.setAttribute('alt', 'cross.png')
      } 
    })

    //Сформировать чеклист
    $tableBtn.on('click',()=>{
      let $rows = $('.remove')
      $rows.remove()
    })
  }