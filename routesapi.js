var friends = require("/friends");


module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var match = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var user = req.body;
    var score = user.scores;

    var difference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      difference = 0;

      console.log(currentFriend.name);

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = score[j];

        difference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (difference <= match.friendDifference) {
        // Reset the match to be the new friend.
        match.name = currentFriend.name;
        match.photo = currentFriend.photo;
        match.friendDifference = difference;
      }
    }

    friends.push(user);

    res.json(match);
  });
};
