const citizenController = require("../controllers/citizen");
const middleware = require("../middleware");

module.exports = (app) => {
	app.get(
		"/api/v1/citizen/:voterId",
		middleware.electionStatusHandler.allowAnyElectionStatus,
		middleware.authenticationHandler,
		citizenController.getCitizenByVoterId
	);

	app.post(
		"/api/v1/citizen",
		middleware.electionStatusHandler.ensureElectionNotStarted,
		middleware.authenticationHandler,
		citizenController.createCitizen
	);

	app.post(
		"/api/v1/citizen/:voterId/vote",
		middleware.electionStatusHandler.ensureElectionStarted,
		middleware.authenticationHandler,
		citizenController.voteForCandidate
	);

	app.post(
		"/api/v1/citizen/:voterId/vote/nota",
		middleware.electionStatusHandler.ensureElectionStarted,
		middleware.authenticationHandler,
		citizenController.voteForNota
	)
};
