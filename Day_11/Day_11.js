// https와 http2 모듈
//     https 모듈은 웹 서버에 ssl 암호화 추가

//     기존 http 서버 코드
//     const http = require('http');

//     const server = http.createServer((req, res) => {
//         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//         res.write('<h1>Hello Sangkwon!</h1>');
//         res.end('<p>Hello Node!</p>');
//     })
//         .listen(8080);
//     server.on('listening', () => {
//         console.log('8080번 포트에서 서버 대기 중입니다!');
//     });

//     여기에서 https를 사용하려면 인증 기관에서 인증서 발급

//     const https = require('https'); https 모듈로 변경
//     const fs = require('fs');

//     https.createServer({ 첫 번째 인수로 인증서 관련 옵션을 넣어줌
//         pem이나 crt, key 확장자 파일을 옵션에 맞게 입력

//         cert: fs.readFileSync('도메인 인증서 경로'),
//         key: fs.readFileSync('도메인 비밀키 경로'),
//         ca: [
//             fs.readFileSync('상위 인증서 경로'),
//             fs.readFileSync('상위 인증서 경로'),
//           ],
//         }, (req, res) => {
//             res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//             res.write('<h1>Hello Node!</h1>');
//             res.end('<p>Hello Server!</p>');
//         })
//             .listen(443, () => {
//                 실제 서버에서 80 포트가 아닌 443 포트 이용                
//                 console.log('443번 포트에서 서버 대기 중입니다!');
//             });

//     http2 모듈은 ssl 암호화와 더불어 http/2 프로토콜을 사용할 수 있음
//     http/2는 요청 및 응답 방식이 기존 http/1.1 보다 개선되어 훨씬 효율적으로 요청 가능

//     // https://sangkwon2406.tistory.com/77

//     const http2 = require('https'); https 모듈로 변경
//     const fs = require('fs');

//     https.createSecureServer({ 첫 번째 인수로 인증서 관련 옵션을 넣어줌
//         pem이나 crt, key 확장자 파일을 옵션에 맞게 입력
//         cert: fs.readFileSync('도메인 인증서 경로'),
//         key: fs.readFileSync('도메인 비밀키 경로'),
//         ca: [
//             fs.readFileSync('상위 인증서 경로'),
//             fs.readFileSync('상위 인증서 경로'),
//           ],
//         }, (req, res) => {
//             res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//             res.write('<h1>Hello Node!</h1>');
//             res.end('<p>Hello Server!</p>');
//         })
//             .listen(443, () => {
//                 실제 서버에서 80 포트가 아닌 443 포트 이용                
//                 console.log('443번 포트에서 서버 대기 중입니다!');
//             });
    
// cluster
//     http2 적용하면서 같이 적용해서 배포
//     > 서버가 싱글스레드라서 코어를 하나만 차지하는 데
//     cpu 코어를 모두 사용할 수 있게 해주는 모듈

//     cluster를 이용해서 코어 하나당 노드 프로세스 하나가 돌아가게 함 
//     단, 워커 스레드(Day_6) 때처럼  코어 갯수만큼의 성능 개선은 아님
//     cluster는 프로세스가 여러 개 생기는 거라서 메모리나 세션 등 컴퓨터 자원을 공유하지 못함
//     * 하나의 프로세스 내부에 여러 스레드는 자원을 공유할 수 있음
//     로그인 구현 시 서버 8개가 돌아갈 때 하나의 서버에서 로그인이 유지되는 게 아님
//     새로고침의 경우 로그인이 되어있는 서버가 랜덤으로 결정 > 로그인을 반복해야할 수도 있음
//     > 이는 Redis 등 별도의 메모리 서버로 해결

//     const cluster = require('cluster');
//     const http = require('http');
//     const numCPUs = require('os').cpus().length; // 8

//     if (cluster.isMaster) { // 워커스레드에서 isMainTread랑 비슷
//         // 마스터 프로세스에서 fork를 통해 워커 프로세스가 생성됨
//       console.log(`마스터 프로세스 아이디: ${process.pid}`);
//       // CPU 개수만큼 워커를 생산
//       for (let i = 0; i < numCPUs; i += 1) {
//         cluster.fork();
//       }
//       // 워커가 종료되었을 때
//       cluster.on('exit', (worker, code, signal) => {
//         console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
//         console.log('code', code, 'signal', signal); 여기서 signal은 프로레스를 종료한 신호가 존재할 경우, 출력한다
//         // cluster.fork(); // 워커가 종료될 때 새로운 워커를 생성한다
//       });
//     } else {
//       // 워커들이 포트에서 대기
//     //   프로그램은 하나의 프로세스를 차지하고, 프로세스는 포트 하나를 차지함 
//     //   근데 cluster는 cpu 코어 갯수만큼의 서버를 하나의 포트에서 실행할 수 있음
//     //   > 요청이 라운드로빈이라는 알고리즘에 따라서 분배가 됨
//       http.createServer((req, res) => {
//         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//         res.write('<h1>Hello Node!</h1>');
//         res.end('<p>Hello Cluster!</p>');
//         setTimeout(() => { // 요청에 응답을 하면 프로세스를 종료시킨다
//             process.exit(1);
//         }, 1000);
//       }).listen(8086);

//       console.log(`${process.pid}번 워커 실행`);
//     }
//     // 총 9 개의 프로세스가 실행
//     // 마스터 프로세스 아이디: 98196 > 마스터 프로세스는 서버의 역할이라기 보단 요청을 라운드로빈 알고리즘을 통해서 분배하는 역할  
//     // 98204번 워커 실행
//     // 98222번 워커 실행
//     // 98210번 워커 실행
//     // 98223번 워커 실행
//     // 98216번 워커 실행
//     // 98235번 워커 실행
//     // 98203번 워커 실행
//     // 98234번 워커 실행

//     // 99767번 워커가 종료되었습니다.
//     // code 1 signal null
//     // 99774번 워커가 종료되었습니다.
//     // code 1 signal null
//     // 99782번 워커가 종료되었습니다.
//     // code 1 signal null
//     // 99798번 워커가 종료되었습니다.
//     // code 1 signal null
//     // 99787번 워커가 종료되었습니다.
//     // code 1 signal null
//     // 99768번 워커가 종료되었습니다.
//     // code 1 signal null
//     // 99780번 워커가 종료되었습니다.
//     // code 1 signal null
//     // 99800번 워커가 종료되었습니다.
//     // code 1 signal null