const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">About Us</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-white">Learn more about our mission and values.</p>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">Our Mission</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">Our Values</h2>
        <ul className="mt-2 list-disc list-inside text-lg text-gray-600 dark:text-white">
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</li>
          <li>Phasellus vel nunc sed leo fermentum elementum.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
