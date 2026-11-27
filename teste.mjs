import markdownIt from "markdown-it";
import quote from "./plugins/quote.js";
import cite from "./plugins/cite.js";

const md = markdownIt({ html: true }).use(quote).use(cite);
console.log(md.render('He said ""keep it simple"" and left.\n-- Someone Wise'));
console.log(md.render('""keep it simple""'));
console.log(md.render('Just ""quote"" here'));
console.log(md.render('-- Alone'));
