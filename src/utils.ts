import type { Header, Item } from './types/main';

export function getItemValue(column: string, item: Item) {
  if (column.includes('.')) {
    const keys = column.split('.');
    const { length } = keys;

    let content;
    let i = 0;

    while (i < length) {
      if (i === 0) {
        content = item[keys[0]];
      } else if (content && typeof content === 'object') {
        content = content[keys[i]];
      } else {
        content = '';
        break;
      }
      i += 1;
    }
    return content ?? '';
  }
  return item[column] ?? '';
}

export function formatItemValue(column: string, rawContent: string, headers: Header[]) {
  const header = headers.find((headerItem: Header) => headerItem.value === column);
  if (header) {
    if (header.formatFn) {
      return header.formatFn(rawContent);
    }
  }
  return rawContent;
}

export function generateColumnContent(column: string, item: Item, headers: Header[]) {
  const content = getItemValue(column, item);
  const rawContent = Array.isArray(content) ? content.join(',') : content;
  return formatItemValue(column, rawContent, headers);
}
