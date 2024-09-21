import React from 'react'

const EmojiSelector = ({ onSelectEmoji }) => {
    const emojis = ["😊", "😢", "😠", "😱", "😍", "😔", "😃", "😞", "😡", "😅"]; // Add more emojis as needed
  
    return (
      <div className="emoji-selector flex flex-wrap justify-center mb-4">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="emoji-button text-2xl m-1"
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  };

export default EmojiSelector