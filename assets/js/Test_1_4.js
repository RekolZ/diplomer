if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $input = $("#input")
    const $equivalentTable = $("#equivalent")
    const $limitTable = $('#limit')
    const $exploratoryTable = $('#exploratory')
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")

    const ellipses = [];
    for (let i = 1; i <= 12; i++) {
        const ellipseId = `ellipse-${i}`;
        const $ellipse = $('#'+ellipseId);
        ellipses.push($ellipse);
    }
    const arcs = [];
    for (let i = 1; i <= 12; i++) {
        const arcId = `arc-${i}`;
        const $arc = $('#'+arcId);
        arcs.push($arc);
    }

    //Тест ввода
    let lastRange = arcs[0]

    $submitBtn.on('click',(event)=>{
        event.preventDefault();
        if($input.val().trim() === ''){
            $result.text("Ошибка: Заполните текстовое поле")
            lastRange.removeAttr('class')
        }
        else if (/[a-zа-яё]/i.test($input.val())){
            $result.text("Ошибка: Вы ввели не числовое значение")
        }
        else if($input.val()<0){
            $result.text("Ошибка: Некорректное количество")
            if($input.val()>=-1){
                lastRange.removeAttr('class')
                ellipses[0].addClass('active')
                lastRange = ellipses[0]
            }
            else{
                lastRange.removeAttr('class')
                arcs[0].addClass('active')
                lastRange = arcs[0]
            }
        }
        else if($input.val()<500){
            $result.text($input.val() + ' рублей без скидки')
            lastRange.removeAttr('class')
            
            if($input.val()==0){
                ellipses[1].addClass('active')
                lastRange = ellipses[1]
                }
            else if($input.val()<=1){
                ellipses[2].addClass('active')
                lastRange = ellipses[2]
            }
            else if($input.val()>=499){
                ellipses[3].addClass('active')
                lastRange = ellipses[3]
                }
            else{
            arcs[1].addClass('active')
            lastRange = arcs[1]
            }
        }
        else if($input.val()<1000){
            $result.text($input.val()-$input.val()*0.02 + ' рублей по 2% скидке')
            lastRange.removeAttr('class')
            if($input.val()==500){
                ellipses[4].addClass('active')
                lastRange = ellipses[4]
            }
            else if($input.val()<=501){
                ellipses[5].addClass('active')
                lastRange = ellipses[5]
            }
            
            else if($input.val()>=999){
                ellipses[6].addClass('active')
                lastRange = ellipses[6]
            }
            else{
                arcs[2].addClass('active')
                lastRange = arcs[2]
            }
        }
        else if($input.val()<5000){
            $result.text($input.val()-$input.val()*0.05 + ' рублей по 5% скидке')
            lastRange.removeAttr('class')
            if($input.val()==1000){
                ellipses[7].addClass('active')
                lastRange = ellipses[7]
            }
            else if($input.val()<=1001){
                ellipses[8].addClass('active')
                lastRange = ellipses[8]
            }
            else if($input.val()>=4999){
                ellipses[9].addClass('active')
                lastRange = ellipses[9]
            }
            else{
                arcs[3].addClass('active')
                lastRange = arcs[3]
            }
        }
        else if($input.val()>=5000){
            $result.text($input.val()-$input.val()*0.1 + ' рублей по 10% скидке')
            if($input.val()==5000){
                ellipses[10].addClass('active')
                lastRange = ellipses[10]
                }
            else if($input.val()<=5001){
                lastRange.removeAttr('class')
                ellipses[11].addClass('active')
                lastRange = ellipses[11]
            }
            else{
                lastRange.removeAttr('class')
                arcs[4].addClass('active')
                lastRange = arcs[4]
            }
        }
        
        if(!Number.isInteger(parseInt($input.val()))){
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
            <img src="../assets/img/cross.png" alt="">
            </td>
        </tr>`)
        }
        else if(($input.val()>=-1 && $input.val()<=1) || ($input.val()>=99 && $input.val()<=101) || ($input.val()>=199 && $input.val()<=201) || ($input.val()>=299 && $input.val()<=301)){
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
                <img src="../assets/img/cross.png" alt="">
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
                <img src="../assets/img/cross.png" alt="">
            </td>
            </tr>`)
        }

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