# DASH&CASH by Zero-two

## 구현 기능 안내

### 지갑 생성

- Dash 코인 SDK 활용하여 니모닉 발급 & 지갑 생성
- 니모닉 값, 패스워드 암호화 하여 DB 저장
- 지갑 생성 시 크롬 스토리지에 니모닉 값 저장

https://user-images.githubusercontent.com/40445771/196066952-feb95225-8473-4c8d-bf45-d7cb9decb196.mov

### 지갑 가져오기

- 니모닉 값으로 지갑 정보 찾기
- 사용자 패스워드로 지갑 정보 찾기(보완필요)

https://user-images.githubusercontent.com/40445771/196067569-23288fc9-0e21-44ae-9be8-11d3252ca9f1.mov

https://user-images.githubusercontent.com/40445771/196067040-43a5c6e1-6aa2-44bb-b990-2fa0abdf720f.mov

### 잔액 조회(미구현)

- 블록 기록을 가져와서 잔액 계산하는 로직 필요

![wallet-balance](https://user-images.githubusercontent.com/40445771/196067084-614384a3-3676-44d8-b759-8652ab7190bb.png)

### 송금

- 크롬 스토리지에 저장된 니모닉 값 활용하여 토큰 전송
- Dash 코인 SDK 활용하여 토큰 전송
- 수수료 고정

https://user-images.githubusercontent.com/40445771/196067292-7376e485-96fb-4b08-bbac-66263c0db38e.mov

## 클라이언트 실행 방법

1. 패키지 설치 (Node ver:14)

```bash
npm i
```

2. 빌드 파일 생성

```bash
npm run build
```

3. 빌드 파일 업로드

## 서버 실행 방법

1. 아래 쿼리문으로 DB 스키마 구현

```
CREATE TABLE test (
    HMnemonic VARCHAR(250) NOT NULL DEFAULT '0' COLLATE         'utf8mb4_general_ci',
    passwd VARCHAR(250) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
    address VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
    salt VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    seq BIGINT(20) NOT NULL AUTO_INCREMENT,
    Indate DATETIME NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (HMnemonic) USING BTREE,
    UNIQUE INDEX address (address) USING BTREE,
    INDEX seq (seq) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
```

2. server 디렉토리로 이동 후 패키지 설치 (Node ver:14)

3. db-config 파일 참고하여 maria DB 설정

4. 아래 명령어로 서버 실행

```bash
node app.js
```
