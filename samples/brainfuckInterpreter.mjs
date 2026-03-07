import { ASTNode, Interpreter } from "../interpreter.mjs";

const V = (name) => new ASTNode("variable", name);
const Num = (n) => new ASTNode("number", n);
const Str = (s) => new ASTNode("string", s);
const Assign = (name, expr) => new ASTNode("assign", null, [V(name), expr]);
const Call = (...children) => new ASTNode("call", null, children);
const Block = (nodes) => new ASTNode("block", null, nodes);
const Ret = (node) => new ASTNode("return", null, [node]);
const While = (cond, body) => new ASTNode("while", null, [cond, body]);
const For = (init, cond, step, body) => new ASTNode("for", null, [init, cond, step, body]);
const Arr = (items = []) => new ASTNode("array", null, items);
const If = (cond, thenNode, elseNode) => new ASTNode("if", null, [cond, thenNode, elseNode]);
const Fn = (params = [], returns = "any", body = []) =>
    new ASTNode("function", null, [
        new ASTNode("block", null, params.map((p) => new ASTNode("param", p))),
        new ASTNode("type", returns),
        body.length === 1 ? body[0] : Block(body)
    ]);

const IsCmd = (cmdVar, symbol) => Call(V("is_cmd"), V(cmdVar), Str(symbol));
const CellAtPtr = () => Call(V("at"), V("tape"), V("ptr"));

const gtBranch = Block([
    Assign("ptr", Call(V("+"), V("ptr"), Num(1))),
    If(
        Call(V(">="), V("ptr"), Call(V("len"), V("tape"))),
        Assign("ptr", Num(0)),
        Block([])
    )
]);

const ltBranch = Block([
    Assign("ptr", Call(V("-"), V("ptr"), Num(1))),
    If(
        Call(V("<"), V("ptr"), Num(0)),
        Assign("ptr", Call(V("-"), Call(V("len"), V("tape")), Num(1))),
        Block([])
    )
]);

const plusBranch = Call(
    V("set_at"),
    V("tape"),
    Call(V("+"), CellAtPtr(), Num(1)),
    V("ptr")
);

const minusBranch = Call(
    V("set_at"),
    V("tape"),
    Call(V("-"), CellAtPtr(), Num(1)),
    V("ptr")
);

const dotBranch = Call(V("push"), V("output"), CellAtPtr());

const commaBranch = If(
    Call(V("<"), V("inp_ptr"), Call(V("len"), V("input"))),
    Block([
        Call(V("set_at"), V("tape"), Call(V("at"), V("input"), V("inp_ptr")), V("ptr")),
        Assign("inp_ptr", Call(V("+"), V("inp_ptr"), Num(1)))
    ]),
    Block([
        Call(V("set_at"), V("tape"), Num(0), V("ptr"))
    ])
);

const forwardJump = Block([
    Assign("depth", Num(1)),
    While(
        Call(V(">"), V("depth"), Num(0)),
        Block([
            Assign("ip", Call(V("+"), V("ip"), Num(1))),
            Assign("jcmd", Call(V("charAt"), V("code"), V("ip"))),
            If(
                IsCmd("jcmd", "["),
                Assign("depth", Call(V("+"), V("depth"), Num(1))),
                If(
                    IsCmd("jcmd", "]"),
                    Assign("depth", Call(V("-"), V("depth"), Num(1))),
                    Block([])
                )
            )
        ])
    )
]);

const backwardJump = Block([
    Assign("depth", Num(1)),
    While(
        Call(V(">"), V("depth"), Num(0)),
        Block([
            Assign("ip", Call(V("-"), V("ip"), Num(1))),
            Assign("jcmd", Call(V("charAt"), V("code"), V("ip"))),
            If(
                IsCmd("jcmd", "]"),
                Assign("depth", Call(V("+"), V("depth"), Num(1))),
                If(
                    IsCmd("jcmd", "["),
                    Assign("depth", Call(V("-"), V("depth"), Num(1))),
                    Block([])
                )
            )
        ])
    )
]);

const openBracketBranch = If(
    Call(V("=="), CellAtPtr(), Num(0)),
    forwardJump,
    Block([])
);

const closeBracketBranch = If(
    Call(V("!="), CellAtPtr(), Num(0)),
    backwardJump,
    Block([])
);

const dispatch = If(
    IsCmd("cmd", ">"),
    gtBranch,
    If(
        IsCmd("cmd", "<"),
        ltBranch,
        If(
            IsCmd("cmd", "+"),
            plusBranch,
            If(
                IsCmd("cmd", "-"),
                minusBranch,
                If(
                    IsCmd("cmd", "."),
                    dotBranch,
                    If(
                        IsCmd("cmd", ","),
                        commaBranch,
                        If(
                            IsCmd("cmd", "["),
                            openBracketBranch,
                            If(
                                IsCmd("cmd", "]"),
                                closeBracketBranch,
                                Block([])
                            )
                        )
                    )
                )
            )
        )
    )
);

function buildTree(program, inputNumbers = []) {
    return Block([
        Assign(
            "is_cmd",
            Fn(
                [
                    { type: "string", name: "ch" },
                    { type: "string", name: "cmd" }
                ],
                "bool",
                [
                    Ret(
                        Call(
                            V("and"),
                            Call(V("startsWith"), V("ch"), V("cmd")),
                            Call(V("endsWith"), V("ch"), V("cmd"))
                        )
                    )
                ]
            )
        ),

        Assign(
            "run_bf",
            Fn(
                [
                    { type: "string", name: "code" },
                    { type: "array", name: "input" }
                ],
                "array",
                [
                    Assign("tape", Arr([])),
                    For(
                        Assign("i", Num(0)),
                        Call(V("<"), V("i"), Num(64)),
                        Assign("i", Call(V("+"), V("i"), Num(1))),
                        Block([Call(V("push"), V("tape"), Num(0))])
                    ),
                    Assign("output", Arr([])),
                    Assign("ip", Num(0)),
                    Assign("ptr", Num(0)),
                    Assign("inp_ptr", Num(0)),

                    While(
                        Call(V("<"), V("ip"), Call(V("strlen"), V("code"))),
                        Block([
                            Assign("cmd", Call(V("charAt"), V("code"), V("ip"))),
                            dispatch,
                            Assign("ip", Call(V("+"), V("ip"), Num(1)))
                        ])
                    ),

                    Ret(V("output"))
                ]
            )
        ),

        Assign("program", Str(program)),
        Assign("input", Arr(inputNumbers.map((n) => Num(n)))),
        Ret(Call(V("run_bf"), V("program"), V("input")))
    ]);
}

async function runBrainfuck(program, inputNumbers = []) {
    const interpreter = new Interpreter(buildTree(program, inputNumbers));
    const outputVar = await interpreter.run();
    return outputVar.value.map((v) => v.value);
}

export { runBrainfuck };
