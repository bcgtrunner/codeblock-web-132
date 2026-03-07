import { ASTNode } from "./interpreter.mjs"
import { UINodeManager } from "./UINodeManager.mjs"
import { UINode } from "./UINode.mjs";

class Converter
{
    constructor(editorElement, manager)
    {
        this.editor = editorElement;
        this.manager = manager;
    }

    toUINodes(node) {
        const uiNode = this.spawnNode(node);
        for (let i = 0; i < node.children.length; i++) {
            const childNode = node.children[i];
            const newChild = this.toUINodes(childNode);
            this.manager.attach(newChild, uiNode, uiNode.branches[i])
        }
        console.log(uiNode)
        return uiNode;
    }

    spawnNode(node)
    {
        let uiNode = null;
        const manager = this.manager;
        switch (node.token) {
            case "number": {
                uiNode = manager.spawnNode("number", "number");
                const input = uiNode.element.querySelector("input");
                input.value = node.value;
                break;
            }

            case "string": {
                uiNode = manager.spawnNode("string", "string");
                const input = uiNode.element.querySelector("input");
                input.value = node.value;
                break;
            }

            case "bool": {
                uiNode = manager.spawnNode("bool", "bool")
                const input = uiNode.element.querySelector("input");
                input.checked = node.value;
                break;
            }
            
            case "function": {
                break;
            }
                

            case "variable": {
                break;
            }

            case "assign": {
                break;
            }

            case "array": {
                break;
            }

            case "call": {
                
                break;
            }

            case "if": {
                break;
            }

            case "for": {
                break;
            }

            case "while": {
            }

            case "block": {
            }

            case "return":
                uiNode = manager.spawnNode("return", "return");
                break;
            
            case "param":
            
            case "type":

            default:
                throw new EvalError(`Unknown AST node token: ${node.token}`);
        }
        const previousId = uiNode.node.id;
        uiNode.node = node;
        uiNode.element.id = node.id;
        if (previousId !== node.id) {
            manager.activeBlocks.delete(previousId);
            manager.activeBlocks.set(node.id, uiNode);
        }
        this.editor.append(uiNode.element);
        uiNode.element.style.position = "absolute";
        uiNode.element.style.top  = this.editor.clientHeight / 2 - uiNode.element.clientHeight / 2 + 'px';
        uiNode.element.style.left = this.editor.clientWidth / 2 - uiNode.element.clientWidth / 2 + 'px';
        return uiNode;
    }
}
export {Converter}
