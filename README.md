# TestTutor

### Описание

Этот проект представляет собой веб-приложение для тестирования различных сценариев (тест-кейсов). Пользователь взаимодействует с системой, вводя данные, и оценивает, корректно ли приложение реагирует на введённую информацию. Проект идеально подходит для изучения основ тестирования или проверки работы веб-интерфейсов. 

### Особенности

- **Интерактивность:** Пользователь вводит данные, наблюдает реакцию приложения и вручную отмечает, была ли реакция корректной.
- **Журналирование:** Все действия пользователя записываются в табличку в правой части экрана, где указаны:
  - Введённые данные
  - Реакция приложения
  - Переключатель для указания правильности реакции
- **Экспорт:** После выполнения всех тест-кейсов таблицу можно скачать в формате Excel одним нажатием кнопки.
- **Категории:** Задачи разделены на разные категории для структурированного тестирования.

### Использование

Приложение доступно по адресу:
[http://188.234.244.32/0_checklist/index.html](http://188.234.244.32/0_checklist/index.html)

1. Выберите категорию задач.
2. Вводите данные в соответствующие поля.
3. Смотрите реакцию системы и отмечайте, была ли она корректной.
4. После завершения работы скачайте отчёт в формате Excel для дальнейшего анализа.

### Пример таблицы

| Вводимые данные | Результат | Статус |
|-------------------|--------------------|--------------------|
| test123           | Ошибка: неверный формат | Pass                |
| 42                | Успешно добавлено   | Pass                |
| abc@xyz.com       | Ошибка: Некорректный email | Fail               |



