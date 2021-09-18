import * as vscode from 'vscode';
import * as OpenAI from "openai-api";


const getExtensionCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('explain-this.explainThis', async () => {

		// Get the active text editor
		const editor = vscode.window.activeTextEditor;


		if (config.apikey === "unset") {
			vscode.window.showErrorMessage("No API Key Configured, please edit settings.json File and add an API Key");
		}

		else {

			if (editor) {
				try {
					const ai = new OpenAI(config.apikey);

					const document = editor.document;
					const selection = editor.selection;

					const word = document.getText(selection);


					(async () => {
						const gptResponse = await ai.complete({
							engine: 'davinci-codex',
							prompt: word + '\n\n# Explanation of what the code above does\n\n#',
							maxTokens: 2048,
							temperature: 0,
							topP: 1,
							presencePenalty: 0,
							frequencyPenalty: 0,
							stop: ["#","\n"]
						});
						editor.edit(editBuilder => {
							editBuilder.insert(selection.start, "#" + gptResponse.data.choices[0].text.replace("code above","code below") + "\n");
						});
					})();
				}
				catch (err) {
					console.log(err);
				}


			}



		}
	});
};

export function activate(context: vscode.ExtensionContext) {
	let disposable: vscode.Disposable | null = null;
	disposable = getExtensionCommandDisposable(vscode.workspace.getConfiguration('explainthis'));
	context.subscriptions.push(disposable);
}