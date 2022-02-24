// npm
//     node package manager 약어
//     npm에 업로드된 노드 모듈을 패키지라고 함

//     package.json
//         해당 노드 프로젝트(패키지)를 실행할 때 필요한 패키지들의 버전을 관리하는 파일
//         npm init으로 package.json 설치

//         ( ) 내부는 기본값으로 나오는 것 > 다른 값을 입력하면 입력한 값으로 변경 됨

//         package name: (폴더명) 
//             > 프로젝트(패키지) 이름 입력
//         version: (1.0.0) 
//             > 프로젝트 버전 입력
//         description: 
//             > 프로젝트 설명 입력
//         entry point: index.js
//             > 자바스크립트 실행 파일 진입점. 마지막 module.exports를 하는 파일을 지정
//         test command: > npm test 에 실행될 명령어
//             > 생성 이후에 "start" : "node 파일명" 넣어주면 npm start로 사용 가능
//         git repository: 해당 프로젝트(패키지) 깃헙 주소
//             > 패키지 중 에러나 궁금증 있으면 사람들이 글 올릴 때 사용
//             > 깃헙에 연결된 폴더에서 생성할 경우 자동으로 입력 
//         keywords: > npm 공홈에서 패키지 찾을 때 사용하는 키워드
//         "keywords": [ // npm express 키워드 
//             "express",
//             "framework",
//             "sinatra",
//             "web",
//             "http",
//             "rest",
//             "restful",
//             "router",
//             "app",
//             "api"
//           ],
//         author: 이름 넣으면 됨
//         license: (ISC) > 오픈 소스라고 아무 제약 없이 사용할 수 있는 건 아님
//         > 라이센스 별로 제한 사항이 존재 ISC, MIT, BSD 라이센스를 가진 패키지를 사용할 때는 사용한 패키지와 라이센스만 밝히면 사용 가능

//         dependencies 해당 프로젝트(패키지)를 실행할 때 필요한 패키지의 정보
//         devDependencies 해당 프로젝트(패키지)를 개발할 때 사용한 패키지의 정보
//           > npm i [패키지명] -D 를 통해서 받는 패키지

//     package-lock.json
//         설치한 패키지들의 정확한 버전과 의존관계가 담김
//         패키지 설치, 삭제, 수정 시 패키지들 간의 내부 의존 관계가 저장됨

//     npm istall -g [패키지명]
//         > 해당 패키지를 전역으로 설치함
//         패키지를 현재 폴더의 node_modules에 설치하는 것이 아니라 npm이 설치되어 있는 폴더에 설치함 
//         시스템 환경 변수에 등록이 되어 콘솔에서 명령어로 사용 가능
//         > 대부분 명령어로 사용하기 위해 전역으로 설치함
//         > 단 package.json에 기록이 안됨
//         rimraf 패키지
//             > rm -rf 파일이나 폴더 지울 수 있는 명령어를 사용할 수 있음
//         devDependencies에 개발할 때 사용했다는 정보를 남기고
//         npx 를 이용하면 해당 패키지를 실행할 수 있음

//     패키지 버전
//         노드 패키지는 x.x.x 세자리로 이루어짐 예시 14.7.1
//         SemVer
//             Semantic Versioning(유의적 버전)의 약어
//             > 버전을 구성하는 세 자리가 의미를 가짐

//             첫 번째 자리 major 버전
//                 > 1부터 정식 버전
//                 > 하위 호환이 안될 정도의 패키지 내용이 수정될 경우 올림
            
//             두 번째 자리 minor 버전
//                 > 하위 호환이 되는 기능의 업데이트
            
//             세 번째 자리 patch 버전
//                 > 간단한 버그 수정의 경우

//     버전 표현 방법
//             예시 ^14.7.1, ~14.7.1, >14.7.1

//             ^14.7.1 minor 버전까지만 설치, 업데이트 됨
//             > 14.x.x major 자리는 무조건 14 여야한다 뒤에는 신경 안씀

//             ~14.7.1 patch 버전까지만 설치, 업데이트 됨
//             > 14.7.x patch 자리까지 무조건 14.7 여야한다
//             > 두 번째 자리는 기존 사용자들에게 에러가 발생하지 않음 그래서 잘 사용 안함

//             다른 표현이 없을 경우 패키지 버전 전체를 고정해서 설치, 업데이트가 됨

//             >, <, >=, <= 는 해당 버전보다 높거나, 낮거나 등을 의미

//             @latest를 사용하면 안정된 최신 버전의 패키지를 설치
//             @next를 사용하면 가장 최근의 배포판을 사용
//             > 알파, 베타 버전의 패기지를 설치할 수 있음(-alpha, -beta 등)

//     기타 명령어
//         npm outdated
//             업데이트할 수 있는 패키지가 있는 지 확인
//             sangkwon@sangkwon-ZenBook-UX534FAC-UX534FA:~/Refactoring_Bookdam_server$ npm outdated
//             Package        Current  Wanted  Latest  Location                    Depended by
//             axios           0.24.0  0.24.0  0.26.0  node_modules/axios          Refactoring_Bookdam_server
//             dotenv          10.0.0  10.0.0  16.0.0  node_modules/dotenv         Refactoring_Bookdam_server
//             express         4.17.2  4.17.3  4.17.3  node_modules/express        Refactoring_Bookdam_server
//             sequelize       6.12.4  6.16.2  6.16.2  node_modules/sequelize      Refactoring_Bookdam_server
//             sequelize-cli    6.3.0   6.4.1   6.4.1  node_modules/sequelize-cli  Refactoring_Bookdam_server

//             current랑 wanted가 다르면 업데이트가 필요함
//             npm update 하면 업데이트 가능한 모든 패키지가 업데이트됨
//             latest는 최신 버전이지만 package.json 버전 범위와 다르면 설치되지 않음

//         npm uninstall [패키지 명] 패키지 삭제
//         npm search [검색어] npm 패키지 검색
//         npm info [패키지 명] 해당 패키지의 세부 정보 확인 가능
//         npm adduser(login) npm 로그인 명령어
//         npm whoami 로그인 사용자 정보
//         npm logout 로그아웃
//         npm deprecate [패키지명] [버전] [메세지] 해당 패키지를 설치할 때 경고 메세지를 띄울 수 있음(자신 패키지에만)
//         npm publish/unpublish 패키지 배포, 제거 시 사용