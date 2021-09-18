import * as vscode from 'vscode';
import * as OpenAI from "openai-api";


const singleLineCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('explain-this.explainThisSingleLine', async () => {

		try {
			if (config.apikey === "unset" || config.apikey === "") {
				vscode.window.showErrorMessage("No API Key Configured, please edit settings.json File and add an API Key");
				return false;
			}
			const client = new OpenAI(config.apikey);
			// Get the active text editor
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				try {

					const document = editor.document;
					const selection = editor.selection;

					const word = document.getText(selection);

					(async () => {
						const gptResponse = await client.complete({
							engine: 'davinci-codex',
							prompt: word + '\n\n# Explanation of what the code above does\n\n#',
							maxTokens: 2048,
							temperature: 0,
							topP: 1,
							presencePenalty: 0,
							frequencyPenalty: 0,
							stop: ["#", "\n"]
						});
						editor.edit(editBuilder => {
							editBuilder.insert(selection.start, "#" + gptResponse.data.choices[0].text.replace("code above", "code below") + "\n");
						});
					})();
				}
				catch (err) {
					console.log(err);
				}
			}
		}
		catch {
			vscode.window.showErrorMessage("There was an issue connecting to the API, please validate your API Key");
			return false;
		}

	});
};

const singleSentenceCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('explain-this.explainThisSingleSentence', async () => {

		function formatText(inputText: string) {

			let outputText = "#" + inputText;
			outputText = outputText.replace(new RegExp("code above", "g"), "code below") + "\n";
			if (outputText.replace(".", "").length > 1) {
				outputText = (outputText.split(".", 2)).toString();
				outputText.replace(".", ",");
			}
			
			return outputText + "\n";

		}

		try {
			if (config.apikey === "unset" || config.apikey === "") {
				vscode.window.showErrorMessage("No API Key Configured, please edit settings.json File and add an API Key");
				return false;
			}
			const client = new OpenAI(config.apikey);
			// Get the active text editor
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				try {

					const document = editor.document;
					const selection = editor.selection;

					const word = document.getText(selection);

					(async () => {
						const gptResponse = await client.complete({
							engine: 'davinci-codex',
							prompt: word + '\n\n# Explanation of what the code above does\n\n#',
							maxTokens: 2048,
							temperature: 0,
							topP: 1,
							presencePenalty: 0,
							frequencyPenalty: 0,
							stop: ["#", "\n",]
						});
						editor.edit(editBuilder => {
							editBuilder.insert(selection.start, formatText(gptResponse.data.choices[0].text));
								
						});
					})();
				}
				catch (err) {
					console.log(err);
				}
			}
		}
		catch {
			vscode.window.showErrorMessage("There was an issue connecting to the API, please validate your API Key");
			return false;
		}

	});
};

const multiLineCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('explain-this.explainThisMultiLine', async () => {

		function formatText(inputText: string) {
			let outputText = '"""\n1.' + inputText
			outputText = outputText.replace(new RegExp("code above", "g"), "code below") + "\n";		
			return outputText + '"""\n';

		}

		try {
			if (config.apikey === "unset" || config.apikey === "") {
				vscode.window.showErrorMessage("No API Key Configured, please edit settings.json File and add an API Key");
				return false;
			}
			const client = new OpenAI(config.apikey);
			// Get the active text editor
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				try {

					const document = editor.document;
					const selection = editor.selection;

					const word = document.getText(selection);

					(async () => {
						const gptResponse = await client.complete({
							engine: 'davinci-codex',
							prompt: word + '\n\n"""\nHere\'s what the above code is doing:\n1.',
							maxTokens: 2048,
							temperature: 0,
							topP: 1,
							presencePenalty: 0,
							frequencyPenalty: 0,
							stop: ['"""',]
						});
						editor.edit(editBuilder => {
							editBuilder.insert(selection.start, formatText(gptResponse.data.choices[0].text));
								
						});
					})();
				}
				catch (err) {
					console.log(err);
				}
			}
		}
		catch {
			vscode.window.showErrorMessage("There was an issue connecting to the API, please validate your API Key");
			return false;
		}

	});
};


export function activate(context: vscode.ExtensionContext) {
	let disposable: vscode.Disposable | null = null;
	disposable = singleLineCommandDisposable(vscode.workspace.getConfiguration('explainthis'));
	context.subscriptions.push(disposable);
	disposable = singleSentenceCommandDisposable(vscode.workspace.getConfiguration('explainthis'));
	context.subscriptions.push(disposable);
	disposable = multiLineCommandDisposable(vscode.workspace.getConfiguration('explainthis'));
	context.subscriptions.push(disposable);
}