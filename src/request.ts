import * as vscode from 'vscode';

import axios from "axios";
import * as Axios from 'axios';

import { loadingMessages } from './loadingmessages';

function getLoadingMessage(fun: boolean) {
    if (fun) {
        const messageslength = loadingMessages.length;
        return loadingMessages[Math.floor(Math.random() * messageslength)];
    } else {
        return "loading...";
    }
}


export async function codeThisRequest(config: any, action: string, tool: string, newlanguage: string = "") {

    var url = "https://codethis.maptions.com/api/v1/codethis";

    if (config.developmentmode === true) {
        // url = "https://development.codethis.maptions.com/api/v1/codethis";
        url = "https://development.codethis.maptions.com/api/v1/codethis";
    }

    try {
        if (config.apikey === "unset" || config.apikey === "") {
            vscode.window.showErrorMessage("No API Key Configured, Ctrl+Shift+P -> Settings (UI) -> Extensions -> CodeThis!");
            return false;
        }

        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            try {

                const document = editor.document;
                const selection = editor.selection;
                const word = document.getText(selection);

                let postData = {
                    id: vscode.env.machineId,
                    authtoken: "APITOKENGOESHERE",
                    code: word,
                    action: action,
                    requestedtool: tool,
                    language: vscode.window.activeTextEditor?.document.languageId,
                };

                if (tool === "translatethis") {
                    postData["newlanguage"] = newlanguage;
                }

                const post = JSON.stringify(postData);

                var res = await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Window,
                    cancellable: false,
                    title: getLoadingMessage(config.isfun)
                }, async (progress) => {

                    progress.report({ increment: 0 });

                    var res = await axios.post(url, post, {

                        headers: {
                            // Overwrite Axios's automatically set Content-Type
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'Content-Type': 'application/json'
                        }
                    }
                    );

                    progress.report({ increment: 100 });

                    return res;
                });

                if (res.status === 200) {

                    let autosuggestion = res.data;

                    if (action.includes('commenttocode')) {
                        return autosuggestion;
                    } else if (action.includes('comment')) {
                        editor.edit(editBuilder => {
                            editBuilder.insert(selection.start, autosuggestion);
                        });
                    } else if (action.includes('test')) {
                        return autosuggestion;
                    } else if (action.includes('translate')) {
                        return autosuggestion;
                    } else {
                        return null;
                    }
                }

                else {
                    vscode.window.showErrorMessage(res.data);
                }
            }
            catch (err: any) {
                if (err.hasOwnProperty('response')) {
                    vscode.window.showErrorMessage("There was an error: " + err.response.data.error);
                } else {
                    vscode.window.showErrorMessage("There was an error: " + err.message);
                }
            }
        }
    }
    catch {
        vscode.window.showErrorMessage("There was an issue connecting to the API, please validate your network connection and your API Key");
        return false;
    }
}