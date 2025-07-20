function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () =>
    copyCodeToClipboard(button, highlightDiv),
  );
  addCopyButtonToDom(button, highlightDiv);
}

async function copyCodeToClipboard(button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(
    ":last-child > .chroma > code",
  ).textContent;
  try {
    result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      copyCodeBlockExecCommand(codeToCopy);
    }
  } catch (_) {
    copyCodeBlockExecCommand(codeToCopy);
  } finally {
    codeWasCopied(button);
  }
}

async function copyCodeBlockExecCommand(codeToCopy) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(codeToCopy);
  }
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function () {
    button.innerText = "Copy";
  }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
  const wrapper = document.createElement("div");
  wrapper.className = "highlight-wrapper";
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".highlight")
    .forEach((highlightDiv) => createCopyButton(highlightDiv));
});
