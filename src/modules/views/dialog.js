export default function createDialog() {
  const dialog = document.createElement("dialog");
  const header = document.createElement("h1");

  const closeDialog = document.createElement("button");
  closeDialog.textContent = "✕";
  closeDialog.addEventListener("click", () => dialog.close());

  const dialogHead = document.createElement("div");
  dialogHead.append(header);
  dialogHead.append(closeDialog);

  dialog.append(dialogHead);
  return dialog;
}
