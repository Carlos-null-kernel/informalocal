var itensmenu = document.getElementById("navbar-itens-id");
itensmenu.innerHTML = `      <li class="nav-item">
<a href="/Local/" class="nav-link">Locais</a>
</li>
<li class="nav-item">
<a href="/Local/CEP" class="nav-link">CEP</a>
</li>
<li class="nav-item">
<a href="/Sobre/" class="nav-link">Sobre</a>
</li>`;

function aceitarCookies() {
  var dataExpiracao = new Date();
  dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 1);

  document.cookie = "cookies_aceitos=true; expires=" + dataExpiracao.toUTCString() + "; path=/";

  var bannerCookies = document.getElementById('cookie-banner');
  if (bannerCookies !== null) {
      bannerCookies.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var div = document.createElement('div');
  div.innerHTML = `<style>
    #cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #f2f2f2;
      padding: 10px;
      text-align: center;
      box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
      z-index: 9999;
    }
  
    #cookie-banner p {
      margin: 0;
    }
  
    #cookie-banner button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
    }
  
    /* Altera a cor do botão para preto se o plano de fundo for claro */
    #cookie-banner button {
      color: #000;
      margin: 10px;
    }
  </style>
  <div id="cookie-banner">
    <p>Este site usa cookies para melhorar sua experiência. Por favor, dê-nos permissão para usar cookies.</p>
    <button onclick="aceitarCookies()">Aceitar</button><button><a style="text-decoration: none; color: #000;" href="/Sobre/Termos-de-uso/">Ver Termos de uso</a></button>
  </div>
  `;
  document.body.appendChild(div);

  if (document.cookie.indexOf("cookies_aceitos=true") >= 0) {
    var bannerCookies = document.getElementById('cookie-banner');
    if (bannerCookies !== null) {
      bannerCookies.style.display = 'none';
    }
  }
});
