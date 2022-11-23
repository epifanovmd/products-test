# Products-test

### Installation
```sh
$ git clone https://github.com/epifanovmd/products-test.git
$ cd products-test
$ yarn
```

### Run
```sh
$ yarn prod:ssr
```
```sh
Application listening on: http://localhost:8080
```

# Тестовое задание React

## Описание

Реализовать вывод списка товаров с возможностью добавления в корзину.

[names](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03c05415-f6bb-4c22-b5eb-17f135da8593/Untitled.json)

Описание ключей в файле products.json:

- "C" - цена товара в долларах
- "G" - id группы
- "T" - id товара
- "P" - количество

[products](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8843149f-97a7-4a2b-a6be-ca897b9c6627/Untitled.json)

Файл names.json содержит названия групп и товаров по id.

## Задачи

1. Реализовать получение данных из файлов products.json и names.json с помощью HTTP клиента по интервалу 15 секунд
2. Вывести список товаров в наличии по группам, реализовать возможность добавления товара в корзину поштучно с возможностью изменения количества в корзине (соблюдать ограничения по товарам в наличии)
3. Обновлять курс доллара на рандомное значение от 50 до 80 раз в 20 секунд, при обновлении курса цена товаров должна изменяться.
   Если стоимость товара увеличивается, то подсвечивать ячейку с ценой товара красным, если уменьшается - зелёным
4. Корзина должна находиться на одной странице со списком товаров, содержать итоговую цену всех товаров и сохранять своё состояние после перезагрузки страницы

**Требования:**

- React
- Typescript
- SSR

**По желанию:**

- Emotion
- MobX-State-Tree
