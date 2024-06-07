if (window.jQuery) {
    //DOM-элементы
    const $tables = $('.data-tables')
    const $input = $("#input")
    const $equivalentTable = $("#equivalent")
    const $submitBtn = $("#formBtn")
    const $tableBtn = $("#tableBtn")
    const $result = $(".result")
    const $width = $('#width')
    const $height = $('#height')

    //Тест ввода

      $input.on('change',function(e){
        e.preventDefault();
        
        const file = e.target.files[0];
        const reader = new FileReader(); 
        reader.onload = ({ target }) => {
        
        const img = new Image(); 
        
        img.src = target.result;
        
        img.onload = () => {
          
          img.style.maxHeight ='300px'
          $width.text(img.width)
          $height.text(img.height)
          if(file.size > 5 * 1024 * 1024 || file.size < 500 * 1024) { // Ограничение размера от 500КБ до 5МБ
            $result.text('Ошибка: Недопустимый размер изображения')
          }
          else if(/[!@#$%^&*а-яёА-ЯЁ]/i.test($input.val())){ // Проверка на наличие кириллицы и специальных символов
            $result.text('Ошибка: Имя файла не должно содержать символы и буквы кириллицы')
          }
          else if(file.width < 250) { // Ограничение величины изображения
            $result.text('Ошибка: Изображение слишком маленькое')
          }
          else if(file.name.length > 15 || file.name.length < 3){ // Ограничение количества символов в названии
            $result.text('Ошибка: Название изображения слишком длинное/короткое')
          }
          else if(!file.name.endsWith('jpeg') && !file.name.endsWith('png')){ // Проверка формата изображения
            $result.text('Ошибка: Неверный формат изображения')
          }
          else{
            $result.text('Успех')
            $result.append(img)  
          }  
              $equivalentTable.append(`
              <tr><td><p>`+file.name+`</p>
              <p>Размер: `+Math.round(file.size / 1024)+` КБ</p>
              <p>Ширина: `+$width.text()+`px</p>
              <p>Высота: `+$height.text()+`px</p></td>
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

        };
        
 
     

      
      };
      
      reader.readAsDataURL(file);
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
                          // Иначе берем текстовое содержимое всех <p> элементов внутри ячейки
                          const paragraphs = $cell.find('p').map(function() {
                              return $(this).text().trim();
                          }).get().join(' ');
      
                          // Если нет <p> элементов, берем текстовое содержимое ячейки
                          if (paragraphs) {
                              cellValue = paragraphs;
                          } else {
                              cellValue = $cell.clone().children().remove().end().text().trim();
                          }
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