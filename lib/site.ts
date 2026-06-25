export const siteConfig = {
  name: "Instituto Ongato",
  url: "https://ongato.com.br",
  description:
    "ONG de animais em Manaus dedicada ao resgate, cuidado e adocao responsavel de gatos e caes.",
  locale: "pt_BR",
  city: "Manaus",
  region: "AM",
  country: "BR",
  email: "contato@ongato.org.br",
  phone: "+55 92 96033-2119",
  whatsapp: "5592960332119",
  instagram: "https://www.instagram.com/institutoongato",
  cnpj: "00.000.000/0001-00",
  address: "Manaus, AM",
};

export const publicRoutes = [
  { path: "/", priority: 1 },
  { path: "/adocao/", priority: 0.95 },
  { path: "/doar/", priority: 0.9 },
  { path: "/sobre/", priority: 0.75 },
  { path: "/eventos/", priority: 0.7 },
  { path: "/contato/", priority: 0.8 },
];
