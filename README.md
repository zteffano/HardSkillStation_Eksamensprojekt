  <div align="center">
  
  <img src="frontend\public\assets\images\HSS_Logo.webp" alt="logo" width="400" height="auto" />
 
  
  --- 
  
  <h1>Eksamensprojekt PBW & PBI - Gruppe 1</h1>
  
  <p>
    Eksamensprojektet med udgangspunkt i Hard Skill station som en CASE!
  </p>

  <h4>
    <a href="#om-projektet">Introduktion</a>
  <span> · </span>
    <a href="#resultat">Vores Produkt</a>
  <span> · </span>
      <a href="#installation">Installation</a>
  <span> · </span>
    <a href="#backend">Backend</a>
  <span> · </span>
    <a href="#frontend">Frontend</a>
    <span> · </span>
    <a href="#teamet">Teamet bag</a>
  </h4>

  </div>

<!-- OM PROJEKTET -->
## 🗒️ Projekt Introduktion
<div id="om-projektet">
Vi fik til opgave at fokuserer på udviklingen af et website for Hard Skills Station (HSS) ved Campus Kolding. HSS tilbyder workshops, kurser og micro-credentials primært inden for digitale områder til studerende og alumner fra IBA, SDU, UC Syd og Designskolen Kolding. Vores mål er at skabe en brugervenlig og let navigerbar hjemmeside, der tillader HSS-brugere at selvstændigt opdatere informationer. Hjemmesiden vil være tilgængelig på både dansk og engelsk og vil give et hurtigt overblik over kommende og tidligere kurser.
<br><br>

<details>
<summary>CASE Opgaver</summary>
  
1. **Design og Frontendudvikling:** Skabe et layout, der afspejler HSS's brand og værdier. Implementere responsive webdesign med HTML, CSS og JavaScript.
2. **Brugeroplevelse og Informationsarkitektur:** Integrere UX-principper for at optimere brugervenlighed og æstetik. Analysere brugeradfærd for at strukturere hjemmesidens indhold og navigationsflow.
3. **Backendudvikling og Systemintegration:** Udvikle en softwarearkitektur, der leverer høj ydeevne og tilgængelighed. Integrere cloud-tjenester for databaselagring og webstedshosting.
4. **API Implementering:** Anvende dynamiske informationer til udvikling af en eventkalender. Implementere en microservice for datatransformation og tilpasse data til eget web-API.
5. **Samarbejde og Projektledelse:** Udvikle strategier for kommunikation og tidsstyring inden for teamet, samt håndtere konflikter for effektivt samarbejde.

</details>

<details>
<summary>Dokumentation og Rapportering:</summary>
  
Vi skal udarbejde en detaljeret akademisk rapport på max 25 sider og forberede en præsentation af det færdige projekt for HSS.
Der er et projektmøde i projektuge 1, hvor projektplanen skal godkendes.

</details>

<details>
<summary>Forventede Leverancer</summary>
  
- Produkt via link til GIT.
- Akademisk rapport på maksimalt 25 sider.
- Præsentation til HSS.

</details>
</div>
---

<!-- OM PRODUKTET -->
## 🎯 Vores Produkt
<div id="resultat">
Hard Skills Station er en innovativ platform designet til at forbinde studerende og alumner fra Koldings campuser med lokale virksomheder, der tilbyder eftertragtede workshops og kurser. Dette projekt er udviklet med en dyb forståelse af brugerbehov gennem omfattende UX design og research. Vores løsning inkluderer en brugervenlig hjemmeside, der er nem at navigere og giver mulighed for selvstændig opdatering af indhold af personalet. Den giver et klart overblik over både kommende og tidligere kurser og er tilgængelig på både dansk og engelsk.

Teknisk set anvender vi en microservice arkitektur for effektiv datahåndtering og nem integration med samarbejdspartnere gennem et moderne Web API. Platformens robusthed og tilgængelighed er forbedret ved hjælp af cloud-baserede løsninger, hvilket sikrer en fleksibel og skalerbar infrastruktur klar til fremtidige behov og teknologier.

Gennem denne platform, tilbyder vi Hard Skills Station en omfattende løsning til formidling og administration af deres udbud af kurser og workshops, styrket af moderne teknologi og et brugerdrevet design.
<br><br>

## :hammer_and_pick: Projekt Værktøjer

<div align="center">

| Kategori                     | Værktøjer & Metoder                                       |
|------------------------------|-----------------------------------------------------------|
| **Source Control**           | Github (branches, pull requests, reviews, merges)         |
| **Projektmetode**            | Agile Scrum                                               |
| **Projektstyringsværktøjer** | Github Projects, GANT CHART, WBS, SCRUM, Google Docs     |
| **Kommunikation**            | Discord, Github                                           |
| **IDE's**                    | Visual Studio, Visual Studio Code                         |
| **Cloud**                    | Amazon Web Services (AWS) Portal & AWS CLI                |
| **Programmeringssprog**      | HTML,CSS, JS, C# ASP.NET, Python, Bash, MySQL             |
| **Tests**                    | pytest, Selenium & Swagger(OpenAPI)                       |
| **Værd at Nævne**            | ChatGPT, Stackoverflow, Google, Liveshare i Visual Studio |

</div>

---



<!-- Getting Started -->
## 	:toolbox: Installation

<div id="installation">

Clone af projektet

```bash
  git clone https://github.com/..../HardSkillStation_Eksamensprojekt
```


Build af backend med Docker
```bash
 cd HardSkillStation_Eksamensprojekt/backend/WEBAPI_SOLUTION
 docker build -t hsswebapi  -f HSS_WEBAPI_MICROSERVICE/Dockerfile .
 ```

Lokal kørsel af WebApi på port 1337 (localhost:1337)

```bash
docker run  --name <webapi-navn> -e DB_SERVER=<serveraddresse> -e DB_DATABASENAME=<databasenavn> -e DB_USER=<username> -e DB_PASSWORD=<password> -p 1337:80 -d hsswebapi:latest
 ```

Justerer Endpoints i HSSApi.js til korrekt addresse

```javascript
// hvis du kører lokalt brug localhost:1337
const BASE_URL = "http://hss.zteffano.dk:1337" //Skift denne
```

Start frontend server
```bash
cd HardSkillStation_Eksamensprojekt/frontend/public
npm start
 ```

</div>

<!-- Backend -->
## :compass: Backend

<div id="backend">
  
<details>
  <summary>Overblik</summary>
  <p>Hej hej ja hej hej HSS hej</p>

</details>

<details>
  <summary>Database</summary>
  <p>Hej hej ja hej hej HSS hej</p>
</details>

<details>
<summary>Web Api</summary>
  <p>Hej hej ja hej hej HSS hej</p>
</details>

<details>
<summary>Cloud Integration</summary>
  <p>Hej hej ja hej hej HSS hej</p>
</details>
<details>
<summary>Tests</summary>
  <p>Hej hej ja hej hej HSS hej</p>
</details>

</div>

<!-- Frontend -->
## :art: Frontend

<div id="frontend">

<details>
  <summary>Overblik</summary>
  <p>Hej hej ja hej hej HSS hej</p>
</details>

<details>
  <summary>UX Research</summary>
  <p>Hej hej ja hej hej HSS hej</p>
</details>

<details>
<summary>UX Design</summary>
  <p>Hej hej ja hej hej HSS hej</p>

| Farvevalg         | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#222831](https://via.placeholder.com/10/222831?text=+) #222831 |
| Secondary Color | ![#393E46](https://via.placeholder.com/10/393E46?text=+) #393E46 |
| Accent Color | ![#00ADB5](https://via.placeholder.com/10/00ADB5?text=+) #00ADB5 |
| Text Color | ![#EEEEEE](https://via.placeholder.com/10/EEEEEE?text=+) #EEEEEE |

  
</details>

<details>
<summary>Tech stack</summary>
  <p>Hej hej ja hej hej HSS hej</p>
  

</details>

<details>
<summary>Konstruktion</summary>
  <p>Hej hej ja hej hej HSS hej</p>
</details>

</div>

## :wave: Teamet 

<div id="teamet" align="center">

 | ![Phillip](https://contrib.rocks/image?repo=Louis3797/awesome-readme-template) |  ![Andre](https://contrib.rocks/image?repo=Louis3797/awesome-readme-template) | ![Marcus](https://contrib.rocks/image?repo=Louis3797/awesome-readme-template) | ![Crispin](https://contrib.rocks/image?repo=Louis3797/awesome-readme-template) | ![Steffan](https://contrib.rocks/image?repo=Louis3797/awesome-readme-template) |
| :---: | :---: | :---: | :---: | :---: |
| [Phillip](https://github.com/Pschioeler) | [Andre](https://github.com/macand842e) | [Marcus](https://github.com/marcusbvn) | [Crispin](https://github.com/cuipin) | [Steffan](https://github.com/zteffano) |

</div>

---

<div align="center">
  GG
</div>
