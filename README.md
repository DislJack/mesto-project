
# Проект: Место

## Описание

Проект "Место" создан для того, чтобы показать красоты и разнообразие мира без сложных, 
интерактивных элементов. Простой дизайн, приятный глазу.

## Функциональность

Проект реализован в относительных размерах, без использования пиксельных значений. 

Пиксельные значения использовались, только для тех иконок, которые другим способом задать не 
получалось возможным. (Логотип и малые иконки)

Проект написан с использованием Flex и Grid элементов, а так же имеет скрытые элементы, которые
пока что появляются с добавлением определённых классов. Одним из таких элементов является 
секция popup, которая появляется при добавлении класса popup_opened. 

Секция Elements, а также часть секции profile - profile__info реализована как Grid элемент, с отступом. 

## Адаптивность

Проект Место является адаптивным проектом, в котором ключевыми брейкпоинтами, являются:

1. 1280px+  -  основное разрешение разработки. На больших экранах, размеры более 1280px не растягивваются
2. 1024px - промежуточный брейкпоинт, не указанный в брифе. Добавлен, чтобы удобно и красиво видоизменялся
сайт.
3. 768px - размер разрешений мобильных устройств. На этом интервале элементы веб-сайта выстраиваются как на
макете 320px.

Мобильная версия на 320px реализована переходом max-width: 767px. Все экраны, меньшие этого значения,
автоматически будут открывать мобильную версию веб-сайта.

## Файловая структура

Файловая структура организована по системе БЭМ Nested, где каждый элемент разбит на соответсвующий блок.
Блоки в свою очередь соединяются в единое целое и получается готовая секция.

Все блоки импортируются в файл index.css, включая файл normalize.css и fonts.css. 

## Шрифты

В проекте используются 1 вид шрифта Inter с начертанием 400, 500 и 900. 

Дублирующими шрифтами являются Arial и любой другой шрифт вида sans-serif.