import Handlebars from 'handlebars';
import { includes, some, split } from 'lodash';
import * as moment from 'moment';

Handlebars.registerHelper('ifEq', function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifNotEq', function (arg1, arg2, options) {
  return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('formatDate', function (dateTime, format) {
  return moment(dateTime).format(format);
});

Handlebars.registerHelper('ifHasOriginator', function (stages: any[], options) {
  if (stages?.[0]?.stageType === 'ORIGINATOR') {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('ifIn', function (list, elem, options) {
  if (list?.indexOf(elem) > -1) {
    return options.fn(this);
  }
  return options.inverse(this);
});

//****
// list:string ex: '3,2,4'
//*
Handlebars.registerHelper('ifNotIn', function (elem: any, list: string, options) {
  let arr: any[] = list.split(',');
  if (typeof elem === 'number') {
    arr = arr.map((a) => +a);
  }
  if (arr?.indexOf(elem) === -1) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('ifSome', function (list, elems, options) {
  if (some(list, (l) => includes(split(elems, ','), l))) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('ifRange', function (v1, range, options) {
  const [from, to] = split(range, '-');
  if (v1 >= +from && v1 <= +to) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return v1 == v2 ? options.fn(this) : options.inverse(this);

    case '!=':
      return v1 != v2 ? options.fn(this) : options.inverse(this);

    case '===':
      return v1 === v2 ? options.fn(this) : options.inverse(this);

    case '!==':
      return v1 !== v2 ? options.fn(this) : options.inverse(this);

    case '&&':
      return v1 && v2 ? options.fn(this) : options.inverse(this);

    case '||':
      return v1 || v2 ? options.fn(this) : options.inverse(this);

    case '<':
      return v1 < v2 ? options.fn(this) : options.inverse(this);

    case '<=':
      return v1 <= v2 ? options.fn(this) : options.inverse(this);

    case '>':
      return v1 > v2 ? options.fn(this) : options.inverse(this);

    case '>=':
      return v1 >= v2 ? options.fn(this) : options.inverse(this);

    default:
      return eval(`${v1}${operator}${v2}`) ? options.fn(this) : options.inverse(this);
  }
});

export default Handlebars;
