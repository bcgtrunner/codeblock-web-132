import { clearEditorBlocks, getRootBlocks, runDebugMode, runEditorBlocks } from "./script.mjs";

class Console {
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
        if (command !== 'cls') {
            this.output.innerHTML += `<div class="console_input-wrapper"><span class="console_prefix">></span> ${command}</div>`;
        }
        
        if (command === '') return;

        if (command === 'help') {
            this.print("Available commands: run, clear, cls, debug, help. Use [command] -help for details.");
        }
        else if (command === 'cls -help') {
            this.print("Usage: cls - clears the console screen.");
        }
        else if (command === 'cls') {
            this.clear();
        }
        else if (command === 'run -help') {
            this.print("Usage: run - executes all blocks currently in the editor.");
        }
        else if (command === 'run') {
            runEditorBlocks();
            this.print(`Command: '${command}' executed`);
        }
        else if (command === 'clear -help') {
            this.print("Usage: clear - removes all blocks from the editor.");
        }
        else if (command === 'clear') {
            clearEditorBlocks();
            this.print(`Command: '${command}' executed`);
        }
        else if (command === 'debug -help') {
            this.print("Usage: debug - starts step-by-step execution. Press Enter to move to the next step.");
        }
        else if (command === 'debug') {
            this.input.removeEventListener("keydown", this.inputKeyPress);
            const roots = getRootBlocks();
            for (const root of roots) {
                runDebugMode(
                    root.node, 
                    new Promise(resolve => {
                        const stepHandler = (e) => {
                            if(e.key === "Enter") {
                                this.input.removeEventListener("keydown", stepHandler);
                                resolve();
                            }
                        };
                        this.input.addEventListener("keydown", stepHandler);
                    }), 
                    () => this.input.addEventListener("keydown", this.inputKeyPress)
                );
            }
            this.print("Debug mode started...");
        }
        else {
            this.print(`Command: '${command}' is unrecognised. See 'help'.`);
        }
    }

    clear() {
        this.output.innerHTML = "";
    }
}
export { Console };
