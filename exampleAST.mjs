import { ASTNode, Interpreter } from "./index.mjs"

function L(n) { return new ASTNode("literal", n) }
function V(name) { return new ASTNode("variable", name) }
function Call(funcName, ...args) {
    return new ASTNode("call", null, [V(funcName), ...args])
}
const interp = new Interpreter(new ASTNode("literal", 0))

function runTest(desc, node) {
    try {
        const res = interp.eval(node)
        console.log(`${desc} =>`, res && res.value)
        return res && res.value
    } catch (err) {
        console.log(`${desc} => ERROR:`, err.message)
        return undefined
    }
}

console.log("=== GLOBAL CONSTANTS ===")
console.log("pi (from stack) =", interp.stack.lookup("pi").value)
console.log("e  (from stack) =", interp.stack.lookup("e").value)

console.log("=== ARITHMETIC ===")
runTest("add(7, 5)", Call("add", L(7), L(5)))
runTest("sub(7, 5)", Call("sub", L(7), L(5)))
runTest("mul(7, 5)", Call("mul", L(7), L(5)))
runTest("div(7, 2)  // floor div", Call("div", L(7), L(2)))
runTest("truediv(7, 2)", Call("truediv", L(7), L(2)))
runTest("mod(-3, 5)", Call("mod", L(-3), L(5)))
runTest("rem(-3, 5)", Call("rem", L(-3), L(5)))
runTest("pow(2, 10)", Call("pow", L(2), L(10)))

console.log("\n=== ROOTS & POWERS ===")
runTest("sqrt(49)", Call("sqrt", L(49)))
runTest("pow(e, 2)", Call("pow", V("e"), L(2)))

console.log("\n=== ABS, MIN, MAX ===")
runTest("abs(-123.45)", Call("abs", L(-123.45)))
runTest("min(3, 1, 9, -2, 0)", Call("min", L(3), L(1), L(9), L(-2), L(0)))
runTest("max(3, 1, 9, -2, 0)", Call("max", L(3), L(1), L(9), L(-2), L(0)))

console.log("\n=== EXP & LOGS ===")
runTest("exp(1)", Call("exp", L(1)))
runTest("log(e)", Call("log", V("e")))
runTest("log10(1000)", Call("log10", L(1000)))
runTest("log2(1024)", Call("log2", L(1024)))

console.log("\n=== TRIGONOMETRY ===")
runTest("sin(pi)", Call("sin", V("pi")))
runTest("cos(pi)", Call("cos", V("pi")))
runTest("tan(pi / 4)", Call("tan",
    Call("truediv", V("pi"), L(4))
))
runTest("asin(1)", Call("asin", L(1)))
runTest("acos(0)", Call("acos", L(0)))
runTest("atan(1)", Call("atan", L(1)))
runTest("atan2(1, 2)", Call("atan2", L(1), L(2)))

console.log("\n=== ROUNDING ===")
runTest("floor(3.7)", Call("floor", L(3.7)))
runTest("ceil(3.1)", Call("ceil", L(3.1)))
runTest("round(3.5)", Call("round", L(3.5)))
runTest("trunc(3.9)", Call("trunc", L(3.9)))

console.log("\n=== SIGN ===")
runTest("sign(10)", Call("sign", L(10)))
runTest("sign(-2.5)", Call("sign", L(-2.5)))
runTest("sign(0)", Call("sign", L(0)))