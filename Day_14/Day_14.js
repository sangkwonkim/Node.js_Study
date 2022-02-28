// static 미들웨어
//     정적인 파일 제공하는 라우터 역할
//     app.use('요청 경로', express.static('실제 경로'));
    
//     app.use('/', express.static(path.join(__dirname, 'public')));
//     함수의 인수로 정적 파일들이 담겨 있는 폴더 지정
//     ex) localhost:3000/styled.css 는 public/styled.css 파일에 접근할 수 있음

//     만약 요청 경로에 해당 파일이 없으면 내부적으로 next를 호출
//     만약 파일이 있으면 다음 미들웨어로 실행되지 않음

//     app.use(express.urlencoded({ extended : true }));
//     app.use(express.json());
//     app.use(cookieParser());
//     와 같은 미들웨어가 진행될 필요가 없다면
//     static 미들웨러를 해당 미들웨어들 보다 위쪽에 위치시켜서 정적파일 처리가 완료되면 요청을 종료할 수 있다


// body-parser
//     요청 본문에 있는 데이터를 req.body로 만들어주는 미들웨어인데 4.16.0 버전부터 일부 기능은 express에 내장되어 따로 설치할 필요가 없다
    
//     app.use(express.urlencoded({ extended : true })); 클라이언트에서 form 데이터를 보낼 때 form 파싱해줌
//         extended는 form 파싱할 때 쿼리스트링 처리 방식
//         true qs 모듈을 사용
//         false 내장 querystring 모듈 사용
//     app.use(express.json()); 클라이언트에서 json 형태로 데이터를 보낼 때 파싱해줌

//     별도로 설치해야되는 경우도 있는데 Raw나 Text 형식의 데이터를 파싱할 경우
//         const bodyparser = require('bodyparser');
// const { connect } = require('tls')
//         app.use(bodyparser.raw());
//         app.use(bodyparser.text());
//         를 통해서 사용할 수 있다
//         Raw는 요청의 본문이 버퍼 데이터일 때,
//         Text는 텍스트 데이터일 때 해석하는 미들웨어

//         form에서 이미지를 보낼 때는 multer를 사용해야 함

// cookieParser
//     요청에 동봉된 쿠키를 해석해 req.cookie 객체로 만듬
//     app.use(cookieParser());
//     첫번째 인수로 비밀 키를 넣어줄 수 있음 > 서명된 쿠키가 있는 경우 제공한 비밀 키를 통해 해당 쿠키가 서버가 만든 쿠키임을 검증할 수 있음

//     서명이 붙으면 쿠키는 name=sangkwon.sign 과 같은 모양을 가짐
//     파싱 후 저장되는 객체도 req.signedCookies에 들어감

//     req.cookie(키, 값, 옵션) 으로 클라이언트에 쿠키를 전송할 수 있음
//     옵션 중 signed에 true을 설정하면 쿠키 뒤에 서명이 붙음. > app.use(cookieParser()); 인수에 넣은 비밀 키

// express-session
//     세션 관리용 미들웨어
//     app.use(session({
//         resave: true,  요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정
//         saveUninitialized: true, 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할 지 설정하는 것
//         secret: 비밀 키,
//         cookie : {
//             blahblah
//         },
//         name : 'blahblah' 세션 이름 설정, 기본값으로 connect.sid임
//     }))

//     app.use(session()) 을 통해서 req.session 이 하나 생기는 데 해당 사용자의 세션이 별도로 생기게 된다
//     > req.session.id = 'blahblah' 이런 식으로 입력하면 해당 사용자에게만 사용할 수 있는 저장공간이 생긴다
//     미들웨어 간이나 라우터 간에 데이터 전달할 경우
//     req객체에 키와 값을 할당해줘서 이용가능하다
//     session도 동일하게 키 값을 넣어서 사용할 수 있긴 한데 매 요청마다 해당 값이 남는다
//     1회성으로 데이트를 전달하고 싶으면 req.data식으로 하는 것을 추천

// 미들웨어 특징
//     next() 인수
//         next() > 다음 미들웨어로 이동
//         next('route') > 다음 라우터로 이동
//         next(error) > 에러 핸들러로 이동
    
//     미들웨어 안에 미들웨어 넣기
//         app.use(morgan('dev'));

//         app.use((req, res, next) => {
//             morgan('dev')(req, res, next);
//         })
//         위의 두 방법은 같은 기능을 함
//         > 이를 이용해서 분기 처리 가능

//         app.use((req, res, next) => {
//             if(process.env.NODE_ENV === 'production') {
//                 morgan('combine')(req, res, next);
//             } else {
//                 morgan('dev')(req, res, next);
//             }
//         })

// multer
//     이미지, 동영상 등을 비롯한 여러 가지 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어
//     enctype이 multipart/form-data 형태로 업로드하는 데이터의 형식
    
//     const multer = require('multer');

//     const upload = multer({
//         storage: multer.diskStorage({
//             destination(req, file, done) { 
//                 file 객체에는 업로드한 파일 정보, done 매겨변수는 함수 > 첫 번째 인수에는 에러가 있다면 에러를 넣고,
//                 두 번째 인수로 실제 경로나 파일 이름을 넣음
//                 req, file 데이터를 가공해서 done 넘기는 형식
//                 done(null, 'uploads/');
//             },
//             filename(req, file, done) { 
//                 file 객체에는 업로드한 파일 정보, done 매겨변수는 함수 
//                 > 첫 번째 인수에는 에러가 있다면 에러를 넣고,
//                 두 번째 인수로 실제 경로나 파일 이름을 넣음
                
//                 req, file 데이터를 가공해서 done 넘기는 형식
//                 const ext = path.extname(file.originalname);
//                 done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//             },
//         }),
//         limits: { fileSize : 5 * 1024 * 1024}
//     })

//     multer 인수로 설정을 넣음 > storage 속성에는 어디에(destination) 어떤 이름으로(filename) 저장할 지를 넣음
//     > upload라는 폴더에 파일명+현재시간.확장자명으로 파일을 저장 된다
//     upload 폴더가 있어야되기 때문에 fs 모듈을 이용해서 서버 시작시 생성한다

//     const fs = require('fs');

//     try {
//         fs.readdirSync('uploads');
//     } catch (error) {
//         console.error('upload 폴더가 없어 폴더를 생성합니다.');
//         fs.mkdirSync('upload')
//     }

//     파일 하나만 업로드하는 경우 > single 미들웨어 이용
//     app.post('/upload', upload.single('image'), (req, res) => {
//         console.log(req.file, req.body)
//         res.send('ok')
//     })
//     single 미들웨어를 라우터 미들웨어 앞에 넣으면 multer 설정에 따라 파일 업로드 후 req.file 객체가 생성
//     > 인수는 input 태그의 name이나 폼 데이터의 키와 일치하게!
//     성공 시 req.body에는 데이터가 들어감

//     여러 파일 업로드시 html의 input 태그에 multiple 사용하기!
//     미들웨어에는 single 대신 array 사용
//     app.post('/upload', upload.array('image'), (req, res) => {
//         console.log(req.files, req.body)
//         res.send('ok')
//     })
//     > 업로드 결과도 req.file이 아닌 files에 들어감

//     파일을 여러 개 업로드하는데 input 태그나 폼 데이터의 키가 다른 경우 field 미들웨어를 사용
//     > field 미들웨어의 인수로 input 태그의 name을 넣음
//     app.post('/upload', 
//         upload.fields([{name : image1}, {name : image2}]), (req, res) => {
//         console.log(req.files, req.body)
//         res.send('ok')
//     })

//     만약에 파일을 업로드 하지 않는데 멀티파트 형식으로 업로드하는 경우 none 미들웨어 사용
//     app.post('/upload', upload.none(), (req, res) => {
//         console.log(req.body)
//         res.send('ok')
//     })