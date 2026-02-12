class Var {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class ASTNode {
    constructor(token, value = null, children = []) {
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
        return null;
    }
}

class Interpreter {
    constructor(tree) {
        this.tree = tree;
        this.stack = new CallStack();

        // constants
        this.stack.set("pi", new Var("number", Math.PI));
        this.stack.set("e", new Var("number", Math.E));

        this.builtins = {
            "+": (a, b) => new Var("number", a.value + b.value),
            "-": (a, b) => new Var("number", a.value - b.value),
            "*": (a, b) => new Var("number", a.value * b.value),
            "/": (a, b) => new Var("number", a.value / b.value),
            "//": (a, b) => new Var("number", Math.trunc(a.value / b.value)),
            "%": (a, b) => new Var("number", a.value % b.value),
            "**": (a, b) => new Var("number", Math.pow(a.value, b.value)),

            ">": (a, b) => new Var("bool", a.value > b.value),
            ">=": (a, b) => new Var("bool", a.value >= b.value),
            "<": (a, b) => new Var("bool", a.value < b.value),
            "<=": (a, b) => new Var("bool", a.value <= b.value),
            "==": (a, b) => new Var("bool", a.value === b.value),
            "!=": (a, b) => new Var("bool", a.value !== b.value),

            "and": (a, b) => new Var("bool", a.value && b.value),
            "or": (a, b) => new Var("bool", a.value || b.value),
            "not": (a) => new Var("bool", !a.value),

            "sqrt": (a) => new Var("number", Math.sqrt(a.value)),
            "abs": (a) => new Var("number", Math.abs(a.value)),
            "floor": (a) => new Var("number", Math.floor(a.value)),
            "ceil": (a) => new Var("number", Math.ceil(a.value)),
            "round": (a) => new Var("number", Math.round(a.value)),
            "trunc": (a) => new Var("number", Math.trunc(a.value)),
            "sin": (a) => new Var("number", Math.sin(a.value)),
            "cos": (a) => new Var("number", Math.cos(a.value)),
            "tan": (a) => new Var("number", Math.tan(a.value)),
            "log": (a) => new Var("number", Math.log(a.value)),
            "exp": (a) => new Var("number", Math.exp(a.value)),
            "min": (...args) =>
                new Var("number", Math.min(...args.map(v => v.value))),
            "max": (...args) =>
                new Var("number", Math.max(...args.map(v => v.value))),
        };
    }

    eval(node) {
        switch (node.token) {

            case "numberLiteral":
                return new Var("number", Number(node.value));

            case "stringLiteral":
                return new Var("string", String(node.value));

            case "boolLiteral":
                return new Var("bool", Boolean(node.value));

            case "variable": {
                const variable = this.stack.lookup(node.value);
                if (variable === null)
                    throw new Error(`Variable ${node.value} not found`);
                return variable;
            }

            case "assign": {
                const name = node.children[0].value;
                const value = this.eval(node.children[1]);

                const existing = this.stack.lookup(name);
                if (existing === null) {
                    this.stack.set(name, value);
                } else {
                    existing.type = value.type;
                    existing.value = value.value;
                }

                return value;
            }

            case "call": {
                const funcName = node.children[0].value;

                if (!(funcName in this.builtins))
                    throw new Error(`Unknown function ${funcName}`);

                const args = node.children
                    .slice(1)
                    .map(arg => this.eval(arg));

                return this.builtins[funcName](...args);
            }

            case "if": {
                const condition = this.eval(node.children[0]);
                if (condition.value) {
                    return this.eval(node.children[1]);
                } else {
                    return this.eval(node.children[2]);
                }
            }

            case "while": {
                let result = new Var("void", null);
                while (this.eval(node.children[0]).value) {
                    result = this.eval(node.children[1]);
                }
                return result;
            }

            case "block": {
                this.stack.pushFrame();
                let returnVar = new Var("void", null);

                for (let child of node.children) {
                    const result = this.eval(child);
                    if (child.token === "return") {
                        returnVar = result;
                        break;
                    }
                }

                this.stack.popFrame();
                return returnVar;
            }

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

export { ASTNode, Interpreter };