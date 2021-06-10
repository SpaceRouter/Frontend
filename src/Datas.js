export const users = [
  {
    username: "cocheta",
    email: "axel.cochet@edu.esiee.fr",
    lastName: "Cochet",
    firstName: "Axel",
    group: "ADMIN",
  },
  {
    username: "hugerv",
    email: "victor.huger@edu.esiee.fr",
    lastName: "Huger",
    firstName: "Victor",
    group: "ADMIN",
  },
  {
    username: "lefevt",
    email: "theo.lefevre@edu.esiee.fr",
    lastName: "Lefevre",
    firstName: "Theo",
    group: "USER",
  },
  {
    username: "henryg",
    email: "guillaume.henry@edu.esiee.fr",
    lastName: "Henry",
    firstName: "Guillaume",
    group: "USER",
  },
  {
    username: "desplanchl",
    email: "louis.desplanche@edu.esiee.fr",
    lastName: "Desplanche",
    firstName: "Louis",
    group: "SUPER ADMIN",
  },
  {
    username: "barons",
    email: "samuel.baron@edu.esiee.fr",
    lastName: "Baron",
    firstName: "Samuel",
    group: "USER",
  },
];

export const groupsList = ["ADMIN", "SUPER ADMIN", "USER"];

export const app = [
  {
    photo: "https://wiki.zaclys.com/images/thumb/8/87/Nextcloud_logo_blanc.png/100px-Nextcloud_logo_blanc.png",
    nom: "NextCloud",
    id: "custom-switch1",
  },
  {
    photo: "https://wiki.zaclys.com/images/thumb/8/87/Nextcloud_logo_blanc.png/100px-Nextcloud_logo_blanc.png",
    nom: "NextCloud",
    id: "custom-switch2",
  },
  {
    photo: "https://wiki.zaclys.com/images/thumb/8/87/Nextcloud_logo_blanc.png/100px-Nextcloud_logo_blanc.png",
    nom: "FirstCloud",
    id: "custom-switch3",
  },
  {
    photo: "https://wiki.zaclys.com/images/thumb/8/87/Nextcloud_logo_blanc.png/100px-Nextcloud_logo_blanc.png",
    nom: "FirstCloud",
    id: "custom-switch4",
  },
  {
    photo: "https://wiki.zaclys.com/images/thumb/8/87/Nextcloud_logo_blanc.png/100px-Nextcloud_logo_blanc.png",
    nom: "NextCloud",
    id: "custom-switch5",
  },
  {
    photo: "https://wiki.zaclys.com/images/thumb/8/87/Nextcloud_logo_blanc.png/100px-Nextcloud_logo_blanc.png",
    nom: "FirstCloud",
    id: "custom-switch6",
  },
];

export const firewall = [
  {
    protocoles: "TCP",
    port_entree: "3389",
    port_destination: "3389",
    ip: "192.168.1.51",
  },
  {
    protocoles: "TCP",
    port_entree: "3389",
    port_destination: "3389",
    ip: "192.168.1.52",
  },
  {
    protocoles: "TCP",
    port_entree: "3389",
    port_destination: "3389",
    ip: "192.168.1.53",
  },
  {
    protocoles: "TCP",
    port_entree: "3389",
    port_destination: "3389",
    ip: "192.168.1.54",
  },
];

export const protocolesList = ["TCP", "UDP", "TCP/UDP"];
