import * as vscode from 'vscode';
import { singleLineCommandDisposable, singleSentenceCommandDisposable, multiLineCommandDisposable, updateStatusBarItem } from './explainthis';
import { testThisDisposable } from './testthis';
import { writeThisDisposable } from './writethis';
import { translateThisDisposable } from './translatethis';

let codeThisStatusBar: vscode.StatusBarItem;

// Register all existing commands

export function activate(context: vscode.ExtensionContext) {

	const config = vscode.workspace.getConfiguration('codethis');

	context.subscriptions.push(
		singleLineCommandDisposable(config),
		singleSentenceCommandDisposable(config),
		multiLineCommandDisposable(config),
		testThisDisposable(config),
		writeThisDisposable(config),
		translateThisDisposable(config),
		singleLineCommandDisposable(config),
	);
	
	// create a new status bar item that we can now manage
	codeThisStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(codeThisStatusBar);
	updateStatusBarItem(vscode.workspace.getConfiguration('codethis'),codeThisStatusBar);
}