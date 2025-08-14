module.exports = [
  {
    "id": 2,
    "title": "Смена каталога",
    "group": "Операции с файловой системой",
    "description": "Перейдите в каталог `/var/log`",
    "command": "cd /var/log",
    "hint": "Используйте команду для смены директории. Чтобы вернуться в домашний каталог, используйте специальный символ или просто команду без параметров.<br><br><strong>Синтаксис:</strong> <span class='code'>cd [путь]</span><br><strong>Примеры:</strong><br>- <span class='code'>cd /home/user</span> - перейти в указанную директорию<br>- <span class='code'>cd ..</span> - перейти на уровень выше<br>- <span class='code'>cd ~</span> - перейти в домашний каталог<br>- <span class='code'>cd</span> - перейти в домашний каталог",
    "newGroup": ""
  },
  {
    "id": 3,
    "title": "Создать каталог",
    "group": "Операции с файловой системой",
    "description": "Создайте каталог с именем `test_folder` в текущей папке.",
    "command": "mkdir test_folder",
    "hint": "Используйте команду для создания директорий. Для создания нескольких вложенных папок добавьте специальный флаг.<br><br><strong>Синтаксис:</strong> <span class='code'>mkdir [опции] имя_директории</span><br><strong>Флаги:</strong><br>- <span class='code'>-p</span> - создавать родительские директории при необходимости<br>- <span class='code'>-m</span> - установить права доступа<br><strong>Примеры:</strong><br>- <span class='code'>mkdir folder</span> - создать директорию<br>- <span class='code'>mkdir -p dir1/dir2/dir3</span> - создать вложенные директории",
    "newGroup": ""
  },
  {
    "id": 4,
    "title": "Создать пустой файл",
    "group": "Операции с файловой системой",
    "description": "Создайте пустой файл с именем `example.txt`.",
    "command": "touch example.txt",
    "hint": "Используйте команду, которая может создавать файлы или обновлять время их изменения.<br><br><strong>Синтаксис:</strong> <span class='code'>touch [опции] файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-a</span> - изменить только время доступа<br>- <span class='code'>-m</span> - изменить только время модификации<br>- <span class='code'>-c</span> - не создавать файл, если он не существует<br><strong>Примеры:</strong><br>- <span class='code'>touch file.txt</span> - создать пустой файл<br>- <span class='code'>touch -a file.txt</span> - обновить время доступа"
  },
  {
    "id": 5,
    "title": "Копировать файл",
    "group": "Операции с файловой системой",
    "description": "Скопируйте файл `example.txt` в директорию `backup` (предполагается, что она существует).",
    "command": "cp example.txt backup/",
    "hint": "Используйте команду копирования. Для копирования всей директории рекурсивно добавьте специальный флаг.<br><br><strong>Синтаксис:</strong> <span class='code'>cp [опции] источник назначение</span><br><strong>Флаги:</strong><br>- <span class='code'>-r</span> - рекурсивное копирование директорий<br>- <span class='code'>-p</span> - сохранить атрибуты файлов<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-i</span> - интерактивный режим<br><strong>Примеры:</strong><br>- <span class='code'>cp file.txt backup/</span> - скопировать файл<br>- <span class='code'>cp -r dir1 dir2</span> - скопировать директорию рекурсивно"
  },
  {
    "id": 6,
    "title": "Переименовать файл",
    "group": "Операции с файловой системой",
    "description": "Переименуйте файл `example.txt` в `new_name.txt`",
    "command": "mv example.txt new_name.txt",
    "hint": "Используйте команду перемещения файлов - она также может переименовывать их.<br><br><strong>Синтаксис:</strong> <span class='code'>mv [опции] источник назначение</span><br><strong>Флаги:</strong><br>- <span class='code'>-i</span> - интерактивный режим<br>- <span class='code'>-f</span> - принудительное выполнение<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-n</span> - не перезаписывать существующие файлы<br><strong>Примеры:</strong><br>- <span class='code'>mv old.txt new.txt</span> - переименовать файл<br>- <span class='code'>mv file.txt /path/to/dir/</span> - переместить файл",
    "newGroup": ""
  },
  {
    "id": 7,
    "title": "Удалить файл",
    "group": "Операции с файловой системой",
    "description": "Удалите файл `new_name.txt`.",
    "command": "rm new_name.txt",
    "hint": "Используйте команду удаления. Для удаления директории добавьте специальный флаг.<br><br><strong>Синтаксис:</strong> <span class='code'>rm [опции] файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-r</span> - рекурсивное удаление директорий<br>- <span class='code'>-f</span> - принудительное удаление без подтверждения<br>- <span class='code'>-i</span> - интерактивный режим<br>- <span class='code'>-v</span> - подробный вывод<br><strong>Примеры:</strong><br>- <span class='code'>rm file.txt</span> - удалить файл<br>- <span class='code'>rm -r directory</span> - удалить директорию рекурсивно"
  },
  {
    "id": 8,
    "title": "Показать текущий каталог",
    "group": "Операции с файловой системой",
    "description": "Узнайте полный путь текущего рабочего каталога.",
    "command": "pwd",
    "hint": "Используйте команду, которая показывает текущий рабочий каталог.<br><br><strong>Синтаксис:</strong> <span class='code'>pwd [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>-L</span> - логический путь (по умолчанию)<br>- <span class='code'>-P</span> - физический путь<br><strong>Примеры:</strong><br>- <span class='code'>pwd</span> - показать текущий путь<br>- <span class='code'>pwd -P</span> - показать физический путь"
  },
  {
    "id": 9,
    "title": "Найти файлы",
    "group": "Операции с файловой системой",
    "description": "Найдите все файлы с расширением `.log` в директории `/var/log`.",
    "command": "find /var/log -name \"*.log\"",
    "hint": "Используйте команду поиска файлов с указанием директории и шаблона имени.<br><br><strong>Синтаксис:</strong> <span class='code'>find путь критерии</span><br><strong>Основные критерии:</strong><br>- <span class='code'>-name</span> - поиск по имени файла<br>- <span class='code'>-type</span> - поиск по типу (f-файл, d-директория)<br>- <span class='code'>-size</span> - поиск по размеру<br>- <span class='code'>-mtime</span> - поиск по времени модификации<br><strong>Примеры:</strong><br>- <span class='code'>find . -name \"*.txt\"</span> - найти все .txt файлы<br>- <span class='code'>find /home -type f -size +1M</span> - найти файлы больше 1MB"
  },
  {
    "id": 10,
    "title": "Просмотреть содержимое файла",
    "group": "Операции с файловой системой",
    "description": "Отобразите содержимое файла `/etc/passwd` в терминале.",
    "command": "cat /etc/passwd",
    "hint": "Используйте команду для вывода содержимого файла. Для постраничного просмотра есть другая команда.<br><br><strong>Синтаксис:</strong> <span class='code'>cat [опции] файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-n</span> - пронумеровать строки<br>- <span class='code'>-b</span> - пронумеровать только непустые строки<br>- <span class='code'>-s</span> - сжать повторяющиеся пустые строки<br>- <span class='code'>-A</span> - показать невидимые символы<br><strong>Примеры:</strong><br>- <span class='code'>cat file.txt</span> - показать содержимое<br>- <span class='code'>cat -n file.txt</span> - показать с номерами строк"
  },
  {
    "id": 11,
    "title": "Изменение прав доступа (цифровой формат)",
    "group": "Операции с файловой системой",
    "description": "Установите права `755` на файл `script.sh` (владелец: чтение-запись-выполнение, группа и остальные: чтение-выполнение).",
    "command": "chmod",
    "hint": "Используйте команду изменения прав доступа с цифровым форматом.<br><br><strong>Синтаксис:</strong> <span class='code'>chmod [опции] режим файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивное изменение<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-f</span> - подавить сообщения об ошибках<br><strong>Цифровые права:</strong><br>- <span class='code'>4</span> - чтение (r)<br>- <span class='code'>2</span> - запись (w)<br>- <span class='code'>1</span> - выполнение (x)<br><strong>Примеры:</strong><br>- <span class='code'>chmod 755 file.sh</span> - установить права 755<br>- <span class='code'>chmod -R 644 directory</span> - рекурсивно установить права 644"
  },
  {
    "id": 12,
    "title": "Изменение прав доступа (символьный формат)",
    "group": "Операции с файловой системой",
    "description": "Добавьте право на выполнение (`+x`) для владельца файла `script.sh`.",
    "command": "chmod",
    "hint": "Используйте команду изменения прав доступа с символьным форматом.<br><br><strong>Синтаксис:</strong> <span class='code'>chmod [опции] [ugoa][+-=][rwxXst] файл</span><br><strong>Кто:</strong><br>- <span class='code'>u</span> - владелец (user)<br>- <span class='code'>g</span> - группа (group)<br>- <span class='code'>o</span> - остальные (others)<br>- <span class='code'>a</span> - все (all)<br><strong>Действия:</strong><br>- <span class='code'>+</span> - добавить права<br>- <span class='code'>-</span> - убрать права<br>- <span class='code'>=</span> - установить точно<br><strong>Права:</strong><br>- <span class='code'>r</span> - чтение, <span class='code'>w</span> - запись, <span class='code'>x</span> - выполнение<br><strong>Примеры:</strong><br>- <span class='code'>chmod u+x file.sh</span> - добавить выполнение владельцу<br>- <span class='code'>chmod go-w file.txt</span> - убрать запись у группы и остальных"
  },
  {
    "id": 13,
    "title": "Рекурсивное изменение прав для директории",
    "group": "Операции с файловой системой",
    "description": "Установите права `755` для директории `my_project` и всех её содержимого.",
    "command": "chmod",
    "hint": "Используйте команду изменения прав доступа с флагом для рекурсивного применения.<br><br><strong>Синтаксис:</strong> <span class='code'>chmod -R [опции] режим директория</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивное изменение (обязательно)<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-f</span> - подавить ошибки<br><strong>Примеры:</strong><br>- <span class='code'>chmod -R 755 directory</span> - рекурсивно установить права 755<br>- <span class='code'>chmod -R u+rw,g+r,o-rwx directory</span> - рекурсивно изменить права символьным способом<br><br><strong>Важно:</strong> Будьте осторожны с рекурсивными операциями, чтобы случайно не изменить права системных файлов!"
  },
  {
    "id": 14,
    "title": "Изменение владельца файла",
    "group": "Операции с файловой системой",
    "description": "Смените владельца файла `data.txt` на пользователя `admin`.",
    "command": "chown",
    "hint": "Используйте команду изменения владельца файла.<br><br><strong>Синтаксис:</strong> <span class='code'>chown [опции] владелец[:группа] файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивное изменение<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-f</span> - подавить ошибки<br>- <span class='code'>-h</span> - изменить символические ссылки<br><strong>Примеры:</strong><br>- <span class='code'>chown user file.txt</span> - изменить владельца<br>- <span class='code'>chown user:group file.txt</span> - изменить владельца и группу<br><br><strong>Примечание:</strong> Требуются права <span class='code'>root</span> или <span class='code'>sudo</span>."
  },
  {
    "id": 15,
    "title": "Изменение владельца и группы рекурсивно",
    "group": "Операции с файловой системой",
    "description": "Назначьте владельца `admin` и группу `developers` для всей директории `/var/www`.",
    "command": "chown",
    "hint": "Используйте команду изменения владельца с флагом для рекурсивного применения и указанием владельца и группы.<br><br><strong>Синтаксис:</strong> <span class='code'>chown -R [опции] владелец[:группа] директория</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивное изменение (обязательно)<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-f</span> - подавить ошибки<br><strong>Примеры:</strong><br>- <span class='code'>chown -R admin:developers /var/www</span> - рекурсивно изменить владельца и группу<br>- <span class='code'>chown -R user directory</span> - рекурсивно изменить только владельца"
  },
  {
    "id": 16,
    "title": "Изменение группы файла",
    "group": "Операции с файловой системой",
    "description": "Смените группу файла `report.pdf` на `accounting`.",
    "command": "chgrp",
    "hint": "Используйте команду изменения группы файла.<br><br><strong>Синтаксис:</strong> <span class='code'>chgrp [опции] группа файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивное изменение<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-f</span> - подавить ошибки<br>- <span class='code'>-h</span> - изменить символические ссылки<br><strong>Примеры:</strong><br>- <span class='code'>chgrp developers file.txt</span> - изменить группу файла<br>- <span class='code'>chgrp -R staff directory</span> - рекурсивно изменить группу<br><br><strong>Примечание:</strong> Группа должна существовать в системе."
  },
  {
    "id": 17,
    "title": "Смена группы рекурсивно",
    "group": "Операции с файловой системой",
    "description": "Назначьте группу `staff` для всех файлов в директории `/shared/docs`.",
    "command": "chgrp",
    "hint": "Используйте команду изменения группы с флагом для рекурсивного применения.<br><br><strong>Синтаксис:</strong> <span class='code'>chgrp -R [опции] группа директория</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивное изменение (обязательно)<br>- <span class='code'>-v</span> - подробный вывод<br>- <span class='code'>-f</span> - подавить ошибки<br><strong>Примеры:</strong><br>- <span class='code'>chgrp -R staff /shared/docs</span> - рекурсивно изменить группу<br>- <span class='code'>chgrp -R -v developers project</span> - рекурсивно изменить с подробным выводом"
  },
  {
    "id": 19,
    "title": "Проверка прав и владельцев",
    "group": "Операции с файловой системой",
    "description": "Выведите список файлов в `/var/log/` с отображением прав и владельцев.",
    "command": "ls",
    "hint": "Используйте команду списка файлов с флагом для подробного вывода.<br><br><strong>Синтаксис:</strong> <span class='code'>ls [опции] [файл/директория]</span><br><strong>Флаги:</strong><br>- <span class='code'>-l</span> - подробный формат (права, владелец, размер, дата)<br>- <span class='code'>-a</span> - показать скрытые файлы<br>- <span class='code'>-h</span> - размер в человекочитаемом формате<br>- <span class='code'>-R</span> - рекурсивный вывод<br>- <span class='code'>-t</span> - сортировка по времени<br><strong>Примеры:</strong><br>- <span class='code'>ls -l</span> - подробный список<br>- <span class='code'>ls -la</span> - подробный список со скрытыми файлами<br>- <span class='code'>ls -lh</span> - размер в KB/MB/GB<br><br><strong>Пояснение:</strong><br>- Первый столбец показывает права (например, <span class='code'>-rw-r--r--</span>).<br>- Третий и четвёртый столбцы — владелец и группа."
  },
  {
    "id": 20,
    "title": "Создать нового пользователя",
    "group": "Операции с пользователями и группами",
    "description": "Создайте нового пользователя с именем `newuser`.",
    "command": "useradd newuser",
    "hint": "Используйте команду добавления пользователя. Для установки пароля воспользуйтесь отдельной командой.<br><br><strong>Синтаксис:</strong> <span class='code'>useradd [опции] имя_пользователя</span><br><strong>Флаги:</strong><br>- <span class='code'>-m</span> - создать домашнюю директорию<br>- <span class='code'>-s</span> - указать оболочку<br>- <span class='code'>-g</span> - указать основную группу<br>- <span class='code'>-G</span> - указать дополнительные группы<br>- <span class='code'>-c</span> - добавить комментарий<br><strong>Примеры:</strong><br>- <span class='code'>useradd -m -s /bin/bash user1</span> - создать пользователя с домашней директорией<br>- <span class='code'>useradd -g developers -G sudo user2</span> - создать пользователя в группе developers и sudo"
  },
  {
    "id": 21,
    "title": "Установить пароль пользователю",
    "group": "Операции с пользователями и группами",
    "description": "Установите пароль для пользователя `newuser`.",
    "command": "passwd newuser",
    "hint": "Используйте команду установки пароля, затем следуйте подсказкам для ввода пароля.<br><br><strong>Синтаксис:</strong> <span class='code'>passwd [опции] [пользователь]</span><br><strong>Флаги:</strong><br>- <span class='code'>-d</span> - удалить пароль<br>- <span class='code'>-l</span> - заблокировать аккаунт<br>- <span class='code'>-u</span> - разблокировать аккаунт<br>- <span class='code'>-e</span> - принудить смену пароля при следующем входе<br><strong>Примеры:</strong><br>- <span class='code'>passwd</span> - изменить пароль текущего пользователя<br>- <span class='code'>passwd user1</span> - изменить пароль пользователя user1<br>- <span class='code'>passwd -l user1</span> - заблокировать пользователя"
  },
  {
    "id": 22,
    "title": "Создать новую группу",
    "group": "Операции с пользователями и группами",
    "description": "Создайте новую группу с именем `developers`.",
    "command": "groupadd developers",
    "hint": "Используйте команду добавления группы.<br><br><strong>Синтаксис:</strong> <span class='code'>groupadd [опции] имя_группы</span><br><strong>Флаги:</strong><br>- <span class='code'>-g</span> - указать GID (идентификатор группы)<br>- <span class='code'>-r</span> - создать системную группу<br>- <span class='code'>-f</span> - принудительное создание (если группа существует)<br><strong>Примеры:</strong><br>- <span class='code'>groupadd developers</span> - создать группу developers<br>- <span class='code'>groupadd -g 1001 testgroup</span> - создать группу с указанным GID<br>- <span class='code'>groupadd -r systemgroup</span> - создать системную группу"
  },
  {
    "id": 23,
    "title": "Добавить пользователя в группу",
    "group": "Операции с пользователями и группами",
    "description": "Добавьте пользователя `newuser` в группу `developers`.",
    "command": "usermod -aG developers newuser",
    "hint": "Используйте команду модификации пользователя с флагами для добавления в группу без удаления из других групп.<br><br><strong>Синтаксис:</strong> <span class='code'>usermod [опции] имя_пользователя</span><br><strong>Флаги:</strong><br>- <span class='code'>-aG</span> - добавить в дополнительные группы (append to groups)<br>- <span class='code'>-g</span> - изменить основную группу<br>- <span class='code'>-l</span> - изменить логин<br>- <span class='code'>-d</span> - изменить домашнюю директорию<br>- <span class='code'>-s</span> - изменить оболочку<br><strong>Примеры:</strong><br>- <span class='code'>usermod -aG sudo user1</span> - добавить пользователя в группу sudo<br>- <span class='code'>usermod -g developers user1</span> - изменить основную группу<br>- <span class='code'>usermod -l newname oldname</span> - переименовать пользователя"
  },
  {
    "id": 24,
    "title": "Просмотреть группы пользователя",
    "group": "Операции с пользователями и группами",
    "description": "Выведите список групп, в которых состоит пользователь `newuser`.",
    "command": "groups newuser",
    "hint": "Используйте команду для просмотра групп пользователя или команду для более подробной информации о пользователе.<br><br><strong>Синтаксис:</strong> <span class='code'>groups [пользователь]</span><br><strong>Альтернативы:</strong><br>- <span class='code'>id [пользователь]</span> - показать UID, GID и группы<br>- <span class='code'>getent group</span> - показать все группы<br><strong>Примеры:</strong><br>- <span class='code'>groups</span> - показать группы текущего пользователя<br>- <span class='code'>groups user1</span> - показать группы пользователя user1<br>- <span class='code'>id user1</span> - показать подробную информацию о пользователе"
  },
  {
    "id": 25,
    "title": "Удалить пользователя из группы",
    "group": "Операции с пользователями и группами",
    "description": "Удалите пользователя `newuser` из группы `developers`.",
    "command": "gpasswd -d newuser developers",
    "hint": "Используйте команду управления паролями групп с флагом удаления пользователя.<br><br><strong>Синтаксис:</strong> <span class='code'>gpasswd [опции] группа</span><br><strong>Флаги:</strong><br>- <span class='code'>-d</span> - удалить пользователя из группы<br>- <span class='code'>-a</span> - добавить пользователя в группу<br>- <span class='code'>-M</span> - установить список администраторов группы<br>- <span class='code'>-r</span> - удалить пароль группы<br><strong>Примеры:</strong><br>- <span class='code'>gpasswd -d user1 group1</span> - удалить пользователя из группы<br>- <span class='code'>gpasswd -a user1 group1</span> - добавить пользователя в группу<br>- <span class='code'>gpasswd group1</span> - установить пароль для группы"
  },
  {
    "id": 26,
    "title": "Удалить пользователя",
    "group": "Операции с пользователями и группами",
    "description": "Удалите пользователя `newuser` вместе с его домашней директорией.",
    "command": "userdel -r newuser",
    "hint": "Используйте команду удаления пользователя с флагом для удаления домашней директории.<br><br><strong>Синтаксис:</strong> <span class='code'>userdel [опции] имя_пользователя</span><br><strong>Флаги:</strong><br>- <span class='code'>-r</span> - удалить домашнюю директорию и почтовый ящик<br>- <span class='code'>-f</span> - принудительное удаление<br>- <span class='code'>-Z</span> - удалить SELinux контекст<br><strong>Примеры:</strong><br>- <span class='code'>userdel user1</span> - удалить пользователя (домашняя директория останется)<br>- <span class='code'>userdel -r user1</span> - удалить пользователя с домашней директорией<br>- <span class='code'>userdel -f user1</span> - принудительно удалить пользователя"
  },
  {
    "id": 27,
    "title": "Удалить группу",
    "group": "Операции с пользователями и группами",
    "description": "Удалите группу `developers`.",
    "command": "groupdel developers",
    "hint": "Используйте команду удаления группы. Убедитесь, что в группе нет пользователей.<br><br><strong>Синтаксис:</strong> <span class='code'>groupdel [опции] имя_группы</span><br><strong>Флаги:</strong><br>- <span class='code'>-f</span> - принудительное удаление<br>- <span class='code'>-R</span> - рекурсивно удалить пользователей из группы<br><strong>Примеры:</strong><br>- <span class='code'>groupdel group1</span> - удалить группу<br>- <span class='code'>groupdel -f group1</span> - принудительно удалить группу<br><strong>Примечание:</strong> Группа должна быть пустой (без пользователей)"
  },
  {
    "id": 28,
    "title": "Изменить имя пользователя",
    "group": "Операции с пользователями и группами",
    "description": "Измените имя пользователя `olduser` на `newuser`.",
    "command": "usermod -l newuser olduser",
    "hint": "Используйте команду модификации пользователя с флагом для изменения логина. Домашняя директория останется прежней.<br><br><strong>Синтаксис:</strong> <span class='code'>usermod -l новый_логин старый_логин</span><br><strong>Флаги:</strong><br>- <span class='code'>-l</span> - изменить логин пользователя<br>- <span class='code'>-d</span> - изменить домашнюю директорию<br>- <span class='code'>-m</span> - переместить содержимое старой домашней директории<br><strong>Примеры:</strong><br>- <span class='code'>usermod -l newname oldname</span> - переименовать пользователя<br>- <span class='code'>usermod -l -d /home/newname -m newname oldname</span> - переименовать и переместить домашнюю директорию<br><strong>Примечание:</strong> Домашняя директория останется прежней."
  },
  {
    "id": 29,
    "title": "Изменить основную группу пользователя",
    "group": "Операции с пользователями и группами",
    "description": "Измените основную группу пользователя `newuser` на `developers`.",
    "command": "usermod -g developers newuser",
    "hint": "Используйте команду модификации пользователя с флагом для изменения основной группы. Убедитесь, что группа существует.<br><br><strong>Синтаксис:</strong> <span class='code'>usermod -g группа имя_пользователя</span><br><strong>Флаги:</strong><br>- <span class='code'>-g</span> - изменить основную группу<br>- <span class='code'>-G</span> - изменить дополнительные группы<br>- <span class='code'>-aG</span> - добавить к дополнительным группам<br><strong>Примеры:</strong><br>- <span class='code'>usermod -g developers user1</span> - изменить основную группу<br>- <span class='code'>usermod -G sudo,adm user1</span> - установить дополнительные группы (заменит существующие)<br>- <span class='code'>usermod -aG sudo user1</span> - добавить к дополнительным группам<br><strong>Примечание:</strong> Убедитесь, что группа существует."
  },
  {
    "id": 30,
    "title": "Просмотр активных процессов",
    "group": "Работа с процессами",
    "description": "Выведите список всех активных процессов в системе.",
    "command": "ps aux",
    "hint": "Используйте команду для просмотра процессов с подробной информацией.<br><br><strong>Синтаксис:</strong> <span class='code'>ps [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>a</span> - показать процессы всех пользователей<br>- <span class='code'>u</span> - показать подробную информацию<br>- <span class='code'>x</span> - показать процессы без терминала<br>- <span class='code'>-e</span> - показать все процессы<br>- <span class='code'>-f</span> - полный формат вывода<br><strong>Примеры:</strong><br>- <span class='code'>ps aux</span> - все процессы с подробной информацией<br>- <span class='code'>ps -ef</span> - все процессы в полном формате<br>- <span class='code'>ps aux | grep nginx</span> - найти процессы nginx"
  },
  {
    "id": 31,
    "title": "Завершить процесс по PID",
    "group": "Работа с процессами",
    "description": "Завершите процесс с PID 1234.",
    "command": "kill 1234",
    "hint": "Используйте команду для завершения процесса по его идентификатору.<br><br><strong>Синтаксис:</strong> <span class='code'>kill [опции] PID</span><br><strong>Флаги:</strong><br>- <span class='code'>-9</span> - принудительное завершение (SIGKILL)<br>- <span class='code'>-15</span> - корректное завершение (SIGTERM)<br>- <span class='code'>-l</span> - список сигналов<br><strong>Примеры:</strong><br>- <span class='code'>kill 1234</span> - завершить процесс с PID 1234<br>- <span class='code'>kill -9 1234</span> - принудительно завершить процесс<br>- <span class='code'>kill -l</span> - показать список сигналов"
  },
  {
    "id": 32,
    "title": "Завершить процесс по имени",
    "group": "Работа с процессами",
    "description": "Завершите все процессы с именем `firefox`.",
    "command": "pkill firefox",
    "hint": "Используйте команду для завершения процессов по имени.<br><br><strong>Синтаксис:</strong> <span class='code'>pkill [опции] имя_процесса</span><br><strong>Флаги:</strong><br>- <span class='code'>-9</span> - принудительное завершение<br>- <span class='code'>-f</span> - использовать полное имя команды<br>- <span class='code'>-u</span> - указать пользователя<br><strong>Примеры:</strong><br>- <span class='code'>pkill firefox</span> - завершить все процессы firefox<br>- <span class='code'>pkill -9 firefox</span> - принудительно завершить firefox<br>- <span class='code'>pkill -u username</span> - завершить процессы пользователя"
  },
  {
    "id": 33,
    "title": "Просмотр процессов в реальном времени",
    "group": "Работа с процессами",
    "description": "Запустите интерактивный просмотр процессов в реальном времени.",
    "command": "top",
    "hint": "Используйте команду для интерактивного мониторинга процессов.<br><br><strong>Синтаксис:</strong> <span class='code'>top [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>-p</span> - показать только указанные PID<br>- <span class='code'>-u</span> - показать процессы пользователя<br>- <span class='code'>-n</span> - количество обновлений<br><strong>Примеры:</strong><br>- <span class='code'>top</span> - запустить интерактивный просмотр<br>- <span class='code'>top -p 1234,5678</span> - показать только процессы с PID 1234 и 5678<br>- <span class='code'>top -u username</span> - показать процессы пользователя"
  },
  {
    "id": 34,
    "title": "Поиск процесса по имени",
    "group": "Работа с процессами",
    "description": "Найдите все процессы, содержащие в имени `nginx`.",
    "command": "pgrep nginx",
    "hint": "Используйте команду для поиска процессов по имени и получения их PID.<br><br><strong>Синтаксис:</strong> <span class='code'>pgrep [опции] имя_процесса</span><br><strong>Флаги:</strong><br>- <span class='code'>-l</span> - показать имена процессов<br>- <span class='code'>-f</span> - использовать полное имя команды<br>- <span class='code'>-u</span> - указать пользователя<br><strong>Примеры:</strong><br>- <span class='code'>pgrep nginx</span> - найти PID процессов nginx<br>- <span class='code'>pgrep -l nginx</span> - найти процессы nginx с именами<br>- <span class='code'>pgrep -f apache</span> - найти процессы по полному имени"
  },
  {
    "id": 35,
    "title": "Изменение приоритета процесса",
    "group": "Работа с процессами",
    "description": "Измените приоритет процесса с PID 1234 на -10 (высокий приоритет).",
    "command": "renice -10 1234",
    "hint": "Используйте команду для изменения приоритета (nice value) процесса.<br><br><strong>Синтаксис:</strong> <span class='code'>renice [опции] приоритет PID</span><br><strong>Флаги:</strong><br>- <span class='code'>-p</span> - указать PID (по умолчанию)<br>- <span class='code'>-g</span> - указать группу процессов<br>- <span class='code'>-u</span> - указать пользователя<br><strong>Примеры:</strong><br>- <span class='code'>renice -10 1234</span> - установить высокий приоритет<br>- <span class='code'>renice 10 1234</span> - установить низкий приоритет<br>- <span class='code'>renice -u username 5</span> - изменить приоритет всех процессов пользователя"
  },
  {
    "id": 36,
    "title": "Запуск процесса в фоне",
    "group": "Работа с процессами",
    "description": "Запустите команду `sleep 100` в фоновом режиме.",
    "command": "sleep 100 &",
    "hint": "Используйте символ амперсанда для запуска процесса в фоновом режиме.<br><br><strong>Синтаксис:</strong> <span class='code'>команда &</span><br><strong>Управление:</strong><br>- <span class='code'>&</span> - запуск в фоне<br>- <span class='code'>jobs</span> - показать фоновые задачи<br>- <span class='code'>fg</span> - вернуть в передний план<br>- <span class='code'>bg</span> - отправить в фон<br><strong>Примеры:</strong><br>- <span class='code'>sleep 100 &</span> - запустить sleep в фоне<br>- <span class='code'>jobs</span> - показать фоновые задачи<br>- <span class='code'>fg %1</span> - вернуть задачу 1 в передний план"
  },
  {
    "id": 37,
    "title": "Просмотр фоновых задач",
    "group": "Работа с процессами",
    "description": "Выведите список всех фоновых задач текущей сессии.",
    "command": "jobs",
    "hint": "Используйте команду для просмотра фоновых задач текущей оболочки.<br><br><strong>Синтаксис:</strong> <span class='code'>jobs [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>-l</span> - показать PID задач<br>- <span class='code'>-p</span> - показать только PID<br>- <span class='code'>-r</span> - показать только запущенные задачи<br><strong>Примеры:</strong><br>- <span class='code'>jobs</span> - показать все фоновые задачи<br>- <span class='code'>jobs -l</span> - показать задачи с PID<br>- <span class='code'>fg %1</span> - вернуть задачу 1 в передний план"
  },
  {
    "id": 38,
    "title": "Завершение всех процессов пользователя",
    "group": "Работа с процессами",
    "description": "Завершите все процессы пользователя `username`.",
    "command": "killall -u username",
    "hint": "Используйте команду для завершения всех процессов пользователя.<br><br><strong>Синтаксис:</strong> <span class='code'>killall [опции] имя_процесса</span><br><strong>Флаги:</strong><br>- <span class='code'>-u</span> - указать пользователя<br>- <span class='code'>-9</span> - принудительное завершение<br>- <span class='code'>-i</span> - интерактивный режим<br><strong>Примеры:</strong><br>- <span class='code'>killall -u username</span> - завершить все процессы пользователя<br>- <span class='code'>killall firefox</span> - завершить все процессы firefox<br>- <span class='code'>killall -9 firefox</span> - принудительно завершить firefox"
  },
  {
    "id": 39,
    "title": "Мониторинг системных ресурсов",
    "group": "Работа с процессами",
    "description": "Запустите мониторинг использования CPU и памяти в реальном времени.",
    "command": "htop",
    "hint": "Используйте интерактивный мониторинг процессов с улучшенным интерфейсом.<br><br><strong>Синтаксис:</strong> <span class='code'>htop [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>-p</span> - показать только указанные PID<br>- <span class='code'>-u</span> - показать процессы пользователя<br>- <span class='code'>-d</span> - интервал обновления<br><strong>Примеры:</strong><br>- <span class='code'>htop</span> - запустить интерактивный мониторинг<br>- <span class='code'>htop -p 1234,5678</span> - показать только указанные процессы<br>- <span class='code'>htop -u username</span> - показать процессы пользователя"
  },
  {
    "id": 40,
    "title": "Проверка сетевого соединения",
    "group": "Сетевые операции",
    "description": "Проверьте доступность хоста `172.17.118.240`.",
    "command": "ping 172.17.118.240",
    "hint": "Используйте команду для проверки доступности сетевого хоста.<br><br><strong>Синтаксис:</strong> <span class='code'>ping [опции] хост</span><br><strong>Флаги:</strong><br>- <span class='code'>-c</span> - количество пакетов<br>- <span class='code'>-i</span> - интервал между пакетами<br>- <span class='code'>-s</span> - размер пакета<br>- <span class='code'>-t</span> - TTL пакета<br><strong>Примеры:</strong><br>- <span class='code'>ping 172.22.48.13</span> - проверить доступность<br>- <span class='code'>ping -c 4 google.com</span> - отправить 4 пакета<br>- <span class='code'>ping -i 2 ya.ru</span> - интервал 2 секунды"
  },
  {
    "id": 41,
    "title": "Просмотр сетевых интерфейсов",
    "group": "Сетевые операции",
    "description": "Выведите информацию о всех сетевых интерфейсах системы.",
    "command": "ip a",
    "hint": "Используйте команду для просмотра конфигурации сетевых интерфейсов.<br><br><strong>Синтаксис:</strong> <span class='code'>ip addr [опции] [show] [интерфейс]</span><br><strong>Основные опции:</strong><br>- <span class='code'>show</span> - показать интерфейсы (по умолчанию)<br>- <span class='code'>add</span> - добавить IP адрес<br>- <span class='code'>del</span> - удалить IP адрес<br>- <span class='code'>flush</span> - удалить все адреса<br><strong>Флаги:</strong><br>- <span class='code'>-4</span> - показать только IPv4 адреса<br>- <span class='code'>-6</span> - показать только IPv6 адреса<br>- <span class='code'>-s</span> - показать статистику<br>- <span class='code'>-d</span> - подробный вывод<br><strong>Примеры:</strong><br>- <span class='code'>ip addr</span> или <span class='code'>ip a</span> - показать все интерфейсы<br>- <span class='code'>ip addr show eth0</span> - показать интерфейс eth0<br>- <span class='code'>ip addr show dev eth0</span> - показать интерфейс eth0<br>- <span class='code'>ip addr add 192.168.1.100/24 dev eth0</span> - добавить IP адрес<br>- <span class='code'>ip addr del 192.168.1.100/24 dev eth0</span> - удалить IP адрес<br>- <span class='code'>ip addr -4</span> - показать только IPv4 адреса"
  },
  {
    "id": 42,
    "title": "Просмотр маршрутов",
    "group": "Сетевые операции",
    "description": "Выведите таблицу маршрутизации системы.",
    "command": "ip route",
    "hint": "Используйте команду для просмотра таблицы маршрутизации.<br><br><strong>Синтаксис:</strong> <span class='code'>ip route [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>show</span> - показать маршруты<br>- <span class='code'>add</span> - добавить маршрут<br>- <span class='code'>del</span> - удалить маршрут<br><strong>Примеры:</strong><br>- <span class='code'>ip route</span> - показать все маршруты<br>- <span class='code'>ip route show</span> - показать маршруты<br>- <span class='code'>ip route add 192.168.2.0/24 via 192.168.1.1</span> - добавить маршрут"
  },
  {
    "id": 43,
    "title": "Проверка портов",
    "group": "Сетевые операции",
    "description": "Проверьте, какие порты открыты на локальной машине.",
    "command": "netstat -tuln",
    "hint": "Используйте команду для просмотра активных сетевых соединений.<br><br><strong>Синтаксис:</strong> <span class='code'>netstat [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>-t</span> - TCP соединения<br>- <span class='code'>-u</span> - UDP соединения<br>- <span class='code'>-l</span> - только слушающие порты<br>- <span class='code'>-n</span> - показать номера портов<br>- <span class='code'>-p</span> - показать процессы<br><strong>Примеры:</strong><br>- <span class='code'>netstat -tuln</span> - все слушающие порты<br>- <span class='code'>netstat -tulnp</span> - с процессами<br>- <span class='code'>netstat -an</span> - все соединения"
  },
  {
    "id": 44,
    "title": "Сканирование портов",
    "group": "Сетевые операции",
    "description": "Просканируйте порты 1-100 на хосте `192.168.1.1`.",
    "command": "nmap -p 1-100 192.168.1.1",
    "hint": "Используйте команду для сканирования сетевых портов.<br><br><strong>Синтаксис:</strong> <span class='code'>nmap [опции] хост</span><br><strong>Флаги:</strong><br>- <span class='code'>-p</span> - указать порты<br>- <span class='code'>-sS</span> - TCP SYN сканирование<br>- <span class='code'>-sU</span> - UDP сканирование<br>- <span class='code'>-A</span> - агрессивное сканирование<br><strong>Примеры:</strong><br>- <span class='code'>nmap 192.168.1.1</span> - сканировать все порты<br>- <span class='code'>nmap -p 80,443 google.com</span> - сканировать порты 80 и 443<br>- <span class='code'>nmap -A 192.168.1.1</span> - агрессивное сканирование"
  },
  {
    "id": 45,
    "title": "Проверка DNS",
    "group": "Сетевые операции",
    "description": "Выполните DNS-запрос для домена `google.com`.",
    "command": "nslookup google.com",
    "hint": "Используйте команду для выполнения DNS-запросов.<br><br><strong>Синтаксис:</strong> <span class='code'>nslookup [опции] домен</span><br><strong>Флаги:</strong><br>- <span class='code'>-type=A</span> - запрос A записи<br>- <span class='code'>-type=MX</span> - запрос MX записи<br>- <span class='code'>-type=NS</span> - запрос NS записи<br><strong>Примеры:</strong><br>- <span class='code'>nslookup google.com</span> - получить IP адрес<br>- <span class='code'>nslookup -type=MX google.com</span> - получить MX записи<br>- <span class='code'>nslookup -type=NS google.com</span> - получить NS записи"
  },
  {
    "id": 46,
    "title": "Скачивание файла",
    "group": "Сетевые операции",
    "description": "Скачайте файл с URL `http://example.com/file.txt`.",
    "command": "wget http://example.com/file.txt",
    "hint": "Используйте команду для скачивания файлов из интернета.<br><br><strong>Синтаксис:</strong> <span class='code'>wget [опции] URL</span><br><strong>Флаги:</strong><br>- <span class='code'>-O</span> - указать имя файла<br>- <span class='code'>-c</span> - продолжить загрузку<br>- <span class='code'>-r</span> - рекурсивная загрузка<br>- <span class='code'>-q</span> - тихий режим<br><strong>Примеры:</strong><br>- <span class='code'>wget http://example.com/file.txt</span> - скачать файл<br>- <span class='code'>wget -O myfile.txt http://example.com/file.txt</span> - сохранить с другим именем<br>- <span class='code'>wget -c http://example.com/file.txt</span> - продолжить загрузку"
  },
  {
    "id": 47,
    "title": "Проверка HTTP-соединения",
    "group": "Сетевые операции",
    "description": "Проверьте доступность веб-сервера на порту 80.",
    "command": "curl -I http://google.com",
    "hint": "Используйте команду для выполнения HTTP-запросов.<br><br><strong>Синтаксис:</strong> <span class='code'>curl [опции] URL</span><br><strong>Флаги:</strong><br>- <span class='code'>-I</span> - только заголовки<br>- <span class='code'>-O</span> - сохранить с оригинальным именем<br>- <span class='code'>-o</span> - указать имя файла<br>- <span class='code'>-v</span> - подробный вывод<br><strong>Примеры:</strong><br>- <span class='code'>curl http://google.com</span> - получить содержимое<br>- <span class='code'>curl -I http://google.com</span> - получить заголовки<br>- <span class='code'>curl -O http://example.com/file.txt</span> - скачать файл"
  },
  {
    "id": 48,
    "title": "Просмотр активных соединений",
    "group": "Сетевые операции",
    "description": "Выведите список всех активных сетевых соединений.",
    "command": "ss -tuln",
    "hint": "Используйте современную команду для просмотра сокетов.<br><br><strong>Синтаксис:</strong> <span class='code'>ss [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>-t</span> - TCP соединения<br>- <span class='code'>-u</span> - UDP соединения<br>- <span class='code'>-l</span> - только слушающие<br>- <span class='code'>-n</span> - показать номера портов<br>- <span class='code'>-p</span> - показать процессы<br><strong>Примеры:</strong><br>- <span class='code'>ss -tuln</span> - все слушающие порты<br>- <span class='code'>ss -tulnp</span> - с процессами<br>- <span class='code'>ss -s</span> - статистика"
  },
  {
    "id": 49,
    "title": "Настройка сетевого интерфейса",
    "group": "Сетевые операции",
    "description": "Включите сетевой интерфейс `eth0`.",
    "command": "ip link set eth0 up",
    "hint": "Используйте команду для управления сетевыми интерфейсами.<br><br><strong>Синтаксис:</strong> <span class='code'>ip link set [опции] интерфейс</span><br><strong>Флаги:</strong><br>- <span class='code'>up</span> - включить интерфейс<br>- <span class='code'>down</span> - выключить интерфейс<br>- <span class='code'>name</span> - переименовать интерфейс<br><strong>Примеры:</strong><br>- <span class='code'>ip link set eth0 up</span> - включить интерфейс<br>- <span class='code'>ip link set eth0 down</span> - выключить интерфейс<br>- <span class='code'>ip link set eth0 name eth1</span> - переименовать интерфейс"
  },
  {
    "id": 50,
    "title": "Обновление списка пакетов",
    "group": "Работа с пакетами и сервисами",
    "description": "Обновите список доступных пакетов в системе.",
    "command": "apt update",
    "hint": "Используйте команду для обновления списка пакетов в системах на базе Debian/Ubuntu.<br><br><strong>Синтаксис:</strong> <span class='code'>apt update</span><br><strong>Флаги:</strong><br>- <span class='code'>-y</span> - автоматически отвечать 'да'<br>- <span class='code'>-q</span> - тихий режим<br>- <span class='code'>--dry-run</span> - показать что будет сделано<br><strong>Примеры:</strong><br>- <span class='code'>apt update</span> - обновить список пакетов<br>- <span class='code'>apt update -y</span> - обновить без подтверждения<br>- <span class='code'>apt update && apt upgrade</span> - обновить и установить обновления"
  },
  {
    "id": 51,
    "title": "Установка пакета",
    "group": "Работа с пакетами и сервисами",
    "description": "Установите пакет `nginx`.",
    "command": "apt install nginx",
    "hint": "Используйте команду для установки пакетов в системах на базе Debian/Ubuntu.<br><br><strong>Синтаксис:</strong> <span class='code'>apt install [опции] пакет</span><br><strong>Флаги:</strong><br>- <span class='code'>-y</span> - автоматически отвечать 'да'<br>- <span class='code'>-q</span> - тихий режим<br>- <span class='code'>--no-install-recommends</span> - не устанавливать рекомендуемые пакеты<br><strong>Примеры:</strong><br>- <span class='code'>apt install nginx</span> - установить nginx из репозитория<br>- <span class='code'>apt install -y nginx</span> - установить без подтверждения<br>- <span class='code'>apt install nginx apache2</span> - установить несколько пакетов<br>- <span class='code'>apt install ./package.deb</span> - установить локальный .deb файл<br>- <span class='code'>apt install /path/to/package.deb</span> - установить пакет по полному пути<br>- <span class='code'>dpkg -i package.deb</span> - установить .deb файл напрямую<br>- <span class='code'>dpkg -i /path/to/package.deb</span> - установить .deb файл по полному пути"
  },
  {
    "id": 52,
    "title": "Удаление пакета",
    "group": "Работа с пакетами и сервисами",
    "description": "Удалите пакет `nginx`.",
    "command": "apt remove nginx",
    "hint": "Используйте команду для удаления пакетов в системах на базе Debian/Ubuntu.<br><br><strong>Синтаксис:</strong> <span class='code'>apt remove [опции] пакет</span><br><strong>Флаги:</strong><br>- <span class='code'>-y</span> - автоматически отвечать 'да'<br>- <span class='code'>--purge</span> - удалить конфигурационные файлы<br>- <span class='code'>--auto-remove</span> - удалить неиспользуемые зависимости<br><strong>Примеры:</strong><br>- <span class='code'>apt remove nginx</span> - удалить nginx<br>- <span class='code'>apt remove --purge nginx</span> - удалить с конфигурацией<br>- <span class='code'>apt autoremove</span> - удалить неиспользуемые пакеты"
  },
  {
    "id": 53,
    "title": "Поиск пакета",
    "group": "Работа с пакетами и сервисами",
    "description": "Найдите пакеты, содержащие в названии `python`.",
    "command": "apt search python",
    "hint": "Используйте команду для поиска пакетов в репозиториях.<br><br><strong>Синтаксис:</strong> <span class='code'>apt search [опции] запрос</span><br><strong>Флаги:</strong><br>- <span class='code'>--names-only</span> - искать только по именам пакетов<br>- <span class='code'>--full</span> - полный поиск<br><strong>Примеры:</strong><br>- <span class='code'>apt search python</span> - найти пакеты с python<br>- <span class='code'>apt search --names-only python</span> - поиск по именам<br>- <span class='code'>apt show python3</span> - показать информацию о пакете"
  },
  {
    "id": 54,
    "title": "Запуск сервиса",
    "group": "Работа с пакетами и сервисами",
    "description": "Запустите сервис `nginx`.",
    "command": "systemctl start nginx",
    "hint": "Используйте команду для управления системными сервисами.<br><br><strong>Синтаксис:</strong> <span class='code'>systemctl [действие] сервис</span><br><strong>Действия:</strong><br>- <span class='code'>start</span> - запустить сервис<br>- <span class='code'>stop</span> - остановить сервис<br>- <span class='code'>restart</span> - перезапустить сервис<br>- <span class='code'>status</span> - показать статус<br><strong>Примеры:</strong><br>- <span class='code'>systemctl start nginx</span> - запустить nginx<br>- <span class='code'>systemctl stop nginx</span> - остановить nginx<br>- <span class='code'>systemctl status nginx</span> - показать статус"
  },
  {
    "id": 55,
    "title": "Остановка сервиса",
    "group": "Работа с пакетами и сервисами",
    "description": "Остановите сервис `nginx`.",
    "command": "systemctl stop nginx",
    "hint": "Используйте команду для остановки системных сервисов.<br><br><strong>Синтаксис:</strong> <span class='code'>systemctl stop сервис</span><br><strong>Действия:</strong><br>- <span class='code'>stop</span> - остановить сервис<br>- <span class='code'>start</span> - запустить сервис<br>- <span class='code'>restart</span> - перезапустить сервис<br>- <span class='code'>reload</span> - перезагрузить конфигурацию<br><strong>Примеры:</strong><br>- <span class='code'>systemctl stop nginx</span> - остановить nginx<br>- <span class='code'>systemctl restart nginx</span> - перезапустить nginx<br>- <span class='code'>systemctl reload nginx</span> - перезагрузить конфигурацию"
  },
  {
    "id": 56,
    "title": "Проверка статуса сервиса",
    "group": "Работа с пакетами и сервисами",
    "description": "Проверьте статус сервиса `nginx`.",
    "command": "systemctl status nginx",
    "hint": "Используйте команду для проверки статуса системных сервисов.<br><br><strong>Синтаксис:</strong> <span class='code'>systemctl status [опции] сервис</span><br><strong>Флаги:</strong><br>- <span class='code'>-l</span> - показать полные строки логов<br>- <span class='code'>-n</span> - количество строк логов<br>- <span class='code'>--no-pager</span> - не использовать пейджер<br><strong>Примеры:</strong><br>- <span class='code'>systemctl status nginx</span> - показать статус nginx<br>- <span class='code'>systemctl status -l nginx</span> - показать с полными логами<br>- <span class='code'>systemctl is-active nginx</span> - проверить активен ли сервис"
  },
  {
    "id": 57,
    "title": "Включение автозапуска сервиса",
    "group": "Работа с пакетами и сервисами",
    "description": "Включите автозапуск сервиса `nginx` при загрузке системы.",
    "command": "systemctl enable nginx",
    "hint": "Используйте команду для включения автозапуска системных сервисов.<br><br><strong>Синтаксис:</strong> <span class='code'>systemctl enable [опции] сервис</span><br><strong>Действия:</strong><br>- <span class='code'>enable</span> - включить автозапуск<br>- <span class='code'>disable</span> - отключить автозапуск<br>- <span class='code'>is-enabled</span> - проверить включен ли автозапуск<br><strong>Примеры:</strong><br>- <span class='code'>systemctl enable nginx</span> - включить автозапуск nginx<br>- <span class='code'>systemctl disable nginx</span> - отключить автозапуск<br>- <span class='code'>systemctl is-enabled nginx</span> - проверить автозапуск"
  },
  {
    "id": 58,
    "title": "Просмотр всех сервисов",
    "group": "Работа с пакетами и сервисами",
    "description": "Выведите список всех активных сервисов в системе.",
    "command": "systemctl list-units --type=service --state=active",
    "hint": "Используйте команду для просмотра системных сервисов.<br><br><strong>Синтаксис:</strong> <span class='code'>systemctl list-units [опции]</span><br><strong>Флаги:</strong><br>- <span class='code'>--type=service</span> - только сервисы<br>- <span class='code'>--state=active</span> - только активные<br>- <span class='code'>--all</span> - показать все<br><strong>Примеры:</strong><br>- <span class='code'>systemctl list-units --type=service</span> - все сервисы<br>- <span class='code'>systemctl list-units --type=service --state=active</span> - активные сервисы<br>- <span class='code'>systemctl list-units --failed</span> - неудачные сервисы"
  },
  {
    "id": 59,
    "title": "Просмотр логов сервиса",
    "group": "Работа с пакетами и сервисами",
    "description": "Просмотрите логи сервиса `nginx`.",
    "command": "journalctl -u nginx",
    "hint": "Используйте команду для просмотра логов системных сервисов.<br><br><strong>Синтаксис:</strong> <span class='code'>journalctl [опции] -u сервис</span><br><strong>Флаги:</strong><br>- <span class='code'>-f</span> - следить за логами в реальном времени<br>- <span class='code'>-n</span> - количество строк<br>- <span class='code'>--since</span> - показать с определенного времени<br>- <span class='code'>--until</span> - показать до определенного времени<br><strong>Примеры:</strong><br>- <span class='code'>journalctl -u nginx</span> - логи nginx<br>- <span class='code'>journalctl -u nginx -f</span> - следить за логами<br>- <span class='code'>journalctl -u nginx --since today</span> - логи за сегодня"
  },
  {
    "id": 60,
    "title": "Просмотр мандатных меток файлового объекта",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Покажите мандатные метки корневого каталога файловой системы.",
    "command": "pdp-ls -Md /",
    "hint": "Используйте команду pdp-ls для просмотра мандатных меток файловых объектов в Astra Linux.<br><br><strong>Синтаксис:</strong> <span class='code'>pdp-ls [опции] файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-M</span> - показать мандатные метки<br>- <span class='code'>-d</span> - показать информацию о каталоге<br>- <span class='code'>-l</span> - подробный формат<br><strong>Примеры:</strong><br>- <span class='code'>pdp-ls -Md /</span> - показать мандатные метки корневого каталога<br>- <span class='code'>pdp-ls -M file.txt</span> - показать мандатные метки файла<br>- <span class='code'>pdp-ls -Ml directory</span> - подробный формат с мандатными метками"
  },
  {
    "id": 61,
    "title": "Изменение классификационной метки файла",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Установите классификационную метку `1:0:0:0` для файла `document.txt`.",
    "command": "pdpl-file 1:0:0:0 document.txt",
    "hint": "Используйте команду pdpl-file для изменения классификационных меток файловых объектов в Astra Linux.<br><br><strong>Синтаксис:</strong> <span class='code'>pdpl-file [опции] метка файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивно<br>- <span class='code'>-r</span> - реверсивный порядок (для понижения меток)<br>- <span class='code'>-v</span> - подробный вывод<br><strong>Примеры:</strong><br>- <span class='code'>pdpl-file 1:0:0:0 file.txt</span> - установить классификационную метку<br>- <span class='code'>pdpl-file -R 1:0:0:0 directory</span> - рекурсивно установить метку<br>- <span class='code'>pdpl-file -R -r 0:0:0:0 directory</span> - рекурсивно понизить метки"
  },
  {
    "id": 62,
    "title": "Установка флага ccnr на каталог",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Установите флаг ccnr на каталог `/mydir` для разрешения различных меток.",
    "command": "pdpl-file -R 1:0:0:ccnr /mydir",
    "hint": "Используйте команду pdpl-file с флагом ccnr для установки специального атрибута управления доступом на каталоги.<br><br><strong>Синтаксис:</strong> <span class='code'>pdpl-file -R уровень:категории:целостность:ccnr каталог</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивно<br>- <span class='code'>ccnr</span> - контейнер может содержать объекты с различными метками<br><strong>Примеры:</strong><br>- <span class='code'>pdpl-file -R 1:0:0:ccnr /mydir</span> - установить флаг ccnr<br>- <span class='code'>pdpl-file -R 2:0:0:ccnr /mydir</span> - с более высоким уровнем<br>- <span class='code'>pdpl-file -R 1:0:0:0 /mydir</span> - убрать флаг ccnr"
  },
  {
    "id": 63,
    "title": "Понижение классификационных меток",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Понизьте классификационные метки в каталоге `/mydir` до нулевых значений.",
    "command": "pdpl-file -R -r 0:0:0:0 /mydir",
    "hint": "Используйте команду pdpl-file с флагом -r для понижения классификационных меток в реверсивном порядке.<br><br><strong>Синтаксис:</strong> <span class='code'>pdpl-file -R -r уровень:категории:целостность:тип каталог</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивно<br>- <span class='code'>-r</span> - реверсивный порядок (сначала файлы, потом каталоги)<br><strong>Примеры:</strong><br>- <span class='code'>pdpl-file -R -r 0:0:0:0 /mydir</span> - понизить до нулевых меток<br>- <span class='code'>pdpl-file -R -r 1:0:0:0 /mydir</span> - понизить до уровня 1<br>- <span class='code'>pdpl-file -r 0:0:0:0 file.txt</span> - понизить метку файла"
  },
  {
    "id": 64,
    "title": "Просмотр структуры мандатных меток",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Покажите структуру и состав метки безопасности для файла `document.txt`.",
    "command": "pdp-ls -M document.txt",
    "hint": "Используйте команду pdp-ls для просмотра структуры мандатных меток в Astra Linux.<br><br><strong>Синтаксис:</strong> <span class='code'>pdp-ls -M [опции] файл</span><br><strong>Флаги:</strong><br>- <span class='code'>-M</span> - показать мандатные метки<br>- <span class='code'>-l</span> - подробный формат<br>- <span class='code'>-d</span> - для каталогов<br><strong>Примеры:</strong><br>- <span class='code'>pdp-ls -M file.txt</span> - показать структуру метки файла<br>- <span class='code'>pdp-ls -Ml file.txt</span> - подробный формат с метками<br>- <span class='code'>pdp-ls -Md directory</span> - показать метки каталога"
  },
  {
    "id": 65,
    "title": "Создание каталога с мандатными метками",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Создайте каталог `/mydir0` и покажите его мандатные метки.",
    "command": "mkdir /mydir0 && pdp-ls -Md /mydir0",
    "hint": "Используйте команду mkdir для создания каталога и pdp-ls для просмотра его мандатных меток.<br><br><strong>Синтаксис:</strong> <span class='code'>mkdir [опции] каталог</span><br><strong>Флаги:</strong><br>- <span class='code'>-p</span> - создать родительские каталоги<br>- <span class='code'>-m</span> - установить права доступа<br><strong>Примеры:</strong><br>- <span class='code'>mkdir /mydir0</span> - создать каталог<br>- <span class='code'>mkdir -p /path/to/dir</span> - создать с родительскими каталогами<br>- <span class='code'>pdp-ls -Md /mydir0</span> - показать мандатные метки каталога"
  },
  {
    "id": 66,
    "title": "Установка максимальной классификационной метки",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Установите максимальную классификационную метку с флагом ccnr на каталог `/mydir`.",
    "command": "pdpl-file -R 3:Высокий:Категория_1,Категория_2:ccnr /mydir",
    "hint": "Используйте команду pdpl-file для установки максимальной классификационной метки с флагом ccnr.<br><br><strong>Синтаксис:</strong> <span class='code'>pdpl-file -R уровень:уровень_конфиденциальности:категории:ccnr каталог</span><br><strong>Флаги:</strong><br>- <span class='code'>-R</span> - рекурсивно<br>- <span class='code'>ccnr</span> - разрешить различные метки в контейнере<br><strong>Примеры:</strong><br>- <span class='code'>pdpl-file -R 3:Высокий:Категория_1,Категория_2:ccnr /mydir</span> - максимальная метка с ccnr<br>- <span class='code'>pdpl-file -R 2:Средний:Категория_1:ccnr /mydir</span> - средний уровень<br>- <span class='code'>pdpl-file -R 1:Низкий:Нет:ccnr /mydir</span> - низкий уровень"
  },
  {
    "id": 67,
    "title": "Просмотр мандатных меток пользователя",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Покажите мандатные метки текущего пользователя.",
    "command": "id",
    "hint": "Используйте команду id для просмотра идентификаторов пользователя, включая мандатные метки в Astra Linux.<br><br><strong>Синтаксис:</strong> <span class='code'>id [опции] [пользователь]</span><br><strong>Флаги:</strong><br>- <span class='code'>-Z</span> - показать контекст безопасности<br>- <span class='code'>-G</span> - показать группы<br>- <span class='code'>-g</span> - показать основную группу<br><strong>Примеры:</strong><br>- <span class='code'>id</span> - показать информацию о текущем пользователе<br>- <span class='code'>id -Z</span> - показать контекст безопасности<br>- <span class='code'>id username</span> - показать информацию о другом пользователе"
  },
  {
    "id": 68,
    "title": "Проверка блокировки мандатных меток",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Попробуйте установить классификационную метку `2:0:0:0` на каталог с файлами, имеющими метку `1:0:0:0`.",
    "command": "pdpl-file 2:0:0:0 /mydir1",
    "hint": "Используйте команду pdpl-file для проверки ограничений на установку мандатных меток в Astra Linux.<br><br><strong>Синтаксис:</strong> <span class='code'>pdpl-file [опции] метка каталог</span><br><strong>Ограничения:</strong><br>- Нельзя установить метку выше, чем у содержащихся файлов<br>- Нельзя установить метку ниже, чем у родительского каталога<br><strong>Примеры:</strong><br>- <span class='code'>pdpl-file 2:0:0:0 /mydir1</span> - попытка установить более высокую метку<br>- <span class='code'>pdpl-file -R 1:0:0:ccnr /mydir1</span> - сначала установить ccnr<br>- <span class='code'>pdpl-file 1:0:0:0 /mydir1</span> - установить допустимую метку"
  },
  {
    "id": 69,
    "title": "Управление типами мандатных меток",
    "group": "Операции с мандатными метками в Astra Linux",
    "description": "Установите тип метки ehole на файл `document.txt` для игнорирования мандатных правил.",
    "command": "pdpl-file 1:0:0:ehole document.txt",
    "hint": "Используйте команду pdpl-file для установки специальных типов мандатных меток в Astra Linux.<br><br><strong>Синтаксис:</strong> <span class='code'>pdpl-file уровень:категории:целостность:тип файл</span><br><strong>Типы меток:</strong><br>- <span class='code'>ehole</span> - игнорировать мандатные правила<br>- <span class='code'>ccnr</span> - контейнер с различными метками<br>- <span class='code'>ccnri</span> - контейнер с различными уровнями целостности<br><strong>Примеры:</strong><br>- <span class='code'>pdpl-file 1:0:0:ehole file.txt</span> - установить тип ehole<br>- <span class='code'>pdpl-file 1:0:0:ccnr directory</span> - установить тип ccnr<br>- <span class='code'>pdpl-file 1:0:0:ccnr,ccnri,ehole file.txt</span> - комбинированные типы"
  }
];