const collections = [
  {
    slugName: "femme",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/Artboard_8_1000x.png?v=1711359754",
    parent: null,
  },
  {
    slugName: "homme",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPH01910-6020-13_ac4200be-40e9-4848-b3a3-7df61a6efd57_700x.jpg?v=1710868746",
    parent: null,
  },
  {
    slugName: "femme---xxs",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-13_1500x.jpg?v=1708352242",
    parent: "femme",
  },
  {
    slugName: "femme----xs",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-14_1500x.jpg?v=1708352242",
    parent: "femme",
  },
  {
    slugName: "femme---robes",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/Artboard_2_fd9f688c-7c42-43b8-a5cd-e444def6c7ad_600x.jpg?v=1708552967",
    parent: "homme",
  },
  {
    slugName: "homme---s",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPH01913-2000-13_700x.jpg?v=1708341737",
    parent: "homme",
  },
  {
    slugName: "femme---nouveautés",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/Artboard_6_0f98140f-e684-48f5-b2e8-1c8c866ec985_1600x.jpg?v=1708553027",
    parent: "homme",
  },
  {
    slugName: "femme---vestes-&-manteaux",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPR01607-2084-13_700x.jpg?v=1708349734",
    parent: "homme",
  },
  {
    slugName: "femme---mailles",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/Artboard_3_080502f4-91a3-48c3-a352-bb0ce202af5a_600x.jpg?v=1708553148",
    parent: "femme",
  },
  {
    slugName: "femme---sweatshirts",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/Artboard_3_080502f4-91a3-48c3-a352-bb0ce202af5a_600x.jpg?v=1708553148",
    parent: "femme",
  },
  {
    slugName: "femme---chemises-&-blouses",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPR01607-2084-13_700x.jpg?v=1708349734",
    parent: "femme",
  },
  {
    slugName: "femme---top-&-t-shirts",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPP01627-4039-13_1500x.jpg?v=1708347769",
    parent: "femme",
  },
  {
    slugName: "femme---jeans-&-pantalons",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/Artboard_6_0f98140f-e684-48f5-b2e8-1c8c866ec985_1600x.jpg?v=1708553027",
    parent: "femme",
  },
  {
    slugName: "femme---jupes",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPP01627-1000-11_700x.jpg?v=1708347592",
    parent: "femme",
  },
  {
    slugName: "femme---combinaison",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPP01627-1502-13_700x.jpg?v=1708347676",
    parent: "homme",
  },
  {
    slugName: "femme----chaussures",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPV00497-2082-13_700x.jpg?v=1708352058",
    parent: "femme",
  },
  {
    slugName: "femme---s",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPR01666-1500-13_700x.jpg?v=1708350795",
    parent: "femme",
  },
  {
    slugName: "femme---m",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-22_0d15baf5-ffbb-4019-9c94-7bdfc8d263f2_1500x.jpg?v=1711447232",
    parent: "femme",
  },
  {
    slugName: "femme---l",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-12_1500x.jpg?v=1708352236",
    parent: "homme",
  },
  {
    slugName: "femme---xl",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402WPV01196-8010-11_1500x.jpg?v=1708352236",
    parent: "femme",
  },
  {
    slugName: "homme---t-shirts-&-polos",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPH00493-4051-13_1100x.jpg?v=1708341377",
    parent: "homme",
  },
  {
    slugName: "homme---mailles",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPR01782-2086-13_e04b89ca-dd3a-4516-98c4-55eb36c03393_700x.jpg?v=1710856013",
    parent: "homme",
  },
  {
    slugName: "homme---vestes-&-manteaux",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPR00051-1502-13_1100x.jpg?v=1708342094",
    parent: "homme",
  },
  {
    slugName: "homme---sweatshirts",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPR01916-1501-13_700x.jpg?v=1708345779",
    parent: "homme",
  },
  {
    slugName: "homme---chemises",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPP01772-2000-13_700x.jpg?v=1708444859",
    parent: "homme",
  },
  {
    slugName: "homme---jeans-&-pantalons",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPV00053-1000-11_700x.jpg?v=1708346031",
  },
  {
    slugName: "homme---shorts",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPR01781-8010-13_700x.jpg?v=1708445112",
    parent: "homme",
  },
  {
    slugName: "homme---chaussures",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPR01775-2086-13_1100x.jpg?v=1708445006",
    parent: "homme",
  },
  {
    slugName: "homme---xs",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPM01908-3012-13_6414014b-e240-4e91-8454-6b459f33b447_1100x.jpg?v=1711453769",
    parent: "homme",
  },
  {
    slugName: "homme---m",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPR01780-2033-13_700x.jpg?v=1708342520",
    parent: "homme",
  },
  {
    slugName: "homme---l",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPP00015-2000-13_1100x.jpg?v=1708342034",
    parent: "homme",
  },
  {
    slugName: "homme---xl",
    banner: null,
    thumbnail:
      "https://www.fromfuture.com/cdn/shop/files/2402MPR01915-1501-13_700x.jpg?v=1708341290",
    parent: "homme",
  },
];

export default collections;
