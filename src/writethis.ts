import * as vscode from 'vscode';

import { codeThisRequest } from './request';

export const writeThisDisposable = (config: any) => {

    return vscode.commands.registerCommand('code-this.writeThisCommentToCode', async () => {

        const action = "commenttocode";
        const tool = "writethis";

        let suggestion = await codeThisRequest(config, action, tool);

            // First, it checks if the user has selected a suggestion. If they have, it will use the suggestion to generate the test.

        if (suggestion) {
            const uri = vscode.Uri.parse('untitled: Suggested Code');
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