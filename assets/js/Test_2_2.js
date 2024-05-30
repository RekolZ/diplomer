if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $cardNumberInput = $("#input1")
    const $cardNameInput = $("#input2")
    const $dateInput = $("#input3")
    const $codeInput = $("#input4")
    const $equivalentTable = $("#equivalent")
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")


    //Тест ввода
    let cardNumberStatus = true
    let cardNameStatus = true
    let dateStatus = true
    let codeStatus = true

    $submitBtn.on('click',(event)=>{
       
        event.preventDefault();
        cardNumberStatus = true
        cardNameStatus = true
        dateStatus = true
        codeStatus = true
        $result.text("Некорректно")
        if($cardNumberInput.val().trim() === ''){
            cardNumberStatus = false
            
        }
        else if($cardNumberInput.val().length < 16){
            cardNumberStatus = false
            
        }
        else if(/[-+!@#$%^&*а-яёА-ЯЁ]/i.test($cardNumberInput)){
            cardNumberStatus = false
            
        }
        if($cardNameInput.val().trim() === ''){
            cardNameStatus = false
            
        }
        else if($cardNameInput.val().split(' ').length != 2){
            cardNameStatus = false
            
        }
        else if(/[-+!@#$%^&*0-9]/i.test($cardNameInput.val())){
            cardNameStatus = false
            
        }
        let inputDate = $dateInput.val().split('/')
        if($dateInput.val().trim() === ''){
            dateStatus = false
            
        }
        else if(inputDate.length > 1){
          let year  = '20'+inputDate[1];
          let month = --inputDate[0];
          let day   = 10;

          let date = new Date(year, month, day);
          if (date.getFullYear() != year 
          || date.getMonth() != month 
          || date.getDate() != day) {
            dateStatus = false
            console.log(date)
          } 
        }
        else if(inputDate.length != 2){
            dateStatus = false
        }
        if($codeInput.val().trim() === ''){
            codeStatus = false
            
        }
        else if($codeInput.val().length != 3){
            codeStatus = false
            
        }
        else if(/[-+!@#$%^&*а-яА-ЯёЁA-Za-z]/i.test($codeInput.val())){
            codeStatus = false  
        }
        if(cardNumberStatus && cardNameStatus && dateStatus && codeStatus)  $result.text("Корректно")

        $equivalentTable.append(`
              <tr>
              <td class="`+(cardNumberStatus ? '' : 'wrong')+`">`+$cardNumberInput.val()+`</td>
              <td class="`+(cardNameStatus ? '' : 'wrong')+`">`+$cardNameInput.val()+`</td>
              <td class="`+(dateStatus ? '' : 'wrong')+`">`+$dateInput.val()+`</td>
              <td class="`+(codeStatus ? '' : 'wrong')+`">`+$codeInput.val()+`</td>
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
            
        $cardNumberInput.val('')
        $cardNameInput.val('') 
        $codeInput.val('') 
        $dateInput.val('') 

        console.log(cardNumberStatus+' '+cardNameStatus+' '+dateStatus+' '+codeStatus)
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