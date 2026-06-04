<footer>
  <div class="footer-inner">
    <span>ErikG &middot; go slow and fix things</span>
    <nav>
      <a href="https://github.com/errgrab/" target="_blank" rel="noreferrer">github</a>
      <a href="mailto:contact@erikg.org">mail</a>
    </nav>
  </div>
</footer>

<style>
footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  background: transparent;
}

.footer-inner {
  max-width: 980px;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer span,
footer a {
  font-size: 0.6rem;
  color: var(--fg);
  opacity: 0.6;
  text-decoration: none;
}

footer a:hover {
  color: var(--acc);
  opacity: 0.9;
}

footer nav {
  display: flex;
  gap: 1.5rem;
}
@media (max-width: 480px) {
  footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
