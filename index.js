var a = 0;

init();


Print = function () {
    console.log("Hello, World!");
    console.log(a);
}
Print();

function init() {
    a += 30;
}