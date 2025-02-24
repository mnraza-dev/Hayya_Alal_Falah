import { useEffect, useState } from "react";
import { getChallenges, joinChallenge } from "../api/challenges";

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const data = await getChallenges();
      setChallenges(data);

      // Get the user's joined challenges
      const joined = data.filter((challenge) => challenge.joined);
      setJoinedChallenges(joined.map((c) => c.id));
    };

    fetchChallenges();
  }, []);

  const handleJoin = async (challengeId) => {
    if (joinedChallenges.includes(challengeId)) {
      alert("You have already joined this challenge.");
      return;
    }

    const result = await joinChallenge(challengeId);
    if (result) {
      alert("Challenge joined successfully!");
      setJoinedChallenges((prev) => [...prev, challengeId]);
    }
  };

  return (
    <div className="p-6 bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Daily Islamic Challenges</h2>
      <ul className="space-y-4">
        {challenges.map((challenge) => (
          <li key={challenge.id} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold">{challenge.title}</h3>
            <p>{challenge.description}</p>
            <button
              onClick={() => handleJoin(challenge.id)}
              disabled={joinedChallenges.includes(challenge.id)}
              className={` mt-2 px-4 py-2 rounded-lg text-white ${
                joinedChallenges.includes(challenge.id)
                  ? "bg-gray-500 cursor-not-allowed "
                  : "bg-green-500 cursor-pointer hover:bg-green-600"
              }`}
            >
              {joinedChallenges.includes(challenge.id) ? "Joined" : "Join Challenge"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengesList;
