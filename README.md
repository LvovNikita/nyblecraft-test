# Тестовое задание

* DB: MySQL
* ORM: Prisma

# Для запуска:

В .env-файле указать DATABASE_URL=mysql://...

```
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## CRUD-операции над пользователями

Создать пользователя:

```
curl \
    -X POST localhost:3000/api/user \
    -H "Content-Type: multipart/form-data" \
    -F "image=@avatar.png" \
    -F "email=alice@mail.com" \
    -F "firstName=Alice" \
    -F "lastName=Green" \
    -F "password=qwerty"
```

Получить информацию о пользователе:

```
curl localhost:3000/api/user/alice@mail.com
```

Получить информацию о пользователях:

```
curl localhost:3000/api/users
```

Удалить пользователя:

```
curl -X DELETE localhost:3000/api/user/alice@mail.com
```

Обновить информацию о пользователе:

```
curl \
    -X PUT localhost:3000/api/user/alice@mail.com \
    -H "Content-Type: multipart/form-data" \
    -F "image=@avatar.png" \
    -F "email=alice@mail.com"
```

## Генерация PDF-файла с сохранением в БД

```
curl -X POST localhost:3000/api/user/createPdf \
    -H "Content-Type: application/json" \
    -d '{"email": "alice@mail.com"}'
```

## Авторизация

Вход:

```
curl -X POST localhost:3000/auth/login \
    --cookie-jar - \
    -H "Content-Type: application/json" \
    -d '{ "email": "alice@mail.com", "password": "qwerty" }' 
```



Доступ к конечной точке, требующей авторизации:

(из запроса выше извлечь connect.sid и подставить вместо многоточия)

```
curl --cookie "connect.sid=..." localhost:3000/api/protected
```