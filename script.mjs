import { ASTNode, Interpreter, Var } from "./interpreter.mjs";
import { UINodeManager } from "./UINodeManager.mjs";
import { Debugger } from "./debugger.mjs";
import { Console } from "./console.mjs";
import { Converter } from "./converter.mjs";
const manager = new UINodeManager();

const palette = document.querySelector(".environment__block-palette");
const editor = document.querySelector(".environment__code-editor");
const consolePane = document.querySelector(".environment__console");
const environment = document.querySelector(".environment");
const toolbarPane = document.querySelector(".environment__toolbar");
const paletteEditorSplitter = document.querySelector(".environment__splitter--palette-editor");
const editorConsoleSplitter = document.querySelector(".environment__splitter--editor-console");
const editorConsole = new Console();
for (const group of palette.querySelectorAll(".palette-group")) {
    const title = group.querySelector(".category");
    if (!title) continue;
    group.classList.add("is-collapsed");
    title.addEventListener("click", () => {
        group.classList.toggle("is-collapsed");
    });
}
const converter = new Converter(editor, manager);
converter.toUINodes(new ASTNode("return", null, [new ASTNode("return", null, [new ASTNode("return", null, [new ASTNode("number", 3)])])]));
editorConsole.log('<span class="console_msg--debug">HELLO, WORLD!</span>')
let draggingBlock = null; // какой блок сейчас тащим
let lastBranch = null; // состояние текущей ветки; Это память о прошлой ветке, над которой был курсор.
let offsetX = 0;
let offsetY = 0;
const errorHighlights = new Set();
const MIN_WIDTH_FALLBACK = {
    palette: 220,
    editor: 320,
    console: 220,
};
let activeResize = null;

const numberBlock = palette.querySelector(".environment__numberLiteral-block")
const stringBlock = palette.querySelector(".environment__stringLiteral-block")
const boolBlock = palette.querySelector(".environment__boolLiteral-block")
const variableBlock = palette.querySelector(".environment__variable-block")
const assignBlock = palette.querySelector(".environment__assign-block")
const callBlock = palette.querySelector(".environment__call-block")
const plusBlock = palette.querySelector(".environment__plus-block")
const minusBlock = palette.querySelector(".environment__minus-block")
const multiplayBlock = palette.querySelector(".environment__multiply-block")
const divideBlock = palette.querySelector(".environment__divide-block")
const divideFloorBlock = palette.querySelector(".environment__intDivide-block")
const modBlock = palette.querySelector(".environment__mod-block")
const powerBlock = palette.querySelector(".environment__power-block")
const sqrtBlock = palette.querySelector(".environment__sqrt-block")
const absBlock = palette.querySelector(".environment__abs-block")
const floorBlock = palette.querySelector(".environment__floor-block")
const ceilBlock = palette.querySelector(".environment__ceil-block")
const roundBlock = palette.querySelector(".environment__round-block")
const truncBlock = palette.querySelector(".environment__trunc-block")
const sinBlock = palette.querySelector(".environment__sin-block")
const cosBlock = palette.querySelector(".environment__cos-block")
const tanBlock = palette.querySelector(".environment__tan-block")
const logBlock = palette.querySelector(".environment__log-block")
const expBlock = palette.querySelector(".environment__exp-block")
const minBlock = palette.querySelector(".environment__min-block")
const maxBlock = palette.querySelector(".environment__max-block")
const signBlock = palette.querySelector(".environment__sign-block")
const atan2Block = palette.querySelector(".environment__atan2-block")
const asinBlock = palette.querySelector(".environment__asin-block")
const acosBlock = palette.querySelector(".environment__acos-block")
const atanBlock = palette.querySelector(".environment__atan-block")
const log10Block = palette.querySelector(".environment__log10-block")
const log2Block = palette.querySelector(".environment__log2-block")
const greaterBlock = palette.querySelector(".environment__gt-block")
const lessBlock = palette.querySelector(".environment__lt-block")
const eqBlock = palette.querySelector(".environment__eq-block")
const neqBlock = palette.querySelector(".environment__neq-block")
const andBlock = palette.querySelector(".environment__and-block")
const orBlock = palette.querySelector(".environment__or-block")
const lteBlock = palette.querySelector(".environment__lte-block")
const gteBlock = palette.querySelector(".environment__gte-block")
const notBlock = palette.querySelector(".environment__not-block")
const ifBlock = palette.querySelector(".environment__if-block")
const forBlock = palette.querySelector(".environment__for-block")
const whileBlock = palette.querySelector(".environment__while-block")
const blockBlock = palette.querySelector(".environment__block-block")
const returnBlock = palette.querySelector(".environment__return-block")
const arrayBlock = palette.querySelector(".environment__array-block")
const atBlock = palette.querySelector(".environment__at-block")
const removeAtBlock = palette.querySelector(".environment__erase_at-block")
const insertAtBlock = palette.querySelector(".environment__insert_at-block")
const setAtBlock = palette.querySelector(".environment__set_at-block")
const lenBlock = palette.querySelector(".environment__len-block")
const pushBlock = palette.querySelector(".environment__push-block")
const popBlock = palette.querySelector(".environment__pop-block")
const strlenBlock = palette.querySelector(".environment__strlen-block")
const upperBlock = palette.querySelector(".environment__upper-block")
const lowerBlock = palette.querySelector(".environment__lower-block")
const trimBlock = palette.querySelector(".environment__trim-block")
const substringBlock = palette.querySelector(".environment__substring-block")
const splitBlock = palette.querySelector(".environment__split-block")
const joinBlock = palette.querySelector(".environment__join-block")
const startsWithBlock = palette.querySelector(".environment__starts-with-block")
const endsWithBlock = palette.querySelector(".environment__ends-with-block")
const replaceBlock = palette.querySelector(".environment__replace-block")
const charAtBlock = palette.querySelector(".environment__char-at-block")
const inputBlock = palette.querySelector(".environment__input-block")
const printBlock = palette.querySelector(".environment__print-block")
const boolToNumberBlock = palette.querySelector(".environment__bool-to-number-block")
const numberToBoolBlock = palette.querySelector(".environment__number-to-bool-block")
const numberToStringBlock = palette.querySelector(".environment__number-to-string-block")
const boolToStringBlock = palette.querySelector(".environment__bool-to-string-block")
const stringToNumberBlock = palette.querySelector(".environment__string-to-number-block")
const stringToBoolBlock = palette.querySelector(".environment__string-to-bool-block")
const arrayToBoolBlock = palette.querySelector(".environment__array-to-bool-block")
const arrayToStringBlock = palette.querySelector(".environment__array-to-string-block")
const typeofBlock = palette.querySelector(".environment__typeof-block")
const functionBlock = palette.querySelector(".environment__function-block")
const paramBlocks = palette.querySelectorAll('[data-signature-node="param"]')
const typeBlocks = palette.querySelectorAll('[data-signature-node="type"]')

function bindCallBlock(blockElement, operation, label = operation) {
    if (!blockElement) return;
    blockElement.addEventListener('pointerdown', (e) => {
        const uiNode = manager.spawnNode("call", label).setOperation(new ASTNode("variable", operation));
        startDragging(uiNode, e, e.target);
    });
}

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
callBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("call", "call");
    startDragging(uiNode, e, e.target);
});
bindCallBlock(plusBlock, "+");
bindCallBlock(minusBlock, "-");
bindCallBlock(multiplayBlock, "*");
bindCallBlock(divideBlock, "/");
bindCallBlock(divideFloorBlock, "//");
bindCallBlock(modBlock, "%");
bindCallBlock(powerBlock, "**");
bindCallBlock(sqrtBlock, "sqrt");
bindCallBlock(absBlock, "abs");
bindCallBlock(floorBlock, "floor");
bindCallBlock(ceilBlock, "ceil");
bindCallBlock(roundBlock, "round");
bindCallBlock(truncBlock, "trunc");
bindCallBlock(sinBlock, "sin");
bindCallBlock(cosBlock, "cos");
bindCallBlock(tanBlock, "tan");
bindCallBlock(logBlock, "log");
bindCallBlock(expBlock, "exp");
bindCallBlock(minBlock, "min");
bindCallBlock(maxBlock, "max");
bindCallBlock(signBlock, "sign");
bindCallBlock(atan2Block, "atan2");
bindCallBlock(asinBlock, "asin");
bindCallBlock(acosBlock, "acos");
bindCallBlock(atanBlock, "atan");
bindCallBlock(log10Block, "log10");
bindCallBlock(log2Block, "log2");
bindCallBlock(eqBlock, "==");
bindCallBlock(neqBlock, "!=");
bindCallBlock(lteBlock, "<=");
bindCallBlock(gteBlock, ">=");
bindCallBlock(greaterBlock, ">");
bindCallBlock(andBlock, "and");
bindCallBlock(orBlock, "or");
bindCallBlock(notBlock, "not");
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
bindCallBlock(lessBlock, "<");
bindCallBlock(removeAtBlock, "erase_at", "remove at");
bindCallBlock(insertAtBlock, "insert_at", "insert at");
bindCallBlock(atBlock, "at");
bindCallBlock(setAtBlock, "set_at", "set at");
bindCallBlock(lenBlock, "len");
bindCallBlock(pushBlock, "push");
bindCallBlock(popBlock, "pop");
bindCallBlock(strlenBlock, "strlen");
bindCallBlock(upperBlock, "upper");
bindCallBlock(lowerBlock, "lower");
bindCallBlock(trimBlock, "trim");
bindCallBlock(substringBlock, "substring");
bindCallBlock(splitBlock, "split");
bindCallBlock(joinBlock, "join");
bindCallBlock(startsWithBlock, "startsWith");
bindCallBlock(endsWithBlock, "endsWith");
bindCallBlock(replaceBlock, "replace");
bindCallBlock(charAtBlock, "charAt");
bindCallBlock(boolToNumberBlock, "boolToNumber");
bindCallBlock(numberToBoolBlock, "numberToBool");
bindCallBlock(numberToStringBlock, "numberToString");
bindCallBlock(boolToStringBlock, "boolToString");
bindCallBlock(stringToNumberBlock, "stringToNumber");
bindCallBlock(stringToBoolBlock, "stringToBool");
bindCallBlock(arrayToBoolBlock, "arrayToBool");
bindCallBlock(arrayToStringBlock, "arrayToString");
bindCallBlock(typeofBlock, "typeof");
bindCallBlock(inputBlock, "input");
bindCallBlock(printBlock, "print");
functionBlock.addEventListener('pointerdown', (e) => {
    const uiNode = manager.spawnNode("function", "function");
    startDragging(uiNode, e, e.target);
});
for (const blockElement of paramBlocks) {
    blockElement.addEventListener('pointerdown', (e) => {
        const signatureType = blockElement.dataset.signatureType;
        const uiNode = manager.spawnNode("param", signatureType, { signatureType });
        startDragging(uiNode, e, e.target);
    });
}
for (const blockElement of typeBlocks) {
    blockElement.addEventListener('pointerdown', (e) => {
        const signatureType = blockElement.dataset.signatureType;
        const uiNode = manager.spawnNode("type", `type ${signatureType}`, { signatureType });
        startDragging(uiNode, e, e.target);
    });
}

function setPaneWidth(pane, widthPx) {
    pane.style.flex = `0 0 ${widthPx}px`;
    pane.style.width = `${widthPx}px`;
}

function getSplitterTotalWidth() {
    return paletteEditorSplitter.offsetWidth + editorConsoleSplitter.offsetWidth;
}

function getAvailableWorkWidth() {
    return environment.clientWidth - toolbarPane.offsetWidth - getSplitterTotalWidth();
}

function initializePaneWidths() {
    setPaneWidth(palette, palette.offsetWidth);
    setPaneWidth(consolePane, consolePane.offsetWidth);
    setPaneWidth(editor, editor.offsetWidth);
}

function applyWidths(newPaletteWidth, newEditorWidth, newConsoleWidth) {
    setPaneWidth(palette, newPaletteWidth);
    setPaneWidth(editor, newEditorWidth);
    setPaneWidth(consolePane, newConsoleWidth);
}

function clamp(value, min, max) {
    if (max < min) return min;
    return Math.min(Math.max(value, min), max);
}

function getCssMinWidthPx(element, fallback) {
    const minWidth = Number.parseFloat(getComputedStyle(element).minWidth);
    return Number.isFinite(minWidth) ? minWidth : fallback;
}

function getPaneMinWidths() {
    return {
        palette: getCssMinWidthPx(palette, MIN_WIDTH_FALLBACK.palette),
        editor: getCssMinWidthPx(editor, MIN_WIDTH_FALLBACK.editor),
        console: getCssMinWidthPx(consolePane, MIN_WIDTH_FALLBACK.console),
    };
}

function resizeFromPaletteSplitter(clientX, fixedConsoleWidth) {
    const envRect = environment.getBoundingClientRect();
    const available = getAvailableWorkWidth();
    const minWidths = getPaneMinWidths();
    const minPaletteWidth = minWidths.palette;
    const minEditorWidth = minWidths.editor;
    const minConsoleWidth = minWidths.console;

    const maxPalette = available - minEditorWidth - minConsoleWidth;
    const targetPalette = clamp(clientX - envRect.left, minPaletteWidth, maxPalette);
    let targetEditor = available - targetPalette - fixedConsoleWidth;
    let targetConsole = fixedConsoleWidth;

    if (targetEditor < minEditorWidth) {
        targetEditor = minEditorWidth;
        targetConsole = available - targetPalette - targetEditor;
    }

    if (targetConsole < minConsoleWidth) {
        targetConsole = minConsoleWidth;
        targetEditor = available - targetPalette - targetConsole;
    }

    applyWidths(targetPalette, targetEditor, targetConsole);
}

function resizeFromConsoleSplitter(clientX, fixedPaletteWidth) {
    const envRect = environment.getBoundingClientRect();
    const available = getAvailableWorkWidth();
    const minWidths = getPaneMinWidths();
    const minEditorWidth = minWidths.editor;
    const minConsoleWidth = minWidths.console;
    const editorStart = envRect.left + fixedPaletteWidth + paletteEditorSplitter.offsetWidth;

    const minX = editorStart + minEditorWidth;
    const maxX = envRect.left + available - minConsoleWidth;
    const clampedX = clamp(clientX, minX, maxX);
    const targetEditor = clampedX - editorStart;
    const targetConsole = available - fixedPaletteWidth - targetEditor;

    applyWidths(fixedPaletteWidth, targetEditor, targetConsole);
}

function beginResize(splitter, e) {
    activeResize = {
        splitter,
        fixedConsoleWidth: consolePane.offsetWidth,
        fixedPaletteWidth: palette.offsetWidth,
    };
    splitter.setPointerCapture(e.pointerId);
    e.preventDefault();
}

paletteEditorSplitter.addEventListener("pointerdown", (e) => {
    beginResize(paletteEditorSplitter, e);
});

editorConsoleSplitter.addEventListener("pointerdown", (e) => {
    beginResize(editorConsoleSplitter, e);
});

window.addEventListener("resize", () => {
    const available = getAvailableWorkWidth();
    const minWidths = getPaneMinWidths();
    const paletteWidth = clamp(palette.offsetWidth, minWidths.palette, available - minWidths.editor - minWidths.console);
    const consoleWidth = clamp(consolePane.offsetWidth, minWidths.console, available - paletteWidth - minWidths.editor);
    const editorWidth = available - paletteWidth - consoleWidth;
    applyWidths(paletteWidth, editorWidth, consoleWidth);
});

initializePaneWidths();

function startDragging(uiNode, e, blockElement) {
    console.log(uiNode);
    blockElement = blockElement.closest(".block");
    e.stopPropagation(); /* чтобы клик не дошёл до palette */
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
    else if (lastBranch) {
        lastBranch.classList.remove('highlight');
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
    if (activeResize) {
        if (activeResize.splitter === paletteEditorSplitter) {
            resizeFromPaletteSplitter(e.clientX, activeResize.fixedConsoleWidth);
        } else if (activeResize.splitter === editorConsoleSplitter) {
            resizeFromConsoleSplitter(e.clientX, activeResize.fixedPaletteWidth);
        }
        return;
    }
    if (!draggingBlock) return;
    dragging(draggingBlock, e);
});

document.addEventListener('pointerup', (e) => {
    if (activeResize) {
        activeResize.splitter.releasePointerCapture(e.pointerId);
        activeResize = null;
        document.body.style.cursor = "";
        return;
    }
    if (!draggingBlock) return;

    const branchElement = getBranchUnderCursor(e.clientX, e.clientY);

    const editorRect = editor.getBoundingClientRect();
    const isInsideEditor =
        e.clientX >= editorRect.left &&
        e.clientX <= editorRect.right &&
        e.clientY >= editorRect.top &&
        e.clientY <= editorRect.bottom;
    if (!isInsideEditor) {
        console.log("BLOCK DELETED!!!");
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

function clearErrorHighlights() {
    for (const uiNode of errorHighlights) {
        uiNode.element.classList.remove("error-highlight");
    }
    errorHighlights.clear();
}

function highlightErrorPath(path) {
    if (!Array.isArray(path)) return;
    for (const node of path) {
        const uiNode = manager.getClosestUINode(node);
        if (!uiNode) continue;
        uiNode.element.classList.add("error-highlight");
        errorHighlights.add(uiNode);
    }
}

export function getRootBlocks() {
    return [...manager.activeBlocks.values()].filter(uiNode => !uiNode.parent);
}

export async function runEditorBlocks() {
    clearErrorHighlights();
    const roots = [...manager.activeBlocks.values()]
        .filter(elem => !elem.element.parentElement.closest(".block"))
    for (const root of roots) {
        const interp = new Interpreter(root.node, {
            console: editorConsole
        });
        try {
            const result = await interp.run();
            console.log(result);
            editorConsole.log(`<span class="console_msg--debug">${result.type} ${JSON.stringify(result.value)}</span>`);
        } catch (e) {
            if (e.path) {
                highlightErrorPath(e.path);
            }
            console.error(e);
            editorConsole.log(`<span class="console_msg--error">Error: ${e.message}</span>`);
        }
    }
}

export function clearEditorBlocks() {
    const roots = [...manager.activeBlocks.values()]
        .filter(uiNode => !uiNode.parent);
    for (const uiNode of manager.activeBlocks.values()) {
        uiNode.remove();
    }
    manager.activeBlocks.clear();
    console.log("Editor cleared");
}

export async function runDebugMode(tree, waitForStep, callback) {
    const interpreter = new Interpreter(tree, {
        console: editorConsole
    });
    const debuggerInstance = new Debugger(interpreter, {
        enabled: true,
        stepMode: true,
        onPause: async ({ node, stack }) => {
            editorConsole.log('<span class="console_msg--debug">--- Debug Step ---</span>');
            editorConsole.log(`<span class="console_msg--debug">Paused at: ${node.token} ${node.value}</span>`);
            
            console.log("Stack:", stack);
            for (const frame of stack.slice(1)) {
                for (const [key, value] of Object.entries(frame)) {
                    editorConsole.log(`<span class="console_msg--debug">Stack: ${key} ${JSON.stringify(prune(value, 2))}</span>`);
                }
            }

            editorConsole.log('<span class="console_msg--debug">Press <b>Enter</b>, to move to the next step...</span>');
            await waitForStep();
        }
    });
    interpreter.debugger = debuggerInstance;
    try {
        const result = await interpreter.run();
        
        if (result) {
            editorConsole.log(`<span class="console_msg--debug"><b>Debug Result:</b> ${result.type} ${JSON.stringify(prune(value, 2))}</span>`);
        }
    } catch (e) {
        if (e.path) {
            highlightErrorPath(e.path);
        }
        editorConsole.log(`<span class="console_msg--error">Debug Error: ${e.message}</span>`);
        
        if (e.path) {
            e.path.forEach((node, i) => {
                console.log(`${i}: ${node.token}`);
            });
        }
    } finally {
        editorConsole.log('<span class="console_msg--debug"><i>Debug session finished. Normal console mode restored.</i></span>');
        callback?.();
    }
}

const playButton = document.querySelector(".environment__run");
const debugButton = document.querySelector(".environment__debug");
const resetButton = document.querySelector(".environment__reset");
const clearButton = document.querySelector(".environment__clear");

async function executeConsoleCommand(command) {
    editorConsole.input.value = command;
    await editorConsole.execute();
}

playButton.addEventListener("click", async () => {
    await executeConsoleCommand("run");
});

debugButton?.addEventListener("click", async () => {
    await executeConsoleCommand("debug");
});

resetButton?.addEventListener("click", async () => {
    await executeConsoleCommand("reset");
});

clearButton?.addEventListener("click", async () => {
    await executeConsoleCommand("clear");
});


function prune(obj, depth) {
    console.log(obj instanceof Var)
    if (depth === 0 || typeof obj !== 'object' || obj === null) {
    return typeof obj === 'object' && obj !== null && !(obj instanceof Var) ? "[Object]" : obj;
    }
    const result = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
    result[key] = prune(obj[key], depth - 1);
    }
    return result;
}