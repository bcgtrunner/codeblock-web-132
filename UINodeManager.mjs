import { ASTNode } from "./interpreter.mjs";
import { UINode } from "./UINode.mjs";
import {
    getCallDescriptorByLabel,
    getCallDescriptorByOperation,
    getGenericCallDescriptor,
} from "./callDescriptors.mjs";

class UINodeManager {
    constructor() {
        this.activeBlocks = new Map(); 
    }
    
    spawnNode(type, label, options = {}) {
        const value = null;
        const element = document.createElement("div");
        const uiNode = new UINode(type, element);
        const signatureType = options.signatureType ?? null;
        element.className = this.getNodeClassName(type, signatureType);
        element.id = uiNode.node.id;
        if (signatureType) {
            element.dataset.signatureType = signatureType;
        }
        element.style.position = 'absolute'; 
        const text = this.createDivElement(label, "environment__operation")
        switch (type) {
            case "number": {
                element.appendChild(text);
                const input = document.createElement("input");
                input.type = "number";
                input.className = "environment__input-number"
                element.appendChild(input);
                input.addEventListener("change", (e) => {
                    uiNode.node.value = Number.parseFloat(e.target.value);
                })
                break;
            }
            case "string": {
                element.appendChild(text);
                const input = document.createElement("input");
                input.type = "text";
                input.className = "environment__input-number"
                element.appendChild(input);
                input.value = value;
                input.addEventListener("change", (e) => {
                    uiNode.node.value = e.target.value;
                })
                break;
            }
            case "bool": {
                element.appendChild(text);
                const input = document.createElement("input");
                input.type = "checkbox";
                input.className = "environment__input-number"
                element.appendChild(input);
                input.value = value;
                input.addEventListener("change", (e) => {
                    uiNode.node.value = input.checked;
                })
                break;
            }
            case "variable": {
                element.appendChild(text);
                const input = document.createElement("input");
                input.type = "text";
                input.className = "environment__input-number"
                element.appendChild(input);
                input.value = value;
                input.addEventListener("change", (e) => {
                    uiNode.node.value = e.target.value;
                })
                break;
            }
            case "param": {
                element.appendChild(text);
                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.className = "environment__input-number";
                nameInput.placeholder = "name";
                uiNode.node.value = { name: "", type: signatureType };

                nameInput.addEventListener("change", (e) => {
                    uiNode.node.value = {
                        ...uiNode.node.value,
                        name: e.target.value
                    };
                });

                element.appendChild(nameInput);
                break;
            }
            case "type": {
                element.appendChild(text);
                uiNode.node.value = signatureType;
                break;
            }
            case "assign": {
                const right = this.createDivElement("", "environment__branch")
                const left = this.createDivElement("", "environment__branch")
                element.appendChild(left);
                element.appendChild(text);
                element.appendChild(right);
                uiNode.setBranches([left, right]);
                break;
            }
            case "call": {
                const callMode = options.callMode ?? (label === "call" ? "generic" : "fixed");
                const descriptor = callMode === "generic"
                    ? getGenericCallDescriptor()
                    : (options.operation
                        ? getCallDescriptorByOperation(options.operation)
                        : getCallDescriptorByLabel(label));

                if (!descriptor) {
                    throw new Error(`Unknown call descriptor: ${options.operation ?? label}`);
                }

                uiNode.setCallMetadata({
                    mode: callMode,
                    label: descriptor.label,
                    operation: descriptor.operation,
                });

                const branches = this.renderHorizontalBranchTemplate(element, descriptor.templateParts);
                uiNode.setBranches(branches);
                break;
            }
            case "if": {
                element.classList.add("vertical-branch-alignment");
                element.appendChild(text);
                const thenDiv = this.createDivElement("then", "centered");
                const elseDiv = this.createDivElement("else", "centered");
                const condition = this.createDivElement("", "environment__branch");
                const trueBranch = this.createDivElement("", "environment__branch");
                const falseBranch = this.createDivElement("", "environment__branch");
                element.appendChild(condition);
                element.appendChild(thenDiv);
                element.appendChild(trueBranch);
                element.appendChild(elseDiv);
                element.appendChild(falseBranch);
                uiNode.setBranches([condition, trueBranch, falseBranch]);
                break;
            }
            case "while": {
                element.classList.add("vertical-branch-alignment");
                element.appendChild(text);
                const doDiv = this.createDivElement("do", "centered");
                const condition = this.createDivElement("", "environment__branch")
                const body = this.createDivElement("", "environment__branch")
                element.appendChild(condition);
                element.append(doDiv);
                element.appendChild(body);
                uiNode.setBranches([condition, body]);
                break;
            }
            case "for": {
                element.classList.add("vertical-branch-alignment");
                element.appendChild(text);
                const varDiv = this.createDivElement("var", "centered");
                const condDiv = this.createDivElement("cond", "centered")
                const stepDiv = this.createDivElement("step", "centered")
                const doDiv = this.createDivElement("do", "centered")
                const init = this.createDivElement("", "environment__branch")
                const condition = this.createDivElement("", "environment__branch")
                const step = this.createDivElement("", "environment__branch")
                const body = this.createDivElement("", "environment__branch")
                element.append(varDiv);
                element.appendChild(init);
                element.append(condDiv);
                element.appendChild(condition);
                element.append(stepDiv);
                element.appendChild(step);
                element.append(doDiv); 
                element.appendChild(body);
                uiNode.setBranches([init, condition, step, body]);
                break;
            }
            case "array": {
                element.classList.add("vertical-branch-alignment");
                element.appendChild(text);
                const body = this.createDivElement("", "environment__branch")
                element.appendChild(body);
                uiNode.setBranches([body]);
                break;
            }
            case "block": {
                element.classList.add("vertical-branch-alignment");
                element.appendChild(text);
                const body = this.createDivElement("", "environment__branch")
                element.appendChild(body);
                uiNode.setBranches([body]);
                break;
            }
            case "return": {
                element.classList.add("horizontal-branch-alignment");
                element.appendChild(text);
                const body = this.createDivElement("", "environment__branch")
                element.appendChild(body);
                uiNode.setBranches([body]);
                break;
            }
            case "function": {
                element.classList.add("vertical-branch-alignment");
                uiNode.node.children[0] = new ASTNode("block", null, []);
                element.appendChild(text);
                const argsDiv = this.createDivElement("args", "centered");
                const returnsDiv = this.createDivElement("returns", "centered");
                const bodyDiv = this.createDivElement("body", "centered");
                const argsBranch = this.createDivElement("", "environment__branch");
                const returnsBranch = this.createDivElement("", "environment__branch");
                const bodyBranch = this.createDivElement("", "environment__branch");
                element.appendChild(argsDiv);
                element.appendChild(argsBranch);
                element.appendChild(returnsDiv);
                element.appendChild(returnsBranch);
                element.appendChild(bodyDiv);
                element.appendChild(bodyBranch);
                uiNode.setBranches([argsBranch, returnsBranch, bodyBranch]);
                break;
            }
        }
        this.activeBlocks.set(uiNode.node.id, uiNode);
        return uiNode;
    }

    canAttach(uiNode, parent, branchElement) {
        return parent.canAppendChild(uiNode, branchElement);
    }
    
    attach(uiNode, parent, branchElement) {
        parent.appendChild(uiNode, branchElement);
        uiNode.attachTo(parent);
        return uiNode;
    }

    attachView(uiNode, parent, branchElement) {
        branchElement.appendChild(uiNode.element);
        uiNode.attachTo(parent);
        return uiNode;
    }

    adoptNode(uiNode, astNode) {
        const previousId = uiNode.node.id;
        uiNode.node = astNode;
        uiNode.element.id = astNode.id;
        if (previousId !== astNode.id) {
            this.activeBlocks.delete(previousId);
            this.activeBlocks.set(astNode.id, uiNode);
        }
        return uiNode;
    }

    detach(uiNode) {
        uiNode.detach();
        return uiNode;
    }

    getNode(id) {
        return this.activeBlocks.get(id)
    }

    getClosestUINode(astNode) {
        if (!astNode) return null;

        const direct = this.activeBlocks.get(astNode.id);
        if (direct) return direct;

        const roots = [...this.activeBlocks.values()].filter(ui => !ui.parent);
        const visited = new Set();
        let result = null;

        const walk = (node, closestUI) => {
            if (!node || visited.has(node.id) || result) return;
            visited.add(node.id);

            const mappedUI = this.activeBlocks.get(node.id) || closestUI;
            if (node.id === astNode.id) {
                result = mappedUI;
                return;
            }

            for (const child of node.children || []) {
                walk(child, mappedUI);
                if (result) return;
            }
        };

        for (const root of roots) {
            walk(root.node, root);
            if (result) break;
        }

        return result;
    }
    
    removeNode(uiNode)
    {
        const collectNodeIds = (astNode, ids) => {
            if (!astNode) return;
            ids.push(astNode.id);
            for (const child of astNode.children || []) {
                collectNodeIds(child, ids);
            }
        };

        const idsToDelete = [];
        collectNodeIds(uiNode.node, idsToDelete);
        for (const id of idsToDelete) {
            this.activeBlocks.delete(id);
        }

        uiNode.remove();
    }

    createDivElement(label, className)
    {
        const div = document.createElement("div");
        div.innerHTML = label;
        div.className = className;
        return div;
    }

    getNodeClassName(type, signatureType) {
        const classes = [`environment__${type}-block`, "block"];
        if (signatureType && (type === "param" || type === "type")) {
            classes.splice(1, 0, `environment__${type}-${signatureType}-block`);
        }
        return classes.join(" ");
    }

    renderHorizontalBranchTemplate(element, parts) {
        const branches = [];

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part !== "") {
                element.appendChild(this.createDivElement(part, "environment__operation"));
            }

            if (i < parts.length - 1) {
                const branch = this.createDivElement("", "environment__branch");
                branches.push(branch);
                element.appendChild(branch);
            }
        }

        return branches;
    }
}

export {UINodeManager}
