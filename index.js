class Var {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class ASTNode {
    constructor(token, value=null, children=[]) {
        this.token = token;
        this.value = value;
        this.children = children;
    }
}

class CallStack {
    constructor() {
        this.frames = [{}];
    }

    pushFrame() {
        this.frames.push({});
    }

    popFrame() {
        return this.frames.pop();
    }

    set(name, variable) {
        this.frames[this.frames.length - 1][name] = variable;
    }

    lookup(name) {
        for (let i = this.frames.length - 1; i >= 0; i--) {
            if (name in this.frames[i]) return this.frames[i][name];
        }
        throw new Error(`Variable ${name} not found`);
    }
}

class Interpreter {
    constructor(tree) {
        this.tree = tree;
        this.stack = new CallStack();

        this.builtins = {
            add: (a, b) => a + b,
            sub: (a, b) => a - b,
            mul: (a, b) => a * b,
            div: (a, b) => Math.floor(a / b),
            truediv: (a, b) => a / b,
            mod: (a, b) => a % b,
            pow: (a, b) => Math.pow(a, b),
            sqrt: (a) => Math.sqrt(a),
        };

        this.operators = {
            ">": (a, b) => a > b,
            ">=": (a, b) => a >= b,
            "<": (a, b) => a < b,
            "<=": (a, b) => a <= b,
            "=": (a, b) => a == b,
            "!=": (a, b) => a != b,
            "and": (a, b) => a && b,
            "or": (a, b) => a || b,
        };
    }

    eval(node) {
        switch (node.token) {
            case "literal":
                return new Var("int", node.value);

            case "variable":
                return this.stack.lookup(node.value);

            case "assign":
                const val = this.eval(node.children[1]);
                this.stack.set(node.children[0].value, val);
                return val;

            case "call":
                const funcName = node.children[0].value;
                /**
                 * TODO:
                 * implement user defined functions
                 * as the first thing to do here we could inject the builtins
                 * into the local scope, instead of magic values as they are
                 * right now. 
                 */
                if (!(funcName in this.builtins))
                    throw new Error(`Unknown function ${funcName}`);

                const args = node.children.slice(1).map(arg => this.eval(arg).value);
                const result = this.builtins[funcName](...args);
                return new Var("int", result);
            
                /**
                 * TODO:
                 * implement if-elif-else, while, for (as the last thing probably)
                 * I think that we should start with simple if, then if-else
                 * then if-elif-else, if wont be that difficult, but this will
                 * allow to gradually build it up. While should be somewhat similar
                 * to if, except in a loop. For would be a bit more complicated, cuz
                 * its 4 statements, not 2 like while.
                 */

            case "binaryExprasion":
                const operatorName = node.children[0].value;

                if (!(operatorName in this.operators))
                    throw new Error(`Unknown operator ${operatorName}`);

                const argss = node.children.slice(1).map(arg => this.eval(arg).value);
                const res = this.operators[operatorName](...argss);
                return new Var("bool", res);

            case "ifStatement":
                const binaryValue = this.eval(node.children[0]).value;

                if (binaryValue) {
                    const value = this.eval(node.children[1]);
                    return value;
                }
                else {
                    const value = this.eval(node.children[2]);
                    return value;
                }
                
            case "block":
                const childs = node.children;
                for (let i = 0; i < childs.length - 1; i++) {
                    this.eval(childs[i]);
                }

                return this.eval(childs[childs.length - 1]);
            
            case "return":
                return this.eval(node.children[0]);
                
            case "null":
                return new Var("void", null);

            default:
                throw new Error(`Unknown AST node token: ${node.token}`);
        }
    }

    run() {
        return this.eval(this.tree);
    }
}

const callMul = new ASTNode("call", null, [
    new ASTNode("variable", "mul"),
    new ASTNode("literal", 4),
    new ASTNode("literal", 3)
]);


const callAdd = new ASTNode("call", null, [
    new ASTNode("variable", "add"),
    new ASTNode("variable", "a"),
    new ASTNode("variable", "b")
]);


const block = new ASTNode("block", null, [
    new ASTNode("assign", null, [
        new ASTNode("variable", "a"),
        callMul
    ]),
    new ASTNode("assign", null, [
        new ASTNode("variable", "b"),
        callMul
    ]),
    new ASTNode("return", null, [callAdd]),
]);

const callIf = new ASTNode("ifStatement", null, [
        new ASTNode("binaryExprasion", null, [
            new ASTNode("variable", "and"),
            new ASTNode("literal", true),
            new ASTNode("binaryExprasion", null, [
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
    callIf
]);

const interp = new Interpreter(root);
const result = interp.run();

console.log(root);

console.log(interp.stack)
console.log(interp.stack.lookup("x"));