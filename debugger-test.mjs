import { Interpreter, ASTNode, EvalError } from "./index.mjs";
import { Debugger } from "./debugger.mjs";

const tree = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        new ASTNode("variable", "x"),
        new ASTNode("numberLiteral", 42)
    ]),
    new ASTNode("assign", null, [
        new ASTNode("variable", "y"),
        new ASTNode("numberLiteral", 42)
    ]),
    new ASTNode("block", null, [
        new ASTNode("assign", null, [
            new ASTNode("variable", "y"),
            new ASTNode("call", null, [
                new ASTNode("variable", "+"),
                new ASTNode("numberLiteral", 10),
                new ASTNode("variable", "z")
            ])
        ])
    ]),
    new ASTNode("return", null, [new ASTNode("variable", "y")])
]);

const interpreter = new Interpreter(tree);

const debuggerInstance = new Debugger(interpreter, {
    enabled: true,
    stepMode: true,
    onPause: async ({ node, stack }) => {
        console.log("Paused at:", node.token);
        console.log("Stack:", stack);

        await new Promise(resolve => {
            const btn = document.createElement("button");
            btn.textContent = "Continue";
            btn.onclick = () => {
                btn.remove();
                resolve();
            };
            document.body.appendChild(btn);
        });
    }
});

debuggerInstance.watch("x");
debuggerInstance.watch("y");

interpreter.debugger = debuggerInstance;



try {
    await interpreter.run();
} catch (e) {
    if (e instanceof EvalError) {
        console.log("Ошибка:", e.message);
        console.log("Trace (от места ошибки до корня):");
        e.path.forEach((node, i) => {
            console.log(`${i}: ${node.token}${node.value !== null ? ` (${node.value})` : ''}`);
        });
    } else {
        console.error(e);
    }
}