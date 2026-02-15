    class Var {
        constructor(type, value) {
            this.type = type;
            this.value = value;
        }
    }

    class ASTNode {
        constructor(token, value = null, children = []) {
            this.id = crypto.randomUUID();
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

    class EvalError extends Error {
        constructor(message) {
            super(message)
            this.path = []
        }
    }

    class Interpreter {
        constructor(tree, options = {}) {
            this.debugger = options.debugger || null;
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
            
            this.stack.set("atan2", makeBuiltin(["number", "number"], "number", (a, b) =>
                new Var("number", Math.atan2(a.value, b.value))
            ));
            
            this.stack.set("asin", makeBuiltin(["number"], "number", (a) =>
                new Var("number", Math.asin(a.value))
            ));
            this.stack.set("acos", makeBuiltin(["number"], "number", (a) =>
                new Var("number", Math.acos(a.value))
            ));
            this.stack.set("atan", makeBuiltin(["number"], "number", (a) =>
                new Var("number", Math.atan(a.value))
            ));
            
            this.stack.set("log10", makeBuiltin(["number"], "number", (a) =>
                new Var("number", Math.log10(a.value))
            ));
            this.stack.set("log2", makeBuiltin(["number"], "number", (a) =>
                new Var("number", Math.log2(a.value))
            ));
            
            this.stack.set("at", makeBuiltin(["array", "number"], "any", (array, i) => {
                if (i.value < 0 || i.value >= array.value.length) {
                    throw new Error(`Array index ${i.value} out of bounds`);
                }
                const found = array.value[i.value];
                return new Var(found.type, found.value);
            }));

            this.stack.set("set_at", makeBuiltin(["array", "number", "any"], "any", (array, i, newValue) => {
                if (i.value < 0 || i.value >= array.value.length) {
                    throw new Error(`Array index ${i.value} out of bounds`);
                }
                const newVar = new Var(newValue.type, newValue.value);
                array.value[i.value] = newVar;
                return newVar;
            }));

            this.stack.set("insert_at", makeBuiltin(["array", "number", "any"], "any", (array, i, newValue) => {
                if (i.value < 0 || i.value > array.value.length) {
                    throw new Error(`Insert index ${i.value} out of bounds (0 to ${array.value.length})`);
                }
                const varToInsert = new Var(newValue.type, newValue.value);
                array.value.splice(i.value, 0, varToInsert);
                return varToInsert;
            }));

            this.stack.set("erase_at", makeBuiltin(["array", "number"], "any", (array, i) => {
                if (i.value < 0 || i.value >= array.value.length) {
                    throw new Error(`Erase index ${i.value} out of bounds`);
                }
                const removedItems = array.value.splice(i.value, 1);
                const removed = removedItems[0];
                return new Var(removed.type, removed.value);
            }));

            this.stack.set("len", makeBuiltin(["array"], "number", (arr) => {
                return new Var("number", arr.value.length);
            }));

            this.stack.set("push", makeBuiltin(["array", "any"], "number", (array, newValue) => {
                const varToPush = new Var(newValue.type, newValue.value);
                array.value.push(varToPush);
                return new Var("number", array.value.length);
            }));

            this.stack.set("pop", makeBuiltin(["array"], "any", (array) => {
                if (array.value.length === 0) {
                    return new Var("void", null);
                }
                const varPopped = array.value.pop();
                return new Var(varPopped.type, varPopped.value);
            }));

            this.stack.set("strlen", makeBuiltin(["string"], "number", (str) =>
                new Var("number", str.value.length)
            ));

            this.stack.set("upper", makeBuiltin(["string"], "string", (str) =>
                new Var("string", str.value.toUpperCase())
            ));

            this.stack.set("lower", makeBuiltin(["string"], "string", (str) =>
                new Var("string", str.value.toLowerCase())
            ));

            this.stack.set("trim", makeBuiltin(["string"], "string", (str) =>
                new Var("string", str.value.trim())
            ));

            this.stack.set("substring", makeBuiltin(
                ["string", "number", "number"],
                "string",
                (str, start, end) => {
                    return new Var(
                        "string",
                        str.value.substring(start.value, end.value)
                    );
                }
            ));

            this.stack.set("split", makeBuiltin(
                ["string", "string"],
                "array",
                (str, delimiter) => {
                    const parts = str.value.split(delimiter.value);
                    const wrapped = parts.map(p => new Var("string", p));
                    return new Var("array", wrapped);
                }
            ));

            this.stack.set("join", makeBuiltin(
                ["array", "string"],
                "string",
                (array, delimiter) => {
                    const raw = array.value.map(v => {
                        if (v.type !== "string") {
                            throw new Error("join expects array of strings");
                        }
                        return v.value;
                    });

                    return new Var("string", raw.join(delimiter.value));
                }
            ));

            this.stack.set("startsWith", makeBuiltin(
                ["string", "string"],
                "boolean",
                (str, prefix) =>
                    new Var("boolean", str.value.startsWith(prefix.value))
            ));

            this.stack.set("endsWith", makeBuiltin(
                ["string", "string"],
                "boolean",
                (str, suffix) =>
                    new Var("boolean", str.value.endsWith(suffix.value))
            ));

            this.stack.set("replace", makeBuiltin(
                ["string", "string", "string"],
                "string",
                (str, search, replacement) =>
                    new Var(
                        "string",
                        str.value.replace(search.value, replacement.value)
                    )
            ));

            this.stack.set("charAt", makeBuiltin(
                ["string", "number"],
                "string",
                (str, i) => {
                    if (i.value < 0 || i.value >= str.value.length) {
                        throw new Error(`String index ${i.value} out of bounds`);
                    }

                    return new Var("string", str.value[i.value]);
                }
            ));

            this.stack.set("boolToNumber", makeBuiltin(["bool"], "number", (b) =>
                new Var("number", b.value ? 1 : 0)
            ));

            this.stack.set("numberToBool", makeBuiltin(["number"], "bool", (n) =>
                new Var("bool", n.value !== 0)
            ));

            this.stack.set("numberToString", makeBuiltin(["number"], "string", (n) =>
                new Var("string", n.value.toString())
            ));

            this.stack.set("boolToString", makeBuiltin(["bool"], "string", (b) =>
                new Var("string", b.value.toString())
            ));

            this.stack.set("stringToNumber", makeBuiltin(["string"], "number", (s) => {
                const n = Number(s.value);
                if (isNaN(n)) {
                    return new Var("void", null);
                }
                return new Var("number", n);
            }));

            this.stack.set("stringToBool", makeBuiltin(["string"], "bool", (s) =>
                new Var("bool", s.value.length > 0)
            ));

            this.stack.set("arrayToBool", makeBuiltin(["array"], "bool", (arr) =>
                new Var("bool", arr.value.length > 0)
            ));

            this.stack.set("arrayToString", makeBuiltin(["array"], "string", (arr) => {
                const raw = arr.value.map(v => v.value);
                return new Var("string", raw.join(","));
            }));

            this.stack.set("typeof", makeBuiltin(["any"], "string", (something) => {
                return new Var("string", something.type);
            }))
        }

        async eval(node) {
        if (this.debugger) {
            await this.debugger.onNodeEnter(node);
        }

        let result;

        try {
            switch (node.token) {

                case "numberLiteral":
                    result = new Var("number", Number(node.value));
                    break;

                case "stringLiteral":
                    result = new Var("string", String(node.value));
                    break;

                case "boolLiteral":
                    result = new Var("bool", Boolean(node.value));
                    break;

                case "variable": {
                    const variable = this.stack.lookup(node.value);
                    if (!variable)
                        throw new EvalError(`Variable ${node.value} not found`);
                    result = variable;
                    break;
                }

                case "assign": {
                    const name = node.children[0].value;
                    const value = await this.eval(node.children[1]);

                    const existing = this.stack.lookup(name);

                    if (!existing) {
                        this.stack.set(name, value);
                    } else {
                        existing.type = value.type;
                        existing.value = value.value;
                    }

                    result = value;
                    break;
                }

                case "array": {
                    let arr = new Var("array", []);
                    for (const child of node.children) {
                        arr.value.push(await this.eval(child));
                    }
                    result = arr;
                    break;
                }

                case "call": {
                    const fnVar = await this.eval(node.children[0]);

                    if (!fnVar || fnVar.type !== "function")
                        throw new EvalError(`Attempted to call non-function`);

                    const args = [];
                    for (let i = 1; i < node.children.length; i++) {
                        args.push(await this.eval(node.children[i]));
                    }
                    const fn = fnVar.value;

                    if (args.length !== fn.params.length)
                        throw new EvalError(`Function expects ${fn.params.length} arguments`);

                    for (let i = 0; i < args.length; i++) {
                        if (args[i].type !== fn.params[i] && fn.params[i] !== "any")
                            throw new EvalError(
                                `Argument ${i} should be ${fn.params[i]}, got ${args[i].type}`
                            );
                    }

                    const callResult = fn.impl(...args);

                    if (callResult.type !== fn.returns && fn.returns !== "any")
                        throw new EvalError(
                            `Function should return ${fn.returns}, got ${callResult.type}`
                        );

                    result = callResult;
                    break;
                }

                case "if": {
                    const condition = await this.eval(node.children[0]);
                    result = condition.value ? await this.eval(node.children[1]) : await this.eval(node.children[2]);
                    break;
                }

                case "for": {
                    let loopResult = new Var("void", null);

                    this.stack.pushFrame();

                    await this.eval(node.children[0]);
                    let condition = await this.eval(node.children[1]);

                    if (condition.type !== "bool")
                        throw new EvalError(`Bool expected, got ${condition.type}`);

                    while (condition.value) {
                        loopResult = await this.eval(node.children[3]);
                        await this.eval(node.children[2]);
                        condition = await this.eval(node.children[1]);
                    }

                    this.stack.popFrame();

                    result = loopResult;
                    break;
                }

                case "while": {
                    let loopResult = new Var("void", null);

                    this.stack.pushFrame();

                    let condition = await this.eval(node.children[0]);

                    if (condition.type !== "bool")
                        throw new EvalError(`Bool expected, got ${condition.type}`);

                    while (condition.value) {
                        loopResult = await this.eval(node.children[1]);
                        condition = await this.eval(node.children[0]);
                    }

                    this.stack.popFrame();

                    result = loopResult;
                    break;
                }

                case "block": {
                    this.stack.pushFrame();

                    let blockResult = new Var("void", null);

                    for (let child of node.children) {
                        const r = await this.eval(child);
                        if (child.token === "return") {
                            blockResult = r;
                            break;
                        }
                    }

                    this.stack.popFrame();
                    result = blockResult;
                    break;
                }

                case "return":
                    result = await this.eval(node.children[0]);
                    break;

                default:
                    throw new EvalError(`Unknown AST node token: ${node.token}`);
            }

            if (this.debugger) {
                await this.debugger.onNodeExit(node, result);
            }

            return result;

        } catch (e) {
            if (this.debugger) {
                this.debugger.onError(e);
            }

            if (!(e instanceof EvalError)) {
                const newErr = new EvalError(e.message || String(e));
                e = newErr;
            }

            e.path.push(node);
            throw e;
        }
    }

        async run() {
            return await this.eval(this.tree);
        }
    }

    export { ASTNode, Interpreter, EvalError };