# API-project
API used in the beginning as I thought we were supposed to do that too, so I used env. user on that and mad e atoken for further usage.

Then I made the Mongo DB database in Atlas so I got this const uri: "mongodb+srv://leenakollstrom:" + pwAtlas + "@cluster0.0sdore5.mongodb.net/test";
I have this page in Render: https://leenas-app-com.onrender.com
But I got render errors about compatibility all the time. Even if I updated all the time what  Render was complaining about. Render error:
Apr 15 08:50:13 PM  error mongodb@5.2.0: The engine "node" is incompatible with this module. Expected version ">=14.20.1". Got "14.17.0". (See image in file)
And my Node is now v18.16.0 and mongodb is upto date.

I have routed to:
/  /Home  /getall  /:id  /add  /remove/:id  /update/:id

Tested in POSTMAN
