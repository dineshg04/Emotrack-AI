import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
import axios from "axios";
import EmojiSelector from "../../components/EmojiSelector/EmojiSelector";




const AiTrack = () => {
  const [inputText, setInputText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date is selected
  const [dateEmojis, setDateEmojis] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("chatbot");
  const [pastEmotions, setPastEmotions] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
  
      try {
        // Fetch past emotions for the calendar and list
        const emotionsResponse = await axios.get('http://localhost:4000/get-emotions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const emotions = emotionsResponse.data.emotions;
  
        // For calendar
        const emojis = {};
        emotions.forEach((emotion) => {
          const dateObj = new Date(emotion.date);
          const dateKey = dateObj.toISOString().split('T')[0];
          emojis[dateKey] = emotion.emoji;
        });
        setDateEmojis(emojis);
  
        // For past emotions list
        setPastEmotions(emotions);
  
        // Fetch past chat messages
        const messagesResponse = await axios.get('http://localhost:4000/get-chat-messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const messages = messagesResponse.data.messages;
  
        // Map messages to the format expected in chatMessages
        const formattedMessages = messages.map((msg) => ({
          text: msg.text,
          sender: msg.sender,
        }));
  
        setChatMessages(formattedMessages);
  
        // Scroll to the bottom of the chat
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle the calendar date change
  const handleDateChange = (date) => {
    if (selectedDate && date.getTime() === selectedDate.getTime()) {
      // Deselect if the same date is clicked
      setSelectedDate(null);
    } else {
      setSelectedDate(date); // Save the selected date to the state
    }
  };

  const handleAnalyse = async () => {
    if (!inputText.trim()) {
      console.error("Input text is empty");
      return;
    }

    const handleManualEmojiSelection = async (emoji) => {
      if (!selectedDate) {
        alert("Please select a date on the calendar first.");
        return;
      }

      const token = localStorage.getItem("token");
      const formattedDate = selectedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

      // Check if an emoji already exists for this date
      if (dateEmojis[formattedDate]) {
        alert("An emoji already exists for this date.");
        setSelectedDate(null);
        return;
      }

      try {
        // Save the emoji to the backend
        const response = await axios.post(
          "http://localhost:4000/add-manual-emotion",
          {
            emoji: emoji,
            emotion: "Manual selection",
            date: selectedDate.toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the dateEmojis state
        setDateEmojis((prev) => ({
          ...prev,
          [formattedDate]: emoji,
        }));

        // Deselect the date after inserting the emoji
        setSelectedDate(null);
      } catch (error) {
        console.error("Error saving manual emoji:", error);
      }
    };

    const token = localStorage.getItem("token");

    try {
      // Send user input to /bot for chatbot processing
      const chatbotResponse = await axios.post(
        "http://localhost:4000/bot",
        {
          contents: [{ parts: [{ text: inputText }] }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update chat messages with user's message and chatbot's response
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: "user" },
        { text: chatbotResponse.data.chatbotResponse, sender: "bot" },
      ]);

      // Scroll to the bottom of the chat
      scrollToBottom();

      // If a date is selected and no emoji exists for that date, send to /calendar to get emoji
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

        // Check if we already have an emoji for this date
        if (!dateEmojis[formattedDate]) {
          // Send to /calendar to get emoji
          const response = await axios.post(
            "http://localhost:4000/calendar",
            {
              contents: [{ parts: [{ text: inputText }] }],
              date: selectedDate.toISOString(), // Send the selected date to the backend
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
              },
            }
          );

          const newEmoji = response.data.emoji;

          // Update dateEmojis state to store emoji for the selected date
          setDateEmojis((prev) => ({
            ...prev,
            [formattedDate]: newEmoji,
          }));
        } else {
          console.log(
            "Emoji for this date already exists:",
            dateEmojis[formattedDate]
          );
        }

        // Deselect the date after inserting the emoji
        setSelectedDate(null);
      }

      // Clear input state
      setInputText("");
    } catch (error) {
      console.error(
        "Error analyzing text:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleManualEmojiSelection = async (emoji) => {
    if (!selectedDate) {
      alert("Please select a date on the calendar first.");
      return;
    }

    const token = localStorage.getItem("token");
    const formattedDate = selectedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    // Check if an emoji already exists for this date
    if (dateEmojis[formattedDate]) {
      alert("An emoji already exists for this date.");
      setSelectedDate(null);
      return;
    }

    try {
      // Save the emoji to the backend
      const response = await axios.post(
        "http://localhost:4000/add-manual-emotion",
        {
          emoji: emoji,
          emotion: "Manual selection",
          date: selectedDate.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the dateEmojis state
      setDateEmojis((prev) => ({
        ...prev,
        [formattedDate]: emoji,
      }));

      // Deselect the date after inserting the emoji
      setSelectedDate(null);
    } catch (error) {
      console.error("Error saving manual emoji:", error);
    }
  };

  const tileContent = ({ date, view }) => {
    const dateKey = date.toISOString().split("T")[0];
    if (view === "month" && dateEmojis[dateKey]) {
      return (
        <div className="emoji-container">
          <span className="emoji">{dateEmojis[dateKey]}</span>
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (selectedDate && date.getTime() === selectedDate.getTime()) {
      return "selected-date";
    }
    return null;
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col pr-9 pl-9 mt-10">
        <div className="flex h-[700px]">
          {/* Chat Interface */}
          {/* Left Container */}
          <div className="left_container h-full w-[40%] mr-2 flex flex-col items-center justify-center">
            {/* Tab Buttons */}
            <div className="tab-buttons flex">
              <button
                className={`tab-button ${
                  activeTab === "chatbot" ? "active" : ""
                }`}
                onClick={() => setActiveTab("chatbot")}
              >
                Chatbot
              </button>
              <button
                className={`tab-button ${
                  activeTab === "pastEmotions" ? "active" : ""
                }`}
                onClick={() => setActiveTab("pastEmotions")}
              >
                Past Emotions
              </button>
            </div>

            {/* Content Based on Active Tab */}
            {activeTab === "chatbot" && (
              <div className="chatbox w-full h-full bg-white rounded-lg p-4 overflow-y-auto shadow-md">
                {chatMessages.length === 0 ? (
                  <div className="text-gray-500">Start a conversation...</div>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.sender === "user" ? "user-message" : "bot-message"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>
            )}

            {activeTab === "pastEmotions" && (
              <div className="past-emotions w-full h-full bg-white rounded-lg p-4 overflow-y-auto shadow-md">
                {pastEmotions.length === 0 ? (
                  <div className="text-gray-500">No emotions recorded yet.</div>
                ) : (
                  pastEmotions.map((emotion, index) => (
                    <div
                      key={index}
                      className="emotion-card flex justify-between items-center p-3 mb-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                      onClick={() => alert(emotion.emotion)}
                    >
                      <div className="emotion-text">{emotion.emotion}</div>
                      <div className="emotion-emoji text-2xl">
                        {emotion.emoji}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Calendar Section */}
          <div className="right_container h-full w-[60%] flex flex-col items-center justify-center">
            <div className="month w-full h-full rounded-lg mb-4 flex flex-col items-center justify-center p-4">
              <EmojiSelector onSelectEmoji={handleManualEmojiSelection} />
              <Calendar
                className="custom-calendar"
                onClickDay={handleDateChange}
                tileContent={tileContent}
                tileClassName={tileClassName}
                value={selectedDate}
              />
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-2 p-2 bg-orange-300 text-black rounded-lg hover:bg-gray-400 transition"
                >
                  Clear Date Selection
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="w-[80%] p-3 rounded-lg bg-white/80 backdrop-blur-md border border-gray-300 outline-none focus:ring focus:ring-indigo-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleAnalyse}
            className="ml-3 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </div>
      
    
    </>
  );
};

export default AiTrack;
