import * as vscode from 'vscode';

import axios from "axios";
import * as Axios from 'axios';

import { codeThisRequest } from './request';


export async function updateStatusBarItem(config: any, myStatusBarItem: vscode.StatusBarItem) {
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

export const singleLineCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('code-this.explainThisSingleLine', async () => {

		const action = "singlelinecomment";
		const tool = "explainthis";

		codeThisRequest(config, action, tool);

	});
};

export const singleSentenceCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('code-this.explainThisSingleSentence', async () => {

		const action = "singlesentencecomment";
		const tool = "explainthis";

		codeThisRequest(config, action, tool);

	});
};

export const multiLineCommandDisposable = (config: any) => {

	return vscode.commands.registerCommand('code-this.explainThisMultiLine', async () => {

		const action = "multilinecomment";
		const tool = "explainthis";

		codeThisRequest(config, action, tool);

	});
};