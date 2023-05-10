curl \
    -X PUT localhost:3000/api/user/alice@mail.com \
    -H "Content-Type: multipart/form-data" \
    -F "image=@avatar.png" \
    -F "email=alice@mail.com"