import * as vscode from 'vscode';
import axios from "axios";
import * as Axios from 'axios';

let myStatusBarItem: vscode.StatusBarItem;

async function updateStatusBarItem(config: any) {
	if (config.developmentmode) {
		let res = await axios.get('https://development.codethis.maptions.com/isalive');
		let version = res.data;
		myStatusBarItem.text = `CodeThis!: ${version}`;
		myStatusBarItem.show();
	}
	else {
		myStatusBarItem.hide();
	}
}

const singleLineCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('code-this.explainThisSingleLine', async () => {

		const action = "singlelinecomment";
		const tool = "explainthis";

		var url = "https://codethis.maptions.com/api/v1/codethis";

		if (config.developmentmode === true) {
			url = "https://development.codethis.maptions.com/api/v1/codethis";
		}


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

					const res = await axios.post(url, post, {

						headers: {
							// Overwrite Axios's automatically set Content-Type
							// eslint-disable-next-line @typescript-eslint/naming-convention
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

		var url = "https://codethis.maptions.com/api/v1/codethis";

		if (config.developmentmode === true) {
			url = "https://development.codethis.maptions.com/api/v1/codethis";
		}

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

					const res = await axios.post(url, post, {

						headers: {
							// Overwrite Axios's automatically set Content-Type
							// eslint-disable-next-line @typescript-eslint/naming-convention
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

		var url = "https://codethis.maptions.com/api/v1/codethis";

		if (config.developmentmode === true) {
			url = "https://development.codethis.maptions.com/api/v1/codethis";
		}

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

					const res = await axios.post(url, post, {

						headers: {
							// Overwrite Axios's automatically set Content-Type
							// eslint-disable-next-line @typescript-eslint/naming-convention
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
	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(myStatusBarItem);
	updateStatusBarItem(vscode.workspace.getConfiguration('explainthis'));
}