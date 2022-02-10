// 노드 내장 객체
//     global
//         노드의 전역 객체
//         브라우저의 window 같은 역할을 함
//         단, 노드에는 DOM이 없어 window, document 객체는 사용할 수 없음
//         globalthis 로 통일이 됨

//         global 속성에 값을 대입하면 다른 파일에서도 사용 가능
//         > 파일 수가 많아지면 혼란을 야기할 수 있음
//         ex) global.message

//     console
//         console.log
//         console.dir(객체, 옵션) 객체 로깅
//             colors : true 옵션으로 색 추가 가능, depth는 객체의 깊이를 나타냄 기본값은 2
//         console.time('hi') console.time이 실행되고
//         console.timeEnd('hi') console.Endtime이 실행될 때까지의 시간을 표시함
//         console.trace 호출스택 로깅
//         console.error 에러 로깅

//     타이머 메서드 > 콜백함수를 백그라운드로 보내는 비동기코드
//         setTimeout(콜백함수, 밀리초) > 밀리초 이후에 콜백함수 실행
//         setInterval(콜백함수, 밀리초) > 밀리초마다 콜백함수 반복 실행
//         setImmediate(콜백함수) > 콜백함수 즉시 실행
//         > 콜백함수가 백그라운드 > 태스크큐 > 호출스택 순으로 이동하기 때문에 console.log와는 다르다

//         clearTimeout(변수명) > setTimeout을 변수에 할당한 후 취소할 수 있음
//         clearInterval(변수명) > setInterval을 변수에 할당한 후 취소할 수 있음
//         clearImmediate(변수명) > setImmediate를 변수에 할당한 후 취소할 수 있음

//         setTimeout(콜백, 0) 와 setImmediate(콜백) 차이
//             파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백 함수 안에서 타이머 호출하는 경우 setImmediate가 먼저 실행되지만
//             항상 setImmediate이 먼저 실행되는 것은 아니다. 헷갈리지 않도록 setTimeout(콜백, 0) 사용하지 않는 것을 권장함

//     __filename, __dirname
//         노드는 브라우저와는 다르게 컴퓨터에 접근 가능 > 스크립트에 의해 해커가 내 파일, 폴더에 접근할 수 있다

//     module, exports
//         기본적으로 module.exports === exports === {}
//         ex) module.exports === exports === { odd, even }
//         만약에 module.exports = 함수 일 경우, 참조 관계가 끊김
//         > module.exports !== exports === {}        
//         exports는 반드시 객체처럼 속성명과 속성값을 대입해야 하고
//         하나를 모듈로 뺄 경우 module.exports로
//         둘 이상을 모듈로 뺄 경우
//         module.exports = {
//             odd,
//             even
//         } 이나
//         exports.odd = odd
//         exports.even = even 으로 exports하기

//         단 exports.odd = odd 할 경우
//         module.exports = odd 하게 되면 exports.odd 가 무시된다

//     this
//         노드에서 사용 시 주의 사항
//             전역스코프의 this는 global이 아니고 module.exports으로 빈 객체임
//             함수스코프 내 this는 global임
//         이 외에는 자바스크립트 this와 동일함

//     require
//         require('./파일명')
//         변수에 할당하지 않으면 모듈을 불러오는데 실행만 하고 함수를 안 갖고 올 수 있다
//         console.log(require) 하면 require.main은 노드 실행시 첫 모듈을 의미하며
//         cache에 require한 모듈이 저장된다
//         한 번 require한 파일은 require.cache에 저장되므로 다음 require할 때는 새로 불러오지 않고
//         require.cache에 있는 것을 재사용함
    
//     순환참조
//         dep1이 dep2를 require하고 dep2가 dep1을 require한다면
//         순환참조로 에러가 발생할 수 있어서 빈 객체로 바꿔 순환참조가 발생하지 않음
    
//     process
//         노드 실행 시 process 하나가 생성되고 REPL에서 process를 입력하면 node process의 정보를 확인할 수 있다

//         process.env 시스템 환경 변수들이 들어있는 객체
//             비밀키를 보관하는 용도로 쓰임
//             NODE_OPTIONS=--max-old-space=size=8192
//             노드의 메모리는 8GB까지 사용할 수 있게 하고
//             UV_THREADPOOL_SIZE=8
//             노드에서 기본적으로 사용하는 스레드풀의 스레드 갯수를 조절 가능
    
//         process.nextTick
//             이벤트루프가 다른 콜백 함수들보다 마이크로태스크 콜백함수를 우선적으로 처리함
//             마이크로태스크 = process.nextTick, Promise
                    
//         process.exit(0 or 1)
//             실행 중인 노드 프로세스를 종료합니다. 서버에서는 잘 사용하지 않지만
//             서버 외의 독립적인 프로그램에서는 수동으로 노드를 멈추기 위해 사용
//             인수를 주지 않거나 0을 주면 정상 종료를 의미하고
//             1을 주면 비정상 종료를 의미함 이 인수를 통해서 에러 여부를 확인할 수 있다.