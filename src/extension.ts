import * as vscode from 'vscode';
import axios from "axios";
import * as Axios from 'axios';


const singleLineCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('code-this.explainThisSingleLine', async () => {

		const action = "singlelinecomment";
		const tool = "explainthis";

		try {
			if (config.apikey === "unset" || config.apikey === "") {
				vscode.window.showErrorMessage("No API Key Configured, Please Edit CodeThis! Settings and Add an API Key");
				return false;
			}

			// Get the active text editor
			const editor = vscode.window.activeTextEditor;


			if (editor) {
				try {

					const document = editor.document;
					const selection = editor.selection;

					const word = document.getText(selection);


					const post = JSON.stringify(
						{
							id: vscode.env.machineId,
							authtoken: "APITOKENGOESHERE",
							code: word,
							action: action,
							requestedtool: tool,
							language: vscode.window.activeTextEditor?.document.languageId,
						}
					);
					
					const res = await axios.post('https://codethis.maptions.com/api/v1/codethis', post, {

						headers: {
							// Overwrite Axios's automatically set Content-Type
							'Content-Type': 'application/json'
						}
					}
					);


					let autosuggestion = res.data;

					editor.edit(editBuilder => {
						editBuilder.insert(selection.start, autosuggestion);
					});

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

	return vscode.commands.registerCommand('code-this.explainThisSingleSentence', async () => {

		const action = "singlesentencecomment";
		const tool = "explainthis";

		try {
			if (config.apikey === "unset" || config.apikey === "") {
				vscode.window.showErrorMessage("No API Key Configured, Please Edit CodeThis! Settings and Add an API Key");
				return false;
			}

			// Get the active text editor
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				try {

					const document = editor.document;
					const selection = editor.selection;

					const word = document.getText(selection);


					const post = JSON.stringify(
						{
							id: vscode.env.machineId,
							authtoken: "APITOKENGOESHERE",
							code: word,
							action: action,
							requestedtool: tool,
							language: vscode.window.activeTextEditor?.document.languageId,
						}
					);

					const res = await axios.post('https://codethis.maptions.com/api/v1/codethis', post, {

						headers: {
							// Overwrite Axios's automatically set Content-Type
							'Content-Type': 'application/json'
						}
					}
					);


					let autosuggestion = res.data;

					editor.edit(editBuilder => {
						editBuilder.insert(selection.start, autosuggestion);
					});

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

	return vscode.commands.registerCommand('code-this.explainThisMultiLine', async () => {

		const action = "multilinecomment";
		const tool = "explainthis";

		try {
			if (config.apikey === "unset" || config.apikey === "") {
				vscode.window.showErrorMessage("No API Key Configured, Please Edit CodeThis! Settings and Add an API Key");
				return false;
			}

			// Get the active text editor
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				try {

					const document = editor.document;
					const selection = editor.selection;

					const word = document.getText(selection);


					const post = JSON.stringify(
						{
							id: vscode.env.machineId,
							authtoken: "APITOKENGOESHERE",
							code: word,
							action: action,
							requestedtool: tool,
							language: vscode.window.activeTextEditor?.document.languageId,
						}
					);

					const res = await axios.post('https://codethis.maptions.com/api/v1/codethis', post, {

						headers: {
							// Overwrite Axios's automatically set Content-Type
							'Content-Type': 'application/json'
						}
					}
					);


					let autosuggestion = res.data;

					editor.edit(editBuilder => {
						editBuilder.insert(selection.start, autosuggestion);
					});

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