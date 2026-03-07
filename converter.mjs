import {
    getCanonicalCallDescriptor,
    getCallDescriptorByOperation,
    getGenericCallDescriptor,
} from "./callDescriptors.mjs";

const ROOT_LEFT_PX = 16;
const ROOT_TOP_PX = 16;
const ROOT_VERTICAL_GAP_PX = 24;

const PARAM_SIGNATURE_TYPES = new Set(["number", "string", "bool", "array", "function", "any"]);
const RETURN_SIGNATURE_TYPES = new Set(["number", "string", "bool", "array", "function", "any", "void"]);

class Converter {
    constructor(editorElement, manager) {
        this.editor = editorElement;
        this.manager = manager;
    }

    toUINodes(node, options = {}) {
        const conversionOptions = {
            allowPartial: false,
            position: null,
            ...options,
        };
        const uiNode = this.buildTree(node, conversionOptions);
        this.placeRoot(uiNode, conversionOptions.position);
        return uiNode;
    }

    buildTree(node, options) {
        const uiNode = this.buildShell(node);
        this.hydrateChildren(node, uiNode, options);
        return uiNode;
    }

    buildShell(node) {
        if (!node || typeof node.token !== "string") {
            throw new Error("Converter expected an AST node with a token.");
        }

        let uiNode = null;

        switch (node.token) {
            case "number":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("number", "number"), node);
                uiNode.element.querySelector("input").value = node.value ?? "";
                break;

            case "string":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("string", "string"), node);
                uiNode.element.querySelector("input").value = node.value ?? "";
                break;

            case "bool":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("bool", "bool"), node);
                uiNode.element.querySelector("input").checked = Boolean(node.value);
                break;

            case "variable":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("variable", "variable"), node);
                uiNode.element.querySelector("input").value = node.value ?? "";
                break;

            case "assign":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("assign", "="), node);
                break;

            case "array":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("array", "array"), node);
                break;

            case "block":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("block", "block"), node);
                break;

            case "return":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("return", "return"), node);
                break;

            case "if":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("if", "if"), node);
                break;

            case "for":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("for", "for"), node);
                break;

            case "while":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("while", "while"), node);
                break;

            case "function":
                uiNode = this.manager.adoptNode(this.manager.spawnNode("function", "function"), node);
                break;

            case "param": {
                const signatureType = this.getParamSignatureType(node);
                uiNode = this.manager.adoptNode(
                    this.manager.spawnNode("param", signatureType, { signatureType }),
                    node
                );
                uiNode.element.querySelector("input").value = node.value.name ?? "";
                break;
            }

            case "type": {
                const signatureType = this.getReturnSignatureType(node);
                uiNode = this.manager.adoptNode(
                    this.manager.spawnNode("type", `type ${signatureType}`, { signatureType }),
                    node
                );
                break;
            }

            case "call": {
                const callRender = this.describeCallNode(node);
                if (callRender.mode === "generic") {
                    uiNode = this.manager.adoptNode(
                        this.manager.spawnNode("call", getGenericCallDescriptor().label, { callMode: "generic" }),
                        node
                    );
                } else {
                    uiNode = this.manager.adoptNode(
                        this.manager.spawnNode("call", callRender.descriptor.label, {
                            callMode: "fixed",
                            operation: callRender.descriptor.operation,
                        }),
                        node
                    );
                }
                break;
            }

            default:
                throw new Error(`Unknown AST node token: ${node.token}`);
        }

        return uiNode;
    }

    hydrateChildren(node, uiNode, options) {
        switch (node.token) {
            case "number":
            case "string":
            case "bool":
            case "variable":
            case "param":
            case "type":
                return;

            case "assign":
                this.attachFixedChild(node, uiNode, 0, 0, "left-hand side variable", options);
                this.attachFixedChild(node, uiNode, 1, 1, "right-hand side expression", options);
                return;

            case "return":
                this.attachFixedChild(node, uiNode, 0, 0, "return value", options);
                return;

            case "if":
                this.attachFixedChild(node, uiNode, 0, 0, "condition", options);
                this.attachFixedChild(node, uiNode, 1, 1, "then branch", options);
                this.attachFixedChild(node, uiNode, 2, 2, "else branch", options);
                return;

            case "while":
                this.attachFixedChild(node, uiNode, 0, 0, "condition", options);
                this.attachFixedChild(node, uiNode, 1, 1, "body", options);
                return;

            case "for":
                this.attachFixedChild(node, uiNode, 0, 0, "initializer", options);
                this.attachFixedChild(node, uiNode, 1, 1, "condition", options);
                this.attachFixedChild(node, uiNode, 2, 2, "step", options);
                this.attachFixedChild(node, uiNode, 3, 3, "body", options);
                return;

            case "block":
            case "array":
                for (const child of this.getPresentChildren(node)) {
                    this.attachChildNode(uiNode, uiNode.branches[0], child, options);
                }
                return;

            case "function": {
                const paramsBlock = this.getRequiredChild(node, 0, "params block");
                if (paramsBlock.token !== "block") {
                    throw new Error("Malformed function AST: params block must be a block node.");
                }

                for (const paramNode of this.getPresentChildren(paramsBlock)) {
                    if (paramNode.token !== "param") {
                        throw new Error("Malformed function AST: params block may only contain param nodes.");
                    }
                    this.attachChildNode(uiNode, uiNode.branches[0], paramNode, options);
                }

                const returnTypeNode = this.getFixedChildNode(node, 1, "return type", options);
                if (returnTypeNode && returnTypeNode.token !== "type") {
                    throw new Error("Malformed function AST: return type must be a type node.");
                }
                if (returnTypeNode) {
                    this.attachChildNode(uiNode, uiNode.branches[1], returnTypeNode, options);
                }

                const bodyNode = this.getFixedChildNode(node, 2, "body", options);
                if (bodyNode && (bodyNode.token === "param" || bodyNode.token === "type")) {
                    throw new Error("Malformed function AST: body must not be a param or type node.");
                }
                if (bodyNode) {
                    this.attachChildNode(uiNode, uiNode.branches[2], bodyNode, options);
                }
                return;
            }

            case "call": {
                const callRender = this.describeCallNode(node);
                if (callRender.mode === "generic") {
                    const callee = this.getFixedChildNode(node, 0, "callee", options);
                    if (callee) {
                        this.attachChildNode(uiNode, uiNode.branches[0], callee, options);
                    }
                    for (const child of this.getPresentChildren(node, 1)) {
                        this.attachChildNode(uiNode, uiNode.branches[1], child, options);
                    }
                    return;
                }

                for (let i = 0; i < callRender.descriptor.arity; i++) {
                    this.attachFixedChild(node, uiNode, i + 1, i, `argument ${i}`, options);
                }
                return;
            }

            default:
                throw new Error(`Cannot hydrate unknown AST node token: ${node.token}`);
        }
    }

    placeRoot(uiNode, position = null) {
        this.editor.appendChild(uiNode.element);
        uiNode.element.style.position = "absolute";
        if (this.isValidPosition(position)) {
            uiNode.element.style.left = `${position.left}px`;
            uiNode.element.style.top = `${position.top}px`;
            return;
        }
        uiNode.element.style.left = `${ROOT_LEFT_PX}px`;
        uiNode.element.style.top = `${this.getNextRootTop(uiNode.element)}px`;
    }

    getNextRootTop(currentElement) {
        let nextTop = ROOT_TOP_PX;
        for (const element of this.editor.children || []) {
            if (element === currentElement || !element.classList?.contains("block")) continue;
            const elementTop = Number.parseFloat(element.style.top) || 0;
            const elementHeight = element.offsetHeight || 40;
            nextTop = Math.max(nextTop, elementTop + elementHeight + ROOT_VERTICAL_GAP_PX);
        }
        return nextTop;
    }

    attachFixedChild(parentNode, parentUINode, childIndex, branchIndex, label, options) {
        const childNode = this.getFixedChildNode(parentNode, childIndex, label, options);
        if (!childNode) return;
        this.attachChildNode(parentUINode, parentUINode.branches[branchIndex], childNode, options);
    }

    attachChildNode(parentUINode, branchElement, childNode, options) {
        const childUINode = this.buildTree(childNode, options);
        this.manager.attachView(childUINode, parentUINode, branchElement);
        return childUINode;
    }

    getFixedChildNode(node, index, label, options) {
        const child = node.children?.[index];
        if (child) {
            return child;
        }
        if (options?.allowPartial) {
            return null;
        }
        throw new Error(`Malformed ${node.token} AST: missing ${label}.`);
    }

    getRequiredChild(node, index, label) {
        const child = node.children?.[index];
        if (!child) {
            throw new Error(`Malformed ${node.token} AST: missing ${label}.`);
        }
        return child;
    }

    getPresentChildren(node, startIndex = 0) {
        const children = [];
        for (let i = startIndex; i < (node.children?.length ?? 0); i++) {
            const child = node.children[i];
            if (child) {
                children.push(child);
            }
        }
        return children;
    }

    getParamSignatureType(node) {
        if (!node.value || typeof node.value !== "object") {
            throw new Error("Malformed param AST: expected { name, type } value.");
        }
        if (!PARAM_SIGNATURE_TYPES.has(node.value.type)) {
            throw new Error(`Unsupported param signature type: ${node.value.type}`);
        }
        return node.value.type;
    }

    getReturnSignatureType(node) {
        if (!RETURN_SIGNATURE_TYPES.has(node.value)) {
            throw new Error(`Unsupported return signature type: ${node.value}`);
        }
        return node.value;
    }

    describeCallNode(node) {
        if (node.ui?.callMode === "generic") {
            return { mode: "generic" };
        }

        if (node.ui?.callMode === "fixed") {
            const operation = node.ui.callOperation ?? node.children?.[0]?.value;
            const descriptor = getCallDescriptorByOperation(operation);
            if (!descriptor) {
                throw new Error(`Unsupported saved call operation: ${operation}`);
            }
            return { mode: "fixed", descriptor };
        }

        const callee = node.children?.[0];
        if (callee?.token !== "variable") {
            return { mode: "generic" };
        }

        const descriptor = getCanonicalCallDescriptor(callee.value, Math.max((node.children?.length ?? 0) - 1, 0));
        if (!descriptor) {
            return { mode: "generic" };
        }

        return { mode: "fixed", descriptor };
    }

    isValidPosition(position) {
        return Number.isFinite(position?.left) && Number.isFinite(position?.top);
    }
}

export { Converter };
