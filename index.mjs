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

        this.stack.set("pi", new Var("number", Math.PI));
        this.stack.set("e", new Var("number", Math.E));

        this.builtins = {
            add: (a, b) => a + b,
            sub: (a, b) => a - b,
            mul: (a, b) => a * b,
            div: (a, b) => Math.floor(a / b),
            truediv: (a, b) => a / b,
            mod: (a, b) => ((a % b) + b) % b,
            rem: (a, b) => a % b,
            pow: (a, b) => Math.pow(a, b),

            sqrt: (a) => Math.sqrt(a),

            abs: (a) => Math.abs(a),
            min: (...args) => Math.min(...args),
            max: (...args) => Math.max(...args),

            exp: (a) => Math.exp(a),
            log: (a) => Math.log(a),
            log10: (a) => Math.log10(a),
            log2: (a) => Math.log2(a),

            sin: (a) => Math.sin(a),
            cos: (a) => Math.cos(a),
            tan: (a) => Math.tan(a),
            asin: (a) => Math.asin(a),
            acos: (a) => Math.acos(a),
            atan: (a) => Math.atan(a),
            atan2: (a, b) => Math.atan2(a, b),

            floor: (a) => Math.floor(a),
            ceil: (a) => Math.ceil(a),
            round: (a) => Math.round(a),
            trunc: (a) => Math.trunc(a),

            sign: (a) => Math.sign(a),
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

export { ASTNode, Interpreter }