import { ASTNode, Interpreter } from "./interpreter.mjs";

function N(n) { return new ASTNode("number", n); }
function S(s) { return new ASTNode("string", s); }
function B(b) { return new ASTNode("bool", b); }
function V(name) { return new ASTNode("variable", name); }
function Arr(...items) { return new ASTNode("array", null, items); }
function Call(funcName, ...args) {
    return new ASTNode("call", null, [V(funcName), ...args]);
}

const interp = new Interpreter(new ASTNode("number", 0));

async function runTest(desc, node) {
    try {
        const res = await interp.eval(node);
        console.log(`${desc} =>`, res && res.value);
        return res && res.value;
    } catch (err) {
        console.log(`${desc} => ERROR:`, err.message);
        return undefined;
    }
}

console.log("=== GLOBAL CONSTANTS ===");
console.log("pi (from stack) =", interp.stack.lookup("pi").value);
console.log("e  (from stack) =", interp.stack.lookup("e").value);

console.log("\n=== ARITHMETIC ===");
await runTest("7 + 5", Call("+", N(7), N(5)));
await runTest("7 - 5", Call("-", N(7), N(5)));
await runTest("7 * 5", Call("*", N(7), N(5)));
await runTest("7 / 2", Call("/", N(7), N(2)));
await runTest("7 // 2", Call("//", N(7), N(2)));
await runTest("-3 % 5", Call("%", N(-3), N(5)));
await runTest("2 ** 10", Call("**", N(2), N(10)));

console.log("\n=== COMPARISON ===");
await runTest("5 == 5", Call("==", N(5), N(5)));
await runTest("5 != 3", Call("!=", N(5), N(3)));
await runTest("3 < 5", Call("<", N(3), N(5)));
await runTest("5 > 3", Call(">", N(5), N(3)));
await runTest("3 <= 3", Call("<=", N(3), N(3)));
await runTest("5 >= 6", Call(">=", N(5), N(6)));

console.log("\n=== LOGICAL ===");
await runTest("true and false", Call("and", B(true), B(false)));
await runTest("true or false", Call("or", B(true), B(false)));
await runTest("not true", Call("not", B(true)));

console.log("\n=== MATH ===");
await runTest("sqrt(49)", Call("sqrt", N(49)));
await runTest("abs(-123.45)", Call("abs", N(-123.45)));
await runTest("floor(3.7)", Call("floor", N(3.7)));
await runTest("ceil(3.1)", Call("ceil", N(3.1)));
await runTest("round(3.5)", Call("round", N(3.5)));
await runTest("trunc(3.9)", Call("trunc", N(3.9)));
await runTest("sin(pi)", Call("sin", V("pi")));
await runTest("cos(pi)", Call("cos", V("pi")));
await runTest("tan(pi / 4)", Call("tan", Call("/", V("pi"), N(4))));
await runTest("log(e)", Call("log", V("e")));
await runTest("exp(1)", Call("exp", N(1)));
await runTest("min(3, -2)", Call("min", N(3), N(-2)));
await runTest("max(3, -2)", Call("max", N(3), N(-2)));
await runTest("sign(-2.5)", Call("sign", N(-2.5)));
await runTest("atan2(1, 1)", Call("atan2", N(1), N(1)));
await runTest("asin(0.5)", Call("asin", N(0.5)));
await runTest("acos(0.5)", Call("acos", N(0.5)));
await runTest("atan(1)", Call("atan", N(1)));
await runTest("log10(1000)", Call("log10", N(1000)));
await runTest("log2(8)", Call("log2", N(8)));

console.log("\n=== ARRAYS ===");
await runTest("at([10,20,30], 1)", Call("at", Arr(N(10), N(20), N(30)), N(1)));
await runTest("set_at([10,20,30], 1, 99)", Call("set_at", Arr(N(10), N(20), N(30)), N(1), N(99)));
await runTest("insert_at([10,20,30], 1, 99)", Call("insert_at", Arr(N(10), N(20), N(30)), N(1), N(99)));
await runTest("erase_at([10,20,30], 1)", Call("erase_at", Arr(N(10), N(20), N(30)), N(1)));
await runTest("len([10,20,30])", Call("len", Arr(N(10), N(20), N(30))));
await runTest("push([10,20,30], 99)", Call("push", Arr(N(10), N(20), N(30)), N(99)));
await runTest("pop([10,20,30])", Call("pop", Arr(N(10), N(20), N(30))));

console.log("\n=== STRINGS ===");
await runTest("strlen('Hello')", Call("strlen", S("Hello")));
await runTest("upper('Hello')", Call("upper", S("Hello")));
await runTest("lower('HeLLo')", Call("lower", S("HeLLo")));
await runTest("trim('  hi  ')", Call("trim", S("  hi  ")));
await runTest("substring('Hello', 1, 4)", Call("substring", S("Hello"), N(1), N(4)));
await runTest("split('a,b,c', ',')", Call("split", S("a,b,c"), S(",")));
await runTest("join(['a','b','c'], '-')", Call("join", Arr(S("a"), S("b"), S("c")), S("-")));
await runTest("startsWith('Hello', 'He')", Call("startsWith", S("Hello"), S("He")));
await runTest("endsWith('Hello', 'lo')", Call("endsWith", S("Hello"), S("lo")));
await runTest("replace('banana', 'na', 'X')", Call("replace", S("banana"), S("na"), S("X")));
await runTest("charAt('Hello', 1)", Call("charAt", S("Hello"), N(1)));

console.log("\n=== CONVERSIONS ===");
await runTest("boolToNumber(true)", Call("boolToNumber", B(true)));
await runTest("numberToBool(0)", Call("numberToBool", N(0)));
await runTest("numberToString(123.5)", Call("numberToString", N(123.5)));
await runTest("boolToString(false)", Call("boolToString", B(false)));
await runTest("stringToNumber('42.5')", Call("stringToNumber", S("42.5")));
await runTest("stringToBool('')", Call("stringToBool", S("")));
await runTest("arrayToBool([1])", Call("arrayToBool", Arr(N(1))));
await runTest("arrayToString([1,2,3])", Call("arrayToString", Arr(N(1), N(2), N(3))));
await runTest("typeof('abc')", Call("typeof", S("abc")));
