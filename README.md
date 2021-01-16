# TD Architecture N-Tiers 2020-2021

1. Mise en place de l’environnement de travail
    a. Machine virtuelle « serveur » embarquant les technologies nécessaires (a minima
    un serveur web, un container web type PHP, une base de données, type Mysql)
    b. Mise en place de l’accès client externe vers le serveur (routage NAT)
2. Développement d’une application client serveur permettant de suivre les demandes de
mobilité des élèves de l’école. Une mobilité est décrite par un nom d’élève, sa promotion,
une ville et un pays de destination, une date de début et de fin de séjour.
3. L’application devra permettre
    a. L’ajout d’une mobilité. Une demande est décrite par ses différents champs et une
    date de soumission
    b. La modification et la suppression d’une demande préexistante
    c. La recherche de de demandes par étudiant, par pays, par date, par promo
    d. La recherche multicritère (par promo et pays par exemple)
4. L’affichage sur une carte des étudiants en mobilité.

# Général
Responsive

# L'interface Administrateur
## Recherche
TODO

## La liste
TODO

## La carte
La carte affiche les voyages dans la liste en les groupant pas pays.
La carte ne s'affiche pas sur mobile (Ordinateur et grandes tabletes uniquement).