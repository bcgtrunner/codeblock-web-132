import { ASTNode, Interpreter } from "./index.mjs"

function N(n) { return new ASTNode("numberLiteral", n) }
function V(name) { return new ASTNode("variable", name) }

function Call(funcName, ...args) {
    return new ASTNode("call", null, [V(funcName), ...args])
}

const interp = new Interpreter(new ASTNode("numberLiteral", 0))

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

console.log("\n=== ARITHMETIC ===")
runTest("7 + 5", Call("+", N(7), N(5)))
runTest("7 - 5", Call("-", N(7), N(5)))
runTest("7 * 5", Call("*", N(7), N(5)))
runTest("7 / 2", Call("/", N(7), N(2)))
runTest("7 // 2", Call("//", N(7), N(2)))
runTest("-3 % 5", Call("%", N(-3), N(5)))
runTest("2 ** 10", Call("**", N(2), N(10)))

console.log("\n=== ROOTS & POWERS ===")
runTest("sqrt(49)", Call("sqrt", N(49)))
runTest("e ** 2", Call("**", V("e"), N(2)))

console.log("\n=== ABS, MIN, MAX ===")
runTest("abs(-123.45)", Call("abs", N(-123.45)))
runTest("min(3, 1, 9, -2, 0)", Call("min", N(3), N(1), N(9), N(-2), N(0)))
runTest("max(3, 1, 9, -2, 0)", Call("max", N(3), N(1), N(9), N(-2), N(0)))

console.log("\n=== EXP & LOGS ===")
runTest("exp(1)", Call("exp", N(1)))
runTest("log(e)", Call("log", V("e")))

console.log("\n=== TRIGONOMETRY ===")
runTest("sin(pi)", Call("sin", V("pi")))
runTest("cos(pi)", Call("cos", V("pi")))
runTest("tan(pi / 4)", Call("tan",
    Call("/", V("pi"), N(4))
))
runTest("asin(1)", Call("asin", N(1)))
runTest("acos(0)", Call("acos", N(0)))
runTest("atan(1)", Call("atan", N(1)))

console.log("\n=== ROUNDING ===")
runTest("floor(3.7)", Call("floor", N(3.7)))
runTest("ceil(3.1)", Call("ceil", N(3.1)))
runTest("round(3.5)", Call("round", N(3.5)))
runTest("trunc(3.9)", Call("trunc", N(3.9)))

console.log("\n=== SIGN ===")
runTest("sign(10)", Call("sign", N(10)))
runTest("sign(-2.5)", Call("sign", N(-2.5)))
runTest("sign(0)", Call("sign", N(0)))

console.log("\n=== COMPARISON ===")
runTest("5 > 3", Call(">", N(5), N(3)))
runTest("5 == 5", Call("==", N(5), N(5)))
runTest("5 != 3", Call("!=", N(5), N(3)))

console.log("\n=== LOGICAL ===")
runTest("true and false",
    Call("and",
        new ASTNode("boolLiteral", true),
        new ASTNode("boolLiteral", false)
    )
)
runTest("not true",
    Call("not",
        new ASTNode("boolLiteral", true)
    )
)