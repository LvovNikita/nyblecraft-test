curl \
    -X POST localhost:3000/api/user \
    -H "Content-Type: multipart/form-data" \
    -F "image=@avatar.png" \
    -F "email=alice@mail.com" \
    -F "firstName=Alice" \
    -F "lastName=Green" \
    -F "password=qwerty"