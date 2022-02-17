// // fs 파일 시스템에 접근하는 모듈
// //     파일/폴더 생성, 삭제, 읽기, 쓰기 가능
// //     웹 브라우저에서는 제한적이었으나 노드는 권한을 가지고 있음
    
// //     파일 읽기
// //     const fs = require('fs');

// //     fs.readFile('./readMe.txt', (err, data) => {
// //         if(err) {
// //             throw err;
// //         }
// //         // 이진법 바이너리 데이터
// //         console.log(data); // <Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94 2e>
// //         console.log(data.toString()); // 저를 읽어주세요.
// //     });

// //     프로미스로 하려면
// //     1. const util = require('util');
// //         util.promisify를 fs.readFile을 감싸면 된다

// //     2. const fs = require('fs').promises
// //     모듈을 불러올 때 promises를 붙일 수 있다
// //     fs.readFile('./readMe.txt')
// //         .then((data) => {
// //             console.log(data); // <Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94 2e>
// //             console.log(data.toString()); // 저를 읽어주세요.
// //         })
// //         .catch(() => {
// //             throw err; 
// //         })
    
// //     파일 생성
// //     fs.writeFile('./writeMe.txt', '글을 입력됩니다.')
// //     writeFile에 파라미터로 파일을 생성할 위치, 파일에 들어갈 내용 순으로 넣으면 된다
// //     .then(() => {
// //     })
// //     .catch(() => {
// //         throw err; 
// //     })

// //     프로미스 체이닝으로 파일을 생성하고 바로 읽을 수 있다
// //     fs.writeFile('./writeMe.txt', '글을 입력됩니다.')
// //     .then(() => {
// //         return fs.readFile('./writeMe.txt')
// //     })
// //     .then((data) => {
// //         console.log(data.toString())
// //     })
// //     .catch(() => {
// //         throw err; 
// //     })

// //     콜백은 비동기 함수여서 순서대로 출력되지 않을 수 있다
// //     > 비동기 함수는 콜백을 백그라운드로 보내져서 동시에 실행된다
// //     > 운영체제에서 먼저 끝나는 걸 테스크 큐로 보내기 때문에 순서가 달라질 수 있다

// //     fs.readFile('./readMe.txt', (err, data) => {
// //         if(err) {
// //             throw err;
// //         }
// //         console.log('1번', data.toString());
// //     });
// //     fs.readFile('./readMe.txt', (err, data) => {
// //         if(err) {
// //             throw err;
// //         }
// //         console.log('2번', data.toString());
// //     });
// //     fs.readFile('./readMe.txt', (err, data) => {
// //         if(err) {
// //             throw err;
// //         }
// //         console.log('3번', data.toString());
// //     });
// //     fs.readFile('./readMe.txt', (err, data) => {
// //         if(err) {
// //             throw err;
// //         }
// //         console.log('4번', data.toString());
// //     });

// //     // 1번 저를 읽어주세요.
// //     // 3번 저를 읽어주세요.
// //     // 4번 저를 읽어주세요.
// //     // 2번 저를 읽어주세요.

// //     순서에 맞게 실행하려면 비동기로 순서를 유지하면서 실행하거나, 동기적으로 처리
    
// //     const data = fs.readFileSync('./readMe.txt')
// //     console.log('1번', data.toString())
// //     > readFileSync를 이용해서 동기적으로 처리 가능하다
// //     > 하지만 동시에 돌릴 수 없기 때문에 비효율적이다
// //     > 딱 한 번 실행하거나 서버 실행 전 초기화 작업시 동기적인 처리를 하는 것이 낫다
// //     > 서버는 동기적으로 처리되면 다수의 이용자가 접속할 때 처리에 오랜 시간이 걸릴 수 있다

// //     fs.readFile('./readMe.txt', (err, data) => {
// //         if(err) {
// //             throw err;
// //         }
// //         console.log('1번', data.toString());
// //         fs.readFile('./readMe.txt', (err, data) => {
// //             if(err) {
// //                 throw err;
// //             }
// //             console.log('2번', data.toString());
// //         });
// //     });

// //     > 이런 식으로 하면 순서는 보장되고 비동기적으로 처리되지만 콜백헬이 형성된다
// //     > 프로미스로 해결
// //     fs.readFile('./readMe.txt')
// //         .then((data) => {
// //             console.log('1번', data.toString());
// //             return fs.readFile('./writeMe.txt')
// //         })
// //         .then((data) => {
// //             console.log('2번', data.toString());
// //         })
// //         .catch(() => {
// //             throw err; 
// //         })

// //     async function main() {
// //         let data = await fs.readFile('./readMe.txt')
// //         console.log('1번', data.toString())
// //         data = await fs.readFile('./readMe.txt')
// //         console.log('1번', data.toString())
// //         data = await fs.readFile('./readMe.txt')
// //         console.log('1번', data.toString())
// //     }

// //     main();
// //     > 비동기로 처리하되 순서를 지킨다 > 동시성도 살리고 순서도 지킬 수 있다
// //     > sync는 동기적이기 때문에 서버에서 사용하면 문제가 발생할 수 있다


// // 버퍼와 스트림
// //     버퍼 : 일정한 크기로 모아두는 데이터
// //         일정한 크기가 되면 한 번에 처리
// //         버퍼링 : 버퍼에 데이터가 찰 때까지 모으는 작업
// //     스트림 : 데이터의 흐름
// //         일정한 크기로 나눠서 여러 번에 걸쳐서 처리
// //         버퍼(또는 청크)의 크기를 작게 만들어서 주기적으로 데이터를 전달
// //         스트리밍 : 일정한 크기의 데이터를 지속적으로 전달하는 작업

// //     버퍼(Buffer) 사용하기
// //         const buffer = Buffer.from('저를 버퍼로 바꿔보세요.');
// //         console.log(buffer);
// //         console.log(buffer.length);
// //         console.log(buffer.toString())
// //         // <Buffer ec a0 80 eb a5 bc 20 eb b2 84 ed 8d bc eb a1 9c 20 eb b0 94 ea bf 94 eb b3 b4 ec 84 b8 ec 9a 94 2e>
// //         // 33
// //         // '저를 버퍼로 바꿔보세요.'

// //         const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
// //         console.log(Buffer.concat(array).toString())
// //         // '띄엄 띄엄 띄어쓰기'
// //         Buffer.concat() // The concat() method joins all buffer objects in an array into one buffer object.

// //         console.log(Buffer.alloc(5)) // 5 바이트 짜리 빈 버퍼를 만든다
// //         The Buffer.alloc() method creates a new buffer object of the specified size.
// //         Buffer.alloc(size, fill, encoding);
// //         // <Buffer 00 00 00 00 00>

// //         버퍼가 파일 사이즈랑 동일하게 읽으려면 fs.readFile 하면되고
// //         스트림으로 읽으려면
// //         const fs = require('fs');
// //         const readStream = fs.createReadStream('./readMe2.txt', { highWaterMark : 16});
// //         // 스트림 방식으로 파일을 읽는다
// //         const data =[];
// //         readStream.on('data', (chunk) => {
// //             // chunk로 파일이 순서대로 들어오면 배열에 집어넣는다
// //             data.push(chunk);
// //             console.log('data', chunk, chunk.length);
// //         });
// //         readStream.on('end', () => {
// //             // 스트림 전송이 끝나면 end를 통해 알려준다
// //             console.log('end', Buffer.concat(data).toString())
// //         })
// //         // 스트림도 비동기이기 때문에 에러 처리는 필수
// //         readStream.on('error', () => {
// //             console.log('error', error)
// //         })

// //         // data <Buffer ec a0 80 eb 8a 94 20 ec a1 b0 ea b8 88 ec 94 a9 20 eb 82 98 eb 88 a0 ec 84 9c 20 ec a0 84 eb 8b ac eb 90 a9 eb 8b 88 eb 8b a4 2e 20 eb 8b 88 eb 88 a0 ... 105 more bytes> 155
// //         // end 저는 조금씩 나눠서 전달됩니다. 니눠진 조각을 청크라고 부릅니다.
// //         // 안녕하세요. 헬로 월드 헬로 상권 헬로 에이수스
// //         > 이렇게 출력했을 때 그냥 readFile이랑 다를 바 없이 출력된다
// //         > createReadStream이 한 번에 읽는 버퍼 조각이 64키로바이트이다
// //         > 해당 파일의 크기는 155바이트여서 한 번에 읽혔다

// //         const readStream = fs.createReadStream('./readMe2.txt', { highWaterMark : 16});
// //         > createReadStream의 두번째 파라미터로 read옵션을 줄 수 있다
// //         16바이트로 버퍼 조각의 크기를 변경하면 다음과 같이 잘려서 오는 것을 확인할 수 있다

// //         data <Buffer ec a0 80 eb 8a 94 20 ec a1 b0 ea b8 88 ec 94 a9> 16
// //         data <Buffer 20 eb 82 98 eb 88 a0 ec 84 9c 20 ec a0 84 eb 8b> 16
// //         data <Buffer ac eb 90 a9 eb 8b 88 eb 8b a4 2e 20 eb 8b 88 eb> 16
// //         data <Buffer 88 a0 ec a7 84 20 ec a1 b0 ea b0 81 ec 9d 84 20> 16
// //         data <Buffer ec b2 ad ed 81 ac eb 9d bc ea b3 a0 20 eb b6 80> 16
// //         data <Buffer eb a6 85 eb 8b 88 eb 8b a4 2e 0a ec 95 88 eb 85> 16
// //         data <Buffer 95 ed 95 98 ec 84 b8 ec 9a 94 2e 20 ed 97 ac eb> 16
// //         data <Buffer a1 9c 20 ec 9b 94 eb 93 9c 20 ed 97 ac eb a1 9c> 16
// //         data <Buffer 20 ec 83 81 ea b6 8c 20 ed 97 ac eb a1 9c 20 ec> 16
// //         data <Buffer 97 90 ec 9d b4 ec 88 98 ec 8a a4> 11
// //         end 저는 조금씩 나눠서 전달됩니다. 니눠진 조각을 청크라고 부릅니다.
// //         안녕하세요. 헬로 월드 헬로 상권 헬로 에이수스

// //         > 스트림 방식은 버퍼 방식보다 메모리는 적게 필요로 한다

//         const fs = require('fs');

//         const writeStream = fs.createWriteStream('./writeMe2.txt');
//         writeStream.on('finish', () => {
//             console.log('파일 쓰기 완료');
//         });
//         // 파일 쓰기가 끝나면 finish가 작동된다

//         writeStream.write('이 글을 씁니다.');
//         writeStream.write('이 것이 두 번째 쓰는 것입니다.');
//         writeStream.end();