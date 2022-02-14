// worker_threads
//     노드에서 멀티 스레드 방식으로 작업할 수 있음
//     > 멀티 스레드 구현 드뭄. cpu, 압축 등을 구현할 때 사용
// const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

//     if(isMainThread) { 메인스레드 분기처리
//         const worker = new Worker(__filename); // 파일 경로 지정 > 다른 파일도 가능, else 부분을 다른 파일 통해서(path 모듈) 처리 가능
//         메인 스레드 안에서 워커스레드 생성, 업무 분배
//         워커스레드가 일을 마치면 메인스레드가 받아서 리턴하는 방식
//         worker.on('message', (value) => console.log('워커로부터', value));
//         worker.on('exit', () => console.log('워커 끝~'));
//         worker.postMessage('ping'); // 워커스레드에 데이터 보낸다
//     } else { // 워커스레드
        // 분배한 일이 동시에 진행
//         parentPort.on('message', (value) => { // parentPort.on 이벤트 리스너로 부모로부터 메세지 받을 수 있다
//             console.log('부모로부터', value);
//             parentPort.postMessage('pong');
//             parentPort.close(); // 워커스레드 종료
//         })
//     }
//         in console
//             워커로부터 pong
//             부모로부터 ping
//             워커 끝~

//     여러 개 워커
//     if(isMainThread) { 
//         const threads = new Set(); // Set을 이용해서 반복되지 않는 배열을 만든다.
//         threads.add(new Worker(__filename, { // Set에 값 추가
//             workerData: { start: 1}, // 초기 데이터로 객체 추가
//         }));
//         threads.add(new Worker(__filename, {  // Set에 값 추가
//             workerData: { start: 2},
//         }));
//         for ( let worker of threads) { // Set 배열 순회
//             worker.on('message', (value) => console.log('워커로부터', value));
//             worker.on('exit', () => {
//                 threads.delete(worker); // Set 내부 값 삭제
//                 if(threads.size === 0) {
//                     console.log('워커 끝~');
//                 }
//             });
//         }
//     } else { 
//         const data = workerData; // 초기 데이터 호출
//         parentPort.postMessage(data.start + 100)
//     }
    // in console
    //     워커로부터 101
    //     워커로부터 102
    //     워커 끝~


//     소수 찾기 
//         싱글스레드로 소수 찾기
//             const min = 2;
//             const max = 10000000;
//             const primes = [];

//             function generatePrimes(start, range) {
//             let isPrime = true;
//             const end = start + range;
//             for (let i = start; i < end; i++) {
//                 for (let j = min; j < Math.sqrt(end); j++) { // 제곱근 반환
//                 if (i !== j && i % j === 0) {
//                     isPrime = false;
//                     break;
//                 } 
//                 } 
//                 if (isPrime) { 
//                 primes.push(i); 
//                 } 
//                 isPrime = true; 
//             } 
//             } 

//             console.time('prime'); 
//             generatePrimes(min, max); 
//             console.timeEnd('prime'); 
//             console.log(primes.length);

//             in console
//                 'prime: 9171ms'
//                 664579
    
//         멀티스레드로 소수 찾기
//             const min = 2;
//             let primes = [];

//             function findPrimes(start, range) {
//               let isPrime = true;
//               let end = start + range;
//               for (let i = start; i < end; i++) {
//                 for (let j = min; j < Math.sqrt(end); j++) {
//                   if (i !== j && i % j === 0) {
//                     isPrime = false;
//                     break;
//                   }
//                 }
//                 if (isPrime) {
//                   primes.push(i);
//                 }
//                 isPrime = true;
//               } 
//             }

//             if (isMainThread) {
//               const max = 10000000;
//               const threadCount = 8;
//               const threads = new Set();
//               const range = Math.ceil((max - min) / threadCount);
//               let start = min;
//               console.time('prime');
//               for (let i = 0; i < threadCount - 1; i++) {
//                 const wStart = start;
//                 threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
//                 start += range;
//               }
//               threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount) } }));
//               for (let worker of threads) {
//                 worker.on('error', (err) => {
//                   throw err;
//                 });
//                 worker.on('exit', () => {
//                   threads.delete(worker);
//                   if (threads.size === 0) {
//                     console.timeEnd('prime');
//                     console.log(primes.length);
//                   }
//                 });
//                 worker.on('message', (msg) => {
//                   primes = primes.concat(msg);
//                 });
//               }
//             } else {
//               findPrimes(workerData.start, workerData.range);
//               parentPort.postMessage(primes);
//             }

//             in console
//             prime: 2.026s
//             664579
//             멀티 스레드로 처리 속도가 줄어드는 것은 컴퓨터 사양에 따라 다르기 때문에 본인 컴퓨터 사양에 맞춰 스레드 생성해야 함
//             스레드 갯수 배수만큼 시간이 줄어들지 않는다 > 스레드 생성하고 부모 스레드가 자식 스레드에게 값을 받아 처리하는 시간도 들기 때문!

// 구현이 어려워서 구현 방법이 이렇다 정도만 학습하고 추후에 필요할 때 깊게 학습해보겠습니다.