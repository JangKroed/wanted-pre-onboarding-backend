# wanted-pre-onboarding-backend

### 1. 지원자 성명

> 장용호

<hr/>

### 2. 애플리케이션의 실행 방법

#### Node.js

GitHub Repository Clone

```
git clone https://github.com/JangKroed/wanted-pre-onboarding-backend.git
```

package.json 의존성 라이브러리 설치

```
npm install
```

.env파일 생성

```
PORT=3032

# 배포용 데이터 베이스 정보
DB_PRD_HOST=
DB_PRD_PORT=
DB_PRD_NAME=
DB_PRD_USER=
DB_PRD_PASSWORD=

# 개발용 데이터 베이스 정보
DB_DEV_HOST=
DB_DEV_PORT=
DB_DEV_NAME=
DB_DEV_USER=
DB_DEV_PASSWORD=

# 테스트용 데이터 베이스 정보
DB_TEST_HOST=
DB_TEST_PORT=
DB_TEST_NAME=
DB_TEST_USER=
DB_TEST_PASSWORD=

ACCESS_TOKEN_SECRET=#사용할 액세스 토큰 secret
REFRESH_TOKEN_SECRET=#사용할 리프레쉬 토큰 secret

# code deploy를 위한 정보
AWS_ACCESS_KEY=
AWS_ACCESS_SECRET_KEY=
S3_STORAGE_NAME=
S3_STORAGE_URL=
S3_REGION=ap-northeast-2
```

MySQL DataBase, Table 생성 - Docker compose 사용시 여기까지 동일.

```
export NODE_ENV=production && npm run db:create && npm run db:migrate
```

```
export NODE_ENV=development && npm run db:create && npm run db:migrate
```

```
export NODE_ENV=test && npm run db:create && npm run db:migrate
```

애플리케이션 실행

```
npm start
```

테스트 코드 실행

```
npm run test
```

테스트 커버리지

![image](https://blog.kakaocdn.net/dn/cAukoA/btsp8WZvmbS/kF65Ks1yfanWOliaEznPMk/img.png)

<hr/>

#### Docker Compose

Node.js 실행 과정에서 MySQL DB, Table 생성까지 동일

```
docker compose build
```

```
docker compose up
```

<hr/>

#### End Point 호출 방법

<br>

**회원가입**

```bash
curl http://localhost:3032/api/users/signup \
--header "Content-Type: application/json" \
--data-raw '{
    "email": "test@gmail.com",
    "name": "testuser",
    "password": "testpassword"
}'
```

**로그인**

```bash
curl http://localhost:3032/api/users/login \
--header "Content-Type: application/json" \
--data-raw '{
    "email": "test@gmail.com",
    "password": "testpassword"
}'
```

**게시글 작성**

```bash
curl http://localhost:3032/api/boards/ \
--header "Content-Type: application/json" \
--cookie 'accessToken: Access Token' \
--data-raw '{
    "title": "board title",
    "contents": "board contents"
}'
```

**게시글 목록조회**

```bash
curl http://localhost:3032/api/boards/?pageNum=1
```

**게시글 상세조회**

```bash
curl http://localhost:3032/api/boards/:boardId
```

**게시글 수정**

```bash
curl --request PUT http://localhost:3032/api/boards/:boardId \
--header "Content-Type: application/json" \
--cookie 'accessToken: Access Token' \
--data-raw '{
    "title": "update title",
    "content": "update contnets"
}'
```

**게시글 삭제**

```bash
curl --request DELETE http://localhost:3032/api/boards/:boardId \
--cookie 'accessToken: Access Token' \
```

<hr/>

### 3. 데이터베이스 테이블 구조

![image](https://blog.kakaocdn.net/dn/bU7fla/btsp3mLDjTs/030b8bM8O4FtY7M89QkzhK/img.png)

### 4. 구현한 API의 동작을 촬영한 데모 영상 링크

**[✨: 보러가기](https://youtu.be/wDs9JiQvTqE)**<br/>

### 5. 구현 방법 및 이유에 대한 간략한 설명

1. **Layered architecture** - 계층별 구분 및 **코드 모듈화**
2. **auth middleware** - 로그인이 필요한 서비스에 적용 및 **accessToken 만료시** refreshToken 확인 후 **재발급** 혹은 에러메세지 반환
3. **user password 암호화에 bcrypt 적용** - 해싱 알고리즘 조절 및 **단방향 hash의 장점**으로 채택
4. **config.env.js** - 할당된 NODE_ENV에 따라 배포, 개발, 테스트 환경에서 사용할 **DataBase를 각각 다르게 적용**
5. **비로그인 유저** - 회원가입, 로그인, 게시글 목록조회/상세조회 가능
6. **로그인 유저** - 게시글 작성이 가능하고 수정/삭제는 본인이 작성한 게시글만 가능

### 6. API 명세(request/response 포함)

![image](https://blog.kakaocdn.net/dn/urOzD/btsp3lM66Xm/BpLcQaaKXaUGkMlXHVpFMK/img.png)

### 7. 클라우드 환경에 배포 환경을 설계하고 애플리케이션을 배포

**[🏠: http://43.201.98.6/](http://43.201.98.6/)**<br/>

![image](https://blog.kakaocdn.net/dn/p8voe/btsp8XxkHzY/FRVwVhbiicLbeKd4SAhEaK/img.png)
