import { ASTNode, Interpreter } from "./interpreter.mjs";
import { UINodeManager } from "./UINodeManager.mjs";
import { Console } from "./console.mjs";
const manager = new UINodeManager();

const palette = document.querySelector(".environment__block-palette");
const editor = document.querySelector(".environment__code-editor");
const editorConsole = new Console();

editorConsole.print("HELLO,WORLD!")
let draggingBlock = null; // какой блок сейчас тащим
let lastBranch = null; // состояние текущей ветки; Это память о прошлой ветке, над которой был курсор.
let offsetX = 0;
let offsetY = 0;

const numberBlock = palette.querySelector(".environment__numberLiteral-block")
const stringBlock = palette.querySelector(".environment__stringLiteral-block")
const boolBlock = palette.querySelector(".environment__boolLiteral-block")
const variableBlock = palette.querySelector(".environment__variable-block")
const assignBlock = palette.querySelector(".environment__assign-block")
const plusBlock = palette.querySelector(".environment__plus-block")
const minusBlock = palette.querySelector(".environment__minus-block")
const greaterBlock = palette.querySelector(".environment__gt-block")
const lessBlock = palette.querySelector(".environment__lt-block")
const andBlock = palette.querySelector(".environment__and-block")
const ifBlock = palette.querySelector(".environment__if-block")
const forBlock = palette.querySelector(".environment__for-block")
const whileBlock = palette.querySelector(".environment__while-block")
const blockBlock = palette.querySelector(".environment__block-block")
const returnBlock = palette.querySelector(".environment__return-block")
const arrayBlock = palette.querySelector(".environment__array-block")
const atBlock = palette.querySelector(".environment__at-block")
const lenBlock = palette.querySelector(".environment__len-block")

numberBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("number", "number")
    startDragging(uiNode, e, e.target);
});
stringBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("string", "string")
    startDragging(uiNode, e, e.target);
});
boolBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("bool", "bool")
    startDragging(uiNode, e, e.target);
});
variableBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("variable", "variable")
    startDragging(uiNode, e, e.target);
});
assignBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("assign", "=")
    startDragging(uiNode, e, e.target);
});
plusBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", "+").setOperation(new ASTNode("variable", "+"));
    startDragging(uiNode, e, e.target);
});
minusBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", "-").setOperation(new ASTNode("variable", "-"));
    startDragging(uiNode, e, e.target);
});
greaterBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", ">").setOperation(new ASTNode("variable", ">"));
    startDragging(uiNode, e, e.target);
});
andBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", "and").setOperation(new ASTNode("variable", "and"));
    startDragging(uiNode, e, e.target);
});
ifBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("if", "if");
    startDragging(uiNode, e, e.target);
});
forBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("for", "for");
    startDragging(uiNode, e, e.target);
});
whileBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("while", "while");
    startDragging(uiNode, e, e.target);
});
blockBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("block", "block");
    startDragging(uiNode, e, e.target);
});
arrayBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("array", "array");
    startDragging(uiNode, e, e.target);
});
returnBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("return", "return");
    startDragging(uiNode, e, e.target);
});
lessBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", "<").setOperation(new ASTNode("variable", "<"));
    startDragging(uiNode, e, e.target);
});
atBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", "at").setOperation(new ASTNode("variable", "at"));
    startDragging(uiNode, e, e.target);
});
lenBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", "len").setOperation(new ASTNode("variable", "len"));
    startDragging(uiNode, e, e.target);
});
function startDragging(uiNode, e, blockElement) {
    console.log(uiNode);
    blockElement = blockElement.closest(".block");
    e.stopPropagation(); /* чтобы клик не дошёл до palette document иначе могут начаться глюки */
    draggingBlock = uiNode;
    const rect = blockElement.getBoundingClientRect();
    editor.parentElement.append(uiNode.element);
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    uiNode.element.style.position = "absolute";
    uiNode.element.style.top  = (e.clientY - offsetY) + 'px';
    uiNode.element.style.left = (e.clientX - offsetX) + 'px';
}

function dragging(uiNode, e) {
    uiNode.element.style.left = (e.clientX - offsetX) + 'px';
    uiNode.element.style.top  = (e.clientY - offsetY) + 'px';
    const branchElement = getBranchUnderCursor(e.clientX, e.clientY);
    if (branchElement) {
        const nodeBranchParent = manager.getNode(branchElement.parentElement.id);
        if (nodeBranchParent && manager.canAttach(uiNode, nodeBranchParent, branchElement)) {
            branchElement.classList.add('highlight');
            lastBranch = branchElement;
        }
    }
    else {
        if (lastBranch) {
            lastBranch.classList.remove('highlight');
        }
    }
}

editor.addEventListener('pointerdown', (e) => {
    if (e.target.classList.contains("environment__input-number")) return;
    const blockElement = e.target.closest(".block");
    if (!blockElement) return;
    const uiNode = manager.getNode(blockElement.id);
    manager.detach(uiNode);
    startDragging(uiNode, e, blockElement);
    console.log(manager);
});

document.addEventListener('pointermove', (e) => {
    if (!draggingBlock) return;
    dragging(draggingBlock, e);
});

document.addEventListener('pointerup', (e) => {
    if (!draggingBlock) return;

    const branchElement = getBranchUnderCursor(e.clientX, e.clientY);

    const editorRect = editor.getBoundingClientRect();
    const isInsideEditor =
        e.clientX >= editorRect.left &&
        e.clientX <= editorRect.right &&
        e.clientY >= editorRect.top &&
        e.clientY <= editorRect.bottom;
    if (!isInsideEditor) {
        manager.removeNode(draggingBlock)
    } else if (branchElement && branchElement.parentElement !== draggingBlock.element) {
        const nodeBranchParent = manager.getNode(branchElement.parentElement.id);
        if (manager.canAttach(draggingBlock, nodeBranchParent, branchElement)) {
            manager.attach(draggingBlock, nodeBranchParent, branchElement);
        }
        else {
            return;
        }
    } else {
        // пересчитываем координаты под editor
        const x = e.clientX - editorRect.left - offsetX;
        const y = e.clientY - editorRect.top  - offsetY;

        editor.appendChild(draggingBlock.element);

        draggingBlock.element.style.left = x + 'px';
        draggingBlock.element.style.top  = y + 'px';
    }

    if (lastBranch) { 
        lastBranch.classList.remove('highlight'); 
    }

    lastBranch = null; 
    draggingBlock = null;
});

function getBranchUnderCursor(x,y) {
    const branches = document.querySelectorAll(".environment__branch");
    
    const maxLayerBranch = [...branches].filter(b => {
        const rect = b.getBoundingClientRect();
        const inside = 
            x >= rect.left &&
            x <= rect.right && 
            y >= rect.top && 
            y <= rect.bottom;
        return inside;
    })
    return maxLayerBranch ? maxLayerBranch.at(-1) : null;
}

const playButton = document.querySelector(".environment__run")
playButton.addEventListener("click", async e => {
    const roots = [...manager.activeBlocks.values()]
        .filter(elem => !elem.element.parentElement.closest(".block"))
    for (const root of roots) {
        const interp = new Interpreter(root.node);
        const result = await interp.run();
        console.log(result);
        editorConsole.print(`${result.type} ${result.value}`);
    }
})
