App that I am creating to mess with the pokemon api

To use the program clone it into a repo

Change the file lovated in the backend folder named readonly.env to just .env. 
This gives the appropiate username and password to access the database.

cd into the project on two seperate powershells(cmd line)

The first command line shell:
cd into the backend
run "node index.js" 
This will connect the express/node backend to the port:3000 and to the MongoDB

The second command line shell:
cd into frontend and run "npm install --save-dev vite"
run "npm run dev"
This will connect the vite/react frontend to port:5173

Go to http://localhost:5173/ and you will have access to the application.



