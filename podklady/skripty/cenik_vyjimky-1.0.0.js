// Výjimky v ceníku na detailu služby — v1.0.0
// Položka ceníku s vyplněným CMS polem „Nezobrazovat u služeb" (atribut
// data-bez-sluzeb) zmizí na detailu služby, jejíž slug je v seznamu.
// Běží vedle skriptu v page custom code, který položky rozřazuje pod kategorie:
// nezáleží na pořadí, čeká, až se zásobníky vyprázdní, a pak schová kategorie,
// ve kterých nic nezbylo.
(function(){var m=location.pathname.match(/^\/(?:sluzby|sluzba)\/([^\/]+)/);if(!m)return;var s=decodeURIComponent(m[1]).toLowerCase();function uklid(){document.querySelectorAll('[data-bez-sluzeb]').forEach(function(r){var b=(r.getAttribute('data-bez-sluzeb')||'').toLowerCase();if(!b)return;if(b.split(',').map(function(x){return x.trim()}).indexOf(s)!==-1){r.remove()}});if(document.querySelectorAll('#cenik-zasobnik-1 .cenik-polozka,#cenik-zasobnik-2 .cenik-polozka').length)return false;var vid=[];document.querySelectorAll('.cenik-kategorie').forEach(function(k){if(!k.querySelector('.cenik-polozka')){k.style.display='none'}else{vid.push(k)}});var rozb=vid.some(function(k){return k.classList.contains('je-rozbalena')});if(vid.length&&!rozb){vid[0].classList.add('je-rozbalena')}return true}var n=0;function tik(){if(uklid()||n++>20)return;setTimeout(tik,150)}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',tik)}else{tik()}})();
