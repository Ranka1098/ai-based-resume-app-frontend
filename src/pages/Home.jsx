import AddButton from "./AddButton";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="px-14 py-3">
      <h1 className="text-2xl font-bold text-gray-800">My Resume</h1>
      <p className="text-xl font-medium mt-1 text-gray-600">
        Start Creating AI Resume to Your Next Job
      </p>
      <AddButton />
    </div>
  );
};

export default Home;
