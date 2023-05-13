function replaceHost(url) {
  var reg = /^https:\/\/.*?\//;

  return url.replace(reg, function (v) {
    return "http://localhost:8000/";
  });
}


// 请求数据
async function getFetch(url) {
  const p1 = await fetch(url)
  const p2 = await p1.json()
  return p2
}