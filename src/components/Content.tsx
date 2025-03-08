const Content = () => {
  return (
    <main className="lg:ml-64 mt-16 p-6 h-[calc(100vh-4rem)] overflow-auto bg-gray-100">
      <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
      <p className="mt-4">
        This is a responsive layout with a fixed navbar and collapsible sidebar.
      </p>
      <div className="mt-6 h-96 bg-white shadow-md p-4">
        Scrollable content...
      </div>
      <div className="mt-6 h-96 bg-white shadow-md p-4">More content...</div>
      <div className="mt-6 h-96 bg-white shadow-md p-4">
        Even more content...
      </div>
      <div className="mt-6 h-96 bg-white shadow-md p-4">
        Extra scrollable content...
      </div>
    </main>
  );
};

export default Content;
