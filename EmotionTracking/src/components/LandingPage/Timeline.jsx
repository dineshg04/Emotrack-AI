import React from 'react';

/* const timelineData = [
  {
    no:1,
    image:,
    description:
  },
  {
    no:2,
    image:,
    description:
  },{
    no:3,
    image:,
    description:
  },{
    no:4,
    image:,
    description:
  },{
    no:5,
    image:,
    description:
  }, 
]; */

const Timeline = () => {
  return (
    <div className="timeline-container flex flex-col md:flex-row justify-center my-10">
      <div className="timeline relative border-l-4 border-blue-500 md:border-l-0 md:border-t-4 md:pl-8 pl-4">
        {timelineData.map((event, index) => (
          <div key={index} className="mb-8 flex items-center w-full">
            <div className="timeline-content md:flex md:items-center md:justify-between">
              {/* Timeline content container */}
              <div className="hidden md:block w-1/12 text-right">
                <span className="font-bold text-gray-700">{event.date}</span>
              </div>

              <div className="relative md:w-11/12 w-full md:flex md:items-center md:space-x-4">
                {/* Line and Circle */}
                <div className="absolute left-0 md:left-auto md:right-0 h-0.5 md:w-16 bg-blue-500 md:top-2"></div>
                <div className="absolute left-0 md:left-auto md:right-0 w-8 h-8 bg-blue-500 rounded-full border-4 border-white"></div>

                {/* Image and description */}
                <div className="md:flex md:space-x-4 items-center">
                  <img src={event.image} alt={event.title} className="rounded-full w-16 h-16 object-cover" />
                  <div className="bg-white shadow-lg rounded-lg p-4 max-w-md">
                    <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                    <span className="block md:hidden mt-2 font-bold text-gray-700">{event.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
