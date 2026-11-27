// ""text"" -> <q>text</q>
export default function (md) {
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
}
