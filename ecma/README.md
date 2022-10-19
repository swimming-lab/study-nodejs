ES6 이후 추가된 기능들을 학습

# 1. var, let, const
### 1) 변수 선언
```js
// var 재선언 가능
var name = 'swimming-1'
console.log(name) // swimming-1

var name = 'swimming-2'
console.log(name) // swimming-2


// let,const 재선언 불가
let name = 'swimming-1'
console.log(name) // swimming-1

let name = 'swimming-2'
console.log(name) // Uncaught SyntaxError: Identifier 'name' has already been declared


// const 재할당 불가
const name = 'swimming-1'
console.log(name) // swimming-1

name = 'swimming-2'
console.log(name) //Uncaught TypeError: Assignment to constant variable.
```

### 2) 호이스팅
변수나 함수 선언문들을 스코프의 선두로 옮긴 것처럼 동작하게 만들어주는 것
```js
// var 호이스팅 가능, let 호이스팅 불가
console.log(foo); // undefined
var foo;

console.log(bar); // Error: Uncaught ReferenceError: bar is not defined
let bar;
```

### 3) 정리
변수 선언은 `const`로 선언하고 변경이 필요한 변수만 `let`으로 바꾸는 것이 좋다.


# 2. async, await
### 1) async 함수
async를 함수 앞에 붙이면 해당 함수는 반드시 `promise`를 반환한다.
```js
async function test() {
  return 1;
  // return Promise.resolve(1); 과 같음
}
test().then(alert); // 1
```

### 2) await
`async`함수 안에서만 동작하며 함수 내부의 프라미스가 처리될 때까지 기다린 후 그 이후 동작한다.(비동기)
`await`은 `promise.then`보다 가독성이 좋고 세련되게 같은 값을 얻을 수 있도록 해준다.
```js
async function test() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // 프라미스가 완료될 때까지 기다린 후 동작함
  alert(result); // "done!"
}
```

일반 함수에는 `await`을 사용할 수 없으며 최상위 레벨 코드(top-level-code)에도 사용할 수 없다.
```js
// 프라미스가 있더라도 일반 함수에서 사용하면 에러 발생!
function normal() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error!
}

// 최상위 레벨 코드에서 바로 사용하면 에러 발생!
let response = await fetch('~/user.json');
let user = await response.json();

// 단, 익명 async함수로 감싸면 최상위 레벨 코드에서도 사용 가능
(async () => {
  let response = await fetch('~/user.json');
  let user = await response.json();
})
```

### 3) error 핸들링
```js
// throw
async function test() {
  await Promise.reject(new Error("Error!"));
  // throw new Error("Error!"); 와 같음
}

// try, catch
async function test() {
  try {
    let response = await fetch('error-url');
  } catch(err) {
    alert(err);
  }  
}

// promise.catch
async function test() {
  let response = await fetch('error-url');
}
test().catch(alert);
```

### 4) promise.all
```js
async function test() {
  let results = await Promise.all([
    fetch(url1),
    fetch(url2),
    ...
  ])
}
```

### 5) 정리
async, await를 사용하여 `promise.then/catch`를 사용하지 않고도 가독성 좋은 비동기 코드를 작성할 수 있다.