// 2. 자바스크립트 문법
//     호출 스택
//         function first() {
//             second();
//             console.log('첫 번째');
//         };
//         function second() {
//             third();
//             console.log('두 번째');
//         };
//         function third() {
//             console.log('세 번째');
//         };
//         함수를 선언 > 메모리에 올린다 > 메모리는 임시저장 장치
//         first()
//         함수 호출하면 메모리에서 선언한 지 찾아본다
//         콘솔에서는 세번째, 두번째, 첫번째 순으로 출력된다

//         함수를 호출하면 호출 스택에 순서대로 함수들이 쌓이게 된다 > 역순으로 실행된다

//         파일이 실행되면 anoymous라는 가상의 전역 컨텍스트(전역 스코프)가 호출 스택에 먼저 쌓이고
//         > 크롬에서 나오는 단어
//         모든 함수가 실행 완료되었을 때 anoymous는 사라지게 된다
//         > 호출 스택이 비게 되면 노드가 종료된다
//         > 자바스크립트가 동기적으로 어떻게 작동되는 지 확인할 수 있다.

//     이벤트루프
//         호출 스택에서 비동기 함수가 실행되면 백그라운드로 이동해서 호출스택과 동시에 진행이 이뤄진다
//         백그라운드에서 작업이 완료되면 비동기 함수로 인해 실행되는 콜백함수가 테스크 큐로 이동하고
//         호출 스택이 비어진다면 이벤프루프에 의해 호출스택으로 이동해 실행된다
//         백그라운드의 함수들은 비동기적으로 처리가 되며 다른 스레드가 함수들을 실행한다
//         > 단, 노드에서는 백그라운드로 가는 함수들이 정해져있다
//         자바스크립트는 싱글스레드이지만 백그라운드는 자바스크립트가 아니기 때문에 멀티스레드로 동시에 처리가 가능하다

//         promise는 선언은 동기적으로 실행되지만 then을 만나면 비동기적으로 실행된다
//         promise then, catch, process.nextTick는 일반적인 타이머 함수들에 의해 실행되는 함수보다 태스크큐에서 앞서 실행된다

        
//     function oneMore() {
//         console.log('one more');
//     };
//     function run() {
//         console.log('run run');
//         setTimeout(() => {
//             console.log('wow');
//         }, 0)
//         new Promise((resolve) => {
//             resolve('hi');
//         })
//         .then(console.log);
//         oneMore();
//     }

//     setTimeout(run, 5000);

//     호출 스택에 anoymous 전역 컨텍스트와 setTimeout 함수가 차례로 올라간다
//     setTimeout이 실행되면서 백그라운드에 타이머(run, 5000)이 실행되고 5초 이후에
//     run이 태스크큐로 간다. 이때 호출 스택에서는 setTimeout 함수가 실행되고 백그라운드로 넘어가면서 코드가 끝나기 때문에 anoymous도 빠진다
//     호출 스택이 비어있음으로 이벤트 루프가 run을 호출 스택으로 넘어간다
//     run이 실행되면서 console.log('run run')
//     setTimeout 함수가 실행되면서 타이머(익명, 0)가 백그라운드로 이동
//     다음으로 Promise가 실행되는 데 promise는 내부까지는 동기로 처리된다
//     호출 스택에 promise, resolve('hi')대로 쌓여서 실행된다.
//     promise와 resolve는 실행이 완료되고 then을 만나면 이때 백그라운드로 이동한다
//     마지막으로 oneMore이 실행되면서 console.log('one more')가 진행되고
//     run의 코드는 끝나기 때문에 호출 스택은 비게된다
//     백그라운드는 함수가 여러 개 있으면 빨리 끝나는 게 태스크 큐로 이동한다
//     지금은 먼저 실행된 코드가 먼저 끝났다고 가정하고
//     이 상황을 보면 run 내부의 setTimeout은 0초 이기에 먼저 태스크큐로 이동한다
//     그리고 then의 console.log()가 태스크큐로 이동하는데 
//     태스크큐에서 promise then이 타이머보다 우선순위가 높아 먼저 then의 console.log 실행 후
//     타이머의 console.log('wow')가 실행된다

//     결과적으로 보면 console에 출력되는 값은
//     run run
//     one more
//     hi 
//     wow 이다 wow가 먼저 실행되지만 태스크큐에서 hi가 우선적으로 출력된다

//     ES6
//         const, var
//             { } 에 의해 블록 스코프가 형성된다
//             var의 경우 블록 스코프를 무시한다
//             var는 함수 스코프를 존중한다
//             const, let은 블록 스코프를 존중한다

//         const, let 
//             const 재할당 불가능 단, 객체의 경우 내부 값은 바꿀 수 있다
//             그래서 선언만 하고 할당할 경우 에러가 발생한다
//             let은 재할당이 가능하다

//         화살표 함수
//             기존의 function은 자체적인 this를 갖지만, 화살표함수는 부모의 this를 물려받는다.

//             var relationship1 = {
//                 name : 'sangkwon',
//                 friends : ['nero', 'xero', 'hero'],
//                 logFriends: function() {
//                     var that = this;
//                     this.friends.forEach(function (friend) {
//                         console.log(that.name, friend);
//                     });
//                 },
//             };
//             이 경우 logFriends는 부모의 this를 받아오기 위해 that에 this를 할당해 간접적으로 접근할 수 있다.

//             const relationship1 = {
//                 name : 'sangkwon',
//                 friends : ['nero', 'xero', 'hero'],
//                 logFriends () {
//                     this.friends.forEach(friend => {
//                         console.log(this.name, friend);
//                     });
//                 },
//             };

//             이 경우에는 logFriends가 화살표 함수여서 부모의 this를 받아올 수 있다.
        

//         태그드 탬플릿 리터럴
//             function a () {}
//             a();
//             a``; > 이렇게 함수를 호출할 수 있다


