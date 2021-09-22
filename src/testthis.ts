import * as vscode from 'vscode';

import { codeThisRequest } from './request';

export const testThisDisposable = (config: any) => {

    return vscode.commands.registerCommand('code-this.testThisUnitTest', async () => {

        const action = "unittest";
        const tool = "testthis";

        let suggestion = await codeThisRequest(config, action, tool);

        if (suggestion) {
            const uri = vscode.Uri.parse('untitled: Auto Generated Tests');
            vscode.workspace.openTextDocument(uri).then((a: vscode.TextDocument) => {
                vscode.window.showTextDocument(a, vscode.ViewColumn.Beside, false).then(e => {
                    e.edit(edit => {
                        edit.insert(new vscode.Position(0, 0), suggestion);
                    });
                });
            }, (error: any) => {
                console.error(error);
                debugger;
            });
        }


    });
};