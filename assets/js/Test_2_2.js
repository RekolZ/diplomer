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

        ws1['!merges'] = [
            // Объединение ячеек A1:D1
            { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
            // Объединение ячеек A2:B2 (если требуется)
            { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }
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