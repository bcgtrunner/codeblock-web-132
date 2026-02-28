import { ASTNode, Interpreter, EvalError } from "./interpreter.mjs";

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
                new ASTNode("variable", "z") // <- 'z' is undefined; should throw EvalError
            ])
        ])
    ])
]);

const interpreter = new Interpreter(tree);

try {
    await interpreter.run();
} catch (e) {
    if (e instanceof EvalError) {
        console.log("Error:", e.message);
        console.log("Trace (from error site to root):");
        e.path.forEach((node, i) => {
            console.log(`${i}: ${node.token}${node.value !== null ? ` (${node.value})` : ""}`);
        });
    } else {
        console.error(e);
    }
}
