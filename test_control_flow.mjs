import { ASTNode, Interpreter } from "./index.mjs";

function N(n) { return new ASTNode("numberLiteral", n); }
function B(b) { return new ASTNode("boolLiteral", b); }
function V(name) { return new ASTNode("variable", name); }
function Call(name, ...args) {
    return new ASTNode("call", null, [V(name), ...args]);
}

/*
    a = a + 1
*/
const callAdd = Call("+", V("a"), N(1));

const block = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        V("a"),
        callAdd
    ]),
    new ASTNode("return", null, [V("a")]),
]);

/*
    while (a < 100) { ... }
*/
const callWhile = new ASTNode("while", null, [
    Call("<", V("a"), N(100)),
    block,
]);

/*
    {
        a = 3
        while (...)
        return a
    }
*/
const block1 = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        V("a"),
        N(3)
    ]),
    callWhile,
    new ASTNode("return", null, [V("a")]),
]);

/*
    if (true and (3 == 3)) { block } else null
*/
const callIf = new ASTNode("if", null, [
    Call("and",
        B(true),
        Call("==", N(3), N(3))
    ),
    block,
    new ASTNode("null")
]);

/*
    x = block1
*/
const root = new ASTNode("assign", null, [
    V("x"),
    block1
]);

const interp = new Interpreter(root);
const result = interp.run();

console.log("AST root:", root);
console.log("Result:", result);
console.log("Stack frames:", interp.stack.frames);
console.log("x =", interp.stack.lookup("x"));