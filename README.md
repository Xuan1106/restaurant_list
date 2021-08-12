# Restaurant List

<br>

使用Node.js、Express打造的餐廳打造的餐廳美食網站

## 專案畫面
![image](/photo/專案首頁.png)
![image](/photo/專案註冊.png)
![image](/photo/專案詳細.png)

## Feature - 產品功能

<br>

1. 使用者可以瀏覽所有餐廳
2. 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
3. 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
4. 使用者可以新增一家餐廳
5. 使用者可以編輯一家餐廳
6. 使用者可以刪除一家餐廳
7. 此用者可以註冊帳號
8. 使用者可以使用Facebook登入使用服務

## 安裝流程

<br>

1. 藉由 git clone 將專案下載至本地
```
git clone https://github.com/Xuan1106/restaurant_list
```
2. 進入專案資料夾
```
cd restaurant-list
```
3. 安裝套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```
5. 複製dotenv example
```

cp .env.example .env
```
6. 啟動網頁伺服器
```
npm run dev
```
7. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

The server is running on http://localhost:3000

8. 預設使用者
- 使用者一 帳號：user1@example.com 密碼：12345678
- 使用者二 帳號：user2@example.com 密碼：12345678

### Prerequisites - 使用工具

- Visual Studio Code 
- Node.js
- Bcryptjs 2.4.3
- Connect-flash 0.1.1
- Dotenv 10.0.0
- Express 4.17.1
- Express-handlebars 5.3.2
- Express-session 1.17.2
- Method-override 3.0.0
- Mongoose 5.13.2
- Passport 0.4.1
- Passport-facebook 3.0.0
- Passport-local 1.0.0