// 프로미스
//     내용이 실행은 되었지만 결과는 아직 반환하지 않은 객체
//     new Promise 로 생성하며, resolve, reject를 매개변수로 갖는 콜백함수를 넣는다
//     resolve가 호출되면 then 메소드로 실행할 수 있으며
//     reject가 호출되면 catch 메소드로 실행할 수 있다
//     const condition = true;
//     바로 실행은 되지만(동기적)
//     const promise = new Promise((resolve, reject) => {
//         if(condition) {
//             resolve('성공');
//         } else {
//             reject('실패');
//         }
//     });
//     다른 코드 ~~~
//     then, catch를 만나야지 결과가 반환된다.(비동기적)
//     promise
//         .then((message) => {
//             console.log(message);
//         })
//         매번 처리해야하는 에러도 마지막 catch로 처리할 수 있다.
//         .catch((error) => {
//             console.error(error);
//         })
//         .finally(() => {
//             console.log('무조건');
//         });

//      Promise.allSettled 학습해보기

// async / await
//     프로미스를 더 간결하게 구현할 수 있는 방법
//     함수 선언부를 async function 으로 사용하고, 프로미스 앞에 await을 붙여 사용할 수 있다
//     해당 프로미스가 resolve 될 때까지 기다린 뒤 다음 로직으로 넘어간다
//     이 경우 에러 처리 부분이 없으므로 try/catch문으로 로직을 감싸준다.

// REPL 사용하기
//     자바스크립트는 스크립트 언어라서 즉석에서 코드를 실행할 수 있다
//     REPL 콘솔
//     Read, Evaluate, Print, Loop
//     읽고 평가하고 출력하고 반복한다
//     터미널에 node 입력

// 모듈화
//     재사용성 높임
//     코드가 장황하지 않아 보기 편리함
//     module.exports = {} 를 이용해서 작성한 코드를 exports 할 수 있음
//     다른 페이지에서 사용할 경우 const {} require('경로')를 입력

//     모듈이 너무 많아지고 관계가 얽히게 되면 구조 파악이 어려울 수 있음
//     ES2015가 도입되면서 자바스크립트 자체 모듈 시스템이 생김
//     노드 9버전에서 ES2015 모듈 시스템을 사용할 수 있음 => 단, 파일의 확장자를 mjs로 지정하거나, package.json 의 타입을 module로 변경해줘야 함
//     import from 과 require, export default와 module.exports가 완벽히 대체 되는 것은 아님
