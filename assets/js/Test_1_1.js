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
        $result.text("Ошибка: Вы ввели не числовое значение")
        lastRange.removeAttr('class')
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
          <img src="../assets/img/cross.png" alt="">
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
        target.setAttribute('src', '../assets/img/undo.png')
        target.setAttribute('alt', 'undo.png')
      }
      else{
        row.classList.remove('remove')
        target.setAttribute('src', '../assets/img/cross.png')
        target.setAttribute('alt', 'cross.png')
      } 
    })

    //СФОРМИРОВАТЬ ЧЕКЛИСТ
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