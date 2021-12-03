import * as vscode from 'vscode';
import { Commands } from './commands';


export function activate(context: vscode.ExtensionContext) {
	let replaceCommand = vscode.commands.registerTextEditorCommand('palette.replace', Commands.replaceCommand);

	context.subscriptions.push(replaceCommand);


	let convertCommand = vscode.commands.registerTextEditorCommand('palette.convert', Commands.convertCommand);

	context.subscriptions.push(convertCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
