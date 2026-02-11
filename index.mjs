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
        return null;
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

            case "variable": {
                const variable = this.stack.lookup(node.value);
                if (variable === null) {
                    throw new Error(`Variable ${name} not found`);
                }
                return variable;
            }

            case "assign": {
                const variable_name = node.children[0].value;
                const lhs = this.stack.lookup(variable_name)
                const rhs = this.eval(node.children[1]);
                if (lhs === null) {
                    this.stack.set(variable_name, rhs);
                } else {
                    lhs.type = rhs.type;
                    lhs.value = rhs.value;
                }
                return lhs;
            }

            /** 
             * TODO:
             * Static array implementation.
             * Make types a tree instead of string.
             * Floating point numbers.
             * String type.
             * Bubble sort.
             */

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
             * implement if-elif for (as the last thing probably)
             * For would be a bit more complicated, cuz
             * its 4 statements, not 2 like while.
             */

            case "binaryExprasion":
                const operatorName = node.children[0].value;

                if (!(operatorName in this.operators))
                    throw new Error(`Unknown operator ${operatorName}`);

                const argss = node.children.slice(1).map(arg => this.eval(arg).value);
                const res = this.operators[operatorName](...argss);
                return new Var("bool", res);

            case "if":
                const binaryValue = this.eval(node.children[0]).value;

                if (binaryValue) {
                    const value = this.eval(node.children[1]);
                    return value;
                }
                else {
                    const value = this.eval(node.children[2]);
                    return value;
                }
            case "while":
                let value1;
                while (this.eval(node.children[0]).value) {
                    value1 = this.eval(node.children[1]);
                }
                return value1;
            case "block":
                let return_var = new Var("void", null);

                const childs = node.children;
                for (let i = 0; i < childs.length; i++) {
                    const new_var = this.eval(childs[i]);
                    if (childs[i].token == "return") {
                        return_var = new_var;
                    }
                }

                return return_var;

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

export { ASTNode, Interpreter }