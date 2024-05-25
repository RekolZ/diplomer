if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $sideA = $("#input1")
    const $sideB = $("#input2")
    const $sideC = $("#input3")
    const $equivalentTable = $("#equivalent")
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")


    //Тест ввода

    $submitBtn.on('click',(event)=>{
        event.preventDefault();
        if($sideA.val().trim() === '' || $sideB.val().trim() === '' || $sideC.val().trim() === ''){
          $result.text("Ошибка: Заполните текстовое поле")
        }
        else if($sideA.val() == $sideB.val() && $sideB.val() == $sideC.val()){
          $result.text("Равносторонний")
        }
        else if($sideA.val() == $sideB.val() || $sideA.val() == $sideC.val() || $sideC.val() == $sideB.val()){
          $result.text("Равнобедренный")
        }
        else{
          $result.text("Разносторонний")
        }
        
        $equivalentTable.append(`
        <tr><td>`+$sideA.val()+','+$sideB.val()+','+$sideC.val()+`</td>
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
            
        $sideA.val('')
        $sideB.val('')
        $sideC.val('')
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