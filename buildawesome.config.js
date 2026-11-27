import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";


export default function(config) {
	config.amendLibrary("md", md => {
		const defaultRender = md.renderer.rules.link_open
			|| ((tokens, idx, options, env, self) =>
				self.renderToken(tokens, idx, options));

		md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
			const token = tokens[idx];
			const href = token.attrGet("href");

			if (href && /^https?:\/\//.test(href)) {
				const url = new URL(href);

				if (url.hostname !== "erikg.org"
					&& !url.hostname.endsWith(".erikg.org")) {
					token.attrSet("target", "_blank");
					token.attrSet("rel", "noopener noreferrer");
				}
			}

			return defaultRender(tokens, idx, options, env, self);
		};
	});
	const md = markdownIt({ html: true, linkify: true });

	// "-- text" at the start of a line -> <cite>text</cite>
	md.inline.ruler.before("emphasis", "cite", (state, silent) => {
		const src = state.src;
		const start = state.pos;
		if (!src.startsWith("-- ", start)) return false;
		if (start > 0 && src[start - 1] !== "\n") return false;

		let end = src.indexOf("\n", start);
		if (end < 0 || end > state.posMax) end = state.posMax;

		if (!silent) {
			const oldMax = state.posMax;
			state.push("cite_open", "cite", 1);
			state.pos = start + 3;
			state.posMax = end;
			state.md.inline.tokenize(state);
			state.posMax = oldMax;
			state.push("cite_close", "cite", -1);
		}
		state.pos = end;
		return true;
	});

	// ""text"" -> <q>text</q>
	md.inline.ruler.before("text", "quote", (state, silent) => {
		const src = state.src;
		const start = state.pos;
		if (!src.startsWith('""', start)) return false;

		const end = src.indexOf('""', start + 2);
		if (end < 0 || end === start + 2 || end > state.posMax) return false;

		if (!silent) {
			const oldMax = state.posMax;
			state.push("q_open", "q", 1);
			state.pos = start + 2;
			state.posMax = end;
			state.md.inline.tokenize(state);
			state.posMax = oldMax;
			state.push("q_close", "q", -1);
		}
		state.pos = end + 2;
		return true;
	});

	config.addPlugin(syntaxHighlight);
	config.addPassthroughCopy("src/assets");
	config.addPassthroughCopy("src/styles");
	config.setLibrary("md", md);

	config.addPairedShortcode("slot", (content, cls = "") => {
		const attr = cls ? ` class="${cls}"` : "";
		return `<div${attr}>\n\n${content}\n\n</div>`;
	})

	return {
		dir: { input: "src" }
	};
}
