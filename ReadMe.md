NOTES APP

1.registration of new user
2.authentication of registered user
3.User able to create a new note
4.User able to update an exsiting note
5.User able to delete an exsiting note
6.User able to view his/her notes


Users Route
Registration:
save the user information in database ,password should be hashed

Authentication:
find out whether the user is authentic or not and provide token


Notes Route
/notes/create----read
/notes-----get
/notes/update/:noteId---update
/notes/delete/:noteId----delete

Lets establish relationship between notes collection and users collection
