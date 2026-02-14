import { ASTNode, Interpreter } from "./index.mjs";

function N(n) { return new ASTNode("numberLiteral", n); }
function B(b) { return new ASTNode("boolLiteral", b); }
function V(name) { return new ASTNode("variable", name); }
function Call(name, ...args) {
    return new ASTNode("call", null, [V(name), ...args]);
}

Test2();

function Test1() {
    const callAdd = Call("+", V("a"), N(1));

    const block = new ASTNode("block", null, [
        new ASTNode("assign", null, [
            V("a"),
            callAdd
        ]),
        new ASTNode("return", null, [V("a")]),
    ]);

    const callWhile = new ASTNode("while", null, [
        Call("<", V("a"), N(100)),
        block,
    ]);

    const block1 = new ASTNode("block", null, [
        new ASTNode("assign", null, [
            V("a"),
            N(3)
        ]),
        callWhile,
        new ASTNode("block"),
        new ASTNode("return", null, [V("a")])
    ]);

    const callIf = new ASTNode("if", null, [
        Call("and",
            B(true),
            Call("==", N(3), N(3))
        ),
        block,
        new ASTNode("block")
    ]);

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
}

function Test2() {
    const callAddI = new ASTNode("assign", null, [
        V("i"),
        Call("+", V("i"), N(1))
    ]);

    const loopBlock = new ASTNode("block", null, [
        new ASTNode("assign", null, [
            V("a"),
            Call("+", V("a"), Call("at", V("arr"), V("i")))
        ]),
        callAddI,
        new ASTNode("return", null, [V("a")])
    ]);

    const callWhile = new ASTNode("while", null, [
        Call("<", V("i"), N(3)),
        loopBlock
    ]);

    const root = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("a"), N(0)]),
        new ASTNode("assign", null, [V("i"), N(0)]),
        new ASTNode("assign", null, [
            V("arr"),
            new ASTNode("array", null, [N(11), N(15), N(12)])
        ]),
        new ASTNode("push", null, [V("arr", N(100))]),
        callWhile,
        new ASTNode("return", null, [V("a")])
    ]);

    const interp = new Interpreter(root);
    const result = interp.run();
    console.log("Result:", result);
    console.log("Stack frames:", interp.stack.frames);
    console.log("Сумма элементов массива:", result.value); // 38
}

function Test3() {
    const forLoop = new ASTNode("for", null, [
    new ASTNode("assign", null, [V("i"), N(0)]),
        Call("<=", V("i"), N(10)),
        new ASTNode("assign", null, [
            V("i"), 
            Call("+", V("i"), N(1))
        ]),
        new ASTNode("assign", null, [
            V("a"), 
            Call("+", V("a"), V("i"))
        ])
    ]);

    const block = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("a"), N(0)]),
        forLoop,
        new ASTNode("return", null, [V("a")])
    ]);

    const interp = new Interpreter(block);
    const result = interp.run();
    console.log("Result:", result);
    console.log("Stack frames:", interp.stack.frames);
    console.log("Сумма элементов массива:", result.value);
}