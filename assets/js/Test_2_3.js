if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $firstInput = $("#input1")
    const $secondInput = $("#input2")
    const $resultInput = $("#input3")
    const $equivalentTable = $("#equivalent")
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")


    //Тест ввода
    let firstStatus = true
    let secondStatus = true
    let resultStatus = true

    $submitBtn.on('click',(event)=>{
       
        event.preventDefault();
        firstStatus = true
        secondStatus = true
        resultStatus = true
        let a = $firstInput.val()
        let b = $secondInput.val()
        let c = $resultInput.val()
        $result.text("Некорректно")
        if($firstInput.val().trim() === ''){
            firstStatus = false
        }
        else if($firstInput.val() > 99 || $firstInput.val() < -99){
            firstStatus = false
        }
        else if(/[!@#$%^&*A-Za-zа-яёА-ЯЁ]/i.test($firstInput.val())){
            firstStatus = false
        }
        else if($firstInput.val().toString().includes(',')){
          a = a.replace(',', '.')
          console.log(a)
        } 
        else if(isNaN(a)){
          firstStatus = false
        }
        if($secondInput.val().trim() === ''){
            secondStatus = false 
        }
        else if($secondInput.val() > 99 || $secondInput.val() < -99){
            secondStatus = false
        }
        else if(/[!@#$%^&*A-Za-zа-яёА-ЯЁ]/i.test($secondInput.val())){
            secondStatus = false
            console.log('meow')
        }
        else if($secondInput.val().toString().includes(',')){
          b = b.replace(',', '.')
          console.log(b)
        } 
        else if(isNaN(b)){
          secondStatus = false
        }
        if($resultInput.val().trim() === ''){
          resultStatus = false
        }
        else if($resultInput.val().toString().includes(',')){
          c = c.replace(',', '.')
          console.log(c)
        } 
        if(( parseFloat(a) + parseFloat(b) ) != c){
            resultStatus = false
        }
        if(firstStatus && secondStatus && resultStatus)  $result.text("Корректно")

        $equivalentTable.append(`
              <tr>
              <td class="`+(firstStatus ? '' : 'wrong')+`">`+$firstInput.val()+`</td>
              <td class="`+(secondStatus ? '' : 'wrong')+`">`+$secondInput.val()+`</td>
              <td class="`+(resultStatus ? '' : 'wrong')+`">`+$resultInput.val()+`</td>
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
            
        $firstInput.val('')
        $secondInput.val('') 
        $resultInput.val('') 

        console.log(firstStatus+' '+secondStatus+' '+resultStatus)
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