import { ASTNode, Interpreter } from "./index.mjs";

/* --- Small AST builder helpers to make tests concise --- */
const V = (name) => new ASTNode("variable", name);
const Num = (n) => new ASTNode("numberLiteral", n);
const Str = (s) => new ASTNode("stringLiteral", s);
const Assign = (name, expr) => new ASTNode("assign", null, [V(name), expr]);
const Call = (...children) => new ASTNode("call", null, children);
const Block = (nodes) => new ASTNode("block", null, nodes);
const Ret = (node) => new ASTNode("return", null, [node]);
const ArrayLit = (items) => new ASTNode("array", null, items);
const If = (cond, thenNode, elseNode) => new ASTNode("if", null, [cond, thenNode, elseNode]);
const While = (cond, body) => new ASTNode("while", null, [cond, body]);

const Fn = (params = [], returns = null, body = []) =>
  new ASTNode("functionLiteral", { params, returns }, body);

/* --- Runner helper --- */
function run(tree) {
  const interpreter = new Interpreter(tree);
  const result = interpreter.run();
  return result && result.value;
}

/* --- Tests --- */
const tests = [
  {
    name: "Simple arithmetic function (double)",
    tree: Block([
      Assign("double", Fn([{ type: "number", name: "x" }], "number", [
        Ret(Call(V("*"), V("x"), Num(2)))
      ])),
      Ret(Call(V("double"), Num(5)))
    ]),
    expect: 10
  },

  {
    name: "Multiple parameters (add)",
    tree: Block([
      Assign("add", Fn([{ type: "number", name: "a" }, { type: "number", name: "b" }], "number", [
        Ret(Call(V("+"), V("a"), V("b")))
      ])),
      Ret(Call(V("add"), Num(3), Num(7)))
    ]),
    expect: 10
  },

  {
    name: "If-else (max)",
    tree: Block([
      Assign("max", Fn([{ type: "number", name: "a" }, { type: "number", name: "b" }], "number", [
        Ret(If(
          Call(V(">"), V("a"), V("b")),
          V("a"),
          V("b")
        ))
      ])),
      Ret(Call(V("max"), Num(10), Num(20)))
    ]),
    expect: 20
  },

  {
    name: "Recursive function (factorial)",
    tree: Block([
      Assign("factorial", Fn([{ type: "number", name: "n" }], "number", [
        If(
          Call(V("<="), V("n"), Num(1)),
          Num(1),
          Call(V("*"),
            V("n"),
            Call(V("factorial"),
              Call(V("-"), V("n"), Num(1))
            )
          )
        )
      ])),
      Ret(Call(V("factorial"), Num(5)))
    ]),
    expect: 120
  },

  {
    name: "Outer scope access (counter & increment)",
    tree: Block([
      Assign("counter", Num(0)),
      Assign("increment", Fn([], "number", [
        Assign("counter", Call(V("+"), V("counter"), Num(1))),
        Ret(V("counter"))
      ])),
      // call increment three times, final return from block should be the third call result
      Call(V("increment")),
      Call(V("increment")),
      Ret(Call(V("increment")))
    ]),
    expect: 3
  },

  {
    name: "String function (echo)",
    tree: Block([
      Assign("echo", Fn([{ type: "string", name: "s" }], "string", [
        Ret(V("s"))
      ])),
      Ret(Call(V("echo"), Str("Hello, World!")))
    ]),
    expect: "Hello, World!"
  },

  {
    name: "Array function with loop (sumArray)",
    tree: Block([
      Assign("sumArray", Fn([{ type: "array", name: "arr" }], "number", [
        Block([
          Assign("sum", Num(0)),
          Assign("i", Num(0)),
          While(
            Call(V("<"), V("i"), Call(V("len"), V("arr"))),
            Block([
              Assign("sum", Call(V("+"),
                V("sum"),
                Call(V("at"), V("arr"), V("i"))
              )),
              Assign("i", Call(V("+"), V("i"), Num(1)))
            ])
          ),
          Ret(V("sum"))
        ])
      ])),
      Ret(Call(V("sumArray"),
        ArrayLit([Num(1), Num(2), Num(3), Num(4), Num(5)])
      ))
    ]),
    expect: 15
  },

  {
    name: "Nested calls (sumOfSquares)",
    tree: Block([
      Assign("square", Fn([{ type: "number", name: "x" }], "number", [
        Ret(Call(V("*"), V("x"), V("x")))
      ])),
      Assign("sumOfSquares", Fn([{ type: "number", name: "a" }, { type: "number", name: "b" }], "number", [
        Ret(Call(V("+"),
          Call(V("square"), V("a")),
          Call(V("square"), V("b"))
        ))
      ])),
      Ret(Call(V("sumOfSquares"), Num(3), Num(4)))
    ]),
    expect: 25
  },

  {
    name: "Type error (calling number function with string) — should throw",
    tree: Block([
      Assign("double", Fn([{ type: "number", name: "x" }], "number", [
        Ret(Call(V("*"), V("x"), Num(2)))
      ])),
      // this call is intentionally wrong type
      Call(V("double"), Str("hello"))
    ]),
    expectError: true
  },

  {
    name: "Function with block and multiple statements (fibonacci)",
    tree: Block([
      Assign("fibonacci", Fn([{ type: "number", name: "n" }], "number", [
        Block([
          Assign("a", Num(0)),
          Assign("b", Num(1)),
          Assign("i", Num(0)),
          While(
            Call(V("<"), V("i"), V("n")),
            Block([
              Assign("temp", V("a")),
              Assign("a", V("b")),
              Assign("b", Call(V("+"), V("temp"), V("b"))),
              Assign("i", Call(V("+"), V("i"), Num(1)))
            ])
          ),
          Ret(V("a"))
        ])
      ])),
      Ret(Call(V("fibonacci"), Num(7)))
    ]),
    expect: 13
  }
];

/* --- Test runner --- */
console.log("=== TESTING USER-DEFINED FUNCTIONS ===\n");

tests.forEach((t, idx) => {
  try {
    const val = run(t.tree);
    if (t.expectError) {
      console.error(`Test ${idx + 1} "${t.name}" FAILED — expected an error but got:`, val);
    } else if (typeof t.expect !== "undefined" && val !== t.expect) {
      console.error(`Test ${idx + 1} "${t.name}" FAILED — expected ${t.expect} but got ${val}`);
    } else {
      console.log(`Test ${idx + 1} "${t.name}" passed — result:`, val);
    }
  } catch (e) {
    if (t.expectError) {
      console.log(`Test ${idx + 1} "${t.name}" passed — expected error:`, e.message);
    } else {
      console.error(`Test ${idx + 1} "${t.name}" FAILED with error:`, e.message);
    }
  }
});
