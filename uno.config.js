import { presetWind4, defineConfig } from 'unocss';

export default defineConfig({
    presets: [
        presetWind4(),
    ],

    theme: {
        colors: {
            bg: 'var(--bg)',
            sur: 'var(--sur)',
            fg: 'var(--fg)',
        },
        fontFamily: {
            mono: ['"DM Mono"', 'monospace'],
        },
    },

    rules: [
        // ── Spacing (rem) ──
        // Usage: gap-1.5, m-0.5, p-2, mx-1, etc.
        [/^gap-([\.\d]+)$/, ([_, n]) => ({ gap: `${n}rem` })],
        [/^m-([\.\d]+)$/, ([_, n]) => ({ margin: `${n}rem` })],
        [/^mt-([\.\d]+)$/, ([_, n]) => ({ 'margin-top': `${n}rem` })],
        [/^mb-([\.\d]+)$/, ([_, n]) => ({ 'margin-bottom': `${n}rem` })],
        [/^ml-([\.\d]+)$/, ([_, n]) => ({ 'margin-left': `${n}rem` })],
        [/^mr-([\.\d]+)$/, ([_, n]) => ({ 'margin-right': `${n}rem` })],
        [/^mx-([\.\d]+)$/, ([_, n]) => ({ 'margin-inline': `${n}rem` })],
        [/^my-([\.\d]+)$/, ([_, n]) => ({ 'margin-block': `${n}rem` })],
        [/^p-([\.\d]+)$/, ([_, n]) => ({ padding: `${n}rem` })],
        [/^px-([\.\d]+)$/, ([_, n]) => ({ 'padding-inline': `${n}rem` })],
        [/^py-([\.\d]+)$/, ([_, n]) => ({ 'padding-block': `${n}rem` })],
        [/^pt-([\.\d]+)$/, ([_, n]) => ({ 'padding-top': `${n}rem` })],
        [/^pb-([\.\d]+)$/, ([_, n]) => ({ 'padding-bottom': `${n}rem` })],
        [/^pl-([\.\d]+)$/, ([_, n]) => ({ 'padding-left': `${n}rem` })],
        [/^pr-([\.\d]+)$/, ([_, n]) => ({ 'padding-right': `${n}rem` })],

        // ── Sizing (px) ──
        // Usage: w-100, h-32, size-48
        [/^w-([\.\d]+)$/, ([_, n]) => ({ width: `${n}px` })],
        [/^h-([\.\d]+)$/, ([_, n]) => ({ height: `${n}px` })],
        [/^size-([\.\d]+)$/, ([_, n]) => ({ width: `${n}px`, height: `${n}px` })],

        // ── Font size (rem) ──
        // Usage: fs-0.75, fs-1.2, fs-[0.63rem]
        [/^fs-([\.\d]+)$/, ([_, n]) => ({ 'font-size': `${n}rem` })],
        [/^fs-\[([\.\d]+)rem\]$/, ([_, n]) => ({ 'font-size': `${n}rem` })],

        // ── Border radius (px) ──
        // Usage: rounded-6, rounded-12
        [/^rounded-([\.\d]+)$/, ([_, n]) => ({ 'border-radius': `${n}px` })],

        // ── Line height (unitless) ──
        // Usage: leading-1.6
        [/^leading-([\.\d]+)$/, ([_, n]) => ({ 'line-height': `${n}` })],

        // ── Letter spacing (em) ──
        // Usage: tracking-0.28
        [/^tracking-([\.\d]+)$/, ([_, n]) => ({ 'letter-spacing': `${n}em` })],

        // ── Transition duration (named) ──
        ['duration-base', { 'transition-duration': '0.2s' }],
        ['duration-fast', { 'transition-duration': '0.12s' }],
    ],

    shortcuts: {
        // ── Layout ──
        'grid': 'grid grid-cols-2 gap-1 max-sm:grid-cols-1',
        'grid-1': 'grid grid-cols-1 gap-1',
        'grid-single': 'grid grid-cols-1 gap-1',

        // ── Section label ──
        'section-label': 'fs-0.5 tracking-0.28 uppercase text-fg opacity-50 mb-[0.85rem]',

        // ── Tag ──
        'tag': 'fs-0.5 tracking-0.2 uppercase text-fg bg-bg px-[0.4rem] py-[0.2rem] w-fit rounded-3 no-underline transition-all duration-base',
        'tile-tag': 'mt-1 tag',
        'tag-accent': 'tag',

        // ── Tile / Card ──
        'tile-base': 'flex flex-col bg-sur rounded-6 relative overflow-hidden p-[1.5rem_1.25rem_1.25rem] transition-colors duration-base',
        'tile': 'tile-base cursor-pointer hover:opacity-85',
        'tile-muted': 'tile-base opacity-50',
        'tile-host': 'fs-0.5 text-fg opacity-60 tracking-0.06 uppercase mb-[0.6rem]',
        'tile-name': 'fs-0.88 text-fg mb-[0.5rem] leading-none',
        'tile-desc': 'fs-[0.63rem] text-fg opacity-70 italic leading-[1.65]',

        // ── Intro block ──
        'intro-block': 'flex flex-col gap-0.6',
        'intro-text': 'fs-0.7 leading-1.7 text-fg opacity-70 italic',

        // ── Muted ──
        'muted': 'text-fg opacity-50',
        'muted-tag': 'text-fg bg-sur opacity-40',
    },
});
