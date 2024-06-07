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

        console.log('Data 1:', data1); // Выводим данные в консоль
            
        const ws1 = XLSX.utils.aoa_to_sheet(data1);

        ws1['!merges'] = [
          // Объединение ячеек A1:D1
          { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
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