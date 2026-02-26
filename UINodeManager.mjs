import { UINode } from "./UINode.mjs";

class UINodeManager {
    constructor() {
        this.activeBlocks = new Map(); 
    }
    
    spawnNode(type, label, branchCount = 0) {
        const value = null;
        const element = document.createElement("div");
        const uiNode = new UINode(type, element);
        element.className = `environment__${type}-block block`
        element.id = uiNode.node.id;
        element.style.position = 'absolute'; 
        const text = document.createElement("div");
        text.innerHTML = label;
        text.classList.add('environment__operation');
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
            case "assign": 
            case "call": {
                if (label === "len") {
                    const right = this.createDivElement("", "environment__branch")
                    element.appendChild(text);
                    element.appendChild(right);
                    uiNode.setBranches([right]);
                    break;
                }
                const right = this.createDivElement("", "environment__branch")
                const left = this.createDivElement("", "environment__branch")
                element.appendChild(left);
                element.appendChild(text);
                element.appendChild(right);
                uiNode.setBranches([left, right]);
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
        }
        this.activeBlocks.set(uiNode.node.id, uiNode);
        console.log(this.activeBlocks)
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

    detach(uiNode) {
        uiNode.detach();
        return uiNode;
    }

    getNode(id) {
        return this.activeBlocks.get(id)
    }
    
    removeNode(uiNode)
    {
        this.activeBlocks.delete(uiNode.node.id)
        uiNode.remove();
    }

    createDivElement(label, className)
    {
        const div = document.createElement("div");
        div.innerHTML = label;
        div.className = className;
        return div;
    }
}

export {UINodeManager}
