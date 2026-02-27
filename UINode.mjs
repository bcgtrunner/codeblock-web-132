import { ASTNode } from "./interpreter.mjs"

class UINode {
    constructor(type, element, value = null, branches = null) {
        this.element = element;
        this.node = new ASTNode(type, value);
        this.parent = null;
        this.branches = branches;
    }

    setBranches(branches)
    {
        this.branches = branches;
    }

    setOperation(variable)
    {
        this.node.children[0] = variable;
        return this;
    }

    canAppendChild(childUINode, branch) {
        const index = this.branches.indexOf(branch);

        // Signature-only nodes are only valid in function signature branches.
        if (childUINode.node.token === "param" || childUINode.node.token === "type") {
            if (this.node.token !== "function") return false;
        }

        switch (this.node.token) {
            case "assign": {
                return (index === 0 && !(this.node.children[0]) && childUINode.node.token === "variable") ||
                (!(this.node.children[1]) && index === 1);
            }
            case "call": {
                if (this.node.value === "generic-call") {
                    if (index === 0) return !this.node.children[0];
                    if (index === 1) return true;
                    return false;
                }
                return (index === 0 && !(this.node.children[1])) || (!(this.node.children[2]) && index === 1);
            }
            case "return": {
                return !(this.node.children[0]);
            }
            case "function": {
                if (index === 0) return childUINode.node.token === "param";
                if (index === 1) return !this.node.children[1] && childUINode.node.token === "type";
                if (index === 2) return !this.node.children[2] && childUINode.node.token !== "param" && childUINode.node.token !== "type";
                return false;
            }
        }
        return true;
    }

    appendChild(childUINode, branch) {
        const index = this.branches.indexOf(branch);
        switch (this.node.token) {
            case "block":
            case "array":
                this.node.children.push(childUINode.node);
                break;
            case "call":
                if (this.node.value === "generic-call") {
                    if (index === 0) this.node.children[0] = childUINode.node;
                    else if (index === 1) this.node.children.push(childUINode.node);
                } else {
                    this.node.children[index + 1] = childUINode.node;
                }
                break;
            case "function":
                if (index === 0) this.node.children[0].children.push(childUINode.node);
                else this.node.children[index] = childUINode.node;
                break;
            default:
                this.node.children[index] = childUINode.node;
                break;
        }
        console.log(`Node added to branch with index: ${index}`);
        branch.appendChild(childUINode.element);
    }

    removeChild(childUINode) {
        if (this.node.token === "function") {
            const paramsBlock = this.node.children[0];
            const paramIndex = paramsBlock?.children?.indexOf(childUINode.node) ?? -1;
            if (paramIndex !== -1) {
                paramsBlock.children.splice(paramIndex, 1);
                return;
            }

            const directIndex = this.node.children.indexOf(childUINode.node);
            if (directIndex === 1 || directIndex === 2) {
                this.node.children[directIndex] = undefined;
            }
            return;
        }

        if (this.node.token === "call" && this.node.value === "generic-call") {
            const index = this.node.children.indexOf(childUINode.node);
            if (index === -1) return;
            if (index === 0) {
                this.node.children[0] = undefined;
                return;
            }
            this.node.children.splice(index, 1);
            return;
        }

        const index = this.node.children.indexOf(childUINode.node);
        if (index === -1) return;
        this.node.children[index] = undefined;
        if (this.node.token == "block" || this.node.token === "array") {
            this.node.children.splice(index, 1);
        }
    }

    attachTo(parent) {
        this.element.style.position = "static";
        this.parent = parent;
    }

    detach() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    remove() {
        this.element.remove();
            this.parent = null;
    }
}

export {UINode}
