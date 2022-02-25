const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 8080);
// 서버로 실행될 포트 설정
// app.set(키, 값)를 이용해서 환경 변수로 저장하고 다음에 app.get(키)로 가져올 수 있음

// express는 요청이 들어오면 위에서 아래 방향으로 실행되면서
// 해당하는 부분에서 처리가 이루어진다
// wildcard '/:user_Id' req.params 값에 들어가는 것이 있을 때
// 아래의 상권이의 홈페이지 입니다가 출력이 되는 것이 아니라
// `${req.params.name}의 페이지 입니다.`가 출력이 됩니다.
// 이처럼 express는 위에서 아래로 실행되기 때문에 wildcard나 *를 이용하는 라우터가 있다면
// 맨 아래에 위치 시켜야 합니다.

// app.get('/:name', (req, res) => {
//     res.send(`${req.params.name}의 페이지 입니다.`)
// })

// app.get('/sangkwon', (req, res) => {
//     res.send('상권이의 홈페이지 입니다.')
// })

// res.send는 status(200) 이 생략되어 있습니다!


// 미들웨어 만들어보기
app.use((req, res, next) => {
    console.log('요청이 들어오면 콘솔에 찍어주세요.');
    next();
})

// 한 번에 여러가지 미들웨어도 붙일 수 있다
app.use((req, res, next) => {
    console.log('1번에 찍히는 거');
    next();
}, (req, res, next) => {
    console.log('2번에 찍히는 거');
    next();
});
// }, (req, res, next) => {
//     throw new Error('에러 났어요');
//     // 단순하게 throw new Error하게 되면 디테일하게 에러가 출력된다
//     // > 그래서 직접 에러 미들웨어를 만들어서 처리한다 맨 밑에 에러 미들웨어
// })


// /about에서만 해당 미들웨어가 실행되게 할 수 있다
app.use('/about', (req, res, next) => {
    console.log('about페이지에 요청이 들어오면 콘솔에 찍어주세요.');
    next();
})

// html 파일 제공하는 방법!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// next('route') 를 하게 되면 
// 다음 라우터 중에 해당하는 라우터가 있으면 해당 라우터를 실행시킬 수 있다
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    if(true) {
        next(route); // 본인 라우터의 다음 미들웨어가 아닌 다름 라우터를 찾아간다
    } else {
        next();
    }
}, (req, res) => {
    console.log('false인가요?')
})

app.get('/', (req, res) => {
    console.log('true인가요?')
})

// 와일드 카드가 없는 상황에서 존재하는 않는 url로 접근 시 404에러가 발생하는데
// 이에 따른 처리
app.use((req, res, next) => {
    res.send('존재하지 않는 페이지 입니다.')
})


// 맨 마지막에 에러 처리 미들웨어를 만들어준다
// 에러 미들웨는 4개의 매개변수를 꼭 넣어주어야 한다
// 에러가 전송되면 이 미들웨어가 자동적으로 처리해준다
app.use((err, req, res, next) => {
    console.log(err);
    res.send('에러가 났습니다.')
})


// 에러 처리 미들웨어를 사용하는 방법은
// throw new Error()로 이용하기 보단
// try {} catch (error) { next(error) } 이런 식으로 에러 미들웨어로 에러를 보내서 처리를 진행한다.

app.listen(app.get('port'), () => {
    // 아까 app.get으로 저장한 값을 불러옴 > PORT라는 환경 변수가 없기 때문에 8080번!
    // 8080 번 포트에서 대기 중
    console.log(app.get('port'), '번 포트에서 대기 중');
})