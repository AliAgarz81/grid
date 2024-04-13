## Documentation

# .env file example:
USERNAME =
PASSWORD =
PORT =
HOST =
DB =
JWT_SECRET = 

# User Actions:
Login(POST {API_URL}/user/login): take name and password as a argument, save jwt into httpOnly cookie

Register: no need for frontend fetch

Logout(POST {API_URL}/user/logout): delete jwt

Name(GET {API_URL}/user/name): get username from jwt for displaying it on dashboard, navbar

Check(GET {API_URL}/user/check): check user is logged or not
In frontend, if response is 'Not logged', redirect to dashboard/login when someone enter /dashboard, if response is 'Logged', just continue.

# Content Actions:
Create Content (POST {API_URL}/content): take title, description and file (save image name to database)

Get Contents (GET {API_URL}/content): get all contents

Update (PUT {API_URL}/content/:id): update with id, take title, description and file (file is optional)

Delete (DELETE {API_URL}/content/:id): delete content with id

# Images:
Images can be reached in {API_URL}/uploads/:filename


