import { ASTNode, Interpreter } from "./index.mjs";

const tree = new ASTNode("block", null, [
  // ----- define the array -----
  new ASTNode("assign", null, [
    new ASTNode("variable", "arr"),
    new ASTNode("array", null, [
      new ASTNode("numberLiteral", 5),
      new ASTNode("numberLiteral", 2),
      new ASTNode("numberLiteral", 8),
      new ASTNode("numberLiteral", 1),
      new ASTNode("numberLiteral", 9)
    ])
  ]),

  // ----- store length (since no built‑in `length` yet) -----
  new ASTNode("assign", null, [
    new ASTNode("variable", "n"),
    new ASTNode("numberLiteral", 5)
  ]),

  // ----- i = 0 -----
  new ASTNode("assign", null, [
    new ASTNode("variable", "i"),
    new ASTNode("numberLiteral", 0)
  ]),

  // ----- outer while: while i < n - 1 -----
  new ASTNode("while", null, [
    // condition: i < n - 1
    new ASTNode("call", null, [
      new ASTNode("variable", "<"),
      new ASTNode("variable", "i"),
      new ASTNode("call", null, [
        new ASTNode("variable", "-"),
        new ASTNode("variable", "n"),
        new ASTNode("numberLiteral", 1)
      ])
    ]),

    // ----- outer loop body -----
    new ASTNode("block", null, [
      // j = 0
      new ASTNode("assign", null, [
        new ASTNode("variable", "j"),
        new ASTNode("numberLiteral", 0)
      ]),

      // ----- inner while: while j < n - 1 - i -----
      new ASTNode("while", null, [
        // condition: j < n - 1 - i
        new ASTNode("call", null, [
          new ASTNode("variable", "<"),
          new ASTNode("variable", "j"),
          new ASTNode("call", null, [
            new ASTNode("variable", "-"),
            new ASTNode("call", null, [
              new ASTNode("variable", "-"),
              new ASTNode("variable", "n"),
              new ASTNode("numberLiteral", 1)
            ]),
            new ASTNode("variable", "i")
          ])
        ]),

        // ----- inner loop body -----
        new ASTNode("block", null, [
          // ----- if at(arr, j) > at(arr, j+1) -----
          new ASTNode("if", null, [
            // condition
            new ASTNode("call", null, [
              new ASTNode("variable", ">"),
              new ASTNode("call", null, [
                new ASTNode("variable", "at"),
                new ASTNode("variable", "arr"),
                new ASTNode("variable", "j")
              ]),
              new ASTNode("call", null, [
                new ASTNode("variable", "at"),
                new ASTNode("variable", "arr"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "+"),
                  new ASTNode("variable", "j"),
                  new ASTNode("numberLiteral", 1)
                ])
              ])
            ]),

            // ----- then block (swap) -----
            new ASTNode("block", null, [
              // temp = at(arr, j)
              new ASTNode("assign", null, [
                new ASTNode("variable", "temp"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "at"),
                  new ASTNode("variable", "arr"),
                  new ASTNode("variable", "j")
                ])
              ]),
              // set_at(arr, j, at(arr, j+1))
              new ASTNode("call", null, [
                new ASTNode("variable", "set_at"),
                new ASTNode("variable", "arr"),
                new ASTNode("variable", "j"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "at"),
                  new ASTNode("variable", "arr"),
                  new ASTNode("call", null, [
                    new ASTNode("variable", "+"),
                    new ASTNode("variable", "j"),
                    new ASTNode("numberLiteral", 1)
                  ])
                ])
              ]),
              // set_at(arr, j+1, temp)
              new ASTNode("call", null, [
                new ASTNode("variable", "set_at"),
                new ASTNode("variable", "arr"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "+"),
                  new ASTNode("variable", "j"),
                  new ASTNode("numberLiteral", 1)
                ]),
                new ASTNode("variable", "temp")
              ])
            ]),

            // ----- else block (empty) -----
            new ASTNode("block", null, [])
          ]),

          // ----- j = j + 1 -----
          new ASTNode("assign", null, [
            new ASTNode("variable", "j"),
            new ASTNode("call", null, [
              new ASTNode("variable", "+"),
              new ASTNode("variable", "j"),
              new ASTNode("numberLiteral", 1)
            ])
          ])
        ])   // end inner block
      ]),    // end inner while

      // ----- i = i + 1 -----
      new ASTNode("assign", null, [
        new ASTNode("variable", "i"),
        new ASTNode("call", null, [
          new ASTNode("variable", "+"),
          new ASTNode("variable", "i"),
          new ASTNode("numberLiteral", 1)
        ])
      ])
    ])      // end outer block
  ]),       // end outer while

  // ----- return the sorted array -----
  new ASTNode("return", null, [
    new ASTNode("variable", "arr")
  ])
]);

// ----- Run the interpreter -----
const interpreter = new Interpreter(tree);
const sortedArrayVar = interpreter.run();

// Print the sorted values
console.log(sortedArrayVar.value.map(v => v.value));   // [1, 2, 5, 8, 9]