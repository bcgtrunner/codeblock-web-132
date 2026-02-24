import { ASTNode, Interpreter } from "./index.mjs";

const tree = new ASTNode("block", null, [
  new ASTNode("assign", null, [
    new ASTNode("variable", "arr"),
    new ASTNode("array", null, [
      new ASTNode("number", 5),
      new ASTNode("number", 2),
      new ASTNode("number", 8),
      new ASTNode("number", 1),
      new ASTNode("number", 9)
    ])
  ]),
  
  new ASTNode("assign", null, [
    new ASTNode("variable", "n"),
    new ASTNode("number", 5)
  ]),

  new ASTNode("assign", null, [
    new ASTNode("variable", "i"),
    new ASTNode("number", 0)
  ]),

  new ASTNode("while", null, [
    new ASTNode("call", null, [
      new ASTNode("variable", "<"),
      new ASTNode("variable", "i"),
      new ASTNode("call", null, [
        new ASTNode("variable", "-"),
        new ASTNode("variable", "n"),
        new ASTNode("number", 1)
      ])
    ]),

    new ASTNode("block", null, [
      new ASTNode("assign", null, [
        new ASTNode("variable", "j"),
        new ASTNode("number", 0)
      ]),

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
              new ASTNode("number", 1)
            ]),
            new ASTNode("variable", "i")
          ])
        ]),

        new ASTNode("block", null, [
          new ASTNode("if", null, [
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
                  new ASTNode("number", 1)
                ])
              ])
            ]),

            new ASTNode("block", null, [
              new ASTNode("assign", null, [
                new ASTNode("variable", "temp"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "at"),
                  new ASTNode("variable", "arr"),
                  new ASTNode("variable", "j")
                ])
              ]),
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
                    new ASTNode("number", 1)
                  ])
                ])
              ]),
              new ASTNode("call", null, [
                new ASTNode("variable", "set_at"),
                new ASTNode("variable", "arr"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "+"),
                  new ASTNode("variable", "j"),
                  new ASTNode("number", 1)
                ]),
                new ASTNode("variable", "temp")
              ])
            ]),

            new ASTNode("block", null, [])
          ]),

          new ASTNode("assign", null, [
            new ASTNode("variable", "j"),
            new ASTNode("call", null, [
              new ASTNode("variable", "+"),
              new ASTNode("variable", "j"),
              new ASTNode("number", 1)
            ])
          ])
        ])
      ]),

      new ASTNode("assign", null, [
        new ASTNode("variable", "i"),
        new ASTNode("call", null, [
          new ASTNode("variable", "+"),
          new ASTNode("variable", "i"),
          new ASTNode("number", 1)
        ])
      ])
    ])
  ]),

  new ASTNode("return", null, [
    new ASTNode("variable", "arr")
  ])
]);

const interpreter = new Interpreter(tree);
const sortedArrayVar = await interpreter.run();

console.log(sortedArrayVar.value.map(v => v.value));   // [1, 2, 5, 8, 9]