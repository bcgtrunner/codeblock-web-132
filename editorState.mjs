import { ASTNode } from "./interpreter.mjs";

const EDITOR_STATE_VERSION = 1;

function createEditorStateSnapshot(rootUINodes, manager) {
    if (!rootUINodes || typeof rootUINodes[Symbol.iterator] !== "function") {
        throw new Error("Editor state snapshot expects an iterable of root UI nodes.");
    }
    if (!manager || typeof manager.getNode !== "function") {
        throw new Error("Editor state snapshot expects a UI node manager.");
    }

    const roots = [...rootUINodes]
        .map((uiNode) => snapshotRoot(uiNode, manager))
        .sort(compareRootsByPosition);

    return {
        version: EDITOR_STATE_VERSION,
        roots,
    };
}

function serializeEditorStateModule(state) {
    if (!state || typeof state !== "object") {
        throw new Error("Cannot serialize an empty editor state.");
    }

    return `export default ${JSON.stringify(state, null, 4)};\n`;
}

function normalizeEditorStateModule(moduleNamespace) {
    const rawState = getModuleState(moduleNamespace);
    if (!rawState || typeof rawState !== "object") {
        throw new Error("Editor state module must export an object.");
    }

    const version = rawState.version ?? EDITOR_STATE_VERSION;
    if (version !== EDITOR_STATE_VERSION) {
        throw new Error(`Unsupported editor state version: ${version}`);
    }

    if (!Array.isArray(rawState.roots)) {
        throw new Error("Editor state must include a roots array.");
    }

    return {
        version,
        roots: rawState.roots.map((root, index) => normalizeRoot(root, `roots[${index}]`)),
    };
}

function snapshotRoot(uiNode, manager) {
    if (!uiNode?.node || !uiNode.element) {
        throw new Error("Editor state snapshot encountered an invalid root UI node.");
    }

    return {
        position: readRootPosition(uiNode.element),
        tree: snapshotNode(uiNode.node, manager),
    };
}

function snapshotNode(node, manager) {
    if (!node || typeof node.token !== "string") {
        throw new Error("Editor state snapshot expected an AST node.");
    }

    const snapshot = {
        id: node.id,
        token: node.token,
        value: cloneValue(node.value === undefined ? null : node.value),
        children: Array.isArray(node.children)
            ? node.children.map((child) => child ? snapshotNode(child, manager) : null)
            : [],
    };

    const ui = snapshotNodeUi(node, manager);
    if (ui) {
        snapshot.ui = ui;
    }

    return snapshot;
}

function snapshotNodeUi(node, manager) {
    if (node.token !== "call") {
        return null;
    }

    const uiNode = manager.getNode(node.id);
    if (!uiNode?.element?.dataset) {
        return null;
    }

    const mode = uiNode.element.dataset.callMode;
    if (mode !== "generic" && mode !== "fixed") {
        return null;
    }

    const ui = { callMode: mode };
    if (typeof uiNode.element.dataset.callOperation === "string" && uiNode.element.dataset.callOperation !== "") {
        ui.callOperation = uiNode.element.dataset.callOperation;
    }
    return ui;
}

function normalizeRoot(root, path) {
    if (!root || typeof root !== "object") {
        throw new Error(`Invalid editor state at ${path}.`);
    }

    const treeSource = root.tree ?? root.node;
    if (!treeSource) {
        throw new Error(`Invalid editor state at ${path}: missing tree.`);
    }

    return {
        position: normalizePosition(root.position),
        tree: normalizeNode(treeSource, `${path}.tree`),
    };
}

function normalizeNode(source, path) {
    if (!source || typeof source !== "object") {
        throw new Error(`Invalid editor state node at ${path}.`);
    }
    if (typeof source.token !== "string" || source.token === "") {
        throw new Error(`Invalid editor state node at ${path}: missing token.`);
    }

    const node = new ASTNode(source.token, cloneValue(source.value === undefined ? null : source.value), []);
    if (typeof source.id === "string" && source.id !== "") {
        node.id = source.id;
    }

    node.children = normalizeChildren(source.children, `${path}.children`);

    const ui = normalizeNodeUi(source.ui, source.token, `${path}.ui`);
    if (ui) {
        node.ui = ui;
    }

    return node;
}

function normalizeChildren(children, path) {
    if (children === undefined) {
        return [];
    }
    if (!Array.isArray(children)) {
        throw new Error(`Invalid editor state children at ${path}.`);
    }

    return children.map((child, index) => {
        if (child === null || child === undefined) {
            return undefined;
        }
        return normalizeNode(child, `${path}[${index}]`);
    });
}

function normalizeNodeUi(ui, token, path) {
    if (ui === undefined || ui === null) {
        return null;
    }
    if (!ui || typeof ui !== "object") {
        throw new Error(`Invalid editor state UI metadata at ${path}.`);
    }
    if (token !== "call") {
        return null;
    }

    const normalized = {};

    if (ui.callMode !== undefined) {
        if (ui.callMode !== "generic" && ui.callMode !== "fixed") {
            throw new Error(`Invalid call mode at ${path}.`);
        }
        normalized.callMode = ui.callMode;
    }

    if (ui.callOperation !== undefined) {
        if (typeof ui.callOperation !== "string" || ui.callOperation === "") {
            throw new Error(`Invalid call operation at ${path}.`);
        }
        normalized.callOperation = ui.callOperation;
    }

    return Object.keys(normalized).length > 0 ? normalized : null;
}

function normalizePosition(position) {
    if (!position || typeof position !== "object") {
        return null;
    }

    const left = Number(position.left);
    const top = Number(position.top);
    if (!Number.isFinite(left) || !Number.isFinite(top)) {
        return null;
    }

    return { left, top };
}

function readRootPosition(element) {
    const left = Number.parseFloat(element.style.left);
    const top = Number.parseFloat(element.style.top);
    return {
        left: Number.isFinite(left) ? left : 0,
        top: Number.isFinite(top) ? top : 0,
    };
}

function cloneValue(value) {
    if (Array.isArray(value)) {
        return value.map((item) => cloneValue(item));
    }
    if (value && typeof value === "object") {
        const clone = {};
        for (const [key, nestedValue] of Object.entries(value)) {
            clone[key] = cloneValue(nestedValue);
        }
        return clone;
    }
    return value;
}

function compareRootsByPosition(leftRoot, rightRoot) {
    const topDelta = leftRoot.position.top - rightRoot.position.top;
    if (topDelta !== 0) {
        return topDelta;
    }
    return leftRoot.position.left - rightRoot.position.left;
}

function getModuleState(moduleNamespace) {
    if (moduleNamespace?.default && typeof moduleNamespace.default === "object") {
        return moduleNamespace.default;
    }
    if (moduleNamespace?.editorState && typeof moduleNamespace.editorState === "object") {
        return moduleNamespace.editorState;
    }
    return moduleNamespace;
}

export {
    EDITOR_STATE_VERSION,
    createEditorStateSnapshot,
    serializeEditorStateModule,
    normalizeEditorStateModule,
};
