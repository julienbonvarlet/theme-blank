import type { CookieConsentConfig } from "vanilla-cookieconsent";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
    },
    preferencesModal: {
      layout: "box",
    },
  },

  onFirstConsent: () => {
    console.log("onFirstAction fired");
  },

  onConsent: () => {
    matomoInitConsent();
  },

  onChange: () => {
    console.log("onChange fired ...");
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
    ads: {},
  },

  language: {
    default: "fr",

    translations: {
      fr: {
        consentModal: {
          title: "Vos paramètres de cookies",
          description:
            "Notre site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi pour comprendre comment vous interagissez avec lui. Ces derniers ne seront installés qu'après consentement.",
          acceptAllBtn: "Accepter",
          acceptNecessaryBtn: "Refuser",
          showPreferencesBtn: "Modifier mes préférences",
          footer: `<a href="#link">Politique de confidentialité</a>`, // À adapter
        },
        preferencesModal: {
          title: "Préférences concernant les cookies",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Tout rejeter",
          savePreferencesBtn: "Sauvegarder les préférences",
          sections: [
            {
              title: "Votre confidentialité",
              description:
                "Ces cookies sont nécessaires au fonctionnement du site Web et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement établis en tant que réponse à des actions que vous avez effectuées et qui constituent une demande de services, telles que la définition de vos préférences en matière de confidentialité, la connexion ou le remplissage de formulaires. Vous pouvez configurer votre navigateur afin de bloquer ou être informé de l'existence de ces cookies, mais certaines parties du site Web peuvent être affectées. Ces cookies ne stockent aucune information d’identification personnelle.",
            },
            {
              title: "Cookies strictement nécessaires",
              description:
                "Ces cookies sont nécessaires au fonctionnement du site Web et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement établis en tant que réponse à des actions que vous avez effectuées et qui constituent une demande de services, telles que la définition de vos préférences en matière de confidentialité, la connexion ou le remplissage de formulaires. Vous pouvez configurer votre navigateur afin de bloquer ou être informé de l'existence de ces cookies, mais certaines parties du site Web peuvent être affectées. Ces cookies ne stockent aucune information d’identification personnelle.",
              linkedCategory: "necessary",
            },
            {
              title: "Cookies de performance",
              description:
                "Ces cookies nous permettent de déterminer le nombre de visites et les sources du trafic, afin de mesurer et d’améliorer les performances de notre site Web. Ils nous aident également à identifier les pages les plus / moins visitées et d’évaluer comment les visiteurs naviguent sur le site Web. Toutes les informations collectées par ces cookies sont agrégées et donc anonymisées. Si vous n'acceptez pas ces cookies, nous ne serons pas informé de votre visite sur notre site.",
              linkedCategory: "analytics",
            },
            {
              title: "Cookies pour une publicité ciblée",
              description:
                "Ces cookies peuvent être mis en place au sein de notre site Web par nos partenaires publicitaires. Ils peuvent être utilisés par ces sociétés pour établir un profil de vos intérêts et vous proposer des publicités pertinentes sur d'autres sites Web. Ils ne stockent pas directement des données personnelles, mais sont basés sur l'identification unique de votre navigateur et de votre appareil Internet. Si vous n'autorisez pas ces cookies, votre publicité sera moins ciblée.",
              linkedCategory: "ads",
            },
            {
              title: "Plus d'informations",
              description: 'Pour toute question relative à notre politique en matière de cookies et à vos choix, veuillez nous <a class="cc__link" href="/pages/contact">contacter</a>.',
            },
          ],
        },
      },
    },
  },
};

function matomoInitConsent() {
  if (process.client) {
    const _paq = (window._paq = window._paq || []);
    _paq.push(["rememberConsentGiven"]);
    _paq.push(["rememberCookieConsentGiven"]);
  }
}

export default defineNuxtPlugin(async () => {
  await CookieConsent.run(config);

  return {
    provide: {
      CC: CookieConsent,
    },
  };
});
