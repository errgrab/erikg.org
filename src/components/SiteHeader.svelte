<script>
  import Logo from "./Logo.svelte";
  import ThemePicker from "./ThemePicker.svelte";

  let { title = "Erik", accent = "G", subtitle = "", href = "" } = $props();
</script>

<header>
  <Logo {title} {accent} {subtitle} {href} />
  <ThemePicker />
</header>
