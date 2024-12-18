import {
  DOMNode,
  Element,
  attributesToProps,
  domToReact,
} from "html-react-parser";

export const reactParserOptions = {
  replace(domNode: DOMNode) {
    if (!(domNode instanceof Element)) return domNode;

    if (domNode.tagName === "a") {
      return (
        <a {...attributesToProps(domNode.attribs)} className="text-primary-300">
          {domToReact(domNode.children as DOMNode[], reactParserOptions)}
        </a>
      );
    }
    if (domNode.tagName === "ol") {
      return (
        <ol {...attributesToProps(domNode.attribs)} className="list-disc ml-5 text-sm flex flex-col gap-1">
          {domToReact(domNode.children as DOMNode[], reactParserOptions)}
        </ol>
      );
    }
    if (domNode.tagName === "li") {
      return (
        <li {...attributesToProps(domNode.attribs)} className="ml-0 pl-0">
          {domToReact(domNode.children as DOMNode[], reactParserOptions)}
        </li>
      );
    }
    if (domNode.tagName === "h1") {
      return (
        <h1
          {...attributesToProps(domNode.attribs)}
          style={{ 
            fontSize: "1.875rem",
            lineHeight: "2.25rem"
          }}
        >
          {domToReact(domNode.children as DOMNode[], reactParserOptions)}
        </h1>
      );
    }
    if (domNode.tagName === "h2") {
      return (
        <h1
          {...attributesToProps(domNode.attribs)}
          style={{ 
            fontSize: "1.5rem",
            lineHeight: "2rem"
          }}
        >
          {domToReact(domNode.children as DOMNode[], reactParserOptions)}
        </h1>
      );
    }
    if (domNode.tagName === "h3") {
      return (
        <h1
          {...attributesToProps(domNode.attribs)}
          style={{ 
            fontSize: "1.25rem",
            lineHeight: "1.75rem"
          }}
        >
          {domToReact(domNode.children as DOMNode[], reactParserOptions)}
        </h1>
      );
    }
  },
};
