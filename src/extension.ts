import * as vscode from 'vscode';
import { singleLineCommandDisposable, singleSentenceCommandDisposable, multiLineCommandDisposable } from './explainthis';
import { testThisDisposable } from './testthis';
import { writeThisDisposable } from './writethis';
import { translateThisDisposable } from './translatethis';
import { fixThisDisposable } from './fixthis';
import { updateStatusBarItem } from './statusbar';
import { optimizeThisDisposable } from './optimizethis';

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
		fixThisDisposable(config),
		optimizeThisDisposable(config)
	);
	
	// create a new status bar item that we can now manage
	codeThisStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(codeThisStatusBar);
	updateStatusBarItem(vscode.workspace.getConfiguration('codethis'),codeThisStatusBar);
}