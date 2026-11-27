// "-- text" at the start of a line -> <cite>text</cite>
export default function (md) {
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
}
