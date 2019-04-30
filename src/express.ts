export default {
    default() {
        const express = require( "express" );
        const app = express();
        const port = 8080; // default port to listen

        // define a route handler for the default home page
        app.get( "/", ( req, res ) => {
            res.send( "Hello world!!!" );
        } );

        app.get("/json", (req, res) => {
            // res.send("json response");
            // res.send(__filename);
            res.send(JSON.stringify(`${__filename}`));
        })

        // start the Express server
        app.listen( port, () => {
            console.log( `server started at http://localhost:${ port }` );
        } );
    }
};