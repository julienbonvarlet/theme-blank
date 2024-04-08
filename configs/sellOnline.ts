const sellOnline: SellOnlineConfig = {
  banner: {
    title: "Vendre",
    text: "Donnez une seconde vie à vos pièces Faume en échange d'une carte cadeau",
    backgroundImage: "https://faume.imgix.net/10/home-baner.webp",
    link1: {
      title: "Estimer la valeur de ma pièce",
      url: "/pages/trade-in",
      type: "secondary",
    },
    align: "left",
    size: "xl",
  },
  sectionIcons: {
    title: "Comment ça marche ?",
    icons: [
      {
        title: "Etape 1",
        text: "Estimez rapidement et gratuitement la valeur de revente de vos pièces",
        image:
          "https://demo.faume.co/cdn/shop/files/clean-clothes_594x140.png?v=1691013900",
      },
      {
        title: "Etape 2",
        text: "Envoyez gratuitement vos pièces à l'aide d'une étiquette prépayée",
        image:
          "https://demo.faume.co/cdn/shop/files/contact-form_594x140.png?v=1691012775",
      },
      {
        title: "Etape 3",
        text: "Connectez-vous à votre espace client pour visualiser votre crédit",
        image:
          "https://demo.faume.co/cdn/shop/files/delivery-truck_594x140.png?v=1691012825",
      },
      {
        title: "Etape 4",
        text: "Convertissez votre crédit en bons d'achat valable sur du neuf ou de la seconde main",
        image:
          "https://demo.faume.co/cdn/shop/files/voucher_594x140.png?v=1691012875",
      },
    ],
    align: "center",
  },
  gridRow: {
    maxWidth: "xl",
    marginX: true,
    marginY: true,
    align: "center",
    columns: [
      {
        type: "icons",
        title: "Les avantages",
        link1: {
          title: "Estimer ma pièce",
          url: "/pages/sell",
          type: "primary",
        },
        icons: [
          {
            image:
              "https://demo.faume.co/cdn/shop/files/contact-form_160x100.png?v=1691012775",
            text: "Obtenez l'estimation de rachat de votre pièce en quelques clics",
          },
          {
            image:
              "https://demo.faume.co/cdn/shop/files/delivery-truck_160x100.png?v=1691012825",
            text: "Envoyez la gratuitement, aucun frais de livraison ni commission",
          },
          {
            image:
              "https://demo.faume.co/cdn/shop/files/clock_160x100.png?v=1691012721",
            text: "Nos experts analysent votre article sous 3 jours",
          },
          {
            image:
              "https://demo.faume.co/cdn/shop/files/voucher_160x100.png?v=1691012875",
            text: "Profitez de votre bon d'achat en boutique, en ligne ou sur la seconde main!",
          },
        ],
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/files/lena-kudryavtseva-itUsEU7GgDU-unsplash_1648x1210_crop_center.jpg?v=1687190627",
        alt: "Acheter Faume seconde main",
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/files/lena-kudryavtseva-itUsEU7GgDU-unsplash_1648x1210_crop_center.jpg?v=1687190627",
        alt: "Acheter Faume seconde main",
      },
      {
        type: "text",
        title: "Comment utiliser son bon d'achat",
        text: "<p>Connectez-vous à votre espace clien (marque) Seconde Main et accèdez à la rubrique « Mes crédits »</p> <h3>Choissisez de générez votre bon d’achat</h3><p> utilisable en boutique (marque), ou en ligne sur marque.com et secondemain.marque.com</p><h3>Utilisez votre bon d'achat</h3><p> En saissisant votre code promotionel dans votre panier lors de votre prochaine commande ou directement en boutique</p>",
        link1: {
          title: "Vendre ma pièce",
          url: "/pages/sell",
          type: "primary",
        },
      },
      {
        type: "text",
        title: "Les conditions de reprise",
        text: "Votre article doit être propre et ne doit pas présenter de déchirures, de trous ou de taches.\nVotre article ne doit pas avoir été retouché et il ne doit lui manquer ni boutons ni autres fournitures.\nVotre article doit contenir l’étiquette (marque) et les étiquettes intérieures de composition et entretien",
        link1: {
          title: "Estimer la valeur de ma pièce",
          url: "/pages/sell",
          type: "primary",
        },
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/files/lena-kudryavtseva-itUsEU7GgDU-unsplash_1648x1210_crop_center.jpg?v=1687190627",
        alt: "Acheter Faume seconde main",
      },
    ],
  },
};

export default sellOnline;
