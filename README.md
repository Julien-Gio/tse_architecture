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

# Présentation du rendu
Ce repository contient le code source pour un site type intranet pour la création et la gestion de mobilités étudiantes. 
La platforme est accessible pour des comptes de type étudtants ou administrateur, plus de détails dans la partie **Fonctionnalités**.

# Choix Technologiques
## Serveur et client
Ayant déjà une expérience construction de site en PHP, j'ai décidé de construire mon site avec **Node.js** et le framework **ElectionJS**. 
Pour facilité et accélérer le développement front (qui n'est pas la focalité du projet), je me suis aidé de **Bootstrap 4**.
### Structure de code
Le coeur de l'application est dans le fichier app.js. Il gère la

## Base de données
La base de données est en **MySQL**.


### Structure de la BDD

# Fonctionnalités

## Landing
N'etant pas encore connécté, seulement deux pages sont accésibles : `/login` et `/signup`.
### Connéxion
*Capture d'écran*

### Création de comtpe
*capture décran*

## Compte Etudiant

### Page d'acceuil

### Création et modification de voyages
Un étudiant peut créer un voyage directement depuis sa page d'acceuil.  
Il faut donc renseigné un nom de voyage, un début, un fin, et une déstination (pays, ville).  
En cliquant sur un voyage sur la page d'acceuil, tous ses champs pourons être modifiés ultérieurement si nécéssaire, sauf pour le titre du voyage.  
Dans l'évantualité où un voyage est annulé, il peut aussi être supprimé.  

## Compte admin
*capture d'écran*

### Filtrages
Par défaut l'adminitrateur voit la liste complète des voyages en mémoire. Sur la gauche de l'écran, cette liste peut être filtée par une mutlitude de critères.
- *Nom de l'étudiant* : Un nom d'étudiant peut être renseigné (le prénom, ou même une parti du nom/prénom marchent aussi).
- *Pays* : Filtrer par pays de déstination.
- *Status* : Filtre les voyages *Terminés*, *En cours* ou *A venir*.
- *Promo* : Filtre par la promotion actuelle des étudiants.  
Evidemment, ces quatre filtres peuvent être cummulés pour trouver plus facilement les voyages en question.

### Carte interactive
Une carte affiche les voyages présents dans la liste en les groupant pas pays. Les filtres sont conservés.  
Cette carte permet de facilement visualiser les mobilités des étudiants des FISE3 par exemple. 

### Modification de voyages

# Prise de recule
Je suis content du site que j'ai pu contruire, et j'ai beaucoup appris tout au long. Ce projet à commencé en octobre 2020 et m'a permis d'apprendre beaucoup sur le développement sites (notamment les différentes structures qui existent). En janvier/février 2021, nous avons vu les API en cours d'IHM. Une telle architecture aurait été idéale pour ce projet, mais la structure actuelle du code ne me permettait pas de facilement intégrer une architecture d'API.  

---

##### *Julien Giovinazzo*