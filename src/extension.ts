import * as vscode from 'vscode';
import { singleLineCommandDisposable, singleSentenceCommandDisposable, multiLineCommandDisposable, updateStatusBarItem } from './explainthis';
import { testThisDisposable } from './testthis';
import { writeThisDisposable } from './writethis';


let myStatusBarItem: vscode.StatusBarItem;

// Register all existing commands

export function activate(context: vscode.ExtensionContext) {
	let disposable: vscode.Disposable | null = null;
	disposable = singleLineCommandDisposable(vscode.workspace.getConfiguration('codethis'));
	context.subscriptions.push(disposable);
	disposable = singleSentenceCommandDisposable(vscode.workspace.getConfiguration('codethis'));
	context.subscriptions.push(disposable);
	disposable = multiLineCommandDisposable(vscode.workspace.getConfiguration('codethis'));
	context.subscriptions.push(disposable);
	disposable = testThisDisposable(vscode.workspace.getConfiguration('codethis'));
	context.subscriptions.push(disposable);
	disposable = writeThisDisposable(vscode.workspace.getConfiguration('codethis'));
	context.subscriptions.push(disposable);
	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(myStatusBarItem);
	updateStatusBarItem(vscode.workspace.getConfiguration('codethis'),myStatusBarItem);
}