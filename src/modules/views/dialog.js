export default function createDialog(id, textContent) {
  const dialog = document.createElement("dialog");
  dialog.id = id;

  const header = document.createElement("h1");
  header.textContent = textContent;

  const closeDialog = document.createElement("button");
  closeDialog.textContent = "✕";
  closeDialog.addEventListener("click", () => dialog.close());

  const dialogHead = document.createElement("div");
  dialogHead.append(header);
  dialogHead.append(closeDialog);

  dialog.append(dialogHead);
  return dialog;
}
