*TD Architecture N-Tiers 2020-2021*

---

# Présentation du rendu
Ce repository contient le code source pour un site type intranet pour la création et la gestion de mobilités étudiantes. 
La platforme est accessible pour des comptes de type étudtants ou administrateurs, plus de détails se trouvent dans la partie **Fonctionnalités**.

# Choix Technologiques
## Serveur et client
Ayant déjà une expérience construction de site en PHP, j'ai décidé de construire mon site avec **Node.js** et le framework **Express.js** pour être familier avec un plus grand panel de technologies.

Pour facilité et accélérer le développement front (qui n'est pas la focalité du projet), je me suis aidé de **Bootstrap 4**.

### Structure de code
Le coeur de l'application est dans le fichier `app.js`. Il gère tout le routing et, avec `www`, s'occupe de lancer l'application.  

L'arhcitecture du site est une architecture *4-tiers* :

`[Client] <-> [Controlleurs et Vues] <-> [Modèles] <-> [BDD]`

## Base de données
La base de données est en **MySQL**.

### Structure de la BDD
Tables (*PK* : Primary Key, *FK* : Foreign Key, *U* : Unique) :

- `Users (user_id *PK*, lastname, firstname, role, id_promo *FK*)`
- `Trips (trip_id *PK*, user_id *FK*, display_name, city_name, country_name, start_date, end_date)`
- `Promos (id_promo *PK*, promo_name *U*)`


# Fonctionnalités

## Landing
N'etant pas encore connécté, seul deux pages sont accésibles : `/` et `/signup`.
### Connéxion (`/`)
Les comptes sont idéntifiés par `nom.prénom` comme sur l'intranet actuel de TSE.  

Pour cette démontration, les mots de passes sont entièrement ignorés.

### Création de comtpe (`/signup`)
La création de compte (étudiant et adminitrateur) est simple. Il suffit de renseigner son nom complet, son rôle, et - dans le cas de l'étudiant - sa promotion.

## Compte étudiant

### Page d'acceuil
Sur la page d'accueil, un édudiant trouvera de breves instructions (je pars du principe qu'un étudiant ne passera que peu de temps sur cette interface) et un liste de tous ses voyages. Il peut facilement renseigner une nouvelle mobilité avec un large bouton après la liste.

### Création et modification de voyages
Il faut donc renseigné un nom de voyage, un début, une fin, et une déstination (pays et ville).  
En cliquant sur un voyage sur la page d'acceuil, tous ses champs pourons être modifiés ultérieurement si nécéssaire, sauf pour le titre du voyage.  
Dans l'évantualité où un voyage est annulé, il peut aussi être supprimé via la page de modification. 

## Compte administrateur
### Filtrages
Par défaut l'adminitrateur voit la liste complète des voyages en mémoire. Sur la gauche de l'écran, cette liste peut être filtée par une mutlitude de critères.

- *Nom de l'étudiant* : Un nom d'étudiant peut être renseigné (le prénom, ou même une parti du nom/prénom marchent aussi).
- *Pays* : Filtre par pays de déstination.
- *Status* : Filtre les voyages *Terminés*, *En cours* ou *A venir*.
- *Promo* : Filtre par la promotion actuelle des étudiants.  

Evidemment, ces quatre filtres peuvent être cummulés pour trouver plus facilement les voyages en question.  

### Carte interactive
Une carte affiche les voyages présents dans la liste en les groupant par pays. Les filtres mentionnées précédement sont conservés.  
Cette carte permet de facilement visualiser les mobilités des étudiants en FISE3 par exemple. 

### Modification de voyages
Tout comme un compte étudiant, l'administrateur peut modifier les champs d'un voyage donné (hors mis sont titre).

# Prise de recule
Je suis content du site que j'ai pu contruire, et j'ai beaucoup appris tout au long. Ce projet à commencé en octobre 2020 et m'a permis d'apprendre beaucoup sur le développement sites (notamment les différentes structures qui existent). En janvier/février 2021, nous avons vu les API en cours d'IHM. Une telle architecture aurait été idéale pour ce projet, mais la structure actuelle du code ne me permettait pas de facilement intégrer une architecture d'API.  

---

##### *Julien Giovinazzo*
