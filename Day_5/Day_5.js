// 노드 내장 모듈
//     OS 
//         운영체제의 정보를 담고 있음
//         내장 모듈이라 경로 대신 이름만 적고 이용할 수 있음
//         경로, cpu 정보, 메모리 정보를 확인할 수 있다
//         운영체제 별로 다른 서비스를 제공하고 싶을 때 필요

//     path 
//         폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
//         운영체제 별로 경로 구분자가 다르기 때문에 필요함

//     -- 이 두가지의 메소드는 운영체제에 따른 개발을 위해 필요하기 때문에 지속적으로 관심을 가지고 알아보기

//     url
//         인터넷 주소를 쉽게 조작하도록 도와주는 모듈
//             WHATWG 노드 7버전에서 추가된 url 처리 방식 
//             url 모듈 안에 URL 생성자가 있는데 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리된다 이게 WHATWG
//             기존 노드 방식 두 가지가 있다

//             WHATWG랑 노드 방식은 url 주소 체계 명칭이 다른데, node.org에 들어가서 확인할 수 있다
//             WHATWG에 편리한 기능이 많지만, 기존 노드 방식을 사용해야 하는 경우가 있다
//             > url이 host 없이 pathname만 오는 경우,
//             https://naver.com/login 이 아닌
//             /login 으로만 올 때
//             WHATWG 방식으로 처리할 수 없다

//             쿼리스트링은 주소에 데이터가 담긴 부분인데 문자열이라 자바스크립트에서 처리하기 까다롭다
//             이걸 searchParams 객체에서 편리하게 이용할 수 있다 > WHATWG
//             WHATWG에서 쿼리스트링을 search라고 한다

//             기존 노드는 쿼리스트링 모듈을 한 번 더 사용해야 한다
//             querystring.parse(쿼리)를 통해서 url의 쿼리 부분을 자바스크립트 객체로 분해
//             querystring.stringify(객체)를 통해서 분해된 쿼리 객체를 문자열로 조립

    
//     crypto
//         암호화 도와주는 모듈
        
//         단방향 암호화(해시 함수)
//             복호화할 수 없는 암호화 > 그래서 해시 함수라고 부르기도 함
//             해시 기법 > 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식
//             const crypto = require('crypto');
            
//             pbkdf2, bcrypt, scrypt 알고리즘을 많이 사용하는데 여기서 pbkdf2를 노드에서 지원함
//             salt를 만드는 crypto.randomBytes나, crypto.pbkdf2는 내부적으로 스레드풀을 사용해 멀티 스레드로 동작
//             crypto.randomBytes의 경우 salt가 계속해서 바뀌기 때문에 비밀번호를 찾기 위해서는 값을 가지고 있어야함

//         양방향 암호화
//             양방향 대칭형 암호화 > 복호화와 암호화에 똑같은 키가 사용됨
//             crypto를 사용하는 방식이 조금 복잡해서 추가적으로 학습할 예정

//     util 
//         각종 편의 기능을 모아둔 모듈
//             deprecated > 프로그래밍 용어로 '중요도가 떨어져 더 이상 사용되지 않고 앞으로 사라지게 될 것' 이라는 뜻
//             util.deprecated() > 함수가 deprecated 되었음을 알림 첫 번째 인수로 넣은 함수를 사용했을 때 경고 메시지 출력
//             두 번째 인수로 경고 메세지

//             util.promisify > 콜백 패턴을 프로미스 패턴으로 바꿈. 바꿀 함수를 인수로 제공 async/await도 사용할 수 있음
//             ex) const randomBytesPromise = util.promisify(crypto.randomBytes)
//             randomBytesPromise(64)
//             .then(() => {})
//             .catch(() => {})
