if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $input = $("#input")
    const $equivalentTable = $("#equivalent")
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")

    //Тест ввода
    $submitBtn.on('click',(event)=>{
        event.preventDefault();
        if($input.val().trim() === '') $result.text("Ошибка: Заполните текстовое поле")
        else if(!Number.isInteger(parseInt($input.val()))) $result.text("Ошибка: Некорректный ввод")
        else if($input.val()%2 == 0 && $input.val().length == 2) $result.text("Корректно")
        else if($input.val()%2 != 0)
          { 
            if($input.val()%1 != 0) $result.text("Ошибка: Число не целое")
            else $result.text("Ошибка: Число не чётное") 
          }
        else if($input.val().length != 2) $result.text("Ошибка: Число не двузначное")
        else $result.text("Ошибка: Некорректный ввод")

        
       
        
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