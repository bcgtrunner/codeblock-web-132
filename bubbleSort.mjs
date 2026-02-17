import { ASTNode, Interpreter } from "./index.mjs";

/*
Program equivalent to:

function bubbleSort(a: array) -> array {
  for (i = 0; i < len(a) - 1; i = i + 1) {
    for (j = 0; j < (len(a) - 1) - i; j = j + 1) {
      if (at(a, j) > at(a, j + 1)) {
        tmp = at(a, j);
        set_at(a, j, at(a, j + 1));
        set_at(a, j + 1, tmp);
      }
    }
  }
  return a;
}

arr = [5,1,4,2,8]
return bubbleSort(arr)
*/

const bubbleSortFunction = new ASTNode(
  "function",
  {
    params: [{ type: "array", name: "a" }],
    returns: "array"
  },
  [
    new ASTNode("block", null, [

      new ASTNode("for", null, [
        new ASTNode("assign", null, [
          new ASTNode("variable", "i"),
          new ASTNode("number", 0)
        ]),

        new ASTNode("call", null, [
          new ASTNode("variable", "<"),
          new ASTNode("variable", "i"),
          new ASTNode("call", null, [
            new ASTNode("variable", "-"),
            new ASTNode("call", null, [
              new ASTNode("variable", "len"),
              new ASTNode("variable", "a")
            ]),
            new ASTNode("number", 1)
          ])
        ]),

        new ASTNode("assign", null, [
          new ASTNode("variable", "i"),
          new ASTNode("call", null, [
            new ASTNode("variable", "+"),
            new ASTNode("variable", "i"),
            new ASTNode("number", 1)
          ])
        ]),

        new ASTNode("for", null, [
          new ASTNode("assign", null, [
            new ASTNode("variable", "j"),
            new ASTNode("number", 0)
          ]),

          new ASTNode("call", null, [
            new ASTNode("variable", "<"),
            new ASTNode("variable", "j"),
            new ASTNode("call", null, [
              new ASTNode("variable", "-"),
              new ASTNode("call", null, [
                new ASTNode("variable", "-"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "len"),
                  new ASTNode("variable", "a")
                ]),
                new ASTNode("number", 1)
              ]),
              new ASTNode("variable", "i")
            ])
          ]),

          new ASTNode("assign", null, [
            new ASTNode("variable", "j"),
            new ASTNode("call", null, [
              new ASTNode("variable", "+"),
              new ASTNode("variable", "j"),
              new ASTNode("number", 1)
            ])
          ]),

          new ASTNode("block", null, [
            new ASTNode("if", null, [
              new ASTNode("call", null, [
                new ASTNode("variable", ">"),
                new ASTNode("call", null, [
                  new ASTNode("variable", "at"),
                  new ASTNode("variable", "a"),
                  new ASTNode("variable", "j")
                ]),
                new ASTNode("call", null, [
                  new ASTNode("variable", "at"),
                  new ASTNode("variable", "a"),
                  new ASTNode("call", null, [
                    new ASTNode("variable", "+"),
                    new ASTNode("variable", "j"),
                    new ASTNode("number", 1)
                  ])
                ])
              ]),

              new ASTNode("block", null, [
                new ASTNode("assign", null, [
                  new ASTNode("variable", "tmp"),
                  new ASTNode("call", null, [
                    new ASTNode("variable", "at"),
                    new ASTNode("variable", "a"),
                    new ASTNode("variable", "j")
                  ])
                ]),

                new ASTNode("call", null, [
                  new ASTNode("variable", "set_at"),
                  new ASTNode("variable", "a"),
                  new ASTNode("variable", "j"),
                  new ASTNode("call", null, [
                    new ASTNode("variable", "at"),
                    new ASTNode("variable", "a"),
                    new ASTNode("call", null, [
                      new ASTNode("variable", "+"),
                      new ASTNode("variable", "j"),
                      new ASTNode("number", 1)
                    ])
                  ])
                ]),

                new ASTNode("call", null, [
                  new ASTNode("variable", "set_at"),
                  new ASTNode("variable", "a"),
                  new ASTNode("call", null, [
                    new ASTNode("variable", "+"),
                    new ASTNode("variable", "j"),
                    new ASTNode("number", 1)
                  ]),
                  new ASTNode("variable", "tmp")
                ])
              ]),

              new ASTNode("block", null, [])
            ])
          ])
        ])
      ]),

      new ASTNode("return", null, [
        new ASTNode("variable", "a")
      ])
    ])
  ]
);

const program = new ASTNode("block", null, [
  new ASTNode("assign", null, [
    new ASTNode("variable", "bubbleSort"),
    bubbleSortFunction
  ]),

  new ASTNode("assign", null, [
    new ASTNode("variable", "arr"),
    new ASTNode("array", null, [
      new ASTNode("number", 5),
      new ASTNode("number", 1),
      new ASTNode("number", 4),
      new ASTNode("number", 2),
      new ASTNode("number", 8)
    ])
  ]),

  new ASTNode("return", null, [
    new ASTNode("call", null, [
      new ASTNode("variable", "bubbleSort"),
      new ASTNode("variable", "arr")
    ])
  ])
]);

const interpreter = new Interpreter(program);

const result = await interpreter.run();

console.log("Sorted:", result.value.map(v => v.value));