if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $firstInput = $("#input1")
    const $secondInput = $("#input2")
    const $equivalentTable = $("#equivalent")
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")


    //Тест ввода

    $submitBtn.on('click',(event)=>{
        event.preventDefault();
        $result.text("Некорректно")
        if($firstInput.val().trim() === '' && $secondInput.val().trim() === ''){
              //$result.text("Ошибка: Заполните текстовые поля")
              $equivalentTable.append(`
              <tr><td class="wrong">`+$firstInput.val()+`</td>
              <td class="wrong">`+$secondInput.val()+`</td>
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
           
        }
        else if(new Set($firstInput.val()).size != $firstInput.val().length || $firstInput.val().length>4 || $firstInput.val() != $firstInput.val().toUpperCase() || !/[a-z]/i.test($firstInput.val()) ){
            //$result.text("Ошибка: Идентификатор")
            if($secondInput.val()<0 || $secondInput.val()%1 != 0 || $secondInput.val().trim() === ''){
              $equivalentTable.append(`
              <tr><td class="wrong">`+$firstInput.val()+`</td>
              <td class="wrong">`+$secondInput.val()+`</td>
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
            }
            else{
              $equivalentTable.append(`
              <tr><td class="wrong">`+$firstInput.val()+`</td>
              <td>`+$secondInput.val()+`</td>
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
            }
            
        }
        else if($secondInput.val().trim() === '' || $secondInput.val()<0 || $secondInput.val()%1 != 0){
            //$result.text("Ошибка: Количество")
            $equivalentTable.append(`
            <tr><td>`+$firstInput.val()+`</td>
            <td class="wrong">`+$secondInput.val()+`</td>
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
        }
        else{
            $result.text("Корректно")
            $equivalentTable.append(`
            <tr><td>`+$firstInput.val()+`</td>
            <td>`+$secondInput.val()+`</td>
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
        }
        
        
            
        $firstInput.val('')
        $secondInput.val('') 

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