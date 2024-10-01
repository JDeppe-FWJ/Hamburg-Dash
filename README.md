## Installation


### 1 - Apache & Original Files
Install the Apache Webserver by running `sudo apt install apache2` in a terminal. 
Then remove the 2 project folders to apche's folder (/var/www/html) and remove the default content. The file structure should then look like this:

```
|-- var
|   |-- www
|   |   |-- html
|   |   |   |-- Film
|   |   |   |   |-- HTML files, CSS files, JS files
|   |   |   |-- Bass
|   |   |   |   |-- HTML files, CSS files, JS files
```

### 2 - Node & Electron
Run the following commands in a terminal to install NodeJS and electron:
```
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```
Close and reopen the terminal and run the following commands:
```
nvm install 20
nvm use 20
```

Although not technically necessary, it makes sense to restart the machine at this point. \
\
Download the repository and place it anywhere. Open a terminal in the repository folder and run `npm install electron`

## Starting & Notes
To start the dashboard run `npm start` in the repository folder. \
The app can only be quit using the button in the bottom right corner of the dashboard. This requires a password. The default is 123, but this can be changed in the main.js file.