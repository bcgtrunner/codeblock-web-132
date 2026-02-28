import { ASTNode, Interpreter } from "../interpreter.mjs";

function N(n) { return new ASTNode("number", n); }
function S(s) { return new ASTNode("string", s); }
function B(b) { return new ASTNode("bool", b); }
function V(name) { return new ASTNode("variable", name); }
function Arr(...items) { return new ASTNode("array", null, items); }
function Call(funcName, ...args) {
    return new ASTNode("call", null, [V(funcName), ...args]);
}

const interp = new Interpreter(new ASTNode("number", 0));

function normalizeValue(value) {
    if (Array.isArray(value)) {
        return value.map((v) => (v && typeof v === "object" && "value" in v ? v.value : v));
    }
    return value;
}

function valuesEqual(actual, expected, approx = false) {
    const a = normalizeValue(actual);
    const e = normalizeValue(expected);

    if (Array.isArray(a) || Array.isArray(e)) {
        return JSON.stringify(a) === JSON.stringify(e);
    }

    if (approx && typeof a === "number" && typeof e === "number") {
        return Math.abs(a - e) < 1e-9;
    }

    return a === e;
}

async function runCase(desc, node, expected, options = {}) {
    try {
        const res = await interp.eval(node);
        const actual = res?.value;
        if (valuesEqual(actual, expected, options.approx === true)) {
            console.log(`[PASS] ${desc}`);
            return true;
        }
        console.error(`[FAIL] ${desc}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(normalizeValue(actual))}`);
        return false;
    } catch (e) {
        console.error(`[FAIL] ${desc}: threw "${e.message}"`);
        return false;
    }
}

let failed = 0;

if (interp.stack.lookup("pi")?.value === Math.PI) {
    console.log("[PASS] global constant pi");
} else {
    console.error("[FAIL] global constant pi");
    failed++;
}

if (interp.stack.lookup("e")?.value === Math.E) {
    console.log("[PASS] global constant e");
} else {
    console.error("[FAIL] global constant e");
    failed++;
}

const cases = [
    ["7 + 5", Call("+", N(7), N(5)), 12],
    ["7 - 5", Call("-", N(7), N(5)), 2],
    ["7 * 5", Call("*", N(7), N(5)), 35],
    ["7 / 2", Call("/", N(7), N(2)), 3.5],
    ["7 // 2", Call("//", N(7), N(2)), 3],
    ["-3 % 5", Call("%", N(-3), N(5)), -3],
    ["2 ** 10", Call("**", N(2), N(10)), 1024],

    ["5 == 5", Call("==", N(5), N(5)), true],
    ["5 != 3", Call("!=", N(5), N(3)), true],
    ["3 < 5", Call("<", N(3), N(5)), true],
    ["5 > 3", Call(">", N(5), N(3)), true],
    ["3 <= 3", Call("<=", N(3), N(3)), true],
    ["5 >= 6", Call(">=", N(5), N(6)), false],

    ["true and false", Call("and", B(true), B(false)), false],
    ["true or false", Call("or", B(true), B(false)), true],
    ["not true", Call("not", B(true)), false],

    ["sqrt(49)", Call("sqrt", N(49)), 7],
    ["abs(-123.45)", Call("abs", N(-123.45)), 123.45],
    ["floor(3.7)", Call("floor", N(3.7)), 3],
    ["ceil(3.1)", Call("ceil", N(3.1)), 4],
    ["round(3.5)", Call("round", N(3.5)), 4],
    ["trunc(3.9)", Call("trunc", N(3.9)), 3],
    ["sin(pi)", Call("sin", V("pi")), 0, { approx: true }],
    ["cos(pi)", Call("cos", V("pi")), -1, { approx: true }],
    ["tan(pi / 4)", Call("tan", Call("/", V("pi"), N(4))), 1, { approx: true }],
    ["log(e)", Call("log", V("e")), 1, { approx: true }],
    ["exp(1)", Call("exp", N(1)), Math.E, { approx: true }],
    ["min(3, -2)", Call("min", N(3), N(-2)), -2],
    ["max(3, -2)", Call("max", N(3), N(-2)), 3],
    ["sign(-2.5)", Call("sign", N(-2.5)), -1],
    ["atan2(1, 1)", Call("atan2", N(1), N(1)), Math.PI / 4, { approx: true }],
    ["asin(0.5)", Call("asin", N(0.5)), Math.asin(0.5), { approx: true }],
    ["acos(0.5)", Call("acos", N(0.5)), Math.acos(0.5), { approx: true }],
    ["atan(1)", Call("atan", N(1)), Math.PI / 4, { approx: true }],
    ["log10(1000)", Call("log10", N(1000)), 3],
    ["log2(8)", Call("log2", N(8)), 3],

    ["at([10,20,30], 1)", Call("at", Arr(N(10), N(20), N(30)), N(1)), 20],
    ["set_at([10,20,30], 1, 99)", Call("set_at", Arr(N(10), N(20), N(30)), N(1), N(99)), 99],
    ["insert_at([10,20,30], 1, 99)", Call("insert_at", Arr(N(10), N(20), N(30)), N(1), N(99)), 99],
    ["erase_at([10,20,30], 1)", Call("erase_at", Arr(N(10), N(20), N(30)), N(1)), 20],
    ["len([10,20,30])", Call("len", Arr(N(10), N(20), N(30))), 3],
    ["push([10,20,30], 99)", Call("push", Arr(N(10), N(20), N(30)), N(99)), 4],
    ["pop([10,20,30])", Call("pop", Arr(N(10), N(20), N(30))), 30],

    ["strlen('Hello')", Call("strlen", S("Hello")), 5],
    ["upper('Hello')", Call("upper", S("Hello")), "HELLO"],
    ["lower('HeLLo')", Call("lower", S("HeLLo")), "hello"],
    ["trim('  hi  ')", Call("trim", S("  hi  ")), "hi"],
    ["substring('Hello', 1, 4)", Call("substring", S("Hello"), N(1), N(4)), "ell"],
    ["split('a,b,c', ',')", Call("split", S("a,b,c"), S(",")), ["a", "b", "c"]],
    ["join(['a','b','c'], '-')", Call("join", Arr(S("a"), S("b"), S("c")), S("-")), "a-b-c"],
    ["startsWith('Hello', 'He')", Call("startsWith", S("Hello"), S("He")), true],
    ["endsWith('Hello', 'lo')", Call("endsWith", S("Hello"), S("lo")), true],
    ["replace('banana', 'na', 'X')", Call("replace", S("banana"), S("na"), S("X")), "baXna"],
    ["charAt('Hello', 1)", Call("charAt", S("Hello"), N(1)), "e"],

    ["boolToNumber(true)", Call("boolToNumber", B(true)), 1],
    ["numberToBool(0)", Call("numberToBool", N(0)), false],
    ["numberToString(123.5)", Call("numberToString", N(123.5)), "123.5"],
    ["boolToString(false)", Call("boolToString", B(false)), "false"],
    ["stringToNumber('42.5')", Call("stringToNumber", S("42.5")), 42.5],
    ["stringToBool('')", Call("stringToBool", S("")), false],
    ["arrayToBool([1])", Call("arrayToBool", Arr(N(1))), true],
    ["arrayToString([1,2,3])", Call("arrayToString", Arr(N(1), N(2), N(3))), "1,2,3"],
    ["typeof('abc')", Call("typeof", S("abc")), "string"]
];

for (const [name, node, expected, options] of cases) {
    const ok = await runCase(name, node, expected, options ?? {});
    if (!ok) failed++;
}

if (failed > 0) {
    process.exitCode = 1;
    console.error(`\nBuiltins tests failed: ${failed}`);
} else {
    console.log("\nBuiltins tests passed");
}
