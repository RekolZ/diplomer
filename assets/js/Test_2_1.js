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
                        const colspan = parseInt($cell.attr('colspan') || 1, 10);
                        let cellValue;
                        if ($cell.find('select').length > 0) {
                            // Если ячейка содержит элемент <select>, берем только текст выбранной опции
                            cellValue = $cell.find('select option:selected').text().trim();
                        } else {
                            // Иначе берем текстовое содержимое ячейки, включая вложенные элементы
                            cellValue = $cell.clone().children().remove().end().text().trim();
                        }
                        for (let i = 0; i < colspan; i++) {
                            row.push(cellValue);
                        }
                    });
                    rows.push(row);
                }
            });
            return rows;
        }
  
        const data1 = extractTableData($equivalentTable);

        console.log('Data 1:', data1); // Выводим данные в консоль
            
        const ws1 = XLSX.utils.aoa_to_sheet(data1);

        // Объединение ячеек для "Разделение на эквивалентные классы"
        ws1['!merges'] = [
            // Объединение ячеек A1:D1
            { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
            // Объединение ячеек A2:B2 (если требуется)
            { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }
        ];
  
        XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");

  
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