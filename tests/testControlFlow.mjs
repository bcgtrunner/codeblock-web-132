import { ASTNode, Interpreter, EvalError } from "../interpreter.mjs";

function N(n) { return new ASTNode("number", n); }
function B(b) { return new ASTNode("bool", b); }
function V(name) { return new ASTNode("variable", name); }
function Call(name, ...args) {
    return new ASTNode("call", null, [V(name), ...args]);
}

function assertEqual(actual, expected, label) {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, got ${actual}`);
    }
}

async function expectEvalError(tree, messagePart, label) {
    try {
        const interp = new Interpreter(tree);
        await interp.run();
        throw new Error(`${label}: expected EvalError`);
    } catch (e) {
        if (!(e instanceof EvalError)) {
            throw new Error(`${label}: expected EvalError, got ${e.constructor.name}`);
        }
        if (!e.message.includes(messagePart)) {
            throw new Error(`${label}: expected message containing "${messagePart}", got "${e.message}"`);
        }
    }
}

async function testIfBranches() {
    const root = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("a"), N(3)]),
        new ASTNode("if", null, [
            B(true),
            new ASTNode("assign", null, [V("a"), N(4)]),
            new ASTNode("assign", null, [V("a"), N(99)])
        ]),
        new ASTNode("if", null, [
            B(false),
            new ASTNode("assign", null, [V("a"), N(100)]),
            new ASTNode("assign", null, [V("a"), N(5)])
        ]),
        new ASTNode("return", null, [V("a")])
    ]);

    const interp = new Interpreter(root);
    const result = await interp.run();
    assertEqual(result.value, 5, "if true/false branches");
}

async function testWhileLoopSumAndZeroIterations() {
    const sumTree = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("a"), N(0)]),
        new ASTNode("assign", null, [V("i"), N(0)]),
        new ASTNode("assign", null, [V("arr"), new ASTNode("array", null, [N(11), N(15), N(12)])]),
        Call("push", V("arr"), N(100)),
        new ASTNode("while", null, [
            Call("<", V("i"), N(4)),
            new ASTNode("block", null, [
                new ASTNode("assign", null, [V("a"), Call("+", V("a"), Call("at", V("arr"), V("i")))]),
                new ASTNode("assign", null, [V("i"), Call("+", V("i"), N(1))])
            ])
        ]),
        new ASTNode("return", null, [V("a")])
    ]);

    const sumInterp = new Interpreter(sumTree);
    const sumResult = await sumInterp.run();
    assertEqual(sumResult.value, 138, "while loop sum");

    const zeroWhileTree = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("x"), N(10)]),
        new ASTNode("while", null, [
            B(false),
            new ASTNode("assign", null, [V("x"), N(999)])
        ]),
        new ASTNode("return", null, [V("x")])
    ]);
    const zeroWhileInterp = new Interpreter(zeroWhileTree);
    const zeroWhileResult = await zeroWhileInterp.run();
    assertEqual(zeroWhileResult.value, 10, "while zero iterations");
}

async function testForLoopAndScopeAndZeroIterations() {
    const forTree = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("a"), N(0)]),
        new ASTNode("for", null, [
            new ASTNode("assign", null, [V("i"), N(0)]),
            Call("<=", V("i"), N(10)),
            new ASTNode("assign", null, [V("i"), Call("+", V("i"), N(1))]),
            new ASTNode("assign", null, [V("a"), Call("+", V("a"), V("i"))])
        ]),
        new ASTNode("return", null, [V("a")])
    ]);

    const interp = new Interpreter(forTree);
    const result = await interp.run();
    assertEqual(result.value, 55, "for loop sum");
    assertEqual(interp.stack.lookup("i"), null, "for loop scope cleanup (i should not leak)");

    const zeroForTree = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("x"), N(10)]),
        new ASTNode("for", null, [
            new ASTNode("assign", null, [V("i"), N(0)]),
            B(false),
            new ASTNode("assign", null, [V("i"), Call("+", V("i"), N(1))]),
            new ASTNode("assign", null, [V("x"), N(999)])
        ]),
        new ASTNode("return", null, [V("x")])
    ]);
    const zeroForInterp = new Interpreter(zeroForTree);
    const zeroForResult = await zeroForInterp.run();
    assertEqual(zeroForResult.value, 10, "for zero iterations");
}

async function testConditionTypeErrors() {
    await expectEvalError(
        new ASTNode("while", null, [N(1), new ASTNode("number", 0)]),
        "Bool expected",
        "while condition type"
    );

    await expectEvalError(
        new ASTNode("for", null, [
            new ASTNode("assign", null, [V("i"), N(0)]),
            N(1),
            new ASTNode("assign", null, [V("i"), Call("+", V("i"), N(1))]),
            new ASTNode("number", 0)
        ]),
        "Bool expected",
        "for condition type"
    );
}

async function testReturnShortCircuitInBlock() {
    const tree = new ASTNode("block", null, [
        new ASTNode("assign", null, [V("x"), N(1)]),
        new ASTNode("return", null, [N(7)]),
        new ASTNode("assign", null, [V("x"), N(999)])
    ]);

    const interp = new Interpreter(tree);
    const result = await interp.run();
    assertEqual(result.value, 7, "return short-circuit in block");
}

async function main() {
    const tests = [
        ["if branches", testIfBranches],
        ["while loop", testWhileLoopSumAndZeroIterations],
        ["for loop", testForLoopAndScopeAndZeroIterations],
        ["condition type errors", testConditionTypeErrors],
        ["return short-circuit", testReturnShortCircuitInBlock]
    ];

    for (const [name, fn] of tests) {
        try {
            await fn();
            console.log(`[PASS] ${name}`);
        } catch (e) {
            console.error(`[FAIL] ${name}: ${e.message}`);
            process.exitCode = 1;
        }
    }
}

await main();
