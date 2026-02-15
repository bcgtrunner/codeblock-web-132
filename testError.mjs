import { ASTNode, Interpreter, EvalError } from "./index.mjs"

// Создаём простую AST
const tree = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        new ASTNode("variable", "x"),
        new ASTNode("numberLiteral", 42)
    ]),
    new ASTNode("block", null, [
        new ASTNode("assign", null, [
            new ASTNode("variable", "y"),
            new ASTNode("call", null, [
                new ASTNode("variable", "+"),
                new ASTNode("numberLiteral", 10),
                new ASTNode("variable", "z")  // <- 'z' не определена, вызовет EvalError
            ])
        ])
    ])
]);

// Создаём интерпретатор
const interpreter = new Interpreter(tree);

// Запускаем и ловим ошибку
try {
    interpreter.run();
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
