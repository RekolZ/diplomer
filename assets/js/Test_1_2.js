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
            lastRange.removeAttr('class')
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
        else if($input.val()<=100){
            $result.text(10*$input.val() + ' рублей')
            lastRange.removeAttr('class')
            if($input.val()==100){
                ellipses[4].addClass('active')
                lastRange = ellipses[4]
            }
            else if($input.val()==0){
                ellipses[1].addClass('active')
                lastRange = ellipses[1]
                }
            else if($input.val()<=1){
                ellipses[2].addClass('active')
                lastRange = ellipses[2]
            }
            else if($input.val()>=99){
                ellipses[3].addClass('active')
                lastRange = ellipses[3]
                }
            else{
            arcs[1].addClass('active')
            lastRange = arcs[1]
            }
        }
        else if($input.val()<=200){
            $result.text(9*$input.val() + ' рублей')
            lastRange.removeAttr('class')
            
            if($input.val()<=101){
                ellipses[5].addClass('active')
                lastRange = ellipses[5]
            }
            else if($input.val()==200){
                ellipses[7].addClass('active')
                lastRange = ellipses[7]
                }
            else if($input.val()>=199){
                ellipses[6].addClass('active')
                lastRange = ellipses[6]
            }
            else{
                arcs[2].addClass('active')
                lastRange = arcs[2]
            }
        }
        else if($input.val()<=300){
            $result.text(8*$input.val() + ' рублей')
            lastRange.removeAttr('class')
            if($input.val()<=201){
                ellipses[8].addClass('active')
                lastRange = ellipses[8]
            }
            else if($input.val()==300){
                ellipses[10].addClass('active')
                lastRange = ellipses[10]
                }
            else if($input.val()>=299){
                ellipses[9].addClass('active')
                lastRange = ellipses[9]
            }
            else{
                arcs[3].addClass('active')
                lastRange = arcs[3]
            }
        }
        else if($input.val()>300){
            $result.text(7*$input.val() + ' рублей')
            if($input.val()<=301){
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
        
        if ($input.val() % 1 !== 0){
            $result.text("Ошибка: дробное число")
        }
        if(!Number.isInteger(parseInt($input.val())) || $input.val() % 1 !== 0){
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
        target.setAttribute('src', '../assets/img/undo.png')
        target.setAttribute('alt', 'undo.png')
      }
      else{
        row.classList.remove('remove')
        target.setAttribute('src', '../assets/img/cross.png')
        target.setAttribute('alt', 'cross.png')
      } 
    })

    //Сформировать чеклист
    $tableBtn.on('click',() =>{
        tablesToExcel();
      });
  
      function tablesToExcel() {
        const wb = XLSX.utils.book_new();
  
        function extractTableData(tableId) {
            const $table = tableId;
            const rows = [];
            $table.find('tr').each(function() {
                if (!$(this).hasClass('remove')) {
                    const row = [];
                    $(this).find('th, td').each(function() {
                        const $cell = $(this);
                        let cellValue;
                        if ($cell.find('select').length > 0) {
                            // Если ячейка содержит элемент <select>, берем только текст выбранной опции
                            cellValue = $cell.find('select option:selected').text().trim();
                        } else {
                            // Иначе берем текстовое содержимое ячейки, включая вложенные элементы
                            cellValue = $cell.clone().children().remove().end().text().trim();
                        }
                        row.push(cellValue);
                    });
                    rows.push(row);
                }
            });
            return rows;
        }
  
        const data1 = extractTableData($equivalentTable);
        const data2 = extractTableData($limitTable);
        const data3 = extractTableData($exploratoryTable);
  
        const ws1 = XLSX.utils.aoa_to_sheet(data1);
        const ws2 = XLSX.utils.aoa_to_sheet(data2);
        const ws3 = XLSX.utils.aoa_to_sheet(data3);

        ws1['!merges'] = [
            // Объединение ячеек A1:D1
            { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
          ];
          ws2['!merges'] = [
            // Объединение ячеек A1:D1
            { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
          ];
          ws3['!merges'] = [
            // Объединение ячеек A1:D1
            { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
          ];   
        XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");
        XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");
        XLSX.utils.book_append_sheet(wb, ws3, "Sheet3");
  
        const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
  
        const s2ab = s => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        };
  
        const blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'});
        const url = URL.createObjectURL(blob);
        const a = $('<a />', {
            href: url,
            download: 'tables_data.xlsx',
            style: 'display: none'
        }).appendTo('body');
  
        a[0].click();
        a.remove();
    }
  }