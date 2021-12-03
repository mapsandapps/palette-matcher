import * as vscode from 'vscode';
import { Utils } from './utils';


export class Commands {
  static convertCommand(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    let selectedText = textEditor.document.getText(textEditor.selection);

    let colorFormats = Utils.convertColor(selectedText);

    if (!colorFormats || colorFormats.length === 0) {
      vscode.window.showQuickPick(['No match']);
    } else {
      vscode.window.showQuickPick(colorFormats)
      .then(item => {
        if (typeof item === 'undefined') {
          // selection canceled
          return;
        }

        textEditor.edit(edit => {
          edit.replace(textEditor.selection, item.label);
        });
      });
    }
  }

  static replaceCommand(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    let userPalette = vscode.workspace.getConfiguration('paletteMatcher').palette;

    let selectedText = textEditor.document.getText(textEditor.selection);

    let closestColor = Utils.matchColor(selectedText, userPalette);

    if (!closestColor) {
      vscode.window.showQuickPick(['No match']);
    } else {
      // TODO: also display closestColor.distance
      vscode.window.showQuickPick([closestColor.color])
        .then(item => {
          if (typeof item === 'undefined') {
            // selection canceled
            return;
          }

          textEditor.edit(edit => {
            edit.replace(textEditor.selection, item);
          });
        });
    }
  }
}
