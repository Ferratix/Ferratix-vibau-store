// script.js

// Simule une roue du hasard
function lancerRoueHasard() {
  const produits = [
    "Vibronator 3000",
    "La Grotte Mystérieuse",
    "La Fusée du Plaisir",
    "Le Vibau Controller",
    "L’Ami Fidèle"
  ];
  const choix = produits[Math.floor(Math.random() * produits.length)];
  alert("🎁 Tu as gagné : " + choix + " !");
}

// Ajouter un produit au panier
function ajouterAuPanier(nomProduit, prix) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.push({ nom: nomProduit, prix: prix });
  localStorage.setItem("panier", JSON.stringify(panier));
  mettreAJourCompteurPanier();

  const boutonClique = event.target;
  animationAjoutBouton(boutonClique);
}



// Charger le panier dans panier.html
function afficherPanier() {
  const conteneur = document.getElementById("contenu-panier");
  let panier = JSON.parse(localStorage.getItem("panier")) || [];

  if (panier.length === 0) {
    conteneur.innerHTML = `
      <div class="emoji">🧼</div>
      <p><strong>Tu n’as rien ajouté au panier.</strong></p>
      <p>Mais tu as gagné notre respect, et ça, ça n’a pas de prix ❤️</p>
    `;
  } else {
    let totalHT = 0;
    let html = "<ul>";

    panier.forEach((item, index) => {
      totalHT += item.prix;
      html += `
        <li>
          ${item.nom} — ${item.prix.toFixed(2)} €
          <button class="btn" style="margin-left: 10px; padding: 5px 10px; font-size: 0.8em;" onclick="supprimerArticle(${index})">Supprimer</button>
        </li>
      `;
    });

    html += "</ul>";

    const tva = totalHT * 0.20;
    const totalTTC = totalHT + tva;

    html += `
      <div style="margin-top: 30px;">
        <p>Total HT : <strong>${totalHT.toFixed(2)} €</strong></p>
        <p>TVA (20%) : <strong>${tva.toFixed(2)} €</strong></p>
        <p>Total TTC : <strong style="font-size: 1.2em;">${totalTTC.toFixed(2)} €</strong></p>
      </div>
      <button class="btn" style="margin-top: 20px;" onclick="payer()">Procéder au paiement</button>
    `;

    conteneur.innerHTML = html;
  }
}



// Affiche le nombre d’articles dans le menu (optionnel mais recommandé)
function mettreAJourCompteurPanier() {
  const compteur = document.getElementById("compteur-panier");
  if (compteur) {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    compteur.textContent = `(${panier.length})`;
  }
}

// Appelle automatiquement sur chaque page au chargement
document.addEventListener("DOMContentLoaded", () => {
  mettreAJourCompteurPanier();
  afficherPanier(); // 👈 cette ligne est indispensable pour afficher les produits !
});

function animationAjoutBouton(bouton) {
  const span = document.createElement("span");
  span.textContent = "✔️ Ajouté !";
  span.style.position = "absolute";
  span.style.backgroundColor = "#e83e8c";
  span.style.color = "white";
  span.style.padding = "5px 10px";
  span.style.borderRadius = "5px";
  span.style.fontSize = "0.8em";
  span.style.top = "-25px";
  span.style.right = "0";
  span.style.opacity = "1";
  span.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  span.style.zIndex = "10";

  bouton.style.position = "relative";
  bouton.appendChild(span);

  setTimeout(() => {
    span.style.opacity = "0";
    span.style.transform = "translateY(-10px)";
  }, 100);

  setTimeout(() => {
    bouton.removeChild(span);
  }, 700);
}
function supprimerArticle(index) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
  mettreAJourCompteurPanier();
}
function payer() {
  alert("💳 Paiement validé ! Vos articles imaginaires arrivent... dans votre imagination.");
  localStorage.clear();
  location.reload();
}
