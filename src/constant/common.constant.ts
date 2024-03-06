import { forEach } from 'lodash';
import * as sanitize from 'sanitize-html';

export const SANITIZE_COMMENT_OPTIONS = {
  allowedAttributes: {
    span: [
      'class',
      'data-index',
      'data-denotation-char',
      'data-id',
      'data-uuid',
      'data-value',
      'data-username',
      'contenteditable',
      'data-mention-clickable',
      'style'
    ]
  }
};

const allowedAttributes = {};
forEach(sanitize.defaults.allowedTags, (t) => {
  allowedAttributes[t] = ['class', 'style'];
});
export const SANITIZE_JA_OPTIONS: sanitize.IOptions = {
  allowedAttributes
};
