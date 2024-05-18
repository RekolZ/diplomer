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
        let inputDate = $input.val().split(':')
        if($input.val().trim() === ''){
            $result.text("Ошибка: Заполните текстовое поле")
        }
        else if(inputDate.length > 2){
          let hours  = inputDate[0];
          let minutes = inputDate[1];
          let seconds   = inputDate[2];

          let time = new Date(0,0,0,hours,minutes,seconds);
          console.log(time)
          if (time.getHours() == hours 
          && time.getMinutes() == minutes 
          && time.getSeconds() == seconds
          && hours.length == 2
          && minutes.length == 2
          && seconds.length == 2) {
            $result.text("Корректно")
          } 
          else{
            $result.text("Ошибка: Некорректное время")
          }
        }
        else {
          $result.text("Ошибка: Некорректное время")
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