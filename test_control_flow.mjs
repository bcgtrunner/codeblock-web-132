import { ASTNode, Interpreter } from "./index.mjs";

const callMul = new ASTNode("call", null, [
    new ASTNode("variable", "mul"),
    new ASTNode("literal", 4),
    new ASTNode("literal", 3)
]);


const callAdd = new ASTNode("call", null, [
    
    new ASTNode("variable", "add"),
    new ASTNode("variable", "a"),
    new ASTNode("literal", 1)
]);


const block = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        new ASTNode("variable", "a"),
        callAdd
    ]),
    new ASTNode("return", null, [new ASTNode("variable", "a")]),
]);

const callWhile = new ASTNode("while", null, [
        new ASTNode("binaryExpression", null, [
            new ASTNode("variable", "<"),
            new ASTNode("variable", "a"),
            new ASTNode("literal", 100)
        ]),
        block,
    ]
)

const block1 = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        new ASTNode("variable", "a"),
        new ASTNode("literal", 3)
    ]),
    callWhile,
    new ASTNode("return", null, [new ASTNode("variable", "a")]),
]);

const callIf = new ASTNode("if", null, [
        new ASTNode("binaryExpression", null, [
            new ASTNode("variable", "and"),
            new ASTNode("literal", true),
            new ASTNode("binaryExpression", null, [
                new ASTNode("variable", "="),
                new ASTNode("literal", 3),
                new ASTNode("literal", 3)
            ]),
        ]),
        block,
        new ASTNode("null")
    ]
)

const root = new ASTNode("assign", null, [
    new ASTNode("variable", "x"),
    block1
]);

const interp = new Interpreter(root);
const result = interp.run();

console.log(root);

console.log(interp.stack)
console.log(interp.stack.lookup("x"));