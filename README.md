# What2Watch 2.0

What2Watch 2.0 is an application developed as part of project work 2 in the course IT2810 Web Development at NTNU in Autumn 2023. The project aimed to present a large amount of data. The idea behind this application is to provide movie recommendations to a user who wants to watch a movie but struggles to decide what to watch. The user also has the option to bookmark movies they want to watch and provide reviews for movies they have seen.

## Installation and Usage

The application can be accessed at the following URL (Note: This requires being on the NTNU network/VPN):

> http://it2810-45.idi.ntnu.no/project2

Alternatively, the repository can be cloned with:

`git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-45/prosjekt-2.git`

Then, the frontend can be run locally with a connection to the backend running on a VM (Note: This requires being on the NTNU network/VPN):

`cd frontend`  
`npm install`  
`npm run dev`

The project will then run locally at:

> http://localhost:5173/project2

## Accessibility and Sustainability

This project utilizes Chakra UI and React. Chakra UI is a popular React component library for several reasons. It is easy to use, easy to customize, and accessible. Chakra UI is developed with accessibility in mind and therefore has built-in features that make it easy to create accessible websites. Chakra UI complies with WAI-ARIA guidelines, ensuring accessibility across components.

By using React and Chakra UI, we also heavily utilize code reuse in the form of components. This allows us to write code that is more reusable and therefore more sustainable. As an open-source project, Chakra UI relies on a community of contributors. This community-driven aspect promotes the sharing of knowledge and resources, which is a key component in sustainable technology development.

We also focus on making as few calls to the backend as possible, which we achieve through dynamic loading. This allows us to reduce the load on the server, thereby reducing energy consumption. While reducing energy consumption, we also improve user experience and accessibility by reducing waiting time.

We have also chosen to display details about a movie through a modal instead of navigating to a new page. This eliminates the need for the user to wait for a new page to load, allowing them to spend less time finding a movie to watch. This also reduces the number of calls to the backend since everything is loaded with one call. This reduces energy consumption, making the application more sustainable.

We also use dark mode as the default on the website. This reduces energy consumption for the user, making the website more sustainable. We do this by using Chakra UI's built-in dark mode, which allows us to switch between dark mode and light mode with one click.

## Decisions

We have chosen to design the application to give the feeling of being logged in as a user. However, there is no functionality to log in or create a user in the frontend. This was done intentionally, as the application makes sense to be used as a logged-in user. It has also allowed us to develop the application with the idea in mind that it could be further developed into a site with multiple users, registration, and login in the future. This makes the use of the site strange, as it looks like all the reviews come from the same person, and "everyone" has the same favorite movies. Nevertheless, we feel this is a good choice as the site feels more natural. Additionally, it has improved the development process, as the development of an application used by multiple users often requires dynamic solutions and agile decision-making.
