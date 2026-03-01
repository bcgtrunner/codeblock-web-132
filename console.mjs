import { clearEditorBlocks, getRootBlocks, runDebugMode, runEditorBlocks } from "./script.mjs";
// help run clear debug
class Console
{
    constructor() {
        this.output = document.querySelector(".console_output");
        this.input = document.querySelector(".console_input");
        this.input.addEventListener("keydown", this.inputKeyPress);
    }

    print(text) {
        this.output.innerHTML += `<div> ${text}</div>`;
    }

    inputKeyPress = (e) => {
        if (e.key == "Enter") {
            this.execute();
        }
    }
    
    execute() {
        const command = this.input.value.trim();
        this.input.value = "";
        this.output.innerHTML += `<div>> ${command}</div>`;
        if (command === '') return;
        else if (command === 'help') {
            this.output.innerHTML += `<div> Available commands: <br>run<br>clear<br>debug<br>help</div>`;
        }
        else if (command === 'run') {
            runEditorBlocks();
            this.output.innerHTML += `<div> Command: '${command}' executed</div>`;
        }
        else if (command === 'clear') {
            clearEditorBlocks();
            this.output.innerHTML += `<div> Command: '${command}' executed<div>`;
        }
        else if (command === 'debug') {
            this.input.removeEventListener("keydown", this.inputKeyPress);
            const roots = getRootBlocks();
            for (const root of roots) {
                runDebugMode(
                    root.node, 
                    new Promise(resolve => {
                    this.input.addEventListener("keydown",
                        (e) => {
                            if(e.key === "Enter")
                            {
                                resolve();
                            }
                        })
                    }), 
                    () => this.input.addEventListener("keydown", this.inputKeyPress)
                )
                
            }
            this.print("Debug mode started...");
        }
        else {
            this.output.innerHTML += `<div> Command: '${command}' is unrecognised. See 'help'.</div>`;
        }
    }
}
export { Console }