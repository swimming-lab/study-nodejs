// 1) 일반 프라미스 함수를 async, await으로 변경
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}
loadJson('no-such-user.json').catch(alert); // Error: 404

async function newLoadJson(url) {
  let response = await fetch(url);

  if (response.status == 200) {
    return await response.json();
  } else {
    throw new Error(response.status);
  }
}
newLoadJson('no-such-user.json').catch(alert); // Error: 404


// 2) 일반 함수에서 async 함수 호출하여 결과를 기다렸다가 값 얻기(*일반 함수 내 await 사용 불가)
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 10;
}

function test() {
  wait().then(result => alert(result));
}
test();