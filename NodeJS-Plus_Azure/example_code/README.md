# MLH Localhost HackerLog

This app demonstrates setting up a simple NodeJS / MongoDB application to be deployed on Azure. If users have the password, they can post log messages with a chosen name. Posts are sorted in reverse chronological order and paginated.

## Configuration
Aspects of the app are controlled by the following environment variable. Feel free to modify them once deployed or before running locally.

| Name  | Description  | Default  |
|---|---|---|
|  PORT | The port to run the webserver on | 3000  |
|  PAGE_SIZE |  How many log items to display on each page in the application |  10 |
|  MONGODB_URI | URI to connect to mongoDB instance. Usually automatically set using this variable on most providers.  |  mongodb://localhost:27017/hackerlog |
| HACKERLOG_PASSWORD | The password to post a log message | P@ssw0rd! |


## Running locally
To run the app locally, simply run:
`yarn` to install the dependencies of the app and then `npm start` or `yarn start`

Note: You will need a working instance of MongoDB. You can install mongoDB community edition locally by following the tutorial for your platform at [this](https://docs.mongodb.com/manual/installation/#tutorials) link.

## Deploying to Azure
Begin by forking this repository into your own GitHub account.

### Setting up MongoDB
1. On the left hand toolbar, click "Create a resource"
2. Search for "Azure Cosmos DB" and hit enter.
3. Click the create button, choose a subscription and click "Create new" under resource group (we do this to make it easy to identify all related resources for this app). Name the resource group as appropriate, and click OK. Take note of what you named this resource group.
4. Choose an account name, and select MongoDB as the API. You can disable GeoRedundancy and Multi-Region writes for the purposes of this demo application.
5. Click Next: Network and create a new virtual network to use later by clicking the "Create a new virtual network button". Take note of what you named this network.
6. Click Next: Tags ou can optionally add some tags.
7. From here, you can click Next: Summary and review all the information is accurate.
8. Click create, and wait for the database to get deployed.
5. Next, go into Azure Cosmos DB on the left menu, and click on the Database you just created. 
6. Find the Connection Strings menu entry and click into it. Note the following information: username, primary password, host, port.
7. After this, go to the Firewall and virtual networks tab, and for the purposes of this demo select "All networks" under "Allow access from". 

### Deploying application
1. On the left hand toolbar, click "Create a resource"
2. Search for "Web App" and hit enter. Note: Do not select the ones that come with a database like PostgreSQL.
3. Type in a name for the application, choose a subscription, select Linux as the OS, choose "Code" as the publish method, choose a service plan, and select Node 10.1 as the Runtime stack (or any Node 10.x variant available). You can disable Application Insights for the purpose of the demo application.
4. Click create, and wait for your application to get deployed.
5. Go to the application you just created, and click deployment options. Choose GitHub as the source (set up your account as needed), and choose "Personal" as the organization, choose "mlh-localhost-hacker-log" as the project, and choose "master" as the branch. Click OK.
6. Finally, goto the Application settings,  and create a new App Setting with the name "MONGODB_URI" and the value as this string with the values you noted above: ``mongodb://<username>:<primary password>@<host>:<port>/hackerlog?ssl=true&replicaSet=globaldb``
7. Go to overview and restart the application. After you restart the application, you can visit it by clicking the link under "URL". 

## Want to add / remove available log fields?
This application uses Mongoose. Simply modify the "update" schema in app.js.
```
const updateSchema = mongoose.Schema({
  name: { type: String, required: true },
  update: { type: String, required: true }
  // Add your fields here.
  // e.g. nickname: { type: String, required: true }
}, {
  timestamps: true
});
```
Then, add the field under the "update-section" section DOM element in `views/index.ejs`.
Example:
```
<section class="update-section">
  ...
<div class="update-field">
  <label class="input-label" for="nickname">Nickname</label>
  <input class="input-field" type="text" id="nickname" name="nickname" required>
</div>
  ...
</section>
```

Finally, modify line 46 to include your new field that is submitted.
Example:
```
const { body: { name, update, password, nickname } } = req;
```
Also modify the paramaters passed to the constructor on line 50.
Example:
```
const userUpdate = new Update({ name, update, nickname });
```

## Next steps
- Add a socket library like Socket.io to update the log instead of needing to refresh to get new log messages.
- Implement an authentication using a provider like auth0 or use a authentication middleware like passport.js.
- Implement the [Azure Content Moderator](https://azure.microsoft.com/en-ca/services/cognitive-services/content-moderator/).

