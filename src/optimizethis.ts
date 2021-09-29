import * as vscode from 'vscode';

import { codeThisRequest } from './request';

export const optimizeThisDisposable = (config: any) => {

    return vscode.commands.registerCommand('code-this.optimizeThisCode', async () => {

        const action = "optimizethis";
        const tool = "optimizethis";

        let suggestion = await codeThisRequest(config, action, tool);

            // First, it checks if the user has selected a suggestion. If they have, it will use the suggestion to generate the test.

        if (suggestion) {
            const uri = vscode.Uri.parse('untitled: Optimized Code Suggestion');
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