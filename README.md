# Front Tools Starter Pack

## Introduction
After time on creating again and again the same structure of folders and using different tools each time, finally I have put together a **toolset** of modules to create the Starter Pack of a **new web site**.


## What's inside

 - Gulp, for handling all the following tasks to generate the distribution files for publishing your website:
	 - SASS Compiler & Minification, with separate files to handle variables
   for colors, breakpoints and other mixins
    - JS Uglify & Minification, concatenating all your sources into an unique file
    - HTML Injection, for using simple variables to set meta tags and handle layout
 - BrowserSync for creating a http server to testing your website

## Usage

You must have gulp installed as a global module. Use:

    npm install -g gulp
   *If you are using macOS, you may need use the previous command starting with sudo*

Clone the repository and go inside the root folder. Install the dependencies using npm:

    npm install

Once the command finish, to start the tasks and watch for changes on your source files, just use:

    npm start

## Configuration

Inside the *cnf* folder, there is an example config file called *config.json.example*. Copy or rename it to config.json under the same folder, and modify the values under the **site_config** property, with your site values.
All the rest of properties inside the config file, are for handling the gulp tasks, so modify them only if you are sure what you are doing!

## Optional

If you are under macOS, you can generate the ssl self-signed certificates to start the http server under https. It is common you need to test some features under a secure protocol, so I added a script to handling this. Just type the following command:

    npm run generate-ssl-certificates

This will run the openssl commands to create the needed files. After it finish, add to the config file the following property inside *site_config* on the *cnf/config.json* file:

    "ssl": {
	    "key": "cnf/ssl/server.key",
	    "cert": "cnf/ssl/server.crt"
    }
Also, change the url of the site to use *https* instead of *http*.

## Bug, features & enhancements
Use the issues to notify any bug, feature or enhancement to this toolset, feel free to request any modification and if you want to collaborate with me, just send a PR!