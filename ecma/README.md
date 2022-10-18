ES6 이후 추가된 기능들을 학습

# 1. var, let, const
### 1) 변수 선언
```
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
```
// var 호이스팅 가능, let 호이스팅 불가
console.log(foo); // undefined
var foo;

console.log(bar); // Error: Uncaught ReferenceError: bar is not defined
let bar;
```

### 3) 정리
변수 선언은 `const`로 선언하고 변경이 필요한 변수만 `let`으로 바꾸는 것이 좋다.