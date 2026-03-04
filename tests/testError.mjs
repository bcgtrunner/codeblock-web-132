import { ASTNode, Interpreter, EvalError } from "../interpreter.mjs";

const tree = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        new ASTNode("variable", "x"),
        new ASTNode("number", 42)
    ]),
    new ASTNode("block", null, [
        new ASTNode("assign", null, [
            new ASTNode("variable", "y"),
            new ASTNode("call", null, [
                new ASTNode("variable", "+"),
                new ASTNode("number", 10),
                new ASTNode("variable", "z")
            ])
        ])
    ])
]);

const interpreter = new Interpreter(tree);
let failed = 0;

try {
    await interpreter.run();
    console.error("[FAIL] expected EvalError, but run() succeeded");
    failed++;
} catch (e) {
    if (e instanceof EvalError) {
        if (e.message.includes("Variable z not found")) {
            console.log("[PASS] expected EvalError for undefined variable z");
        } else {
            console.error(`[FAIL] unexpected EvalError message: ${e.message}`);
            failed++;
        }
    } else {
        console.error(`[FAIL] expected EvalError, got ${e.constructor.name}: ${e.message}`);
        failed++;
    }
}

if (failed > 0) {
    process.exitCode = 1;
}
