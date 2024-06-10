var 버튼들 = document.querySelectorAll('button');
var 모달창들 = document.querySelectorAll('div');
console.log(버튼들,모달창들);
    
for (let i = 0; i < 3; i++) {버튼들[i].addEventListener('click', function(){
  모달창들[i].style.display = 'block';
}); }
var 문자 = '안녕하세요   '+이름+'   입니다';
var 변수 = '손흥민',변수1 = 555,변수2 = '천재'
export var 이름='MyL' ;

function 해체분석기(문자들, 변수, 변수1, 변수2,변수3){
   console.log(문자들[2]+'  '+변수2+문자들[4]+문자들[1]);
  console.log(변수, 변수1, 변수2,변수3);
}
해체분석기`${변수} 안녕하세요 ${변수2} 입니다 ${변수} 저는 ${변수1}`;
    var pants = 0, socks = 100;
`바지${pants} 양말${socks}`;
    function 해체(문자들, 변수,변수1){ if(변수==0){console.log(문자들[0]+'는 안 팔아요'+' '+문자들[1]+변수1)}else{
   console.log(문자들[1]+변수+' '+문자들[0]+변수1);
  console.log(변수,변수1);
}}
 해체`바지${pants} 양말${socks}`; 

function 첫째함수(v){
setTimeout(()=>{console.log(1)}, 0); v() }
function 둘째함수(e){ console.log(2);e() }
첫째함수(()=>{console.log(5);둘째함수(()=>{console.log(6) }) })



export {문자,변수,프로};
export default 모달창들;