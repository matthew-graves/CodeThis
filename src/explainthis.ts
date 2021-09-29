import * as vscode from 'vscode';

import axios from "axios";
import * as Axios from 'axios';

import { codeThisRequest } from './request';

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