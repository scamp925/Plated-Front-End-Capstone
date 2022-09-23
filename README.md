# Plated

[See Live Demo of Plated](https://sariah-campopiano-plated.netlify.app/)

[Walkthrough Video of Plated](https://www.loom.com/share/03426504f24b464fbf3173efa2a3dc09)

![plated](https://user-images.githubusercontent.com/98675776/189264541-3c4b2291-8177-4b83-9721-4f1f9705a794.png)

## Topics
- [So, What Is Plated?](#so-what-is-plated)
- [MVP Features](#mvp-features)
- [Stretch Features](#stretch-features)
- [Try Plated Out For Yourself](#get-started)
- [My Learning Corner](#learning-corner)
- [Planning for Plated](#planning-for-plated)
- [Tech Stacks for Plated](#tech-stacks)
___
## So, What Is Plated?
Plated is where a recipe book meets a meal planner. Individual users are able to create, view, edit and delete recipes then with those recipes, users are able to plan out their week's dinners. 

Plated eases the burden of the all too common question of "What's for dinner?" with it's intuitive design for users wanting to plan all of their dinners for the week. Plated users pick their meals from their own recipes; thus, giving all Plated users a peace of mind knowing that dinner will be something they actually like. Plus, having all user's recipes in one place will help users remember what exactly they can make! Thanks to Plated, meal planning is made easy, so users can keep living their lives without the constant stress of trying to figure out what tonight's dinner will be. If this sounds good to you, Plated is what you have been looking for. Happy meal planning!

### MVP Features

[MVP Walkthrough Video of Plated](https://www.loom.com/share/bcf31a33b6c24587a24ca8040b7f6d3a)

<em>Recipes:</em>
- Add a new recipe
- View snippet of all recipes associated to a specific user on recipes page
- View single recipe's detail by clicking "View Details" on snippet recipe card
- Edit single recipe by clicking "Edit" button on single recipe view. Recipe form will render on the DOM again, but this time with previous entries associated with the recipe ready for any updates
- Delete a single recipe by clicking "Delete" button on single recipe view. This recipe will be permanently deleted from Plated. **If recipe happens to be assigned a day of the week then deleted, that recipe will be removed from the day of the week as well once user returns to home page
- Search for a recipe by any part of its name on the recipes page. Click the "Reset Search" to avoid having to backspace the search entry.

<em>Days of the Week Calendar:</em>
- Choose a recipe from user's stored recipes for a specific day
- Two views of the day of the week card:
    - When a recipe has not been assigned to a day, an "Add" button renders in the center.
    - When a recipe has been assigned to a day, the snippet view of a recipe will render with a "Change Dinner" button and a "Clear Dinner" button.
- "Change Dinner" button brings the dinner form back with previous selection rendering ready to be changed to another meal.
- "Clear Dinner" button deletes the dinner entry, but NOT the recipe that was there. Once dinner entry is cleared, the day of the week card reverts back to an "Add" button in the center.
- "Clear the Week's Dinners" above the calendar of the week works like the "Clear Dinner" button except instead of clearing just one dinner entry, clicking this button will clear all dinner entries for the week. Great feature when it's time to sit down and plan the upcoming week's dinners.

<em>General:</em>
- All Plated users are authenticated at sign-in thanks to Google Firebase, so everything done by a user on Plated will never change anything on another user's view/account.

### Stretch Features

<em>CSS Update:</em>
- Changed the entire look and feel of Plated. Hello new color scheme and font!
[Plated's CSS Branch](https://github.com/scamp925/Plated-Front-End-Capstone/tree/css)
vs
[Plated's MVP Branch](https://github.com/scamp925/Plated-Front-End-Capstone/tree/plated-mvp)

![plated-mvp-vs-css](https://user-images.githubusercontent.com/98675776/190865384-b2401500-645a-42e1-b950-57f64f977df2.jpg)

<em>Dropdown select with search ability:</em>
- On the dinner form, users are now able to search for a recipe to select for dinner thanks to React Select's component AsyncSelect.

![searchable-dropdown-plated](https://user-images.githubusercontent.com/98675776/190864428-a6154232-f6e1-4d84-891e-ca205ceca68b.gif)

<em>CRUD on Going Out to Eat Meal Cards</em>

![create-and-read-going-out-plated](https://user-images.githubusercontent.com/98675776/191652981-1f1e17e7-cebd-4bc0-92a9-8daa6f00dd81.gif)

Create:
- New Navbar option called "Add a Going Out Meal" for Plated users to click to access the form for going out.
- Going out form asking if the Plated user will be eating at a restaurant or someone's house and user will choose.
  - Note the difference between the input field's placeholder text depending on user's choice.

Read:
- New going out to eat card renders on "Your Meals" page along with all recipes and other going out to eat cards associate with the authenticated Plated user.
- Any going out to eat cards will render on user's dinner calendar if selected for a specific day's dinner plans.

![update-going-out-plated](https://user-images.githubusercontent.com/98675776/191653635-7ade48bc-6378-4c86-a532-6e740672e7df.gif)

Update:
- An edit button renders on the going out cards for user to edit the existing card.
  - Note how a going out to eat cards rendering on the dinner calendar do NOT render the edit button, but the edit button is on the cards when they render on the "Your Meals" page for UX/UI purposes.
- Once edit button is clicked, the going out to eat form renders again, but this time with the previous inputs from the user to update.
- User is able to click the update button on the form then see their updated going out to eat card wherever it is rendering.

![delete-going-out-plated](https://user-images.githubusercontent.com/98675776/191654222-30a11efd-03a4-4fad-8ff8-2068a10325e6.gif)

Delete:
- Plated users can delete individual going out to eat cards by a click of a button.
  - Note how a going out to eat cards rendering on the dinner calendar do NOT render the delete button, but the delete button is on the cards when they render on the "Your Meals" page for UX/UI purposes.
- Once going out to eat card is deleted, it will no longer render anywhere on Plated including the dinner calendar if it was previously selected for a dinner.

## Get Started
## Planning for Plated

#### ERD for Plated's MVP
![mvp-erd-plated](https://user-images.githubusercontent.com/98675776/189425881-3e240407-ff16-49ef-ad8c-895c557c8e04.png)

#### Screenshot of Wireframe for Plated - Desktop Version
![plated-wireframe](https://user-images.githubusercontent.com/98675776/189426940-3fccdab8-a6d8-40fb-9cd8-87ab9cdb2e02.png)

[Link to Figma for Plated's Wireframe](https://www.figma.com/file/InVac86MKqy9v3mHxYpQm3/Plated-Front-End-Capstone?node-id=0%3A1)

[Link to Github tickets for Plated - MVP](https://github.com/scamp925/Plated-Front-End-Capstone/issues?page=1&q=is%3Aissue+is%3Aclosed)

## Tech Stacks
<div align="center">  
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" /></a>  
<a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/>
<a href="https://firebase.google.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/firebase.png" alt="Firebase" height="50" /></a> 
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /></a>  
<a href="https://getbootstrap.com/docs/3.4/javascript/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="Bootstrap" height="50" /></a>  
<a href="https://www.figma.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/figma-icon.svg" alt="Figma" height="50" /></a>  
</div>
