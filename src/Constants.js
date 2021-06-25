export const domainName = "http://api.opengate.lan"

export const DNS_records = [
  "NONE",
  "A",
  "NS",
  "MD",
  "MF",
  "CNAME",
  "SOA",
  "MB",
  "MG",
  "MR",
  "NULL",
  "WKS",
  "PTR",
  "HINFO",
  "MINFO",
  "MX",
  "TXT",
  "RP",
  "AFSDB",
  "X25",
  "ISDN",
  "RT",
  "NSAP",
  "NSAP-PTR",
  "SIG",
  "KEY",
  "PX",
  "GPOS",
  "AAAA",
  "LOC",
  "NXT",
  "SRV",
  "NAPTR",
  "KX",
  "CERT",
  "A6",
  "DNAME",
  "OPT",
  "APL",
  "DS",
  "SSHFP",
  "IPSECKEY",
  "RRSIG",
  "NSEC",
  "DNSKEY",
  "DHCID",
  "NSEC3",
  "NSEC3PARAM",
  "TLSA",
  "HIP",
  "CDS",
  "CDNSKEY",
  "CSYNC",
  "SPF",
  "UNSPEC",
  "EUI48",
  "EUI64",
  "TKEY",
  "TSIG",
  "IXFR",
  "AXFR",
  "MAILB",
  "MAILA",
  "ANY",
  "URI",
  "CAA",
  "TA",
  "DLV",
];

export const DNS_records_supported = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA"];

export const Two_Chart_colors = ["rgba(103, 158, 203, 0.7)", "rgba(255, 159, 64, 0.7)"];
export const Four_Chart_colors = ["rgba(103, 158, 203, 0.7)", "rgba(255, 159, 64, 0.7)", "rgba(153, 102, 255, 0.7)", "rgba(255, 99, 132, 0.7)"];

export const protocolsList = ["TCP", "UDP"];

export const users = [
  { username: "admin", email: "", lastName: "", firstName: "OpenGate ADMIN", group: "SUPER ADMIN" },
  {
    username: "cocheta",
    email: "axel.cochet@edu.esiee.fr",
    lastName: "Cochet",
    firstName: "Axel",
    group: "ADMIN",
  },
  {
    username: "desplanchl",
    email: "louis.desplanche@edu.esiee.fr",
    lastName: "Desplanche",
    firstName: "Louis",
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
    username: "lefevret",
    email: "theo.lefevre@edu.esiee.fr",
    lastName: "Lefevre",
    firstName: "Theo",
    group: "ADMIN",
  },
  {
    username: "warys",
    email: "sebastien.wary@edu.esiee.fr",
    lastName: "Wary",
    firstName: "Sébastien",
    group: "USER",
  },
];

export const groupsList = ["ADMIN", "SUPER ADMIN", "USER"];

export const permissionsList = [
  ["interface, ", "docker, ", "dhcp, ", "dns, ", "nat, ", "services"],
  ["interface, ", "docker, ", "dhcp, ", "dns", "nat, ", "users, ", "groups, ", "services"],
  ["services"],
];
