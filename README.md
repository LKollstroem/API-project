# API-project
API used in the beginning as I thought we were supposed to do that too, so I used env. user on that and made a token for further usage. But as I understand we are using mongodb. So I only pulled in my own data from Spotify to the console. MAde one for more data too, but it did not work.

Then I made the Mongo DB database in Atlas so I got this const uri: "mongodb+srv://leenakollstrom:" + pwAtlas + "@cluster0.0sdore5.mongodb.net/test";
I have this page in Render: https://leenas-app-com.onrender.com
But as the Spotify app wants to only go back to localhost page and on render gives callback which goes back to "/" page on localhost, it looks like it does not work.
I try to fix it with buttons on the "/" page to the other pages. 

I have routed to:
/  /Home  /getall  /:id  /add  /remove/:id  /update/:id

Tested in POSTMAN and it seemed to work fine there.
