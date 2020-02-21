module.exports = function() {
  
  return `<div class="cookie">
  <h2 class="cookie__title">Cookies & Privacy</h2>
<p class="cookie__message">This Website uses cookies to ensure you get the best experience on our website.</p>
<form action="/cookie" method="POST"><input type="hidden" name="username">
  <br/>
  <button class="cookie__button">Accept</button>
</form>
</div>`
}