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

        this.stack.set("pi", new Var("number", Math.PI));
        this.stack.set("e", new Var("number", Math.E));

        const makeBuiltin = (params, returns, impl) =>
            new Var("function", { kind: "builtin", params, returns, impl });

        this.stack.set("+", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", a.value + b.value)
        ));
        this.stack.set("-", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", a.value - b.value)
        ));
        this.stack.set("*", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", a.value * b.value)
        ));
        this.stack.set("/", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", a.value / b.value)
        ));
        this.stack.set("//", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", Math.trunc(a.value / b.value))
        ));
        this.stack.set("%", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", a.value % b.value)
        ));
        this.stack.set("**", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", Math.pow(a.value, b.value))
        ));

        this.stack.set("==", makeBuiltin(["number", "number"], "bool", (a, b) =>
            new Var("bool", a.value === b.value)
        ));
        this.stack.set("!=", makeBuiltin(["number", "number"], "bool", (a, b) =>
            new Var("bool", a.value !== b.value)
        ));
        this.stack.set("<", makeBuiltin(["number", "number"], "bool", (a, b) =>
            new Var("bool", a.value < b.value)
        ));
        this.stack.set(">", makeBuiltin(["number", "number"], "bool", (a, b) =>
            new Var("bool", a.value > b.value)
        ));
        this.stack.set("<=", makeBuiltin(["number", "number"], "bool", (a, b) =>
            new Var("bool", a.value <= b.value)
        ));
        this.stack.set(">=", makeBuiltin(["number", "number"], "bool", (a, b) =>
            new Var("bool", a.value >= b.value)
        ));

        this.stack.set("and", makeBuiltin(["bool", "bool"], "bool", (a, b) =>
            new Var("bool", a.value && b.value)
        ));
        this.stack.set("or", makeBuiltin(["bool", "bool"], "bool", (a, b) =>
            new Var("bool", a.value || b.value)
        ));
        this.stack.set("not", makeBuiltin(["bool"], "bool", (a) =>
            new Var("bool", !a.value)
        ));

        this.stack.set("sqrt", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.sqrt(a.value))
        ));
        this.stack.set("abs", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.abs(a.value))
        ));
        this.stack.set("floor", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.floor(a.value))
        ));
        this.stack.set("ceil", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.ceil(a.value))
        ));
        this.stack.set("round", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.round(a.value))
        ));
        this.stack.set("trunc", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.trunc(a.value))
        ));
        this.stack.set("sin", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.sin(a.value))
        ));
        this.stack.set("cos", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.cos(a.value))
        ));
        this.stack.set("tan", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.tan(a.value))
        ));
        this.stack.set("log", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.log(a.value))
        ));
        this.stack.set("exp", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.exp(a.value))
        ));
        this.stack.set("min", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", Math.min(a.value, b.value))
        ));
        this.stack.set("max", makeBuiltin(["number", "number"], "number", (a, b) =>
            new Var("number", Math.max(a.value, b.value))
        ));
        this.stack.set("sign", makeBuiltin(["number"], "number", (a) =>
            new Var("number", Math.sign(a.value))
        ));
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
                if (!variable) throw new Error(`Variable ${node.value} not found`);
                return variable;
            }

            case "assign": {
                const name = node.children[0].value;
                const value = this.eval(node.children[1]);

                const existing = this.stack.lookup(name);
                if (!existing) {
                    this.stack.set(name, value);
                } else {
                    existing.type = value.type;
                    existing.value = value.value;
                }
                return value;
            }

            case "call": {
                const fnVar = this.eval(node.children[0]);
                if (fnVar.type !== "function")
                    throw new Error(`Attempted to call non-function`);
                const args = node.children.slice(1).map(arg => this.eval(arg));
                const fn = fnVar.value;
                if (args.length !== fn.params.length)
                    throw new Error(`Function expects ${fn.params.length} arguments`);
                for (let i = 0; i < args.length; i++) {
                    if (args[i].type !== fn.params[i])
                        throw new Error(`Argument ${i} should be ${fn.params[i]}, got ${args[i].type}`);
                }
                const result = fn.impl(...args);
                if (result.type !== fn.returns)
                    throw new Error(`Function should return ${fn.returns}, got ${result.type}`);
                return result;
            }

            case "if": {
                const condition = this.eval(node.children[0]);
                return condition.value ? this.eval(node.children[1]) : this.eval(node.children[2]);
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