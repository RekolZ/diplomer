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
        let code = $input.val()
        switch(true){
            case code < '0' && code >=-1: {
                $result.text("Ошибка: Некорректное количество")
                lastRange.removeAttr('class')
                ellipses[0].addClass('active')
                lastRange = ellipses[0]
                break
            }
            case code = '0':{
                $result.text("0")
                lastRange.removeAttr('class')
                ellipses[1].addClass('active')
                lastRange = ellipses[1]
                break}
            case '-0':{
                $result.text("0")
                lastRange.removeAttr('class')
                ellipses[1].addClass('active')
                lastRange = ellipses[1]
                break}
            case '1':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[2].addClass('active')
                lastRange = ellipses[2]
                break}
            case '99':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[3].addClass('active')
                lastRange = ellipses[3]
                break}
            case '100':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[4].addClass('active')
                lastRange = ellipses[4]
                break}
            case '101':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[5].addClass('active')
                lastRange = ellipses[5]
                break}
            case '199':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[6].addClass('active')
                lastRange = ellipses[6]
                break}
            case '200':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[7].addClass('active')
                lastRange = ellipses[7]
                break}
            case '201':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[8].addClass('active')
                lastRange = ellipses[8]
                break}
            case '299':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[9].addClass('active')
                lastRange = ellipses[9]
                break}
            case '300':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[10].addClass('active')
                lastRange = ellipses[10]
                break}
            case '301':{
                $result.text("цифры")
                lastRange.removeAttr('class')
                ellipses[11].addClass('active')
                lastRange = ellipses[11]
                break;}
            default:{
                if($input.val().trim() === ''){
                    $result.text("Ошибка: Заполните текстовое поле")
                    lastRange.removeAttr('class')
                }
                else if (/[a-zа-яё]/i.test($input.val())){
                    $result.text("Ошибка: буквы")
                    lastRange.removeAttr('class')
                }
                else if($input.val()<0){
                    $result.text("Ошибка: Некорректное количество")
                    lastRange.removeAttr('class')
                    arcs[0].addClass('active')
                    lastRange = arcs[0]
                }
                else if($input.val()<100){
                    $result.text("цифры")
                    lastRange.removeAttr('class')
                    arcs[1].addClass('active')
                    lastRange = arcs[1]
                }
                else if($input.val()<200){
                    $result.text("цифры")
                    lastRange.removeAttr('class')
                    arcs[2].addClass('active')
                    lastRange = arcs[2]
                }
                else if($input.val()<=300){
                    $result.text("цифры")
                    lastRange.removeAttr('class')
                    arcs[3].addClass('active')
                    lastRange = arcs[3]
                }
                else if($input.val()>300){
                    $result.text("цифры")
                    lastRange.removeAttr('class')
                    arcs[4].addClass('active')
                    lastRange = arcs[4]
                }
                break}
        }
        


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
        target.setAttribute('src', './assets/img/check mark.png')
        target.setAttribute('alt', 'check mark.png')
      }
      else{
        row.classList.remove('remove')
        target.setAttribute('src', './assets/img/cross.png')
        target.setAttribute('alt', 'cross.png')
      } 
    })

    //Сформировать чеклист
    $tableBtn.on('click',()=>{
      let $rows = $('.remove')
      $rows.remove()
    })
  }