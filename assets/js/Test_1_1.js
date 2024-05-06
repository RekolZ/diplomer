if (window.jQuery) {
    const $tables = $('.data-tables')
    const $input = $("#input")
    const $equivalentTable = $("#equivalent")
    const $limitTable = $('#limit')
    const $exploratoryTable = $('#exploratory')
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")
    
    const $centerArc = $('#center-arc')
    const $leftArc = $('#left-arc')
    const $rightArc = $('#right-arc')
    const $rightInteger = $('#right-integer-point')
    const $rightMajor = $('#right-major-point')
    const $rightMinor = $('#right-minor-point')
    const $leftInteger = $('#left-integer-point')
    const $leftMajor = $('#left-major-point')
    const $leftMinor = $('#left-minor-point')

    //ТЕСТ ВВОДА
    let lastRange = $leftArc

    $submitBtn.on('click',(event)=>{
      event.preventDefault();
      if($input.val().trim() === ''){
        $result.text("Ошибка: Заполните текстовое поле")
        lastRange.removeAttr('class')
      }
      else if($input.val()>100){
        $result.text("Ошибка: Скорее всего вы умерли")
        if($input.val()<=101){
          lastRange.removeAttr('class')
          $rightMajor.addClass('active')
          lastRange = $rightMajor
        }
        else{
          lastRange.removeAttr('class')
          $rightArc.addClass('active')
          lastRange = $rightArc
        }
      }
      else if($input.val()<18){
        $result.text("Ошибка: Нельзя регистрироваться до 18 лет")
        if($input.val()>=17){
          lastRange.removeAttr('class')
          $leftMinor.addClass('active')
          lastRange = $leftMinor
        }
        else{
          lastRange.removeAttr('class')
          $leftArc.addClass('active')
          lastRange = $leftArc
        }
      }
      else if (/[a-zа-яё]/i.test($input.val())){
        $result.text("Ошибка: буквы")
      }
      else{
        $result.text("Зарегистрирован")
        lastRange.removeAttr('class')
        if($input.val()==18){
          $leftInteger.addClass('active')
          lastRange = $leftInteger
        }
        else if($input.val()<=19){
          $leftMajor.addClass('active')
          lastRange = $leftMajor
        }
        else if($input.val()==100){
          $rightInteger.addClass('active')
          lastRange = $rightInteger
        }
        else if($input.val()>=99 ){
          $rightMinor.addClass('active')
          lastRange = $rightMinor
        }
        else{
          $centerArc.addClass('active')
          lastRange = $centerArc
        }
      }
      console.log(lastRange)
      if(/[a-zа-яё]/i.test($input.val()) || $input.val().trim() === ''){
        $exploratoryTable.append(`
      <tr><td>`+$input.val()+`</td>
        <td>`+$result.text()+`</td>
        <td>
          <select name="status" id="">
              <option value="1">Pass</option>
              <option value="0">Fail</option>
          </select>
        </td>
        <td class="switch-cell">
          <img src="./assets/img/cross.png" alt="">
        </td>
      </tr>`)
      }
      else if(($input.val()>=17 && $input.val()<=19) || ($input.val()>=99 && $input.val()<=101)){
        $limitTable.append(`
        <tr><td>`+$input.val()+`</td>
          <td>`+$result.text()+`</td>
          <td>
            <select name="status" id="">
                <option value="1">Pass</option>
                <option value="0">Fail</option>
            </select>
          </td>
          <td class="switch-cell">
            <img src="./assets/img/cross.png" alt="">
          </td>
        </tr>`)
      }
      else{
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
            <img src="./assets/img/cross.png" alt="">
          </td>
        </tr>`)
      }

    })
    
    //"УДАЛЕНИЕ" ИЗ ТАБЛИЦЫ
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
        target.setAttribute('src', './assets/img/check mark.png')
        target.setAttribute('alt', 'check mark.png')
      }
      else{
        row.classList.remove('remove')
        target.setAttribute('src', './assets/img/cross.png')
        target.setAttribute('alt', 'cross.png')
      } 
    })

    //СФОРМИРОВАТЬ ЧЕКЛИСТ
    $tableBtn.on('click',()=>{
      let $rows = $('.remove')
      $rows.remove()
    })
  }