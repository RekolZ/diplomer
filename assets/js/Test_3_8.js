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