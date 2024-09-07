# Vite App

This is a Vite-powered web application. Follow the instructions below to set up and run the app locally.

## How to Run the App

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo-url.git
    cd your-repo-name
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

    This will start the development server. Open your browser and visit `http://localhost:3000`.

4. Build for production:
    ```bash
    npm run build
    ```

    This command will generate the production-ready files in the `dist` folder.

5. Preview the production build:
    ```bash
    npm run preview
    ```

    This command serves the production build locally.

## Video Demonstration

Here is a video walkthrough of the app:

<video width="600" controls>
  <source src="./factwise-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Project Structure

- `src/` - Contains the main application code
- `public/` - Static assets
- `vite.config.js` - Vite configuration file
- `package.json` - Project dependencies and scripts

## License

This project is licensed under the MIT License.

You are a famous hacker who has access to a list of the world's most famous celebrities.
You have to create a system where you can view and edit their details to hide their public presence.

Your mission if you choose to accept it, you have to:

1. Create the user interface provided with the design provided

2. The page should have a search bar to search the list by celebrity name.

3. The user list item is an accordion,

   - when clicked on, it will cause all the other accordions to collapse and enlarge the one which was clicked.
   - If clicked on the same one it will collapse.
   - Manage the + and - icons in open or collapsed mode (collapsed = - | open = +)

4. Fetch the JSON file provided to fill the list of users. (NOTE - YOU CANNOT EDIT THE JSON FILE)

   - You have to calculate the age of the user based on the date of birth provided
   - gender should be a dropdown (Male | Female | Transgender | Rather not say | Other)
   - country is a text field
   - Description is a text area

5. Provide buttons to edit or delete

   - edit mode will let you edit the details of the user in the exact place
   - you can only edit the user if the user is an adult
   - validations to be implemented where a user cannot
     -- input text in the age field
     -- input numbers in the nationality
     -- keep anything empty
   - when in edit mode you can either save or cancel
     -- save button will be disabled by default and will enable only if the details have changed
     -- save click will update the user's details
     -- cancel will revert the details to their last known state
     -- you cannot open another accordion while in edit mode
   - delete mode should alert you if you actually want to delete the user
     -- if yes - the user will be deleted
     -- if no - do nothing

6. Typescript is a plus

This message will self destruct in 5... 4... 3... 2... 1... NOT
