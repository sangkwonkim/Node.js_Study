// 에러 처리하기
//     에러 발생 시 노드 스레드가 멈춤
//     > 싱글 스레드이기 때문에 프로세스가 멈추게 된다

//     try/catch 에러가 발생할 만한 곳을 감싼다
//     비동기 메소드의 에러 처리는 따로 처리하지 않아도 됨(콜백)
//     프로미스 catch 붙이기 > 이전 버전에서는 워닝만 떴지만 버전이 올라가면 에러가 발생할 수 있다
    
//     예측 불가능한 에러 처리하는 방법

//     process.on('uncaughtException', (err) => {
//         console.log('예기치 못한 에러', err);
//     })

//     process 객체에 uncaughtException 이벤트 리스너를 통해 처리하지 못한 에러가 발생하면 이벤트 리스너가 실행되고 프로세스가 유지된다
//     try/catch로 처리하지 못한 에러도 처리할 수 있음
//     단, 노드 공식 문서에서 해당 이벤트를 최후의 수단으로 사용할 것을 명시함
//     이벤트 발생 후 다음 동작이 정확하게 작동한다는 보증을 하지 않는다
//     > 복구 작업 코드를 넣어도 실행이 될 지 모르기 때문에 에러 기록하는 용도로 사용하고
    
// HTTP 서버 만들기
//     const http = require('http');
//     // http 모듈을 불러와서 서버를 만든다

//     http.createServer((req, res) => {
//     // 스트림과 동일하게 write end 로 작성한다
//         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//         // 첫번째 인수로 상태 코드, 두번째 인수로 content type을 보내준다 > header로 작성된다
//         res.write('<h1>Hello Sangkwon!</h1>');
//         res.end('<p>Hello Node!</p>');
//     })
//         .listen(8080, () => { // 서버를 프로세스에 올린다 > 포트를 사용해서 올림
//             // 포트는 서버 내에서 프로세스를 구분하는 번호임
//             console.log('8080번 포트에서 서버 대기 중입니다!');
//         });

//     // http 서버도 비동기이기 때문에 에러 처리
//     const server = http.createServer((req, res) => {
//         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//         res.write('<h1>Hello Sangkwon!</h1>');
//         res.end('<p>Hello Node!</p>');
//     })
//         .listen(8080);
//     server.on('listening', () => {
//         // listening을 이용해서 listen 콜백을 뺄 수 있다
//         console.log('8080번 포트에서 서버 대기 중입니다!');
//     });
//     server.on('error', (error) => {
//         console.log(error);
//     });

//     fs로 HTML 읽어서 제공하기
//         const http = require('http');
//         const fs = require('fs').promises;

//         const server = http.createServer(async (req, res) => {
//             try { // async 를 할 때는 항상 try/catch 에러 처리하기
//                 res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//                 const data = await fs.readFile('./server.html');
//                 res.end(data);
//             } catch (error) {
//                 console.log(error)
//                 res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
//                 res.end(error.message);
//             } 
//         })
//             .listen(8080);
//         server.on('listening', () => {
//             // listening을 이용해서 listen 콜백을 뺄 수 있다
//             console.log('8080번 포트에서 서버 대기 중입니다!');
//         });
//         server.on('error', (error) => {
//             console.log(error);
//         });