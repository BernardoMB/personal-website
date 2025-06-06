import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { Project } from '../view-models/project.interface';
import { ProjectsYear } from '../view-models/projects-year.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  years = [
    {
      year: 2014,
      projects: [
        {
          id: 1,
          name: 'ITJ Math',
          code: 'ITJM',
          thumbnail: 'assets/images/portfolio/MSIcons/ITJMath.svg',
          description: `
            <p>This application was originally designed for students at ITJ (Thomas Jefferson Institute).</p>
            <p>With this application student were able to compute common values for specifical mathematical problems. It served as a usefull tool to check answers. It also has a section were student were able to check all mathematical formulas for a given type of problem.</p>
            <p>Among it's several functionalities, it has a portal where teachers were able to upload tasks so students can review them later at home.</p>
            <p><b>Features</b></p>
            <ul>
              <li>Calculator</li>
              <li>Mathematical cheat sheet</li>
              <li>School portal</li>
              <li>Homework repository</li>
              <li>Blog</li>
            </ul>
            <p><b>Technologies</b></p>
            <ul>
              <li>OS: iOS 5</li>
              <li>Languages: Objective-C</li>
              <li>Tools: XCode</li>
            </ul>
            <a href="https://github.com/BernardoMB">Repo</a>
          `,
          images: [
            'assets/images/portfolio/ITJM/ITJMath01.png',
            'assets/images/portfolio/ITJM/ITJMath02.png',
            'assets/images/portfolio/ITJM/ITJMath03.png',
            'assets/images/portfolio/ITJM/ITJMath04.png',
            'assets/images/portfolio/ITJM/ITJMath05.png',
            'assets/images/portfolio/ITJM/ITJMath06.png',
            'assets/images/portfolio/ITJM/ITJMath07.png',
            'assets/images/portfolio/ITJM/ITJMath08.png',
            'assets/images/portfolio/ITJM/ITJMath09.png',
            'assets/images/portfolio/ITJM/ITJMath10.png'
          ]
        }
      ]
    },
    {
      year: 2015,
      projects: [
        {
          id: 2,
          name: 'Morpheus',
          code: 'MPHS',
          thumbnail: 'assets/images/portfolio/MSIcons/Maps.svg',
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2016,
      projects: [
        {
          id: 3,
          name: 'Trinity',
          code: 'TRNY',
          thumbnail: 'assets/images/portfolio/MSIcons/LinkAnalysis.svg',
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2017,
      projects: [
        {
          id: 4,
          name: 'Matrix Catcher',
          code: 'IMSI',
          thumbnail: 'assets/images/portfolio/MSIcons/MatrixCatcher.svg',
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2018,
      projects: [
        {
          id: 5,
          name: 'Sion',
          code: 'SION',
          thumbnail: 'assets/images/portfolio/MSIcons/Sion.svg',
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        {
          id: 6,
          name: 'Koomkin Brief',
          code: 'BRIF',
          thumbnail: 'assets/images/portfolio/MSIcons/Informe.svg',
          description: `
            <p>Calculate bondage index with user's info to launch bussines proposal.</p>
            <p>Koomkin's biggets form for gathering potential client information.</p>
            <p>This application estimates the number of leads that can be generated for given customer depending on its characteristics.</p>
            <p>It also shows how Koomkin's Dashboard will look like if the customer purchases a Koomkin subscription.</p>
            <p>More infromation coming soon.</p>
          `,
          images: [
            'https://i.imgur.com/obM2u2u.png',
            'https://i.imgur.com/LHudrdM.png',
            'https://i.imgur.com/e4xGBqx.png',
            'https://i.imgur.com/vAILoQw.png',
            'https://i.imgur.com/1NfL8MX.png',
            'https://i.imgur.com/C8Zq1RU.png',
            'https://i.imgur.com/T8sc4XJ.png',
            'https://i.imgur.com/6bTm3iM.png',
            'https://i.imgur.com/50eD5Dj.png',
            'https://i.imgur.com/6PfXZUk.png',
            'https://i.imgur.com/3xi3ZfD.png',
            'https://i.imgur.com/rgt7zuh.png'
          ]
        },
      ]
    },
    {
      year: 2019,
      projects: [
        {
          id: 7,
          name: 'Finero',
          code: 'FNRO',
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg',
          description: `
            <p>Application for procesing payments and sending money. More information coming soon.</p>
            <p><b>Role:</b> Front end development.</p>
            <p><b>Dev work:</b> Design, User Experience, and front-end code, API mantainance.<p>
            <p><b>Technology stack:</b> Angular, NodeJS, MongoDB, Amazon Web Services</p>
          `,
          images: [
            'https://i.imgur.com/lXjbEDJ.png',
            'https://i.imgur.com/9Pme2Jm.png',
            'https://i.imgur.com/iPxiH3d.png',
            'https://i.imgur.com/CmeKhKd.png',
            'https://i.imgur.com/lsQGZeZ.png',
            'https://i.imgur.com/iiGuUk4.png',
          ]
        },
        {
          id: 8,
          name: 'Newt Admin Panel',
          code: 'NWAP',
          thumbnail: 'assets/images/portfolio/MSIcons/Newt.svg',
          description: `
            <p>Application for processing payments. More information coming soon.</p>
            <p><b>Role:</b> Front-end developer.</p>
            <p><b>Dev work:</b> Design, UX, front-end</p>
            <p><b>Technology stack:</b> Angular, NestJS, MongoDB, Amazon Web Services</p>
          `,
          images: [
            'https://i.imgur.com/Lbei50Q.png',
            'https://i.imgur.com/RXztGEa.png',
            'https://i.imgur.com/vQ0OAli.png',
            'https://i.imgur.com/ZiXjX0m.png',
            'https://i.imgur.com/D3KWDQu.png',
            'https://i.imgur.com/GyWwf12.png'
          ]
        },
        {
          id: 9,
          name: 'Newt Landing Page',
          code: 'NWLP',
          thumbnail: 'assets/images/portfolio/MSIcons/NewtLanding.svg',
          description: `
            <p>Application for processing payments. More information coming soon.</p>
          `,
          images: [
            'https://thumbs.gfycat.com/MisguidedExcellentAzurevasesponge.webp',
            'https://thumbs.gfycat.com/FinishedJadedCero.webp',
            'https://thumbs.gfycat.com/ShyBewitchedBudgie.webp'
          ]
        },
        {
          id: 10,
          name: 'Newt Press',
          code: 'NWPS',
          thumbnail: 'assets/images/portfolio/MSIcons/NewtPress.svg',
          description: `
            <p>This application is an admin panel where Newt's press releases can be uploaded.</p>
            <p>This tool was built for Newt's staff and was made for internal use only.</p>
            <p>Role: full-stack development.</p>
            <p>Dev work: Design, UX, front-end, back-end, database design, testing and documentation.</p>
            <p><b>Features</b></p>
            <ul>
              <li>Rich text editor</li>
              <li>Upload tool</li>
            </ul>
            <p><b>Technologies used</b></p>
            <ul>
              <li>Front-end: Angular</li>
              <li>Back-end: NodeJS Express App</li>
              <li>Database: MongoDB</li>
              <li>Deployment: Amazon Web Services</li>
            </ul>
          `,
          images: [
            'https://i.imgur.com/MaHjBNb.png',
            'https://i.imgur.com/FoJo3Z2.png',
            'https://i.imgur.com/c4QobJZ.png',
            'https://i.imgur.com/fiaEmwK.png'
          ]
        }
      ]
    },
    {
      year: 2020,
      projects: [
        {
          id: 11,
          name: 'Aurora Admin Panel',
          code: 'AUAP',
          thumbnail: 'assets/images/portfolio/MSIcons/AuroraAdminPanel.svg',
          description: `
            <p>Application for managing the data available in the project's website: users, online courses, events, news, blog posts, and more. More information coming soon.</p>
            <p><b>Role:</b> Full-stack development.</p>
            <p><b>Dev work:</b> Dev work: Design, UX, front-end, back-end, database management and Devops.</p>
            <p><b>Technology stack:</b> Angular, NestJS, MongoDB, Microsoft Azure</p>
          `,
          images: [
            'https://i.imgur.com/mc1KeSZ.png',
            'https://i.imgur.com/f7XZ8nF.png',
            'https://i.imgur.com/wObMWxs.png',
            'https://i.imgur.com/A19Z5FM.png',
            'https://i.imgur.com/tVYOHt0.png',
            'https://i.imgur.com/oYm6sFL.png',
            'https://i.imgur.com/XEqc8dS.png',
            'https://i.imgur.com/avSWXWm.png',
            'https://i.imgur.com/B0DIITV.png',
            'https://i.imgur.com/5Zp3mOj.png',
            'https://i.imgur.com/fBukO2B.png',
          ]
        },
        {
          id: 12,
          name: 'Invest Naija Website',
          code: 'AUWS',
          thumbnail: 'assets/images/portfolio/MSIcons/AuroraWebsite.svg',
          description: `
            <p>Website where people can purchase online courses, subscribe to events, comment on news and learn about investments.</p>
            <p><b>Role:</b> Full stack development.</p>
            <p><b>Dev work:</b> Design, UX, front-end, back-end, database management and Devops</p>
            <p><b>Technology stack:</b> Angular, NestJS, MongoDB, Microsoft Azure</p>
            <p><b>URL:</b> http://www.investnaija.com</p>
          `,
          images: [
            'https://i.imgur.com/wN5GIg6.png',
            'https://i.imgur.com/TzAyaiE.png',
            'https://i.imgur.com/OelTS0Z.png',
            'https://i.imgur.com/nLNifpP.png',
            'https://i.imgur.com/IXMgnud.png',
            'https://i.imgur.com/jeF0RSp.png',
            'https://i.imgur.com/L0bnQ4I.png',
            'https://i.imgur.com/oIwjFyE.png',
            'https://i.imgur.com/Ael2vr4.png',
            'https://i.imgur.com/RgzOmE3.png',
            'https://i.imgur.com/SPeoh8M.png',
            'https://i.imgur.com/02tIbPB.png',
            'https://i.imgur.com/8dA9pPX.png',
            'https://i.imgur.com/2QuRHNd.png',
            'https://i.imgur.com/kwH8v7C.png',
            'https://i.imgur.com/RrWD8eb.png',
            'https://i.imgur.com/cSlLbmn.png',
          ]
        },
        {
          id: 13,
          name: 'Medkush',
          code: 'MEDK',
          thumbnail: 'assets/images/portfolio/MSIcons/Medkush.svg',
          description: `
            <p>E-commerce where you can buy CBD products, learn about CBD and how it can improve your daily life.</p>
            <p><b>Role:</b> Full stack development.</p>
            <p><b>Dev work:</b> Design, UX, front-end, back-end, database management and Devops</p>
            <p><b>Technology stack:</b> Angular, Serverles, MongoDB, Netlify</p>
            <p><b>URL:</b> https://medkush.mx</p>
          `,
          images: [
            'assets/images/portfolio/Medkush/landing.gif',
            'assets/images/portfolio/Medkush/landingMobile.gif',
            'https://i.imgur.com/qSmrIPM.png',
            'https://i.imgur.com/1XjiuCB.png',
            'https://i.imgur.com/hiDZDS2.png',
          ]
        },
        {
          id: 14,
          name: 'Out of Your Mind',
          code: 'OTMD',
          thumbnail: 'assets/images/portfolio/MSIcons/OM.svg',
          description: `
            <p>Coaching services. More information coming soon.</p>
            <p><b>Role:</b> Full-stack developer</p>
            <p><b>Dev work:</b> Design, UX, front-end, back-end, database management and Devops</p>
            <p><b>Technology stack:</b> Angular, Amazon Web Services, Netlify, Whatsapp, Claendly.</p>
            <p><b>URL:</b> https://outofyourmind.com.mx</p>
          `,
          images: [
            'assets/images/portfolio/OM/landing.gif',
            'assets/images/portfolio/OM/landingMobile.gif',
            'https://i.imgur.com/nW4LFFs.png',
            'https://i.imgur.com/JWWGBhm.png',
            'https://i.imgur.com/vTuJhlW.png',
            'https://i.imgur.com/MdkdPD6.png',
            'https://i.imgur.com/051Cl7X.png',
            'https://i.imgur.com/7mZ71uQ.png',
            'https://i.imgur.com/eGtGrkp.png',
            'https://i.imgur.com/VGZtRTm.png',
            'https://i.imgur.com/1jmy64O.png',
          ]
        },
        {
          id: 15,
          name: 'Staff Plan',
          code: 'STFF',
          thumbnail: 'assets/images/portfolio/MSIcons/StaffPlan.svg',
          description: `
            <p>Staff management application. More information coming soon.</p>
            <p><b>Role:</b> Full-stack developer</p>
            <p><b>Dev work:</b> UX, front-end, back-end, and database management</p>
            <p><b>Technology stack:</b> AngularJS, NodeJS, Amazon Web Services.</p>
          `,
          images: [
            'https://i.imgur.com/ymAgDPD.png',
            'https://i.imgur.com/FxCsKK9.png',
            'https://i.imgur.com/ruxaklu.png',
            'https://i.imgur.com/FHPwb50.png',
            'https://i.imgur.com/2lWIuR1.png',
            'https://i.imgur.com/Htl8HKE.png',
            'https://i.imgur.com/FnCkcP3.png',
            'https://i.imgur.com/hKlaXiA.png',
          ]
        },
        {
          id: 16,
          name: 'Trinity 2.0',
          code: 'TRN2',
          thumbnail: 'assets/images/portfolio/MSIcons/Trinity2.svg',
          description: `
            <p>This information is confidential.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2021,
      projects: [
        {
          id: 17,
          name: 'Personal Wesbite',
          code: 'BMBW',
          thumbnail: 'assets/images/portfolio/MSIcons/PersonalWebsite.svg',
          description: `
            <p>You are already in this website.</p>
            <p>More information coming soon.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        {
          id: 18,
          name: 'Sureties ERP',
          code: 'SRTY',
          thumbnail: 'assets/images/portfolio/MSIcons/ITJMath.svg',
          description: `
            <p>Financial Analysis, Underwriting Automation and Account Management.</p>
            <p>Full-stack development and database administration. Brokerage and underwriting automation.</p>
            <p>Technologies used: .NET, Blazor, Entity Framework, SQL Server, Git, Bitbucket, Jira, Jfrog, Redis, Dynatrace Jenkins, Linux VMs, Figma, Microsoft Azure, App Service, and Azure DevOps.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        }
      ]
    },
    {
      year: 2022,
      projects: [
        {
          id: 19,
          name: 'Exporters Solutions',
          code: 'EXPS',
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg',
          description: `
            <p>Brokerage and Underwriting Automation.</p>
            <p>Front-end development of brokerage and underwriting automation platform.</p>
            <p>Technologies used: .NET, Blazor, Git, Azure Repos, Azure Work Items, Figma, Microsoft Azure, App Service, and Azure DevOps.</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        {
          id: 20,
          name: 'OAV Platform',
          code: 'OAV',
          thumbnail: 'assets/images/portfolio/MSIcons/gauge.svg',
          description: `
            <h2>One Auction View</h2>
            <p><a href="https://www.oneauctionview.com/home">https://www.oneauctionview.com/home</a></p>
            <p><b>Users:</b> 1,000+</p>
            <p>OAV is proprietary system platform that cleans, standardizes, and enhances vehicle data across multiple auto auctions, eliminating inconsistencies and making inventory searches more accurate and efficient for dealers. It offers refined search for vehicles in the market along with reports, comparisons, appraisals and other characteristics such as builsheets, locations, price, and more.</p>
            <p>Working in this project I processed, cleaned, and analyzed millions of records from the automotive industry. Created powerful dashboards that provided valuable insights for lenders and financial institutions. Assisted 20+ dealerships in the U.S. with decision-making for restocking and trend analysis, maximizing their profits through segmentation, forecasting, and data modeling.</p>
            <h3>QA:</h3>
            <ul>
              <li>Automated e2e Regression testing using Cypress</li>
              <li>Manual testing</li>
              <li>QA report</li>
              <li>Defined Acceptance criteria for User Stories, Bugs and other work items</li>
              <li>Structured the developments process from the definition of User Stories Tasks, Epics, Features, and other work items all the way up to deployments and product delivery</li>
              <li>Bug tracking for production issues -> Reopening user stories or tasks</li>
              <li>Testing users and Documentation</li>
              <li>Integration Testing</li>
            </ul>
            <h3>DevOps:</h3>
            <ul>
              <li>Defined and implemented the development process to ensure continuous integration and seamless product delivery </li>
              <li>Created the pipeline with stages and testing gate keeping</li>
              <li>Tests on build server</li>
            </ul>
            <h3>Documentation:</h3>
            <ul>
              <li>Migrated existing documentation to Notion</li>
              <li>Added readme files to all projects overcoming the struggle every new developer faces when joining an existing solution</li>
              <li>Generated architectural diagrams and other technical design diagrams </li>
              <li>Cost evaluation: cost of having all instances running as well as the cost of storage</li>
            </ul>
            <h3>Cloud:</h3>
            <ul>
              <li>Resource management and separation within resource groups</li>
              <li>Added proper naming to several components within the architecture</li>
              <li>Costs efficiency</li>
              <li>Balance local and cloud resources</li>
            </ul>
            <p><b>Technologies used:</b> React, NodeJS, Nest, Cosmos DB, Bright Data, Web Scrappers, Bright Data, Cosmos DB, Git, Linux VMs, Microsoft Azure, Docker, Figma, App Service, Azure DevOps, Cypress, React JS, Nest JS, Stripe</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        {
          id: 21,
          name: 'Retail Vision By OAV',
          code: 'RV',
          thumbnail: 'assets/images/portfolio/MSIcons/retailVision.svg',
          description: `
            <h3>Retail Vision</h3>
            <p><a href="https://www.oneauctionview.com/home">https://www.oneauctionview.com/home</a></p>
            <p>OAV is proprietary system platform that cleans, standardizes, and enhances vehicle data across multiple auto auctions, eliminating inconsistencies and making inventory searches more accurate and efficient for dealers. It offers refined search for vehicles in the market along with reports, comparisons, appraisals and other characteristics such as builsheets, locations, price, and more.</p>
            <p>Working in this project I processed, cleaned, and analyzed millions of records from the automotive industry. Created powerful dashboards that provided valuable insights for lenders and financial institutions. Assisted 20+ dealerships in the U.S. with decision-making for restocking and trend analysis, maximizing their profits through segmentation, forecasting, and data modeling.</p>
            <h3>Architectural:</h3>
            <ul>
              <li>Data Ingestion</li>
              <li>Designed data pipeline</li>
              <li>Implementation of the 12 factor app principles for all solutions</li>
              <li>Medallion architecture</li>
              <li>Designed solution all the way from the data ingestion to the data presentation layer</li>
            </ul>
            <p><b>Technologies used:</b>React, Python, Databricks, Power BI Embedded, Azure Data Factory, PySpark, Distributed Computing, Delta Lake Storage, Parquet</p>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
      ]
    },
    {
      year: 2023,
      projects: [
        {
          id: 22,
          name: 'School Health Profile',
          code: 'SHP',
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg',
          description: `
            <h2>School Health Profiles</h2>
            <p><a href="https://data.osse.dc.gov/shp/login">https://data.osse.dc.gov/shp</a></p>
            <p><b>Users:</b> 1,000+</p>
            <p><b>Technologies:</b> Angular, .NET, SQL Server, Azure Blob Storage, Excel</p>
            <h3>Overview</h3>
            <p>This application was developed to manage the health profiles of schools within the district, used by all registered Local Education Agencies (LEAs). The Health Manager utilizes this application to answer approximately 400 questions, providing the Superintendent of Education with critical data on various health-related aspects such as students' outdoor activities, dietary habits, and health-related subjects taught in the curriculum.</p>
            <h3>Features</h3>
            <p><b>Dynamic Reactive Forms:</b> Highly dynamic, responsive forms generated based on attributes provided by back-end APIs. The visibility and validation of form controls depend, that can depend on the answers to other questions is all defined by an external source.</p>
            <p><b>Reports and Statistics:</b> Generates comprehensive reports and statistical data, accessible by users with appropriate privileges.</p>
            <p><b>Compliance Management:</b> Schools' health data is certified, and non-compliant schools (as per the Act of Healthy Schools of 2022) must submit an action plan through the system. The plan is reviewed, managed, and approved within the application.</p>
            <p><b>Data Access:</b> Provides access to data points and aggregated data depending on user privileges, with features for charts and detailed reports.</p>
            <h3>Technical Challenges</h3>
            <p>The most challenging aspect of developing this application was the form generation process. The front-end dynamically generates all form controls (questions) based on attributes from back-end APIs. The system supports conditional visibility and validation based on responses to other questions.</p>
            <h3>Data Handling</h3>
            <p>The questionnaire is defined by a Microsoft Excel file maintained by the agency and stored in OneDrive. This file is parsed and uploaded to the SQL database. All information was stored in SQL server and Azure Blob Storage.</p>
            <h3>User Access</h3>
            <p>Users with adequate privileges can log in to the system to access charts, reports, aggregated data, and every individual data point entered by any school.</p>
            <h3>Additional Features</h3>
            <ul>
              <li>Email notifications</li>
              <li>Report generation</li>
              <li>File uploads</li>
              <li>PDF generation</li>
              <li>Data visualizations</li>
              <li>Training modules</li>
              <li>FAQ section</li>
              <li>Historical data repository</li>
            </ul>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
      ]
    },
    {
      year: 2024,
      projects: [
        {
          id: 23,
          name: 'DOT CMS',
          code: 'DOT',
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg',
          description: `
            <h2>Division of Transportation Case Management System</h2>
            <p><a href="https://dotcm.osse.dc.gov/login">https://dotcm.osse.dc.gov</a></p>
            <p><b>Users:</b> 1,000+</p>
            <p><b>Technologies:</b> Angular, .NET, SQL Server, Azure Blob Storage, Azure Hosting, PDF, Excel</p>
            <h3>Overview</h3>
            <p>Platform used for managing student transportation services, particularly for students with disabilities who require specialized transportation. The system helps ensure safe, reliable, and efficient transportation for eligible students, supporting their learning opportunities. Parents and guardians can use it to track transportation updates, access resources, and communicate with OSSE DOT.</p>
            <p>The Division of Student Transportation provides safe, reliable, and efficient transportation services that positively support learning opportunities for eligible students from the District of Columbia. The division’s work is designed to achieve four main objectives: Safety, Efficiency, Reliability, and Customer Focus.</p>
            <p>This application is used to manage reports, complaints, incidents and accidents involving DC school Transportation infrastructure.</p>
            <p>This application had to be integrated with many other external services and applications from the agency.</p>
            <h3>Additional Features</h3>
            <ul>
              <li>Highly dynamic and reactive forms</li>
              <li>Case Management System (CMS)</li>
              <li>Data migration from Salesforce to our inhouse development</li>
              <li>File Management</li>
              <li>PDF generation and export</li>
              <li>Email notifications with send grid integration</li>
            </ul>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
      ]
    },
    {
      year: 2025,
      projects: [
        {
          id: 24,
          name: 'Go To Market Tools',
          code: 'GTM',
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg',
          description: `
            <p><b>Porpuse:</b> For internal use</p>
            <p><b>Users:</b> 100</p>
            <p><b>Technologies:</b> ASP.NET, Telerik's Kendo UI, .NET, SQL Server, Azure DevOps, App Service, Azure Blob Storage, Azure Delta Lake, Azure AI Search, Microsoft Power BI, Azure Key Vault, Azure API Manager, Azure App Configuration, Application Insights, Azure Cache for Redis, Azure Data Factory, Function Apps, Azure Search Service, Virtual Machines, Azure Web PubSub Service, ASP Integration</p>
            <h3>Overview</h3>
            <p>Internal, non-customer-facing application used for several porpuses: pricing, cost management, reporting, manage discount requeste, purchase orders, retail orders, forescasting, CMS, Bridge between customer and client, financial reports, user management, documentation, executive dashboards, tracking lists, manage special design requests for engineering teams, sale coordination, non-conforming solutions, among other uses and functionalities.</p>
            <h3>Additional Features</h3>
            <ul>
              <li>Notifications</li>
              <li>Cache management</li>
              <li>Admin Portal</li>
              <li>Catalogs</li>
              <li>Dealer maps</li>
              <li>Tools for Active Pricing, Customer Trends, Quote Comparisons, Discount Trends</li>
              <li>Market Share reports</li>
            </ul>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        {
          id: 25,
          name: 'Mercury',
          code: 'MER',
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg',
          description: `
            <p><b>Porpuse:</b> For internal use</p>
            <p><b>Users:</b> 15</p>
            <p><b>Technologies:</b> ASP.NET, Telerik's Kendo UI, .NET, SQL Server, Azure DevOps, App Service, Azure Blob Storage, Azure Delta Lake, Azure AI Search, Azure Key Vault, Azure API Manager, Azure App Configuration, Application Insights, Azure Cache for Redis, Azure Data Factory, Function Apps, Virtual Machines, Azure Web PubSub Service, ASP Integration</p>
            <h3>Overview</h3>
            <p>This is an internal tool for managing special pricing requests from customers and dealers. Pricing Analysts work to approve the highest possible discount while maintaining the company's profitability. This includes analyzing requests, factory and distribution costs, and other key metrics.</p>
            <h3>Additional Features</h3>
            <ul>
              <li>Dashboards</li>
              <li>Trend Analysis</li>
              <li>Work sheets</li>
              <li>Customer Reports</li>
              <li>Request-Approval flow </li>
              <li>Pivot tables</li>
              <li>Charts</li>
            </ul>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
        {
          id: 26,
          name: 'Houkoku Renraku Soudan',
          code: 'HRS',
          thumbnail: 'assets/images/portfolio/MSIcons/AdminPanel.svg',
          description: `
            <p>報告 (Houkoku) – Reporting<br>連絡 (Renraku) – Informing<br>相談 (Soudan) – Consulting</p>
            <p>報連相 – HonRenSou</p>
            <p><b>Porpuse:</b> For internal use</p>
            <p><b>Users:</b> 35</p>
            <p><b>Technologies:</b> ASP.NET, Telerik's Kendo UI, .NET, SQL Server, Azure DevOps, App Service, Azure Blob Storage, Azure Delta Lake, Azure AI Search, Azure Key Vault, Azure API Manager, Azure App Configuration, Application Insights, Azure Cache for Redis, Azure Data Factory, Function Apps, Virtual Machines, ASP Integration</p>
            <h3>Overview</h3>
            <p>This application was developed to create a process and implementation strategy for TMHNA IT Asset management which satisfies the needs of the current financial process as well as future controls required by auditors and governance. This goal is achieved by building trust with stakeholders in the areas of Reporting, Informing and Consulting.</p>
            <h3>Additional Features</h3>
            <ul>
              <li>Asset Expenditure Requests managements</li>
              <li>Scope Of Work management</li>
              <li>Invoice management</li>
              <li>Dasboards</li>
              <li>Documents</li>
              <li>Project Identification and funding</li>
              <li>Capital Expenditure amortization schedule</li>
              <li>Operational Expenditure amortization schedule</li>
              <li>Asset management</li>
              <li>Product delivery schedule and completion</li>
            </ul>
          `,
          images: [
            'assets/images/portfolio/confidential.svg'
          ]
        },
      ]
    },
  ];

  constructor(
    private loaderService: LoaderService
  ) { }

  getProyectsYears(): Observable<ProjectsYear[]> {
    this.loaderService.show();
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(this.years);
        obs.complete();
        this.loaderService.hide();
      }, 0);
    });
  }

  getProyectById(id: number): Observable<Project> {
    this.loaderService.show();
    let found: Project | undefined = undefined;
    let i = 0;
    while (found == null && i < this.years.length) {
      let j = 0;
      const year = this.years[i];
      while (found == null && j < year.projects.length) {
        const project = year.projects[j];
        if (id == project.id) {
          found = project;
        }
        j++;
      }
      i++; // i = i + 1; // i += 1; // i -= -1;
    }
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(found);
        obs.complete();
        this.loaderService.hide();
      }, 0);
    });
  }

  getProjects(): Observable<Project[]> {
    this.loaderService.show();
    return new Observable(obs => {
      setTimeout(() => {
        let projects: Project[] = [];
        this.years.forEach((year: any) => {
          const yearProjects = year.projects;
          projects = [...projects, ...yearProjects];
        });
        obs.next(projects);
        obs.complete();
        this.loaderService.hide();
      }, 0);
    });
  }
}
