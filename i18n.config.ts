export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
  messages: {
    fr: {
      pages: {
        index: {
          banner: {
            title: "Bienvenue sur notre site",
            subtitle: "Découvrez nos produits",
            button1: "Acheter",
            button2: "Vendre",
          },
          section_text: {
            title: "Notre démarche",
            text: "Découvrez notre plateforme de seconde main Faume, synonyme de mode durable et de qualité à des prix avantageux. En achetant et vendant ici, vous soutenez notre engagement envers l'environnement. Rejoignez notre communauté pour participer au changement vers une mode plus éthique.",
            button: "En savoir plus",
          },
          carousel_products: {
            title: "Les nouveautés",
            button: "Acheter",
          },
          carousel_sizes: {
            title: "Shoppez par taille",
          },
          carousel_collections: {
            title: "Nos collections",
          },
          grid: {
            1: {
              title: "Acheter",
            },
            2: {
              title: "Les avantages",
              button: "Estimer pa pièce",
              icons: {
                1: "Obtenez l'estimation de rachat de votre pièce en quelques clics",
                2: "Envoyez la gratuitement, aucun frais de livraison ni commission",
                3: "Nos experts analysent votre article sous 3 jours",
                4: "Profitez de votre bon d'achat en boutique, en ligne ou sur la seconde main!",
              },
            },
            3: {
              title: "Pourquoi choisir Faume Seconde main ?",
              button: "Découvrir notre sélection",
              icons: {
                1: "Articles authentifiés, nettoyés et vérifiés par nos experts",
                2: "Participez à une économie plus durable",
                3: "Livraisons en 3 à 5 jours",
                4: "Retours sous 14 jours",
              },
            },
            4: {
              title: "Vendre",
            },
          },
        },
        product: {
          description: "Description",
          composition: "Composition",
          shipping_return_title: "Livraison et retours",
          shipping_return_text: "Lorme ipsum",
          error: "Aucun produit ne correspond à cette url",
          cta_back_home: "Retour vers l'accueil",
          labels: {
            color: "Couleur :",
            size: "Taille :",
            condition: "État :",
          },
          size_helper: "Guide des tailles",
          condition_helper: "En savoir plus",
          add_button: "Ajouter au panier",
          reinsurance: {
            1: "Livraison offerte dès 100€ d'achat",
            2: "Retour pendant 15 jours",
            3: "Bon d'achat utilisable",
          },
          suggestions: {
            title: "Nos suggestions",
            tab_suggestions: "Vous pourriez aimer",
            tab_recently_viewed: "Récemment vus",
          },
        },
        collection: {
          filters: {
            orders: {
              new: "Nouveautés",
              selection: "Notre sélection",
              low_to_high: "Prix croissant",
              high_to_low: "Prix décroissant",
            },
            labels: {
              state: "État",
              size: "Taille",
              color: "Couleur",
              composition: "Composition",
              gender: "Genre",
              type: "Type",
              season: "Saison",
              sort: "Trier par",
            },
          },
          all: {
            title: "Tous nos produits",
            text: "Découvrez une gamme élégante de vêtements Faume pour femme, chacun soigneusement authentifié et préparé pour une seconde vie. Mélangez style sophistiqué et démarche écologique avec nos pièces de seconde main. L'excellence Faume à un prix éthique et abordable.",
          },
        },
        concept: {
          banner: {
            title: "Pourquoi choisir Faume seconde main ?",
          },
          section_text: {
            title: "Nos valeurs",
            text: "Conscients de l’impact environnemental et climatique lié à l’industrie du textile considérée comme l’une des plus polluantes, il est essentiel à notre niveau d’avoir une démarche éco-responsable. Agir tout au long de notre processus de création, de production et de commercialisation afin de proposer un vestiaire de plus en plus durable et s’engager à s’habiller de manière éclairée.",
            button: "Comment ça marche ?",
          },
          section_row_1: {
            title: "Des produits de qualité à petits prix",
            text: "Mots clés à utiliser : acheter, vendre, vêtements de seconde main en ligne, vintage, vêtements d’occasion, en ligne, seconde main, simple, rapide, pas cher, vêtements controlés, authentifiés, nettoyés, reconditionnés ...",
            button: "Acheter",
          },
          section_row_2: {
            type: "text",
            title: "Vendre ses vêtements Faume simplement en toute sécurité",
            text: "Mots clés à utiliser : acheter, vendre, vêtements de seconde main en ligne, vintage, vêtements d’occasion, en ligne, seconde main, simple, rapide, pas cher, vêtements controlés, authentifiés, nettoyés, reconditionnés ...",
            button: "Vendre mes pièces",
          },
          section_row_3: {
            type: "text",
            title: "Réparer, ré-usiner, recycler",
            text: "Mots clés à utiliser : acheter, vendre, vêtements de seconde main en ligne, vintage, vêtements d’occasion, en ligne, seconde main, simple, rapide, pas cher, vêtements controlés, authentifiés, nettoyés, reconditionnés ...",
            button: "Vendre mes pièces",
          },
        },
        sell_choice: {
          title: "Que préférez-vous ?",
          online: "Envoyer par la poste",
          store: "Dépôt en boutique",
        },
        sell_online: {
          banner: {
            title: "Vendre",
            text: "Donnez une seconde vie à vos pièces Faume en échange d'une carte cadeau",
            button: "Estimer la valeur de ma pièce",
          },
          section_icons: {
            title: "Comment ça marche ?",
            steps: {
              1: {
                title: "Etape 1",
                text: "Estimez rapidement et gratuitement la valeur de revente de vos pièces",
              },
              2: {
                title: "Etape 2",
                text: "Envoyez gratuitement vos pièces à l'aide d'une étiquette prépayée",
              },
              3: {
                title: "Etape 3",
                text: "Connectez-vous à votre espace client pour visualiser votre crédit",
              },
              4: {
                title: "Etape 4",
                text: "Convertissez votre crédit en bons d'achat valable sur du neuf ou de la seconde main",
              },
            },
            button: "Estimer ma pièce",
          },
          section_advantages: {
            title: "Les avantages",
            text: "<ul><li>Obtenez l'estimation de rachat de votre pièce en quelques clics</li><li>Envoyez la gratuitement, aucun frais de livraison ni commission</li><li>Nos experts analysent votre article sous 3 jours</li><li>Profitez de votre bon d'achat en boutique, en ligne ou sur la seconde main!</li></ul>",
            button: "Estimer ma pièce",
          },
          section_how_it_works: {
            title: "Comment utiliser son bon d'achat",
            text: "<p>Connectez-vous à votre espace clien (marque) Seconde Main et accèdez à la rubrique « Mes crédits »</p> <h3>Choissisez de générez votre bon d’achat</h3><p> utilisable en boutique (marque), ou en ligne sur marque.com et secondemain.marque.com</p><h3>Utilisez votre bon d'achat</h3><p> En saissisant votre code promotionel dans votre panier lors de votre prochaine commande ou directement en boutique</p>",
            button: "Vendre ma pièce",
          },
          section_conditions: {
            title: "Les conditions de reprise",
            text: "Votre article doit être propre et ne doit pas présenter de déchirures, de trous ou de taches.\nVotre article ne doit pas avoir été retouché et il ne doit lui manquer ni boutons ni autres fournitures.\nVotre article doit contenir l’étiquette (marque) et les étiquettes intérieures de composition et entretien",
            button: "Estimer la valeur de ma pièce",
          },
        },
        sell_in_store: {
          banner: {
            title: "Déposez vos pièces en boutique",
            subtitle: "Bénéficier d'un bon d'achat utilisable en boutique immédiatement",
            text: "Revendez vos vêtements chez Faume en toute simplicité : prenez rendez-vous dans l'une de nos boutiques participantes, estimer la valeur de vos articles gratuitement avec l'un de nos vendeurs qualifié, et profitez de votre bon d'achat en boutique, sans frais ni commission ! Transformez vos articles inutilisés en bon d'achat, dès maintenant !",
            button: "Prendre rendez-vous",
          },
          section_icons: {
            title: "Comment ça marche ?",
            steps: {
              1: {
                title: "Etape 1",
                text: "Estimez rapidement et gratuitement la valeur de revente de vos pièces",
              },
              2: {
                title: "Etape 2",
                text: "Envoyez gratuitement vos pièces à l'aide d'une étiquette prépayée",
              },
              3: {
                title: "Etape 3",
                text: "Connectez-vous à votre espace client pour visualiser votre crédit",
              },
              4: {
                title: "Etape 4",
                text: "Convertissez votre crédit en bons d'achat valable sur du neuf ou de la seconde main",
              },
            },
            button: "Estimer la valeur de ma pièce",
          },
          section_advantages: {
            title: "Les avantages",
            text: "Votre article doit être propre et ne doit pas présenter de déchirures, de trous ou de taches.\nVotre article ne doit pas avoir été retouché et il ne doit lui manquer ni boutons ni autres fournitures.\nVotre article doit contenir l’étiquette (marque) et les étiquettes intérieures de composition et entretien",
            button: "Prendre rendez-vous",
          },
          section_how_it_works: {
            title: "Comment utiliser son bon d'achat",
            text: "Une fois votre reprise validé par un de nos vendeurs en boutique, vous pouvez choisir d'utiliser votre bon d'achat sur place ou de le garder pour plus tard.\nPour l'utiliser plus tard :\nConnectez-vous à votre espace client Faume Seconde Main et accèdez à la rubrique « Mes crédits »\nChoissisez de générez votre bon d’achat utilisable en boutique Faume, ou en ligne sur faume.com et secondemain.faume.com\nUtilisez votre bon d'achat en saissisant votre code promotionel dans votre panier lors de votre prochaine commande ou directement en boutique",
          },
          section_conditions: {
            title: "Les conditions de reprise",
            text: "Votre article doit être propre et ne doit pas présenter de déchirures, de trous ou de taches.\nVotre article ne doit pas avoir été retouché et il ne doit lui manquer ni boutons ni autres fournitures.\nVotre article doit contenir l’étiquette (marque) et les étiquettes intérieures de composition et entretien",
            button: "Estimer la valeur de ma pièce",
          },
        },
        order_tracking: {
          title: "Suivi de votre commande",
          text: "Vous pouvez suivre votre commande en saisissant simplement les informations ci-dessous :<br>Suivez l'avancement de votre commande en temps réel",
          button_track_order: "Suivre ma commande",
          order_number: "Numéro de commande",
          button_login: "Je possède déjà un compte",
        },
        buy: {
          title: "Notre démarche",
          subtitle: "Sous-title optionnel",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem. Ante in nibh mauris cursus mattis molestie a. Pretium nibh ipsum consequat nisl vel pretium. Phasellus egestas tellus rutrum tellus. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Fringilla urna porttitor rhoncus dolor purus.",
          blocks: {
            1: {
              title: "Notre collection",
              link_1: "Nouveautés",
              link_2: "Manteaux",
              link_3: "Robes",
            },
            2: {
              title: "Notre collection",
              link_1: "Nouveautés",
              link_2: "Manteaux",
              link_3: "Robes",
            },
            3: {
              title: "Notre collection",
              link_1: "Nouveautés",
              link_2: "Manteaux",
              link_3: "Robes",
            },
          },
        },
        faq: {
          title: "FAQ",
          categories: {
            order: {
              title: "Commande",
              questions: {
                1: {
                  title: "Comment puis-je effectuer un retour et quelles sont les conditions ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                2: {
                  title: "Combien coûte le retour d'une commande ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                3: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                4: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                5: {
                  title: "",
                  answer: "",
                },
                6: {
                  title: "",
                  answer: "",
                },
                7: {
                  title: "",
                  answer: "",
                },
                8: {
                  title: "",
                  answer: "",
                },
                9: {
                  title: "",
                  answer: "",
                },
                10: {
                  title: "",
                  answer: "",
                },
              },
            },
            sell: {
              title: "Vendre",
              questions: {
                1: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                2: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                3: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                4: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                5: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                6: {
                  title: "",
                  answer: "",
                },
                7: {
                  title: "",
                  answer: "",
                },
                8: {
                  title: "",
                  answer: "",
                },
                9: {
                  title: "",
                  answer: "",
                },
                10: {
                  title: "",
                  answer: "",
                },
              },
            },
            shipping: {
              title: "Livraison & retours",
              questions: {
                1: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                2: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                3: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                4: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                5: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                6: {
                  title: "",
                  answer: "",
                },
                7: {
                  title: "",
                  answer: "",
                },
                8: {
                  title: "",
                  answer: "",
                },
                9: {
                  title: "",
                  answer: "",
                },
                10: {
                  title: "",
                  answer: "",
                },
              },
            },
            account: {
              title: "Identification",
              questions: {
                1: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                2: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                3: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                4: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                5: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                6: {
                  title: "",
                  answer: "",
                },
                7: {
                  title: "",
                  answer: "",
                },
                8: {
                  title: "",
                  answer: "",
                },
                9: {
                  title: "",
                  answer: "",
                },
                10: {
                  title: "",
                  answer: "",
                },
              },
            },
            customer_service: {
              title: "Service client",
              questions: {
                1: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                2: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                3: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                4: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                5: {
                  title: "Lorem ipsum ?",
                  answer:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum laudantium minus molestias nemo. Architecto, blanditiis corporis earum expedita illum, neque odio odit optio pariatur, sapiente tempora tempore velit. Consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur cum, deleniti deserunt dolores doloribus expedita illum nam nisi non omnis porro qui quo quod reiciendis, tenetur voluptate voluptatum. Voluptatibus?",
                },
                6: {
                  title: "",
                  answer: "",
                },
                7: {
                  title: "",
                  answer: "",
                },
                8: {
                  title: "",
                  answer: "",
                },
                9: {
                  title: "",
                  answer: "",
                },
                10: {
                  title: "",
                  answer: "",
                },
              },
            },
          },
        },
        cart: {
          title: "Panier",
          product_count: "1 produit",
          products_count: "{count} produits",
          empty: "Votre panier est vide",
          resume: "Récapitulatif",
          checkout_button: "Paiement - {total}",
          continue_button: "Continuer mes achats",
          reinsurance: {
            1: "Livraison offerte",
            2: "Retour pendant 15 jours",
            3: "Carte cadeau",
          },
        },
        checkout: {
          resume: {
            title: "Récapitulatif",
            reassurance: {
              1: "Livraison offerte",
              2: "Retour pendant 15 jours",
              3: "Bon d'achat",
            },
          },
          identification: {
            title: "Identifiant",
            text: "Connectez-vous avec votre compte Faume seconde ou continuez en mode invité",
            continue_as_guest: "Continuer en mode invité",
          },
          address: {
            title: "Adresse",
            shipping: "Livraison",
            billing: "Facturation",
          },
          shipping: {
            title: "Méthode de livraison",
            error_country: "La livraison n'est pas encore disponible pour votre pays.",
            error_method:
              "Une erreur est survenue, il semblerait que le moyen de livraison sélectionné ne soit pas disponible dans l'immédiat. Merci d'essayer à nouveau ou sélectionnez un autre mode de livraison.",
          },
          payment: {
            title: "Paiement",
            error_payments: "Une erreur est survenue, aucun moyen de paiement n'est disponible pour le moment. Merci de bien vouloir essayer ultérieurement en rafraichissant cette page.",
            error_payment: "Une erreur est survenue, ce moyen de paiement n'est disponible pour le moment. Merci de bien vouloir en choisir un autre.",
            bank_card: {
              button: "Procéder au paiement",
              error: "Une erreur est survenue, merci d'essayer à nouveau.",
            },
          },
          confirmation: {
            title: "Votre commande a bien été enregistrée",
            text: "Vous recevrez un email de confirmation dans quelques instants.<br><br>Vous pouvez suivre dès maintenant votre commande en vous connectant à votre <a href='/account'>compte Faume seconde main</a>.<br>Si vous avez effectuez cette commande en tant qu'invité, le suivi de votre commande est accessible via la page <a href='/order-follow'>Suivi de commande</a>",
            button: "Voir mon compte",
          },
        },
        stores: {
          title: "Magasins participants",
          hours: "Horaires",
          open_today: "Ouvert aujourd'hui",
          closed: "Fermé",
          button: "Prendre rendez-vous",
        },
        appointment: {
          title: "Prendre rendez-vous",
          subtitle_left: "Prendre rendez-vous",
          subtitle_right: "Remplissez vos informations personnelles",
          label_products: "Nombre d'article à déposer",
          label_comment: "Commentaire",
          button_validate: "Valider",
          date_placeholder: "Sélectionnez une date",
          time_placeholder: "Sélectionnez une heure",
          popin: {
            title: "Attention",
            content:
              "<p>Nous ne reprenons que les doudounes homme, femme ou enfant (à l'exclusion des doudounes bébé). Les pochons ne sont pas obligatoires.<br><br>Nous distinguons plusieurs niveaux d'états :<br><br>- État neuf : avec l'étiquette d'origine, jamais porté.<br>- Excellent état : l'article est comme neuf, sans traces d'usure ni défauts.<br>- Très bon état : l'article ne présente que des traces d'usure mineures, invisibles à 30cm.<br><br>Nous n'acceptons aucun produit dans un autre état : abîmé, troué, hors d'usage, tâché, déformé, sale, etc.<br><br>Votre doudoune ne doit pas avoir été modifiée : votre article ne doit pas avoir été retouché, et il ne doit lui manquer ni bouton ni autre fourniture.</p>",
          },
          confirmation: {
            title: "Prendre rendez-vous",
            confirm_message: "Votre rendez-vous est presque confirmé",
            success_message: "Nos équipes vous contacteront dès que possible par email ou téléphone afin de confirmer votre rendez-vous",
            step1: "Rendez-vous demandé",
            step2: "Rendez-vous confirmé",
          },
        },
        contact: {
          title: "Contactez-nous",
          text: "<p>Vous souhaitez obtenir un renseignement sur une pièce proposée sur notre site ? Vous avez des questions au sujet d'une commande passée ? Vous avez une question sur notre offre de reprise ou une reprise en cours ?</p><p>Nous vous invitons à contacter notre Service Client par email : XXX.com</p><p>Merci de préciser votre numéro de commande le cas échéant</p>",
        },
        conditions_use: {
          title: "Conditions générales d'utilisation",
          text: "<h2>Test</h2><p>Lorem ipsum</p>",
        },
        conditions_sell: {
          title: "Conditions générales de vente",
          text: "<p>Lorem ipsum</p>",
        },
        shipping_return: {
          title: "Livraison et retours",
          text: "<p>Lorem ipsum</p>",
        },
        legal_term: {
          title: "Mentions légales",
          text: "<p>ClaudieSecondeMain.com est un site de commerce électronique édité par la Société Claudie Pierlot, société par actions simplifiée, au capital de 18 149 449 euros dont le siège social est situé au 2 rue de Marengo 75001 Paris inscrite au Registre du Commerce et des Sociétés de Paris sous le numéro 32875985700837. N° TVA intracommunautaire : FR73328759857.</p><p>L’hébergeur du site est la société Clever Cloud SAS - société par actions simplifiée au capital de 17 625 €, immatriculée au Registre du commerce et des sociétés (RCS) de Nantes sous le numéro RCS Nantes B 524 172 699. Son siège social est situé au 3 rue de l'Allier, 44000 Nantes, France. Numéro de TVA : FR 87 524 172 699</p><p>La gestion du site est celle de l'enseigne FAUME - société Blue Collection SAS au capital de 1.000 Euros dont le siège social est à PERCHE EN NOCÉ (61340) – 55 rue du Général Jouvin, immatriculée au Registre du Commerce sous le numéro 848 562 112.</p>\n",
        },
      },
      account: {
        menu: {
          overview: "Aperçu",
          informations: "Mes informations",
          addresses: "Mes adresses",
          orders: "Mes commandes",
          trade_ins: "Mes reprises",
          gift_cards: "Mes crédits",
          logout: "Déconnexion",
        },
        identification: {
          title: "Identification",
          text: "Attention, ces identifiants sont différents de ceux de faume.co",
          email_doesnt_exist: "Cette adresse n'éxiste pas",
          button_login: "Connexion",
          button_register: "S'inscrire",
          register: {
            button: "Inscription",
            back_login: "J'ai déjà un compte",
          },
          login: {
            sso_google: "Se connecter avec Google",
            sso_facebook: "Se connecter avec Facebook",
            forgot_password: "Mot de passe oublié ?",
            button: "Connexion",
          },
        },
        activate_account: {
          title: "Activation du compte",
          button: "Confirmer",
        },
        reset_password: {
          title: "Réinitialisation du mot de passe",
          button: "Mettre à jour",
          success: "Votre mot de passe a bien été mis à jour",
          label_password: "Nouveau mot de passe",
          label_password_confirmation: "Confirmation du nouveau mot de passe",
          helper: "Votre mot de passe doit contenir au moins 8 caractères",
          back_login: "Retour à la connexion",
        },
        forget_password: {
          title: "Réinitialisation mot de passe",
          text: "Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe",
          button: "Réinitialiser mon mot de passe",
          success: "Vous avez reçu un lien par email pour mettre à jour votre mot de passe",
          error: "Aucun compte ne correspond à cet email",
        },
        overview: {
          orders: "Mes commandes",
          track: "Suivi",
          credits: "Crédits disponibles",
        },
        informations: {
          title: "Mes informations",
          button: "Enregistrer",
          message_success: "Vos informations ont bien été mise à jour",
          message_error: "Une erreur est survenue, merci d'essayer à nouveau",
          update_password: "Mettre à jour mon mot de passe",
          password_edit: {
            title: "Mettre à jour mon mot de passe",
            label_password: "Mot de passe actuel *",
            label_new_password: "Nouveau mot de passe *",
            label_confirmation_new_password: "Confirmation du nouveau mot de passe *",
            help: "Votre mot de passe doit faire au moins 8 caractères",
            button: "Enregistrer",
            message_success: "Votre mot de passe a bien été mis à jour",
          },
        },
        orders: {
          title: "Mes commandes",
          empty: "Vous n'avez pas encore passé de commande",
          id: "Id : {id}",
          products_bought: "{count} produits achetés",
          product_bought: "{count} produit acheté",
          states: {
            draft: "Test",
            validated: "Confirmée",
            canceled: "Annulée",
            paid: "Payée",
            refunded: "Remboursée",
            partially_refunded: "Partiellement remboursé",
            treated: "Expédiée",
            return_created: "Retour créé",
            return_treated: "Retour traité",
            treating: "En cours de préparation",
            requires_payment_method: "En attente de paiement",
          },
          return: {
            reason: "Raison du retour: {reason}",
          },
          detail: {
            title: "Commande {id}",
            track_order: "Suivre ma commande",
            id: "ID : {id}",
            order_created: "Commande créé",
            order_date: "Date de commande",
            download_billing: "Télécharger ma facture",
            shipping_method: "Mode d'envoie",
            tracking_number: "Numéro de suivie",
            promotional_code: "Code promotionnel",
            article_count: "{count} article",
            articles_count: "{count} articles",
            returns: {
              title: "Mes retours",
              expired:
                "Vous avez dépassé le délais pour demander un retour.\nCependant, nous pouvons reprendre vos articles en échange d’un bon d’achat. Découvrez comment vendre avec Faume Seconde main.",
              sell: "Vendre mes articles",
              empty: "Vous n'avez pas effectué de retour",
              button_new: "Faire un retour",
            },
          },
        },
        gift_cards: {
          title: "Mes crédits",
          subtitle: "Mes cartes cadeaux",
          total_credits: "Total de vos crédits",
          button_convert: "Convertir en carte cadeau",
          text: "Vous pouvez convertir à tous moment vos crédits en bons d’achat.\nVous pouvez choisir de créer un bon pour vos achats en boutique, sur faume.com ou faume-seconde-main.com. Les bons d’achat ont une validité de 12 mois.",
          empty: "Vous n'avez pas créé de carte cadeau pour le moment",
          how_it_works: "Comment ça marche ?",
          button_new_trade_in: "Faire une reprise",
          use_at: "Utilisable {type}",
          expire_at: "Expire le {date}",
          detail: {
            title: "Votre bon a bien été créé",
            text: "Vous pouvez retrouver cette carte cadeau dans la rubrique mes crédits de votre compte\n\nAttention, le code ne peut-être utilisé qu'une seule fois: pas de remboursement ou réutilisation possible du code même si son montant exède le montant de la commande",
            not_sync_message: "Le bon d'achat boutique peut prendre jusqu'à 48h pour être généré. Il sera utilisable dès lors que vous recevrez un e-mail de confirmation.",
            button: "Générer un nouveau bon",
            not_found: {
              text: "Cette page est momentanément indisponible. Retrouver votre bon d'achat dans la section Mes crédits de votre compte",
              button: "Mes crédits",
            },
          },
          copied: "Copié !",
          status: {
            available: "Actif",
            expired: "Expirée le {date}",
            cancel: "Annulée",
            burned: "Utilisée le {date}",
            sync: "Bientôt disponible",
          },
          types: {
            client: "faume.com",
            sale: "faume-secondemain.com",
            real: "en boutique",
          },
          create: {
            title: "Générer une carte cadeau",
            button: "Générer un bon de {amount} €",
            fields: {
              where: {
                label: "Où souhaitez-vous utiliser votre carte cadeau ?",
                options: {
                  client: "faume.com",
                  sale: "faume-secondemain.com",
                  real: "en boutique",
                },
              },
              amount: {
                label: "Quel montant ?",
                helper: "Vous devez saisir un montant supérieur à 5€",
              },
            },
            confirmation: {
              title: "Votre bon a bien été créé",
              text: "Vous pouvez retrouver cette carte cadeau dans la rubrique mes crédits de votre compte\n\nAttention, le code ne peut-être utilisé qu'une seule fois: pas de remboursement ou réutilisation possible du code même si son montant exède le montant de la commande",
              not_sync_message: "Le bon d'achat boutique peut prendre jusqu'à 48h pour être généré. Il sera utilisable dès lors que vous recevrez un e-mail de confirmation.",
              button: "Générer un nouveau bon",
            },
          },
        },
        addresses: {
          title: "Mes adresses",
          empty: "Vous n'avez pas créé d'adresse pour le moment",
          button_add: "Ajouter une adresse",
          button_edit: "Modifier",
          button_delete: "Supprimer",
          back: "Retour à mes adresses",
          default: "Adresse par défaut",
          create: {
            title: "Créer une adresse",
          },
          edit: {
            title: "Modifier l'adresse",
            success: "L'adresse a bien été mise à jour",
          },
          delete: {
            title: "Attention",
            text: "Êtes-vous sure de vouloir supprimer cette adresse ?",
            button_yes: "Confirmer",
            button_no: "Annuler",
          },
        },
        trade_ins: {
          title: "Mes reprises",
          empty: "Vous n'avez pas encore fait de reprise",
          button_sell: "Vendre",
          declared_condition: "État déclaré :",
          reviewed_condition: "État constaté :",
          status: {
            incoming: "En attente d'expédition",
            validated: "En attente d’envoi",
            canceled: "Annulée",
            rejected: "Refusée",
            refused: "Refusée",
            accepted: "Acceptée",
            not_validated: "En attente de validation",
            shipped: "Envoyée",
            delivered: "Livrée",
            received: "Réceptionnée",
            credited: "Créditée",
            controlling: "En cours de contrôle",
            sent: "Expédiée",
            waiting_for_review: "En cours d'analyse",
            waiting_for_send: "En attente d'expédition",
            waiting_for_validation: "En attente validation",
            controlled: "Contrôlée",
            draft: "Non finalisée",
            partially_accepted: "Partiellement acceptée",
          },
          detail: {
            title: "Reprise {id}",
            rejected: {
              title: "Raison du refus",
              text: "Nous comprenons votre déception concernant la reprise de votre article. Sachez que Faume s’engage à faire don des pièces non conformes à des associations.\nVotre pièce va directement bénéficier à des personnes dans le besoin, contribuant ainsi à un impact social et écologique positif. \nMerci de participer à cette belle action solidaire avec Faume.",
            },
            tracking_number: "Numéro de suivi",
            how_to_send: "Comment envoyer ma reprise ?",
            reference: "Numéro de reprise",
            created_date: "Date de création",
            articles: "Articles",
            article: "Article",
            estimated_amount: "Montant estimé",
            credited_amount: "Montant crédité",
            sent: "Envoyée",
            waiting_for_shipping: "En attente d'expédition",
            order_created: "Commande créée",
            analysing: "En cours d'analyse",
            expert_analysing: "Nos experts analysent l’état de votre pièce",
            controlled: "Contrôlée",
            credited: "Créditée",
            delivered: "Livrée",
            article_count: "{count} article",
            articles_count: "{count} articles",
            finalize_form: 'Cliquez sur le bouton "Continuer ma reprise',
            send_to_receive: "Envoyez vos articles pour recevoir {amount} crédits",
            channel: {
              web: "Reprise effectué en ligne",
              store: "Reprise effectuée en boutique",
            },
            not_found: "Aucune reprise ne correspond à cette url",
            not_validated: {
              title: "Finaliser ma reprise",
              text: "Votre reprise n'a pas été confirmée. Veuillez cliquer sur le bouton ci-dessous pour reprendre votre parcours là où vous l'aviez laissé et confirmer votre reprise.",
              button: "Continuer ma reprise",
            },
          },
          credits_explanation: {
            title: "Comment ça marche ?",
            steps: {
              1: {
                title: "Cliquez sur",
                text: "Convertir en carte cadeau",
              },
              2: {
                title: "Choisissez",
                text: "Où utiliser votre bon : en boutique, sur faume.com ou sur la seconde main",
              },
              3: {
                title: "Sélectionnez",
                text: "Le bon que vous souhaitez utiliser et copier le code",
              },
              4: {
                title: "Validez",
                text: "Coller le code lors de la confirmation de votre panier",
              },
            },
          },
        },
      },
      trade_in: {
        top_bar: "<p>Retour vers <a href='/'>faume-seconde-main.co</a></p>",
        menu: {
          customer: {
            1: "Article",
            2: "Notre offre",
            3: "Identification",
            4: "Envoie",
          },
          store: {
            1: "Vendeur",
            2: "Article",
            3: "Offre",
            4: "Identification",
            5: "Confirmation",
          },
        },
        criteria: {
          title: "Critères d'acceptation",
          text: "Votre article doit être propre et ne présenter ni taches, ni odeurs, ni trous.<br>Il ne doit pas avoir été modifié : il ne doit pas manquer de boutons ou d'autres fournitures.<br>Votre article doit contenir l'étiquette de la marque et les étiquettes de composition interieure et d'entretien.<br>Nous n'acceptons pas les articles de la saison en cours.<br>Nous n'acceptons pas les articles d'une collection anterieure au printemps/ete 2018.<br>XXX ne sont pas inclus.",
          button: "J'accepte",
        },
        add_product: {
          button_continue: "Continuer",
          error: {
            text: "Aucune option n'est disponible, il semblerait que ce produit n'est pas éligible à la reprise",
            button: "Choisir un autre produit",
          },
          sku: {
            name: "Référence",
            title: "Quelle est la référence de votre article ?",
            text: "<p>La référence est un numero qui nous permet d'identifier votre article. <br>Il est imprimé au dos de l'étiquette de lavage cousue à l'intérieur de votre article.</p>",
            label: "Référence *",
            placeholder: "1E15VINC",
            error: "Cette référence n'existe pas ou n'est pas éligible à la reprise",
            help: {
              title: "Où trouver la référence ?",
              text: "La référence est un numéro qui nous permet d'identifier votre article. Il est imprimé au dos de l'étiquette de lavage cousue à l'intérieur de votre article.",
            },
          },
          color: {
            name: "Couleur",
            title: "Quelle est la couleur de votre pièce ?",
          },
          size: {
            name: "Taille",
            title: "Quelle est la taille de votre pièce ?",
          },
          condition: {
            name: "État",
            title: "Dans quel état est votre pièce ?",
            new: "État neuf",
            excellent: "Excellent",
            very_good: "Très bien",
            good: "Bien",
          },
        },
        identification: {
          title: "Identification",
          text: "Connectez-vous avec votre email Faume seconde main ou inscrivez-vous.",
        },
        address: {
          title: "Sélectionnez une adresse",
          empty: "Vous n'avez pas créé d'adresse pour le moment.",
          button_edit: "Modifier",
          button_add: "Ajouter une adresse",
          error_selected_invalid: "L'adresse sélectionnée n'est pas valide.",
          button_confirm: "Valider",
        },
        cart: {
          title: "Notre offre",
          article_count: "{count} article",
          articles_count: "{count} articles",
          title_resume: "Montant de la reprise",
          offer: "Notre offre de reprise",
          terms: "J’accepte d’échanger mon article conformément aux CGU et certifie que ces informations sont exactes.",
          button_confirm: "Recevoir {total} en crédit",
          button_add: "Ajouter un article",
          text: "Dès que nous aurons réceptionné et validé vos articles, un crédit de {total} sera ajouté à votre compte Faume ! Profitez de l'avantage cumulatif de vos reprises : accumulez vos crédits pour les transformer en bons d'achats valables sur l'ensemble de notre gamme, que ce soit pour nos pièces uniques de seconde main ou pour la nouvelle collection Faume",
          amount: "Montant de la reprise : {amount}",
          reference: "Référence : {sku}",
        },
        customer_final: {
          title: "Expédier votre article",
          text: "Nous vous remercions ! Votre demande de reprise a été traitée. Pour beneficier de votre bon d'achat, veuillez suivre les étapes ci-dessous pour nous envoyer votre (vos) article(s)",
          voucher: {
            title: "Et ma carte cadeau ?",
            text: "Un peu de patience, une fois que votre colis aura été receptionné dans notre centre de tri, nos experts valideront l'égibilité de votre piece. Vous recevrez alors par email d'ici 5 à 10 jours votre bon d'achat à dépenser sur Faume, en boutique ou sur Faume seconde main.",
            button_account: "Voir mon compte",
            button_home: "Retour à l'accueil",
          },
          steps: {
            1: {
              title: "Emballer",
              text: "Munissez-vous d’un colis ou emballage pour y mettre vos articles",
            },
            2: {
              title: "Imprimer & signer",
              text: "Téléchargez votre bon de cession, imprimez-le, signez-le et glissez-le dans votre colis",
              button: "Bon de cession",
            },
            3: {
              title: "Imprimer et coller",
              text: "Imprimez votre étiquette prépayée et collez-la sur votre colis",
              button: "Etiquette de transport",
            },
            4: {
              title: "Déposer",
              text: "<ul><li>Dans un des points relais listés <a href='/src/runtime/public'>ici</a></li><li>En bureau de poste</li></ul>",
            },
          },
        },
        error: {
          button: "Recommencer",
          text: "Votre session a expiré, merci d'essayer à nouveau",
        },
        reinsurance: {
          1: "Livraison gratuite à partir de 100€ d'achat",
          2: "Retours gratuits sous 14 jours",
          3: "Articles authentifiés et nettoyés",
          4: "Paiement 100% sécurisé",
        },
      },
      sections: {
        top_bar: 'Retour vers <a href="https://faume.co">faume.co</a>',
        header: {},
        mobile_menu: {
          account: "Mon compte",
          faq: "FAQ",
          contact: "Nous écrire",
          order_tracking: "Suivi de commande",
        },
        announcement_bar: "Livraison offerte dès 100€ d'achat",
        minicart: {
          title: "Mon panier",
          empty: "Votre panier est vide",
          empty_cta: "Continuer mon shopping",
          checkout_button: "Voir mon panier - {total}",
          continue_button: "Continuer mes achats",
        },
        search: {
          placeholder: "Rechercher des produits...",
          empty: "Aucun produit trouvé",
          results: "Résultat de votre recherche",
          collections: "Collections",
        },
        reinsurance: {
          1: {
            title: "",
            text: "Livraison gratuite à partir de 100€ d'achat",
          },
          2: {
            title: "",
            text: "Retours gratuits sous 14 jours",
          },
          3: {
            title: "",
            text: "Articles authentifiés et nettoyés",
          },
          4: {
            title: "",
            text: "Paiement 100% sécurisé",
          },
        },
        newsletter: {
          title: "Newsletter",
          text: "Abonnez-vous à notre newsletter pour vous inspirer, découvrir les nouveaux produits Faume et recevoir des invitations pour des avant-premières.",
          help: "En vous inscrivant, vous acceptez notre politique de confidentialité.",
          button: "S’abonner",
          success_message: "Félicitations ! Vous êtes désormais inscrit(e) à notre newsletter",
          error_message: "Une erreur est survenue, nous ne parvenons pas à vous inscrire. Merci d'essayer ultérieurement.",
        },
        footer: {
          subtitle_1: "Service client",
          subtitle_2: "Faume seconde main",
          subtitle_3: "Pages légales",
          faq: "FAQ",
          contact: "Nous contacter",
          track_order: "Suivre ma commande",
          shipping_return: "Politique de livraison & retour",
          concept: "Notre démarche",
          stores: "Boutiques participantes",
          cgv: "Conditions générales de vente",
          cgu: "Conditions générales d'utilisation",
          term_of_use: "Conditions générales d'utilisation",
          term_of_sell: "Conditions générales de ventes",
          legal_term: "Mentions légales",
          confidentiality: "Politique de confidentialité",
          copyright: "© FAUME 2024",
          faume: "Generated by Faume",
          social_network: {
            facebook: "https://facebook.com/faume.co",
            instagram: "https://instagram.com/faume.co",
            pinterest: "https://www.pinterest/faume.co",
            twitter: "https://twitter.com/faume.co",
            youtube: "https://youtube.com/faume.co",
          },
        },
      },
      global: {
        edit: "Modifier",
        track: "Suivi",
        total: "Total",
        subtotal: "Sous-total",
        shipping: "Livraison",
        free: "Offert",
        free_shipping: "Offerte",
        promotion: "Réduction",
        yes: "Oui",
        no: "Non",
        back: "Retour",
        cancel: "Annuler",
        next: "Suivant",
        validate: "Valider",
        collection: "Collection",
        collections: "Collections",
        page: "Page",
        pages: "Pages",
        home_page: "Accueil",
        product_page: "Fiche produit",
        close: "Fermer",
        categories: "Catégories",
        size: "Taille",
        color: "Couleur",
        id: "Id",
        reference: "Référence",
        form: {
          firstname: "Prénom",
          firstname_helper: "Le prénom ne doit contenir que des lettres.",
          lastname: "Nom",
          lastname_helper: "Le nom ne doit contenir que des lettres.",
          email: "Adresse email",
          email_helper: "",
          password: "Mot de passe",
          password_confirmation: "Confirmation du mot de passe",
          gender: "Genre",
          gender_women: "Femme",
          gender_men: "Homme",
          phone: "Portable",
          phone_invalid: "Le numéro de téléphone n'est pas valide",
          birthdate: "Anniversaire",
          day: "Jour",
          date: "Date",
          time: "Horaire",
          city: "Ville",
          zip: "Code postal",
          address1: "Adresse",
          address2: "Complément d'adresse",
          country: "Pays",
          conditions_of_use: "J'accepte les conditions générales d'utilisation",
          marketing_email: "Je souhaite être informé des offres commerciales par email",
          marketing_sms: "Je souhaite être informé des offres commerciales par sms",
          default_address: "Adresse par défaut",
          order_number: "Numéro de commande",
          promo_code: "Code promo",
          promo_code_error: "Ce code n'existe pas",
        },
        countries: {
          fr: "France",
        },
        conditions: {
          new: {
            title: "État neuf",
            subtitle: "Article neuf, jamais porté/utilisé, avec ou sans étiquette/emballage",
            text: "Article neuf, jamais porté/utilisé, avec étiquette d’origine. <br><br>Ces articles sont concidérés comme étant “Etat neuf” :",
          },
          excellent: {
            title: "Excellent état",
            subtitle: "Très peu porté/utilisé, sans trace d'usure ni defaut<br><br>Il est comme neuf, sauf qu'il n'a plus l'étiquette de vente",
            text: "Lorem ipsum",
          },
          very_good: {
            title: "Très bon état",
            subtitle: "Peu porté, qui peut avoir de légères imperfections mais qui reste en très bon état (traces d'usure mineures invisibles à 20cm, plis d’usure mineurs, talon en très bon état)",
            text: "Lorem ipsum",
          },
          good: {
            title: "Bon état",
            subtitle: "Peu porté, qui peut avoir de légères imperfections mais qui reste en très bon état (traces d'usure mineures invisibles à 20cm, plis d’usure mineurs, talon en très bon état)",
            text: "Lorem ipsum",
          },
          bad: {
            title: "Mauvais état",
            subtitle: "Présente des marques d'usage",
            text: "Lorem ipsum",
          },
        },
        days: {
          monday: "Lundi",
          tuesday: "Mardi",
          wednesday: "Mercredi",
          thursday: "Jeudi",
          friday: "Vendredi",
          saturday: "Samedi",
          sunday: "Dimanche",
        },
      },
      menu: {
        concept: "Notre démarche",
        sell: "Vendre",
        sell_online: "Vendre en ligne",
        sell_store: "Vendre en boutique",
        store_locator: "Boutiques participantes",
        trade_in: "Estimer la valeur de mes pièces",
        faq: "FAQ",
        stores: "Boutiques participantes",
        subtitle_selections: "Nos sélections",
        subtitle_categories: "Nos categories",
        subtitle_sizes: "Shoppe par taille",
        new: "Nouveautés",
        all: "Tous nos produits",
        sell_all: "Voir tout",
        sizes: "Shopper par taille",
        selections: "Nos sélections",
        categories: "Les catégories",
        femme: {
          femme: "Femme",
          xxs: "XXS",
          xs: "XS",
          s: "S",
          m: "M",
          l: "L",
          xl: "XL",
          robes: "Robes",
          mailles: "Mailles",
          "vestes-manteaux": "Vestes & MAnteaaux",
          sweatshirts: "Sweatshirts",
          "chemises-blouses": "Chemises & Blouses",
          "top-t-shirts": "Tops & T-shirts",
          "jeans-pantalons": "Jeans & Pantalons",
          jupes: "Jupes",
          chaussures: "Chaussures",
          news: "Nouveautés",
        },
        homme: {
          homme: "Homme",
          xs: "XS",
          s: "S",
          m: "M",
          l: "L",
          xl: "XL",
          "t-shirts-polos": "T-shirts & Polos",
          mailles: "Mailles",
          "vestes-manteaux": "Vestes & Manteaux",
          sweatshirts: "Sweatshirts",
          chemises: "Chemises",
          "jeans-pantalons": "Jeans & Pantalons",
          shorts: "Shorts",
          chaussures: "Chaussures",
          news: "Nouveautés",
        },
      },
      promotional_offers: {
        20: "- 20% supplémentaire",
        amount_left_free_shipping: "Plus que <strong>{amount}</strong> pour bénéficier de la livraison offerte",
      },
    },
  },
}));
