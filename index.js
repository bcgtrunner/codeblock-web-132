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
    }

    eval(node) {
        switch (node.token) {
            case "literal":
                return new Var("number", node.value);

            case "variable":
                return this.stack.lookup(node.value);

            case "assign":
                const val = this.eval(node.children[1]);
                this.stack.set(node.children[0].value, val);
                return val;

            case "call":
                const funcName = node.children[0].value;
                if (!(funcName in this.builtins))
                    throw new Error(`Unknown function ${funcName}`);

                const args = node.children.slice(1).map(arg => this.eval(arg).value);
                const result = this.builtins[funcName](...args);
                return new Var("number", result);

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
    new ASTNode("literal", 3),
    new ASTNode("literal", 4)
]);


const callAdd = new ASTNode("call", null, [
    new ASTNode("variable", "add"),
    new ASTNode("literal", 2),
    callMul
]);


const root = new ASTNode("assign", null, [
    new ASTNode("variable", "x"),
    callAdd
]);

const interp = new Interpreter(root);
const result = interp.run();

console.log(root);

console.log(interp.stack)
console.log(interp.stack.lookup("x"));