import { ASTNode, Interpreter } from "./interpreter.mjs";

const V = (name) => new ASTNode("variable", name);
const N = (n) => new ASTNode("number", n);
const Assign = (name, expr) => new ASTNode("assign", null, [V(name), expr]);
const Call = (...children) => new ASTNode("call", null, children);
const Block = (nodes) => new ASTNode("block", null, nodes);
const Ret = (node) => new ASTNode("return", null, [node]);
const For = (init, cond, step, body) => new ASTNode("for", null, [init, cond, step, body]);

const tree = Block([
  Assign("bubbleSort", new ASTNode("function", null, [
    new ASTNode("block", null, [
      new ASTNode("param", { type: "array", name: "arr" })
    ]),
    new ASTNode("type", "array"),
    Block([
      For(
        Assign("i", N(0)),
        Call(V("<"), V("i"), Call(V("-"), Call(V("len"), V("arr")), N(1))),
        Assign("i", Call(V("+"), V("i"), N(1))),
        Block([
          For(
            Assign("j", N(0)),
            Call(
              V("<"),
              V("j"),
              Call(
                V("-"),
                Call(V("-"), Call(V("len"), V("arr")), N(1)),
                V("i")
              )
            ),
            Assign("j", Call(V("+"), V("j"), N(1))),
            Block([
              new ASTNode("if", null, [
                Call(
                  V(">"),
                  Call(V("at"), V("arr"), V("j")),
                  Call(V("at"), V("arr"), Call(V("+"), V("j"), N(1)))
                ),
                Block([
                  Assign("temp", Call(V("at"), V("arr"), V("j"))),
                  Call(
                    V("set_at"),
                    V("arr"),
                    V("j"),
                    Call(V("at"), V("arr"), Call(V("+"), V("j"), N(1)))
                  ),
                  Call(
                    V("set_at"),
                    V("arr"),
                    Call(V("+"), V("j"), N(1)),
                    V("temp")
                  )
                ]),
                Block([])
              ])
            ])
          )
        ])
      ),
      Ret(V("arr"))
    ])
  ])),

  Assign("arr", new ASTNode("array", null, [N(5), N(2), N(8), N(1), N(9)])),
  Ret(Call(V("bubbleSort"), V("arr")))
]);

const interpreter = new Interpreter(tree);
const sortedArrayVar = await interpreter.run();

console.log(sortedArrayVar.value.map(v => v.value));   // [1, 2, 5, 8, 9]
