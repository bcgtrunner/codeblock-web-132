import { ASTNode, Interpreter, Var } from "./interpreter.mjs";
import { UINodeManager } from "./UINodeManager.mjs";
import { Converter } from "./converter.mjs";
import { Debugger } from "./debugger.mjs";
import { Console } from "./console.mjs";
import { getCallDescriptorByOperation } from "./callDescriptors.mjs";
import {
    createEditorStateSnapshot,
    normalizeEditorStateModule,
    serializeEditorStateModule,
} from "./editorState.mjs";
const manager = new UINodeManager();

const palette = document.querySelector(".environment__block-palette");
const editor = document.querySelector(".environment__code-editor");
const editorSurface = editor.querySelector(".environment__editor-surface");
const consolePane = document.querySelector(".environment__console");
const environment = document.querySelector(".environment");
const toolbarPane = document.querySelector(".environment__toolbar");
const paletteEditorSplitter = document.querySelector(".environment__splitter--palette-editor");
const editorConsoleSplitter = document.querySelector(".environment__splitter--editor-console");
const converter = new Converter(editorSurface, manager);
const editorConsole = new Console();
for (const group of palette.querySelectorAll(".palette-group")) {
    const title = group.querySelector(".category");
    if (!title) continue;
    group.classList.add("is-collapsed");
    title.addEventListener("click", () => {
        group.classList.toggle("is-collapsed");
    });
}
editorConsole.log('<span class="console_msg--debug">HELLO, WORLD!</span>')
let draggingBlock = null; // какой блок сейчас тащим
let lastBranch = null; // состояние текущей ветки; Это память о прошлой ветке, над которой был курсор.
let offsetX = 0;
let offsetY = 0;
const errorHighlights = new Set();
const EDITOR_SURFACE_SCALE_MULTIPLIER = 10;
const EDITOR_SURFACE_MIN_WIDTH_PX = 4000;
const EDITOR_SURFACE_MIN_HEIGHT_PX = 3000;
const EDITOR_SURFACE_MARGIN_PX = 0;
const MIN_EDITOR_ZOOM = 0.35;
const MAX_EDITOR_ZOOM = 2.5;
const ZOOM_SENSITIVITY = 0.0015;
const viewportState = {
    panX: EDITOR_SURFACE_MARGIN_PX,
    panY: EDITOR_SURFACE_MARGIN_PX,
    scale: 1,
    surfaceWidth: 0,
    surfaceHeight: 0,
};
const MIN_WIDTH_FALLBACK = {
    palette: 100,
    editor: 100,
    console: 100,
};
let activeResize = null;
let activePan = null;

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
const fromCharCodeBlock = palette.querySelector(".environment__from-char-code-block")
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

function bindCallBlock(blockElement, operation) {
    if (!blockElement) return;
    const descriptor = getCallDescriptorByOperation(operation);
    if (!descriptor) {
        throw new Error(`Unknown call descriptor for operation: ${operation}`);
    }
    blockElement.addEventListener('pointerdown', (e) => {
        const uiNode = manager
            .spawnNode("call", descriptor.label, { operation: descriptor.operation })
            .setOperation(new ASTNode("variable", descriptor.operation));
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
bindCallBlock(removeAtBlock, "erase_at");
bindCallBlock(insertAtBlock, "insert_at");
bindCallBlock(atBlock, "at");
bindCallBlock(setAtBlock, "set_at");
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
bindCallBlock(fromCharCodeBlock, "fromCharCode");
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

function updateEditorSurfaceSize() {
    viewportState.surfaceWidth = Math.max(
        EDITOR_SURFACE_MIN_WIDTH_PX,
        Math.ceil(editor.clientWidth * EDITOR_SURFACE_SCALE_MULTIPLIER)
    );
    viewportState.surfaceHeight = Math.max(
        EDITOR_SURFACE_MIN_HEIGHT_PX,
        Math.ceil(editor.clientHeight * EDITOR_SURFACE_SCALE_MULTIPLIER)
    );
    editorSurface.style.width = `${viewportState.surfaceWidth}px`;
    editorSurface.style.height = `${viewportState.surfaceHeight}px`;
}

function clampPan(panX, panY, scale = viewportState.scale) {
    const minPanX = editor.clientWidth - (viewportState.surfaceWidth * scale) - EDITOR_SURFACE_MARGIN_PX;
    const minPanY = editor.clientHeight - (viewportState.surfaceHeight * scale) - EDITOR_SURFACE_MARGIN_PX;
    return {
        x: clamp(panX, minPanX, EDITOR_SURFACE_MARGIN_PX),
        y: clamp(panY, minPanY, EDITOR_SURFACE_MARGIN_PX),
    };
}

function applyViewportTransform() {
    const clampedPan = clampPan(viewportState.panX, viewportState.panY);
    viewportState.panX = clampedPan.x;
    viewportState.panY = clampedPan.y;
    editorSurface.style.transform = `translate(${viewportState.panX}px, ${viewportState.panY}px) scale(${viewportState.scale})`;
}

function getViewportPoint(clientX, clientY) {
    const rect = editor.getBoundingClientRect();
    return {
        x: clientX - rect.left,
        y: clientY - rect.top,
    };
}

function clientToSurfacePoint(clientX, clientY) {
    const viewportPoint = getViewportPoint(clientX, clientY);
    return {
        x: (viewportPoint.x - viewportState.panX) / viewportState.scale,
        y: (viewportPoint.y - viewportState.panY) / viewportState.scale,
    };
}

function setRootNodePosition(uiNode, left, top) {
    uiNode.element.style.left = `${left}px`;
    uiNode.element.style.top = `${top}px`;
}

function positionDraggedBlockAtClient(uiNode, clientX, clientY) {
    const surfacePoint = clientToSurfacePoint(clientX, clientY);
    setRootNodePosition(uiNode, surfacePoint.x - offsetX, surfacePoint.y - offsetY);
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
    updateEditorSurfaceSize();
    applyViewportTransform();
});

initializePaneWidths();
updateEditorSurfaceSize();
applyViewportTransform();

function startDragging(uiNode, e, blockElement) {
    console.log(uiNode);
    blockElement = blockElement.closest(".block");
    e.stopPropagation(); /* чтобы клик не дошёл до palette */
    draggingBlock = uiNode;
    const rect = blockElement.getBoundingClientRect();
    editorSurface.append(uiNode.element);
    offsetX = (e.clientX - rect.left) / viewportState.scale;
    offsetY = (e.clientY - rect.top) / viewportState.scale;
    uiNode.element.style.position = "absolute";
    uiNode.element.classList.add("is-dragging");
    positionDraggedBlockAtClient(uiNode, e.clientX, e.clientY);
}

function dragging(uiNode, e) {
    positionDraggedBlockAtClient(uiNode, e.clientX, e.clientY);
    const branchElement = getBranchUnderCursor(e.clientX, e.clientY);
    if (branchElement) {
        const nodeBranchParent = manager.getNode(branchElement.parentElement.id);
        if (nodeBranchParent && manager.canAttach(uiNode, nodeBranchParent, branchElement)) {
            if (lastBranch && lastBranch !== branchElement) {
                lastBranch.classList.remove('highlight');
            }
            branchElement.classList.add('highlight');
            lastBranch = branchElement;
        }
    }
    else if (lastBranch) {
        lastBranch.classList.remove('highlight');
        lastBranch = null;
    }
}

editor.addEventListener('pointerdown', (e) => {
    if (e.target.classList.contains("environment__input-number")) return;
    const blockElement = e.target.closest(".block");
    if (blockElement) {
        const uiNode = manager.getNode(blockElement.id);
        manager.detach(uiNode);
        startDragging(uiNode, e, blockElement);
        console.log(manager);
        return;
    }

    if (e.button !== 0 && e.button !== 1) return;
    activePan = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startPanX: viewportState.panX,
        startPanY: viewportState.panY,
    };
    editor.classList.add("is-panning");
    editor.setPointerCapture(e.pointerId);
    e.preventDefault();
});

editor.addEventListener("wheel", (e) => {
    e.preventDefault();
    const viewportPoint = getViewportPoint(e.clientX, e.clientY);
    const nextScale = clamp(
        viewportState.scale * Math.exp(-e.deltaY * ZOOM_SENSITIVITY),
        MIN_EDITOR_ZOOM,
        MAX_EDITOR_ZOOM
    );
    if (nextScale === viewportState.scale) return;

    const focusX = (viewportPoint.x - viewportState.panX) / viewportState.scale;
    const focusY = (viewportPoint.y - viewportState.panY) / viewportState.scale;
    viewportState.scale = nextScale;
    viewportState.panX = viewportPoint.x - (focusX * nextScale);
    viewportState.panY = viewportPoint.y - (focusY * nextScale);
    applyViewportTransform();
}, { passive: false });

document.addEventListener('pointermove', (e) => {
    if (activeResize) {
        if (activeResize.splitter === paletteEditorSplitter) {
            resizeFromPaletteSplitter(e.clientX, activeResize.fixedConsoleWidth);
        } else if (activeResize.splitter === editorConsoleSplitter) {
            resizeFromConsoleSplitter(e.clientX, activeResize.fixedPaletteWidth);
        }
        updateEditorSurfaceSize();
        applyViewportTransform();
        return;
    }
    if (activePan) {
        viewportState.panX = activePan.startPanX + (e.clientX - activePan.startX);
        viewportState.panY = activePan.startPanY + (e.clientY - activePan.startY);
        applyViewportTransform();
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
    if (activePan) {
        editor.classList.remove("is-panning");
        if (editor.hasPointerCapture(e.pointerId)) {
            editor.releasePointerCapture(e.pointerId);
        }
        activePan = null;
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
            draggingBlock.element.classList.remove("is-dragging");
            if (lastBranch) {
                lastBranch.classList.remove('highlight');
            }
            lastBranch = null;
            draggingBlock = null;
            return;
        }
    } else {
        editorSurface.appendChild(draggingBlock.element);
        positionDraggedBlockAtClient(draggingBlock, e.clientX, e.clientY);
    }

    draggingBlock.element.classList.remove("is-dragging");
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

function createStateFilename() {
    const now = new Date();
    const date = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("");
    const time = [
        String(now.getHours()).padStart(2, "0"),
        String(now.getMinutes()).padStart(2, "0"),
        String(now.getSeconds()).padStart(2, "0"),
    ].join("");
    return `editor-state-${date}-${time}.mjs`;
}

function downloadTextFile(filename, source, mimeType = "text/javascript") {
    const blob = new Blob([source], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function importStateModuleFromFile(file) {
    if (!file || typeof file.text !== "function") {
        throw new Error("Please choose a JavaScript state file.");
    }

    const source = await file.text();
    const moduleBlob = new Blob([source], { type: "text/javascript" });
    const moduleUrl = URL.createObjectURL(moduleBlob);

    try {
        return await import(moduleUrl);
    } finally {
        setTimeout(() => URL.revokeObjectURL(moduleUrl), 0);
    }
}

export function saveEditorStateToFile() {
    const roots = getRootBlocks();
    const state = createEditorStateSnapshot(roots, manager);
    const filename = createStateFilename();
    const moduleSource = serializeEditorStateModule(state);

    downloadTextFile(filename, moduleSource);
    editorConsole.log(
        `<span class="console_msg--debug">Saved ${roots.length} root block(s) to ${filename}</span>`
    );

    return { filename, count: roots.length };
}

export function loadEditorStateModule(moduleNamespace) {
    const state = normalizeEditorStateModule(moduleNamespace);
    clearEditorBlocks();

    for (const root of state.roots) {
        converter.toUINodes(root.tree, {
            allowPartial: true,
            position: root.position,
        });
    }

    editorConsole.log(
        `<span class="console_msg--debug">Loaded ${state.roots.length} root block(s)</span>`
    );

    return state;
}

export async function loadEditorStateFromFile(file) {
    const moduleNamespace = await importStateModuleFromFile(file);
    return loadEditorStateModule(moduleNamespace);
}

export function promptLoadEditorStateFile() {
    if (!loadFileInput) {
        throw new Error("Load file input is not available.");
    }

    loadFileInput.value = "";
    loadFileInput.click();
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
    clearErrorHighlights();
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
const saveButton = document.querySelector(".environment__save");
const loadButton = document.querySelector(".environment__load");
const loadFileInput = document.querySelector(".environment__load-file");

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

saveButton?.addEventListener("click", async () => {
    await executeConsoleCommand("save");
});

loadButton?.addEventListener("click", async () => {
    await executeConsoleCommand("load");
});

loadFileInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
        return;
    }

    try {
        await loadEditorStateFromFile(file);
    } catch (error) {
        console.error(error);
        editorConsole.log(`<span class="console_msg--error">Load error: ${error.message}</span>`);
    } finally {
        event.target.value = "";
    }
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
