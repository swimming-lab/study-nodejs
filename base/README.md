# study-nodejs

인프런 강의 및 기타 학습 채널을 통한 nodejs 학습

### 실행
```
node hello.js
node webserver.js
node underscore.js
node file/sync_async.js
node db/mysql.js
node db/sequelize.js
```

### 의존성
```
npm install underscore --save
npm install uglify-js -g
npm install mysql2 --save
npm install sequelize sequelize-cli sqlite3 --save
```

### uglifyjs 실행
```
uglifyjs [input files] [options]
uglifyjs uglify/test.js -m -o uglify/test.min.js
```

### Sequelize
사용방법 및 옵션 정리
(./db/sequelize/files)

### Sequelize 관계
1대다 관계(사용자 한명이 댓글 여러개 작성)
- 시퀄라이즈에서는 1:N 관계를 hasMany로 표현(사용자.hasMany(댓글))
- 반대의 입장에서는 belongsTo(댓글.belongsTo(사용자)
- belongTo가 있는 테이블에 컬럼이 생김(댓글 테이블에 commenter 컬럼 생성)
```js
Team.hasMany(Player);
Player.belongsTo(Team);
```
1대1 관계 (사용자 테이블과 사용자 정보 테이블)
- 1:1 관계는 hasOne으로 표현(사용자.hasOne(정보))
- 사용자의 기본정보와 사용자의 디테일을 나누고 싶을 때.
- ex) 자주 불리는 정보는 기본정보, 가끔 조회하는 정보는 디테일
- belongsTo는 그대로 사용, 외래키가 들어가니까 판단 잘 할 것.
```js
Foo.hasOne(Bar, {
  foreignKey: 'myFooId'
});
Bar.belongsTo(Foo);
```
다대다 관계(인스타그램 게시글과 해시태그 테이블)
- 하나의 게시글의 여러개의 해시태그를 가질 수 있고 하나의 해시태그가 여러개의 개시글을 가질 수 있음
- DB 특성 상 다대다 관계는 중간에 연결해주는 테이블이 필요하여 생성함
```js
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });

/**
CREATE TABLE IF NOT EXISTS "ActorMovies" (
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "MovieId" INTEGER REFERENCES "Movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "ActorId" INTEGER REFERENCES "Actors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("MovieId","ActorId")
);
*/
```

참고]
- https://nodejs.org/
- https://www.npmjs.com
- https://www.w3schools.com/js
- https://www.toptal.com/developers/gitignore
- https://sequelize.org/docs/v6/getting-started/