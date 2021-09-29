import * as vscode from 'vscode';

import axios from "axios";
import * as Axios from 'axios';

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