module.exports = (app) => {
const FollowDeal = require("../controllers/follow.controller");

app.get("/followDeals",FollowDeal.findAll);

app.get("/followDeals/user/:userID", FollowDeal.getByUserID);

app.get("/followDeals/deals/:userID", FollowDeal.comperByUserID)

app.post("/followDeals", FollowDeal.create);

app.get("/followDeals/:dealID", FollowDeal.getByDealID);
 
app.delete("/followDeals/:followID",FollowDeal.delete);


} 