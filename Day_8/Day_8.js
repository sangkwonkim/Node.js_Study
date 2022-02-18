// 파이프와 스트림 메모리 효율 확인
//     스트림은 일정 바이트로 파일을 전송하고, 빋을 수 있다는 장점
//     스트림을 연결하는 파이핑

//     const fs = require('fs');

//     const readStream = fs.createReadStream('./readme.txt', { highWaterMark : 16});
//     const writeStream = fs.createWriteStream('./writeme.txt');
//     readStream.pipe(writeStream);
//     이 파이프를 통해서 readStream을 읽으며 나오는 버퍼들을 writeStream에서 이용하여 복사가 되는 효과를 볼 수 있다

//     const fs = require('fs');
//     const zlib = require('zlib');

//     const readStream = fs.createReadStream('./readme.txt', { highWaterMark : 16});
//     const zlibStream = zlib.createGzip();
//     const writeStream = fs.createWriteStream('./writeme1.txt.gz');
//     readStream.pipe(zlibStream).pipe(writeStream);

//     zlib이라는 모듈을 이용해서 파일을 압축할 수 있다 압축 스트림을 통해서 readme를 읽고 압축해서 writeme1라는 파일을 만들 수 있다
//     이처럼 파이프를 이용해서 다양한 처리를 할 수 있다 단, 스트림을 지원하는 모듈로만 이용할 수 있다

//     스트림으로 하면 메모리를 적게 소요할 수 있다
//     > 메모리 확인할 수 있는 코드
//     process.memoryUsage().rss

//     writeFileSync는 파일을 복사할 때 메모리에 모든 파일을 올려두기 때문에 메모리를 많이 사용한다
//     writeStream의 경우 큰 파일을 작은 버퍼 단위로 옮기기 때문에 메모리를 적게 사용한다

// 스레드풀
//     fs, crypto, zlib 모듈의 메서드를 실행할 때 백그라운드에서 동시에 실행됨
//     스레드풀이 동시에 처리해줌
    
//     노드는 기본적으로 스레드풀의 갯수가 4개이다
//     > 단 코어의 갯수가 4개보다 작다면 다를 수 있다

//     const crypto = require('crypto');
// const { EventEmitter } = require('stream')
// const { addListener } = require('process')
//     const pass = 'pass';
//     const salt = 'salt';
//     const start = Date.now();


//     pbkdf2의 인수는 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘 순서
//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('1:', Date.now() - start);
//     });

//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('2:', Date.now() - start);
//     });

//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('3:', Date.now() - start);
//     });

//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('4:', Date.now() - start);
//     });

//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('5:', Date.now() - start);
//     });

//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('6:', Date.now() - start);
//     });

//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('7:', Date.now() - start);
//     });

//     crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
//     console.log('8:', Date.now() - start);
//     });
    
//     in console
//         3: 1191
//         4: 1196
//         2: 1216
//         1: 1218
//         6: 2391
//         5: 2394
//         7: 2412
//         8: 2431

//     > 스레드풀이 4개이므로 처음 네 개의 작업이 그룹으로 먼저 실행되고 나머지 작업들이 실행된다

//     스레드풀 갯수를 늘리는 방법
//         터미널에 UV_TREADPOOL_SIZE='NUMBER' 입력!
//         > 컴퓨터 코어 갯수에 맞게 조정해서 동시에 처리할 수 있다

// 커스텀 이벤트
//     이벤트를 등록해서 실행할 때 특정한 동작을 할 수 있다
//     여러 파일 간에 동작을 공유할 수 있다
//     events모듈의 EventEmitter 생성자
//     new EventEmitter()로 커스텀 이벤트 만들 수 있다
//     on > 이벤트 이름과 이벤트 발생 시의 콜백을 연결 > 이벤트 리스닝
//     addListener > on과 기능 동일
//     emit > 이벤트 호출
//     once > 한 번만 실행되는 이벤트 생성

//     const EventEmitter = require('events');
//     const myEvent = new EventEmitter();
//     myEvent.addListener('event1', () => {
//       console.log('이벤트 1');
//     });
//     myEvent.on('event2', () => {
//       console.log('이벤트 2');
//     });
//     myEvent.on('event2', () => {
//       console.log('이벤트 2 추가');
//     });
//     myEvent.once('event3', () => {
//       console.log('이벤트 3');
//     }); 

//     myEvent.emit('event1'); 
//     myEvent.emit('event2'); 

//     myEvent.emit('event3'); 
//     myEvent.emit('event3'); > once로 생성한 이벤트이기 때문에 한 번을 초과하는 호출에는 동작하지 않음
    
//     in console
//         이벤트 1
//         이벤트 2
//         이벤트 2 추가
//         이벤트 3
