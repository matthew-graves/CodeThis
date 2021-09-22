import * as vscode from 'vscode';

import axios from "axios";
import * as Axios from 'axios';
import { stringify } from 'querystring';

export async function codeThisRequest(config: any, action: string, tool: string) {

    var url = "https://codethis.maptions.com/api/v1/codethis";

    if (config.developmentmode === true) {
        url = "https://development.codethis.maptions.com/api/v1/codethis";
    }


    try {
        if (config.apikey === "unset" || config.apikey === "") {
            vscode.window.showErrorMessage("No API Key Configured, Please Edit CodeThis! Settings and Add an API Key");
            return false;
        }

        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            try {

                const document = editor.document;
                const selection = editor.selection;
                const word = document.getText(selection);

                const post = JSON.stringify(
                    {
                        id: vscode.env.machineId,
                        authtoken: "APITOKENGOESHERE",
                        code: word,
                        action: action,
                        requestedtool: tool,
                        language: vscode.window.activeTextEditor?.document.languageId,
                    }
                );

                const res = await axios.post(url, post, {

                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'Content-Type': 'application/json'
                    }
                }
                );


                let autosuggestion = res.data;

                if (action.includes('comment')) {
                    editor.edit(editBuilder => {
                        editBuilder.insert(selection.start, autosuggestion);
                    });
                } else if (action.includes('test')) {
                    return autosuggestion;
                }

            }
            catch (err) {
                console.log(err);
            }
        }
    }
    catch {
        vscode.window.showErrorMessage("There was an issue connecting to the API, please validate your API Key");
        return false;
    }
}