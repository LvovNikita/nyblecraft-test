curl -X POST localhost:3000/auth/login \
    --cookie-jar - \
    -H "Content-Type: application/json" \
    -d '{ "email": "alice@mail.com", "password": "qwerty" }' 