"use strict";

function copyAsMarkup(isWithQuote) {
  const clonedSelection = document.getSelection().getRangeAt(0).cloneContents();
  let markup = fragmentToMarkup(clonedSelection);
  if (isWithQuote) {
    // SlackのMarkdown風記法は fenced code block の引用に対応していないようで、
    // コード部分に引用符がついてしまうが気にしないこととする。
    markup = markup.replace(/^/, "> ").replace(/\n(?!$)/g, "\n> ");
  }
  copyTextToClipboard(markup);

  return markup;
}

function fragmentToMarkup(fragment) {
  // 処理単純化のためElementをルートとする。
  const element = document.createElement("div");
  element.append(fragment);

  return elementToMarkup(element);
}

function elementToMarkup(element) {
  const tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case "br":
      return "\n";
    case "i":
      return `_${elementChildrenToMarkup(element)}_`;
    case "b":
      return `*${elementChildrenToMarkup(element)}*`;
    case "s":
      return `~${elementChildrenToMarkup(element)}~`;
    case "a":
      return `[${element.innerText}](${element.getAttribute("href")})`;
    case "code":
      return "`" + elementChildrenToMarkup(element) + "`";
    case "blockquote": {
      let marker = "";
      // SlackのMarkdown風記法では引用は二重引用までしか対応していないようだ。
      // 二重引用の正しい識別方法は不明だがstringifyBorderを用いることとする。
      if (element.dataset.stringifyBorder === "1") {
        marker = "> >";
      } else {
        marker = ">";
      }
      return `${marker} ${elementChildrenToMarkup(element)}\n`;
    }
    case "pre":
      return "```\n" + `${elementChildrenToMarkup(element)}` + "\n```\n";
    case "span":
      // 改行がないと意図通りにならないところはparagraph-breakが入っているように見える。
      if (element.dataset.stringifyType === "paragraph-break") {
        return "\n";
      }
      return "";
    case "ul":
      return listToMarkup(element, "ul");
    case "ol":
      return listToMarkup(element, "ol");
    default:
      return elementChildrenToMarkup(element);
  }
}

function elementChildrenToMarkup(element) {
  let markup = "";

  for (const child of element.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      markup += child.textContent;
    } else {
      markup += elementToMarkup(child);
    }
  }

  return markup;
}

function listToMarkup(element, type) {
  let marker = "";
  if (type === "ul") {
    marker = "*";
  } else if (type === "ol") {
    marker = `1.`;
  }

  let markup = "";

  const lis = element.querySelectorAll("li");
  for (const li of lis) {
    // markupではリストのネストはulやolのネストではなく
    // 単一階層のリストのみを使いインデントのみでネストを表現しているようだ。
    // インデントは空白4 (2ではだめなようだ)
    const indentWidth = 4 * (li.dataset.stringifyIndent ?? 0);
    const indent = " ".repeat(indentWidth);
    const liMarkup = elementChildrenToMarkup(li);
    markup += `${indent}${marker} ${liMarkup}\n`;
  }

  return markup;
}

function copyTextToClipboard(text) {
  // navigator.clipboard.writeText() はフォーカスが当たっていないと
  // DOMException: Document is not focused. が発生する。
  // そのため deprecated だが document.execCommand() を用いる。
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(copyFrom);

  copyFrom.select();
  document.execCommand("copy");
  body.removeChild(copyFrom);
}
